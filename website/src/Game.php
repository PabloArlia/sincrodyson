<?php
declare(strict_types=1);
require_once __DIR__ . '/Market.php';
require_once __DIR__ . '/StockMarket.php';

final class GameError extends RuntimeException
{
    public function __construct(string $message, public readonly int $status = 422) { parent::__construct($message); }
}

final class Game
{
    public static function tradeRules(): array
    {
        return [
            'project-buy' => ['label' => 'Compra de proyectos', 'unitAmount' => -300],
            'project-sell' => ['label' => 'Venta de proyectos', 'unitAmount' => 200],
            'engineer-hire' => ['label' => 'Contratación de ingenieros', 'unitAmount' => -500],
            'engineer-fire' => ['label' => 'Despido de ingenieros', 'unitAmount' => 0],
        ];
    }

    public static function engineerTypes(): array
    {
        return ['IM' => 'Electromecánico', 'IQ' => 'Químico', 'IE' => 'Estructural', 'IS' => 'En sistemas'];
    }

    public static function maintenanceRules(): array
    {
        return ['mines' => [-100, -300, -600, -1000, -1500, -2000],
            'discs' => range(1000, 4200, 200),
            'barracks' => [200, 400, 600, 800, 1000, 1300, 1500, 1800, 2000, 2300, 2500, 3000],
            'supportPerEngineer' => 100];
    }

    private static function emergencyPrices(array $s): array
    {
        $prices = array_column($s['catalog'], 'max', 'id');
        foreach (self::engineerTypes() as $id => $name) $prices[$id] = 700;
        $prices['project'] = -self::tradeRules()['project-buy']['unitAmount'];
        return $prices;
    }

    private static function updateCatalog(array &$s): void
    {
        foreach (Market::catalog() as $id => $resource) {
            $s['catalog'][$id] ??= $resource;
            $s['catalog'][$id]['color'] = $resource['color'];
            $s['catalog'][$id]['max'] = $resource['max'];
            $s['history'][$id] ??= Market::warmup([$id => $resource], $s['seed'])[$id];
        }
    }

    public static function name(mixed $name): string
    {
        if (!is_string($name) || mb_strlen(trim($name)) < 1 || mb_strlen(trim($name)) > 40) {
            throw new GameError('Usá un nombre de 1 a 40 caracteres.');
        }
        return trim($name);
    }

    public static function integer(mixed $value, int $min, int $max): int
    {
        if (!is_int($value) || $value < $min || $value > $max) throw new GameError('Cantidad inválida. Usá números enteros dentro del rango indicado.');
        return $value;
    }

    public static function create(string $code, string $name, string $token, int $cash = 6000, bool $stockMarket = false): array
    {
        $player = self::player($name, $token, $cash);
        $catalog = Market::catalog();
        $seed = bin2hex(random_bytes(16));
        $s = ['code' => $code, 'version' => 1, 'phase' => 'lobby', 'round' => 0,
            'host' => $player['id'], 'players' => [$player], 'catalog' => $catalog,
            'seed' => $seed, 'history' => Market::warmup($catalog, $seed), 'passCounter' => 0,
            'settlement' => null, 'markets' => [], 'ledger' => [], 'initialCash' => $cash,
            'options' => ['stockMarket' => $stockMarket]];
        self::log($s, $player['id'], $cash, 'Saldo inicial');
        return $s;
    }

    private static function player(string $name, string $token, int $cash): array
    {
        return ['id' => bin2hex(random_bytes(8)), 'name' => self::name($name),
            'tokenHash' => hash('sha256', $token), 'cash' => $cash, 'lostPv' => 0,
            'debts' => [], 'orders' => [], 'fixedOrders' => [], 'pass' => null];
    }

    public static function actor(array $s, string $token): int
    {
        foreach ($s['players'] as $i => $p) if (hash_equals($p['tokenHash'], hash('sha256', $token))) return $i;
        throw new GameError('No se pudo recuperar tu lugar. Revisá la clave personal.', 401);
    }

    public static function join(array &$s, string $name, string $token): void
    {
        if ($s['phase'] !== 'lobby') throw new GameError('Esta partida ya comenzó.', 409);
        if (count($s['players']) >= 12) throw new GameError('La sala admite hasta 12 jugadores.');
        $name = self::name($name);
        foreach ($s['players'] as $p) if (mb_strtolower($p['name']) === mb_strtolower($name)) throw new GameError('Ese nombre ya está en la sala.');
        $p = self::player($name, $token, $s['initialCash']);
        $s['players'][] = $p;
        self::log($s, $p['id'], $p['cash'], 'Saldo inicial');
    }

    private static function phase(array $s, string ...$allowed): void
    {
        if (!in_array($s['phase'], $allowed, true)) throw new GameError('La fase cambió. Actualizá la pantalla.', 409);
    }

    private static function log(array &$s, string $player, int|float $amount, string $reason, array $extra = []): void
    {
        if (StockMarket::enabled($s)) $extra['amountUnits'] = (int) round($amount * StockMarket::SCALE);
        $s['ledger'][] = ['id' => count($s['ledger']) + 1, 'round' => $s['round'],
            'player' => $player, 'amount' => $amount, 'reason' => $reason,
            'at' => gmdate('c')] + $extra;
    }

    private static function cashChange(array &$s, int $actor, int $cents): void
    {
        if (StockMarket::enabled($s) && isset($s['stock'])) StockMarket::credit($s, $actor, $cents * StockMarket::SCALE);
        else $s['players'][$actor]['cash'] += $cents;
    }

    private static function orders(array $s, mixed $input): array
    {
        if (!is_array($input)) throw new GameError('Órdenes inválidas.');
        $out = [];
        foreach ($input as $id => $qty) {
            if (!isset($s['catalog'][$id])) throw new GameError('Recurso desconocido.');
            $qty = self::integer($qty, -1000000, 1000000);
            if ($qty !== 0) $out[$id] = $qty;
        }
        return $out;
    }

    private static function fixedOrders(mixed $input): array
    {
        if (!is_array($input)) throw new GameError('Órdenes inválidas.');
        $out = [];
        foreach ($input as $id => $qty) {
            if ($id !== 'project' && !isset(self::engineerTypes()[$id])) throw new GameError('Proyecto o tipo de ingeniero desconocido.');
            $qty = self::integer($qty, -1000000, 1000000);
            if ($qty !== 0) $out[$id] = $qty;
        }
        return $out;
    }

    private static function fixedAmount(array $orders, array $rules): int
    {
        $amount = 0;
        foreach ($orders as $id => $qty) {
            $operation = $id === 'project' ? ($qty > 0 ? 'project-buy' : 'project-sell') : ($qty > 0 ? 'engineer-hire' : 'engineer-fire');
            $amount += abs($qty) * $rules[$operation]['unitAmount'];
        }
        return $amount;
    }

    public static function command(array &$s, int $actor, string $action, array $data): void
    {
        self::updateCatalog($s);
        $p = &$s['players'][$actor];
        $host = $s['host'] === $p['id'];
        switch ($action) {
            case 'rename':
                $name = self::name($data['name'] ?? '');
                foreach ($s['players'] as $other) {
                    if ($other['id'] !== $p['id'] && mb_strtolower($other['name']) === mb_strtolower($name)) {
                        throw new GameError('Ese nombre ya está en la sala.');
                    }
                }
                $p['name'] = $name;
                break;
            case 'start':
                self::phase($s, 'lobby');
                if (!$host) throw new GameError('Solo el anfitrión puede iniciar.', 403);
                $s['round'] = 1; $s['phase'] = 'planning';
                if (StockMarket::enabled($s)) StockMarket::initialize($s);
                break;
            case 'plan':
            case 'pass':
                self::phase($s, 'planning');
                if ($p['pass'] !== null) throw new GameError('Retirá tu pase antes de cambiar las órdenes.', 409);
                $orders = self::orders($s, $data['orders'] ?? []);
                $fixedOrders = self::fixedOrders($data['fixedOrders'] ?? []);
                $stockOrders = StockMarket::orders($s, $actor, $data['stockOrders'] ?? []);
                $p['orders'] = $orders;
                $p['fixedOrders'] = $fixedOrders;
                if (StockMarket::enabled($s)) $p['stockOrders'] = $stockOrders;
                if ($action === 'pass') {
                    $p['pass'] = ++$s['passCounter'];
                    if (count(array_filter($s['players'], fn($x) => $x['pass'] !== null)) === count($s['players'])) self::closeMarket($s);
                }
                break;
            case 'unpass':
                self::phase($s, 'planning');
                $p['pass'] = null;
                break;
            case 'settle':
                self::phase($s, 'settlement');
                $index = $s['settlement']['index'];
                $id = $s['settlement']['order'][$index];
                if ($id !== $p['id'] && !$host) throw new GameError('Confirma el jugador activo o el anfitrión.', 403);
                $target = array_search($id, array_column($s['players'], 'id'), true);
                $seller = &$s['players'][$target];
                $missing = self::orders($s, $data['missing'] ?? []);
                foreach ($missing as $rid => $qty) {
                    $sold = max(0, -($seller['orders'][$rid] ?? 0));
                    if ($qty < 0 || $qty > $sold) throw new GameError('Solo podés deber unidades que debías entregar.');
                    $seller['debts'][$rid] = ($seller['debts'][$rid] ?? 0) + $qty;
                }
                $amount = 0;
                foreach ($seller['orders'] as $rid => $qty) $amount -= $qty * $s['settlement']['prices'][$rid];
                $amount += self::fixedAmount($seller['fixedOrders'] ?? [], $s['settlement']['fixedRules'] ?? self::tradeRules());
                self::cashChange($s, $target, $amount);
                $s['settlement']['results'][$id] = ['amount' => $amount, 'balance' => $seller['cash'],
                    'missing' => $missing, 'confirmedBy' => $p['id']];
                self::log($s, $id, $amount, 'Liquidación de mercado', ['orders' => $seller['orders'], 'fixedOrders' => $seller['fixedOrders'] ?? [], 'missing' => $missing, 'by' => $p['id']]);
                ++$s['settlement']['index'];
                if ($s['settlement']['index'] === count($s['players'])) {
                    foreach ($s['players'] as &$person) {
                        $value = max(0, -$person['cash']);
                        $resourceDebt = 0;
                        foreach ($person['debts'] as $rid => $qty) $resourceDebt += $qty * $s['catalog'][$rid]['max'];
                        $value += $resourceDebt;
                        $penalty = StockMarket::enabled($s)
                            ? intdiv(max(0, -$person['cashUnits']) + $resourceDebt * StockMarket::SCALE, 500 * StockMarket::SCALE)
                            : intdiv($value, 500);
                        $person['lostPv'] += $penalty;
                        self::log($s, $person['id'], 0, 'Penalización por deudas', ['pv' => -$penalty, 'debtValue' => $value]);
                    }
                    unset($person);
                    $s['markets'][] = $s['settlement'] + ['round' => $s['round']];
                    $s['phase'] = 'execution';
                }
                break;
            case 'repay':
                self::phase($s, 'planning', 'execution', 'maintenance');
                $units = self::orders($s, $data['units'] ?? []);
                if (!$units) throw new GameError('Indicá las unidades que estás entregando.');
                foreach ($units as $rid => $qty) {
                    if ($qty < 1 || $qty > ($p['debts'][$rid] ?? 0)) throw new GameError('La devolución supera tu deuda.');
                    $p['debts'][$rid] -= $qty;
                    if ($p['debts'][$rid] === 0) unset($p['debts'][$rid]);
                }
                self::log($s, $p['id'], 0, 'Entrega de recursos pendientes', ['units' => $units]);
                break;
            case 'emergency-buy':
                self::phase($s, 'execution');
                $item = $data['item'] ?? null;
                $prices = self::emergencyPrices($s);
                if (!is_string($item) || !isset($prices[$item])) throw new GameError('Recurso, proyecto o ingeniero desconocido.');
                $price = $prices[$item];
                $name = $s['catalog'][$item]['name'] ?? ($item === 'project' ? 'Carta de proyecto' : 'Ingeniero ' . self::engineerTypes()[$item]);
                self::cashChange($s, $actor, -$price);
                self::log($s, $p['id'], -$price, 'Compra de emergencia: ' . $name,
                    ['emergency' => ['item' => $item, 'qty' => 1, 'unitPrice' => $price]]);
                break;
            case 'cash':
            case 'transfer':
                self::phase($s, 'lobby', 'planning', 'execution', 'maintenance');
                if (StockMarket::enabled($s) && $s['phase'] === 'maintenance' && $s['stock']['round']['maintenance'] === null) throw new GameError('La caja se reabre al terminar el mantenimiento bursátil.', 409);
                $amount = self::integer($data['amount'] ?? null, -100000000, 100000000);
                if (!$amount) throw new GameError('El importe no puede ser cero.');
                $reason = self::name($data['reason'] ?? '');
                if ($action === 'transfer') {
                    if ($amount < 1) throw new GameError('La transferencia debe ser positiva.');
                    $other = array_search($data['to'] ?? '', array_column($s['players'], 'id'), true);
                    if ($other === false || $other === $actor) throw new GameError('Elegí otro jugador.');
                    self::cashChange($s, $actor, -$amount);
                    self::cashChange($s, $other, $amount);
                    self::log($s, $p['id'], -$amount, $reason, ['to' => $s['players'][$other]['id']]);
                    self::log($s, $s['players'][$other]['id'], $amount, $reason, ['from' => $p['id']]);
                } else {
                    self::cashChange($s, $actor, $amount);
                    self::log($s, $p['id'], $amount, $reason);
                }
                break;
            case 'maintenance':
                self::phase($s, 'execution');
                if (!$host) throw new GameError('Solo el anfitrión puede avanzar la partida.', 403);
                $s['phase'] = 'maintenance';
                $s['maintenance'] = ['results' => []];
                break;
            case 'maintain':
                self::phase($s, 'maintenance');
                if (isset($s['maintenance']['results'][$p['id']])) throw new GameError('Ya registraste el mantenimiento de esta ronda.', 409);
                $rules = self::maintenanceRules();
                $mines = self::integer($data['mines'] ?? null, 0, count($rules['mines']) - 1);
                $barracks = self::integer($data['barracks'] ?? null, 0, count($rules['barracks']) - 1);
                $support = self::integer($data['support'] ?? null, 0, 14);
                $discs = self::integer($data['discs'] ?? 0, 0, count($rules['discs']) - 1);
                $pv = StockMarket::enabled($s) ? self::integer($data['pv'] ?? null, -1000000, 1000000) : null;
                $amount = $rules['mines'][$mines] - $rules['barracks'][$barracks] + $support * $rules['supportPerEngineer'] + $rules['discs'][$discs];
                self::cashChange($s, $actor, $amount);
                $p['maintenanceChoice'] = compact('mines', 'barracks', 'support', 'discs');
                $result = ['amount' => $amount, 'balance' => $p['cash'],
                    'mines' => $rules['mines'][$mines], 'barracks' => $rules['barracks'][$barracks],
                    'discs' => $discs, 'discsIncome' => $rules['discs'][$discs],
                    'support' => $support, 'supportIncome' => $support * $rules['supportPerEngineer']];
                if (StockMarket::enabled($s)) $result['pv'] = $pv;
                $s['maintenance']['results'][$p['id']] = $result;
                self::log($s, $p['id'], $amount, 'Mantenimiento', ['maintenance' => $result]);
                if (StockMarket::enabled($s) && count($s['maintenance']['results']) === count($s['players'])) StockMarket::closeMaintenance($s);
                break;
            case 'next':
            case 'finish':
                self::phase($s, 'maintenance');
                if (!$host) throw new GameError('Solo el anfitrión puede avanzar la partida.', 403);
                if (count($s['maintenance']['results']) !== count($s['players'])) throw new GameError('Falta que todos confirmen su mantenimiento.');
                if (StockMarket::enabled($s) && $s['stock']['round']['maintenance'] === null) throw new GameError('Falta cerrar el mantenimiento bursátil.', 409);
                if ($action === 'finish') { $s['phase'] = 'finished'; break; }
                ++$s['round']; $s['phase'] = 'planning'; $s['passCounter'] = 0;
                foreach ($s['players'] as &$person) { $person['pass'] = null; $person['orders'] = []; $person['fixedOrders'] = []; }
                unset($person);
                $s['settlement'] = null;
                $s['maintenance'] = null;
                if (StockMarket::enabled($s)) StockMarket::beginRound($s);
                break;
            default: throw new GameError('Acción desconocida.', 404);
        }
    }

    private static function closeMarket(array &$s): void
    {
        $prices = []; $flows = [];
        foreach ($s['catalog'] as $rid => $r) {
            $buy = $sell = 0;
            foreach ($s['players'] as $p) {
                $q = $p['orders'][$rid] ?? 0;
                $buy += max(0, $q); $sell += max(0, -$q);
            }
            $previous = $s['history'][$rid][array_key_last($s['history'][$rid])]['price'];
            $prices[$rid] = Market::price($r, $previous, $buy - $sell);
            $flows[$rid] = ['buy' => $buy, 'sell' => $sell, 'external' => $buy - $sell];
            $s['history'][$rid][] = ['round' => $s['round'], 'price' => $prices[$rid], 'simulated' => false, 'imbalance' => $buy - $sell];
        }
        $ordered = $s['players'];
        usort($ordered, fn($a, $b) => $a['pass'] <=> $b['pass']);
        $s['settlement'] = ['prices' => $prices, 'flows' => $flows, 'fixedRules' => self::tradeRules(), 'order' => array_column($ordered, 'id'), 'index' => 0, 'results' => []];
        if (StockMarket::enabled($s)) StockMarket::closeMarket($s);
        $s['phase'] = 'settlement';
    }

    public static function view(array $s, int $actor): array
    {
        self::updateCatalog($s);
        $s['maintenanceRules'] = self::maintenanceRules();
        $s['tradeRules'] = self::tradeRules();
        $s['emergencyPrices'] = self::emergencyPrices($s);
        $s['engineerTypes'] = self::engineerTypes();
        $s['me'] = $s['players'][$actor]['id'];
        foreach ($s['players'] as $i => &$p) {
            unset($p['tokenHash']);
            $p['fixedOrders'] ??= [];
            if ($s['phase'] === 'planning' && $i !== $actor) unset($p['orders'], $p['fixedOrders'], $p['stockOrders']);
        }
        unset($p);
        return $s;
    }
}
