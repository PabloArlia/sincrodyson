<?php
declare(strict_types=1);

/** Optional stock rules. Prices are cents; exact money uses 200 units per cent. */
final class StockMarket
{
    public const SCALE = 200;
    public const SHARES = 400;

    public static function enabled(array $s): bool
    {
        return ($s['options']['stockMarket'] ?? false) === true;
    }

    public static function initialize(array &$s): void
    {
        $s['stock'] = ['rulesVersion' => 1, 'moneyScale' => self::SCALE,
            'rules' => ['shares' => self::SHARES, 'initialPrice' => 300, 'minimumPrice' => 50,
                'purchaseLimit' => 10, 'priceStep' => 1, 'demandPerPlayer' => 30, 'dividendDivisor' => 200],
            'companies' => [], 'holdings' => [], 'history' => []];
        foreach ($s['players'] as &$p) {
            $id = $p['id'];
            $p['cashUnits'] = $p['cash'] * self::SCALE;
            $p['stockOrders'] = [];
            $s['stock']['companies'][$id] = ['owner' => $id, 'price' => 300, 'available' => self::SHARES,
                'pv' => 0, 'expectation' => 0, 'demand' => 0, 'requiredPv' => 0,
                'priceHistory' => [['round' => 0, 'price' => 300]]];
            $s['stock']['holdings'][$id] = [];
        }
        unset($p);
        self::beginRound($s);
    }

    public static function beginRound(array &$s): void
    {
        $round = ['round' => $s['round'], 'rulesVersion' => $s['stock']['rulesVersion'], 'prices' => [], 'basePv' => [], 'expectations' => [],
            'demands' => [], 'requiredPv' => [], 'buyAllowed' => [], 'market' => null, 'maintenance' => null];
        foreach ($s['stock']['companies'] as $id => $company) {
            $round['prices'][$id] = $company['price'];
            $round['basePv'][$id] = $company['pv'];
            $round['expectations'][$id] = $company['expectation'];
            $round['demands'][$id] = $company['demand'];
            $round['requiredPv'][$id] = $company['requiredPv'];
        }
        foreach ($s['players'] as &$p) {
            $p['stockOrders'] = [];
            $round['buyAllowed'][$p['id']] = $p['cashUnits'] >= 0;
        }
        unset($p);
        $s['stock']['round'] = $round;
    }

    public static function orders(array $s, int $actor, mixed $input): array
    {
        if (!is_array($input)) throw new GameError('Órdenes bursátiles inválidas.');
        if (!self::enabled($s)) {
            if ($input) throw new GameError('Esta partida no tiene mercado bursátil.');
            return [];
        }
        $p = $s['players'][$actor]; $out = []; $buys = 0;
        foreach ($input as $id => $qty) {
            if (!isset($s['stock']['companies'][$id])) throw new GameError('Empresa desconocida.');
            $qty = Game::integer($qty, -self::SHARES, 10);
            if ($qty > 0) {
                if (!$s['stock']['round']['buyAllowed'][$p['id']]) throw new GameError('No podés comprar acciones: comenzaste la planificación con saldo negativo.');
                $buys += $qty;
            }
            if ($qty < -($s['stock']['holdings'][$id][$p['id']] ?? 0)) throw new GameError('No podés vender acciones que no tenés.');
            if ($qty) $out[$id] = $qty;
        }
        if ($buys > 10) throw new GameError('Podés comprar hasta 10 acciones en total por ronda.');
        return $out;
    }

    /** Largest remainders, with a stable ID tie break independent of pass order. */
    public static function apportion(array $weights, int $quantity): array
    {
        $total = array_sum($weights); $out = array_fill_keys(array_keys($weights), 0);
        if (!$total || !$quantity) return $out;
        $remainders = [];
        foreach ($weights as $id => $weight) {
            $out[$id] = intdiv($quantity * $weight, $total);
            $remainders[$id] = ($quantity * $weight) % $total;
        }
        $ids = array_keys($weights);
        usort($ids, fn($a, $b) => ($remainders[$b] <=> $remainders[$a]) ?: strcmp((string) $a, (string) $b));
        $remaining = $quantity - array_sum($out);
        for ($i = 0; $i < $remaining; ++$i) ++$out[$ids[$i]];
        return $out;
    }

    public static function credit(array &$s, int $actor, int $units): void
    {
        $p = &$s['players'][$actor];
        $p['cashUnits'] = ($p['cashUnits'] ?? $p['cash'] * self::SCALE) + $units;
        $p['cash'] = $p['cashUnits'] / self::SCALE;
    }

    private static function movement(array &$s, int $actor, int $units, string $reason, array $extra): void
    {
        self::credit($s, $actor, $units);
        $s['ledger'][] = ['id' => count($s['ledger']) + 1, 'round' => $s['round'],
            'player' => $s['players'][$actor]['id'], 'amount' => $units / self::SCALE,
            'amountUnits' => $units, 'reason' => $reason, 'at' => gmdate('c'), 'stock' => $extra];
    }

    public static function closeMarket(array &$s): void
    {
        if ($s['stock']['round']['market'] !== null) throw new GameError('La bolsa de esta ronda ya se procesó.', 409);
        $result = ['trades' => [], 'flows' => [], 'orders' => [], 'holdingsBefore' => $s['stock']['holdings']];
        foreach ($s['players'] as $p) $result['orders'][$p['id']] = $p['stockOrders'];
        foreach ($s['stock']['companies'] as $id => &$company) {
            $id = (string) $id;
            $price = $s['stock']['round']['prices'][$id]; $sold = 0; $buyers = [];
            foreach ($s['players'] as $actor => $p) {
                $qty = $p['stockOrders'][$id] ?? 0;
                if ($qty < 0) {
                    $s['stock']['holdings'][$id][$p['id']] += $qty;
                    $company['available'] -= $qty; $sold -= $qty;
                    self::trade($s, $result, $actor, $id, $qty, $qty, $price);
                } elseif ($qty > 0) $buyers[$p['id']] = $qty;
            }
            $bought = min($company['available'], array_sum($buyers));
            $allocation = self::apportion($buyers, $bought);
            foreach ($s['players'] as $actor => $p) {
                if (!isset($buyers[$p['id']])) continue;
                $qty = $allocation[$p['id']];
                $s['stock']['holdings'][$id][$p['id']] = ($s['stock']['holdings'][$id][$p['id']] ?? 0) + $qty;
                $company['available'] -= $qty;
                self::trade($s, $result, $actor, $id, $buyers[$p['id']], $qty, $price);
            }
            $result['flows'][$id] = ['buy' => $bought, 'sell' => $sold, 'net' => $bought - $sold];
        }
        unset($company);
        $result['holdingsAfter'] = $s['stock']['holdings'];
        $s['stock']['round']['market'] = $result;
    }

    private static function trade(array &$s, array &$result, int $actor, string|int $company, int $requested, int $qty, int $price): void
    {
        $company = (string) $company;
        $units = -$qty * $price * self::SCALE;
        $trade = ['company' => $company, 'player' => $s['players'][$actor]['id'], 'requested' => $requested,
            'qty' => $qty, 'price' => $price, 'amountUnits' => $units, 'amount' => $units / self::SCALE];
        $result['trades'][] = $trade;
        self::movement($s, $actor, $units, 'Operación bursátil', $trade);
    }

    /** All normal maintenance payments happen before any dividend receipts. */
    public static function closeMaintenance(array &$s): void
    {
        $r = &$s['stock']['round'];
        if ($r['maintenance'] !== null) throw new GameError('El cierre bursátil ya se procesó.', 409);
        if ($r['market'] === null || count($s['maintenance']['results']) !== count($s['players'])) throw new GameError('Falta completar la ronda bursátil.', 409);
        $results = []; $payments = [];
        foreach ($s['players'] as $actor => $p) {
            $id = $p['id']; $declared = $s['maintenance']['results'][$id]['pv'];
            $gained = $declared - $r['basePv'][$id]; $required = $r['requiredPv'][$id];
            $own = $s['stock']['holdings'][$id][$id] ?? 0;
            // 0.5% of price in cents = price units, exactly, with SCALE=200.
            $due = $r['expectations'][$id] > 0 ? $r['prices'][$id] * (self::SHARES - $own) : 0;
            $active = $r['expectations'][$id] > 0;
            $fulfilled = $gained >= $required;
            $solvent = $due === 0 || $p['cashUnits'] >= $due;
            $status = !$active ? 'exempt' : (!$fulfilled ? 'missed' : (!$solvent ? 'unpaid' : ($gained === $required ? 'met' : 'exceeded')));
            $paid = $active && $fulfilled && $solvent ? $due : 0;
            $pvDelta = !$active ? 0 : ($fulfilled && $solvent ? ($gained === $required ? 1 : 2) : -intdiv($required + 1, 2));
            $payments[$id] = $paid;
            $results[$id] = ['declaredPv' => $declared, 'basePv' => $r['basePv'][$id], 'gainedPv' => $gained,
                'requiredPv' => $required, 'expectation' => $r['expectations'][$id], 'status' => $status,
                'dueUnits' => $due, 'paidUnits' => $paid, 'receivedUnits' => 0, 'bankUnits' => 0,
                'cashBeforeDividendsUnits' => $p['cashUnits'], 'treasury' => $own,
                'pvDelta' => $pvDelta, 'finalPv' => $declared + $pvDelta, 'recipients' => []];
        }
        // Decide solvency for every company first, then debit all issuers.
        foreach ($s['players'] as $actor => $p) {
            $id = $p['id'];
            if ($payments[$id]) self::movement($s, $actor, -$payments[$id], 'Pago de dividendos', ['company' => $id]);
        }
        foreach ($s['players'] as $issuer) {
            $id = $issuer['id'];
            if (!$payments[$id]) continue;
            $distributed = 0;
            foreach ($s['players'] as $actor => $holder) {
                if ($holder['id'] === $id) continue;
                $units = $r['prices'][$id] * ($s['stock']['holdings'][$id][$holder['id']] ?? 0);
                if (!$units) continue;
                self::movement($s, $actor, $units, 'Cobro de dividendos', ['company' => $id]);
                $results[$holder['id']]['receivedUnits'] += $units;
                $results[$id]['recipients'][$holder['id']] = $units;
                $distributed += $units;
            }
            $results[$id]['bankUnits'] = $payments[$id] - $distributed;
        }
        $expectations = [];
        foreach ($results as $id => $result) $expectations[$id] = max(0, (int) floor($result['finalPv'] / 3));
        $demands = self::apportion($expectations, 30 * count($s['players']));
        foreach ($s['stock']['companies'] as $id => &$company) {
            $id = (string) $id;
            $price = max(50, $r['prices'][$id] + $r['market']['flows'][$id]['net'] + $demands[$id]);
            $company['pv'] = $results[$id]['finalPv'];
            $company['price'] = $price;
            $company['expectation'] = $expectations[$id];
            $company['demand'] = $demands[$id];
            $company['requiredPv'] = intdiv($demands[$id] + 9, 10);
            $company['priceHistory'][] = ['round' => $s['round'], 'price' => $price];
            $results[$id] += ['oldPrice' => $r['prices'][$id], 'newPrice' => $price, 'nextExpectation' => $expectations[$id],
                'nextDemand' => $demands[$id], 'nextRequiredPv' => $company['requiredPv']];
            $s['ledger'][] = ['id' => count($s['ledger']) + 1, 'round' => $s['round'], 'player' => $id,
                'amount' => 0, 'amountUnits' => 0, 'pv' => $results[$id]['pvDelta'], 'reason' => 'Resultado bursátil',
                'at' => gmdate('c'), 'stock' => ['company' => $id, 'result' => $results[$id]]];
        }
        unset($company);
        $r['maintenance'] = ['results' => $results];
        $s['stock']['history'][] = $r;
    }
}
