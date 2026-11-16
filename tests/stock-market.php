<?php
declare(strict_types=1);
require_once __DIR__ . '/../website/src/Store.php';

$checks = 0;
function check(bool $condition, string $message): void {
    global $checks; ++$checks;
    if (!$condition) throw new RuntimeException($message);
}
function eq(mixed $actual, mixed $expected, string $message): void {
    check($actual === $expected, $message . ': ' . json_encode([$actual, $expected]));
}
function rejected(callable $fn, string $message): void {
    try { $fn(); } catch (GameError $e) { check(true, $message); return; }
    throw new RuntimeException('No rechazó: ' . $message);
}
function fresh(int $count = 2, bool $enabled = true, int $cash = 4000): array {
    $s = Game::create('ABCDEFGH', 'Empresa 1', str_repeat('a', 64), $cash, $enabled);
    for ($i = 1; $i < $count; ++$i) Game::join($s, 'Empresa ' . ($i + 1), str_repeat(dechex($i + 10), 64));
    Game::command($s, 0, 'start', []);
    return $s;
}
function closeMarket(array &$s, array $stocks = [], array $resources = [], array $fixed = []): void {
    foreach ($s['players'] as $actor => $p) Game::command($s, $actor, 'pass', [
        'stockOrders' => $stocks[$actor] ?? [], 'orders' => $resources[$actor] ?? [], 'fixedOrders' => $fixed[$actor] ?? []]);
}
function settle(array &$s): void {
    while ($s['phase'] === 'settlement') Game::command($s, 0, 'settle', []);
}
// These stock fixtures offset $10 discs + $1 support with $1 mines + $10 barracks.
function maintain(array &$s, array $pv): void {
    Game::command($s, 0, 'maintenance', []);
    foreach ($s['players'] as $actor => $p) Game::command($s, $actor, 'maintain', ['mines' => 0, 'barracks' => 4, 'support' => 1, 'discs' => 0, 'pv' => $pv[$actor]]);
}
function inventory(array $s): void {
    foreach ($s['stock']['companies'] as $id => $company) {
        eq($company['available'] + array_sum($s['stock']['holdings'][$id]), 400, 'Se conservan las 400 acciones');
        check($company['available'] >= 0, 'Reserva no negativa');
        foreach ($s['stock']['holdings'][$id] as $qty) check(is_int($qty) && $qty >= 0, 'Tenencias enteras no negativas');
    }
}

// Maintenance tracks match the printed board and reject invalid positions.
eq(Game::maintenanceRules()['mines'], [-100, -300, -600, -1000, -1500, -2000], 'Seis posiciones de yacimientos');
eq(Game::maintenanceRules()['barracks'], [200, 400, 600, 800, 1000, 1300, 1500, 1800, 2000, 2300, 2500, 3000], 'Doce posiciones de barracas desde $2 hasta $30');
eq(Game::maintenanceRules()['discs'], range(1000, 4200, 200), 'Diecisiete ingresos de discos');
foreach ([false, true] as $withStocks) {
    foreach (range(0, 16) as $discPosition) {
        $m = fresh(1, $withStocks);
        closeMarket($m); settle($m); Game::command($m, 0, 'maintenance', []);
        $beforeCash = $m['players'][0]['cash'];
        foreach ([-1, 17, 1.5, '2'] as $invalid) {
            rejected(function() use (&$m, $invalid) {
                Game::command($m, 0, 'maintain', ['mines' => 5, 'barracks' => 3, 'support' => 2, 'discs' => $invalid, 'pv' => 0]);
            }, 'Rechaza posición de discos inválida');
        }
        Game::command($m, 0, 'maintain', ['mines' => 5, 'barracks' => 3, 'support' => 2, 'discs' => $discPosition, 'pv' => 0]);
        $income = 1000 + 200 * $discPosition;
        $result = $m['maintenance']['results'][$m['players'][0]['id']];
        eq($result['discsIncome'], $income, 'Ingreso de discos');
        eq($result['amount'], $income - 2000 - 800 + 200, 'Total incluye discos y sexto yacimiento');
        eq((int) $m['players'][0]['cash'], $beforeCash + $result['amount'], 'El total se aplica al saldo');
        eq($m['players'][0]['maintenanceChoice']['discs'], $discPosition, 'Recuerda la selección confirmada');
        $beforeRepeat = $m;
        rejected(function() use (&$m) { Game::command($m, 0, 'maintain', ['mines' => 5, 'barracks' => 0, 'support' => 0, 'discs' => 16, 'pv' => 0]); }, 'No cobra discos dos veces');
        eq($m, $beforeRepeat, 'Reintento no modifica el saldo ni la elección');
    }
}

// Emergency purchases charge server prices for one unit and only during execution.
foreach (['Ti' => 1000, 'Al' => 600, 'Nd' => 1500, 'Gd' => 1000, 'Er' => 1000, 'Ce' => 1000, 'Tr' => 1500] as $item => $maximum) {
    eq(Market::catalog()[$item]['max'], $maximum, 'Nuevo precio máximo: ' . $item);
}
eq(Market::price(Market::catalog()['Ti'], 350, 10), 700, 'Ejemplo de titanio actualizado a máximo $10');
$oldLimits = fresh(1, false);
closeMarket($oldLimits); settle($oldLimits);
$oldLimits['catalog']['Tr']['max'] = 1100;
$closedPrices = $oldLimits['settlement']['prices'];
eq(Game::view($oldLimits, 0)['emergencyPrices']['Tr'], 1500, 'Partida guardada muestra el nuevo máximo');
$cashBefore = $oldLimits['players'][0]['cash'];
Game::command($oldLimits, 0, 'emergency-buy', ['item' => 'Tr']);
eq($oldLimits['players'][0]['cash'], $cashBefore - 1500, 'Partida guardada cobra el nuevo máximo');
eq($oldLimits['settlement']['prices'], $closedPrices, 'Cambiar máximos conserva los precios ya liquidados');
foreach ([false, true] as $withStocks) {
    $e = fresh(2, $withStocks);
    rejected(function() use (&$e) { Game::command($e, 0, 'emergency-buy', ['item' => 'Fe']); }, 'No compra de emergencia en Planificación');
    closeMarket($e); settle($e);
    $otherCash = $e['players'][1]['cash'];
    $prices = Game::view($e, 0)['emergencyPrices'];
    foreach ($prices as $item => $price) {
        $beforeCash = $e['players'][0]['cash'];
        Game::command($e, 0, 'emergency-buy', ['item' => $item, 'price' => 1, 'amount' => 0, 'qty' => 99, 'player' => $e['players'][1]['id']]);
        eq($e['players'][0]['cash'], $beforeCash - $price, 'Cobra una unidad al precio del servidor');
        eq($e['players'][1]['cash'], $otherCash, 'No puede cobrar a otro jugador');
        eq(end($e['ledger'])['emergency'], ['item' => $item, 'qty' => 1, 'unitPrice' => $price], 'Compra identificada en el registro');
        $expected = $e['catalog'][$item]['max'] ?? ($item === 'project' ? 300 : 700);
        eq($price, $expected, 'Máximo para recursos, $7 para ingenieros y $3 para proyectos');
    }
    foreach ([null, [], 'unknown'] as $invalid) {
        rejected(function() use (&$e, $invalid) { Game::command($e, 0, 'emergency-buy', ['item' => $invalid]); }, 'No permite productos desconocidos');
    }
    Game::command($e, 0, 'maintenance', []);
    rejected(function() use (&$e) { Game::command($e, 0, 'emergency-buy', ['item' => 'Fe']); }, 'No compra de emergencia en Mantenimiento');
}
$emergencyStore = new Store(['dsn' => 'sqlite::memory:', 'user' => null, 'password' => null]);
$emergencyStore->initialize(); $emergencyToken = str_repeat('c', 64);
$emergencyView = $emergencyStore->enter('create', ['name' => 'Emergencia'], $emergencyToken, 'emergency-create-01');
$emergencyCode = $emergencyView['code'];
$emergencyStore->mutate($emergencyCode, $emergencyToken, 'emergency-start-001', 'start', ['round' => 0]);
$emergencyStore->mutate($emergencyCode, $emergencyToken, 'emergency-pass-0001', 'pass', ['round' => 1]);
$emergencyView = $emergencyStore->read($emergencyCode);
$emergencyStore->mutate($emergencyCode, $emergencyToken, 'emergency-settle-01', 'settle', ['round' => 1, 'player' => $emergencyView['players'][0]['id']]);
$emergencyStore->mutate($emergencyCode, $emergencyToken, 'emergency-buy-00001', 'emergency-buy', ['round' => 1, 'item' => 'IM']);
$afterEmergency = $emergencyStore->read($emergencyCode);
$emergencyStore->mutate($emergencyCode, $emergencyToken, 'emergency-buy-00001', 'emergency-buy', ['round' => 1, 'item' => 'IM']);
eq($emergencyStore->read($emergencyCode), $afterEmergency, 'Reintentar compra de emergencia no duplica el cobro');
eq(end($afterEmergency['ledger'])['amount'], -700, 'Contratación de emergencia persiste $7');

// Feature defaults and compatibility, including legacy states with no options.
$legacy = fresh(2, false); unset($legacy['options']);
check(!isset($legacy['stock']), 'Partida antigua sin bolsa');
rejected(fn() => StockMarket::orders($legacy, 0, ['anything' => 1]), 'Rechaza bolsa desactivada');
$enabled = $legacy; $enabled['options'] = ['stockMarket' => true]; StockMarket::initialize($enabled);
$resources = [['Fe' => 2, 'Cu' => -1], ['Fe' => -1]];
$fixed = [['project' => 1], ['IM' => 1]];
closeMarket($legacy, [], $resources, $fixed); closeMarket($enabled, [], $resources, $fixed);
eq($enabled['history'], $legacy['history'], 'Precios de recursos idénticos con bolsa sin operaciones');
settle($legacy); settle($enabled);
foreach ($legacy['players'] as $i => $p) {
    eq((float) $enabled['players'][$i]['cash'], (float) $p['cash'], 'Caja de recursos idéntica');
    eq($enabled['players'][$i]['lostPv'], $p['lostPv'], 'Penalización de recursos idéntica');
}
maintain($legacy, [0, 0]); maintain($enabled, [0, 0]);
eq($enabled['phase'], $legacy['phase'], 'Mismas fases');

// Renaming only changes the authenticated player's name, including during play.
$s = fresh(); $before = $s;
Game::command($s, 1, 'rename', ['name' => '  Nuevo nombre  ', 'player' => $s['players'][0]['id']]);
eq($s['players'][1]['name'], 'Nuevo nombre', 'Jugador puede cambiar su propio nombre');
$expected = $before; $expected['players'][1]['name'] = 'Nuevo nombre';
eq($s, $expected, 'Cambiar nombre conserva identidad, fondos y órdenes sin modificar a otro jugador');
foreach (['', '   ', str_repeat('a', 41), 'EMPRESA 1'] as $invalid) {
    rejected(function() use (&$s, $invalid) { Game::command($s, 1, 'rename', ['name' => $invalid]); }, 'Rechaza nombre vacío, largo o duplicado');
}
Game::command($s, 1, 'rename', ['name' => 'NUEVO NOMBRE']);
eq($s['players'][1]['name'], 'NUEVO NOMBRE', 'Permite corregir mayúsculas del propio nombre');

// Boundaries, secrecy, treasury, one price for all, and real-time market effects.
$s = fresh(); [$a, $b] = array_column($s['players'], 'id');
foreach ($s['stock']['companies'] as $c) { eq($c['price'], 300, 'Precio inicial $3'); eq($c['available'], 400, 'Acciones iniciales al mercado'); }
rejected(fn() => StockMarket::orders($s, 0, [$a => 6, $b => 5]), 'Límite total 10');
rejected(fn() => StockMarket::orders($s, 0, [$a => -1]), 'No vende lo que no posee');
rejected(fn() => StockMarket::orders($s, 0, [$a => 0.5]), 'Solo acciones enteras');
Game::command($s, 0, 'plan', ['stockOrders' => [$a => 2, $b => 8]]);
check(!isset(Game::view($s, 1)['players'][0]['stockOrders']), 'Órdenes ajenas secretas');
Game::command($s, 0, 'pass', ['stockOrders' => [$a => 2, $b => 8]]);
Game::command($s, 0, 'unpass', []);
Game::command($s, 1, 'pass', ['stockOrders' => [$a => 3]]);
Game::command($s, 0, 'pass', ['stockOrders' => [$a => 2, $b => 8]]);
eq(count($s['stock']['round']['market']['trades']), 3, 'Todas las operaciones ejecutadas juntas');
eq($s['stock']['companies'][$a]['price'], 300, 'Compras no alteran precio de ejecución');
eq($s['players'][0]['cashUnits'], 1000 * 200, 'Compra debita caja');
inventory($s);
rejected(function() use (&$s) { StockMarket::closeMarket($s); }, 'No repite mercado');
settle($s); maintain($s, [6, 3]);
$r = $s['stock']['round']['maintenance']['results'];
eq($r[$a]['status'], 'exempt', 'Primera ronda exenta');
eq($r[$a]['pvDelta'], 0, 'Primera ronda sin premio');
eq($r[$a]['paidUnits'], 0, 'Primera ronda sin dividendos');
eq($r[$a]['nextDemand'], 40, 'Demanda proporcional 2:1');
eq($r[$b]['nextDemand'], 20, 'Demanda total 60');
eq($r[$a]['newPrice'], 345, 'Cierre suma compras netas y demanda');
eq($r[$b]['newPrice'], 328, 'Cierre independiente por empresa');
rejected(function() use (&$s) { StockMarket::closeMaintenance($s); }, 'No repite dividendos');
Game::command($s, 0, 'next', []);
eq($s['stock']['round']['basePv'][$a], 6, 'Base siguiente tras ajustes');
closeMarket($s, [[$b => -1], [$a => -1]]); settle($s);
$before = array_column($s['players'], 'cashUnits', 'id');
maintain($s, [10, 6]);
$r = $s['stock']['round']['maintenance']['results'];
eq($r[$a]['status'], 'met', 'Cumplimiento exacto');
eq($r[$a]['pvDelta'], 1, 'Premio +1');
eq($r[$b]['status'], 'exceeded', 'Superación');
eq($r[$b]['pvDelta'], 2, 'Premio +2');
eq($r[$a]['dueUnits'], 345 * 398, 'Tesorería descontada del dividendo');
eq($r[$a]['receivedUnits'], 328 * 7, 'Recibe por acciones ajenas');
eq($r[$b]['receivedUnits'], 345 * 2, 'Recepción del otro jugador');
eq($s['players'][0]['cashUnits'], $before[$a] - 345 * 398 + 328 * 7, 'Caja exacta con fracciones de centavo');
eq($r[$a]['bankUnits'], $r[$a]['paidUnits'] - $r[$b]['receivedUnits'], 'Dividendos de reserva desaparecen al mercado');
eq($r[$a]['finalPv'], 11, 'Puntaje final incluye premio');
eq($r[$a]['nextExpectation'], 3, 'Expectativa posterior al premio');
eq(count($s['stock']['history']), 2, 'Historial de ambas rondas');
inventory($s);

// Scarcity includes simultaneous sales. Largest remainders are deterministic.
$s = fresh(3); [$a, $b, $c] = array_column($s['players'], 'id');
$s['stock']['holdings'][$a][$c] = 399; $s['stock']['companies'][$a]['available'] = 1;
closeMarket($s, [[$a => 10], [$a => 5], [$a => -1]]);
eq($s['stock']['holdings'][$a][$a], 1, 'Escasez adjudica primer resto');
eq($s['stock']['holdings'][$a][$b], 1, 'Escasez adjudica segundo resto');
eq($s['stock']['holdings'][$a][$c], 398, 'Venta siempre aceptada'); inventory($s);
eq(StockMarket::apportion(['b' => 1, 'a' => 1], 1), ['b' => 0, 'a' => 1], 'Desempate estable');
eq(StockMarket::apportion(['a' => 0, 'b' => 0], 60), ['a' => 0, 'b' => 0], 'Expectativas cero sin demanda');

// Purchases may create debt, but a negative opening balance blocks the next round.
$s = fresh(1, true, 0); $a = $s['players'][0]['id'];
closeMarket($s, [[$a => 10]]); eq($s['players'][0]['cashUnits'], -600000, 'Compra permite descubierto');
settle($s); eq($s['players'][0]['lostPv'], 6, 'Descubierto bursátil participa de deuda existente');
maintain($s, [0]); Game::command($s, 0, 'next', []);
rejected(fn() => StockMarket::orders($s, 0, [$a => 1]), 'Saldo inicial negativo impide comprar');
Game::command($s, 0, 'cash', ['amount' => 10000, 'reason' => 'Ingreso']);
rejected(fn() => StockMarket::orders($s, 0, [$a => 1]), 'Ingreso posterior no cambia bloqueo de ronda');
eq(StockMarket::orders($s, 0, [$a => -1]), [$a => -1], 'Venta permitida con bloqueo');

// Floor, failure, exact solvency and payment-before-receipt behavior.
$s = fresh(); [$a, $b] = array_column($s['players'], 'id');
closeMarket($s); settle($s); maintain($s, [3, 3]); Game::command($s, 0, 'next', []);
closeMarket($s); settle($s);
// Both owe 660 cents. A has 659.995, and B owns ten shares of A (but A is unpaid).
$s['stock']['holdings'][$b][$a] = 10; $s['stock']['companies'][$b]['available'] = 390;
StockMarket::credit($s, 0, 131999 - $s['players'][0]['cashUnits']);
Game::command($s, 0, 'maintenance', []);
rejected(function() use (&$s) { Game::command($s, 0, 'cash', ['amount' => 100, 'reason' => 'Tarde']); }, 'Caja bloqueada durante evaluación');
Game::command($s, 0, 'maintain', ['mines' => 0, 'barracks' => 4, 'support' => 1, 'discs' => 0, 'pv' => 6]);
rejected(function() use (&$s) { Game::command($s, 0, 'maintain', ['mines' => 0, 'barracks' => 4, 'support' => 1, 'discs' => 0, 'pv' => 6]); }, 'No repite mantenimiento individual');
Game::command($s, 1, 'maintain', ['mines' => 0, 'barracks' => 4, 'support' => 1, 'discs' => 0, 'pv' => 5]);
$r = $s['stock']['round']['maintenance']['results'];
eq($r[$a]['status'], 'unpaid', 'Falta medio centavo: impaga');
eq($r[$a]['paidUnits'], 0, 'No paga parcialmente');
eq($r[$a]['pvDelta'], -2, 'Penalización ceil(3/2)');
eq($r[$b]['status'], 'missed', 'Incumple objetivo PV');
eq($s['players'][0]['cashUnits'], 131999, 'Impago no genera deuda');
Game::command($s, 0, 'cash', ['amount' => 1000, 'reason' => 'Cobro por evento']);
eq($s['players'][0]['cashUnits'], 331999, 'Evento permite cobrar después de evaluar expectativas');
Game::command($s, 1, 'cash', ['amount' => -700, 'reason' => 'Pago por evento']);
eq($s['stock']['round']['maintenance']['results'], $r, 'Los eventos no recalculan expectativas ni dividendos');
eq(end($s['ledger'])['reason'], 'Pago por evento', 'El evento queda identificado en el registro');

$s = fresh(); [$a, $b] = array_column($s['players'], 'id');
closeMarket($s); settle($s); maintain($s, [3, 3]); Game::command($s, 0, 'next', []);
closeMarket($s); settle($s);
$s['stock']['holdings'][$b][$a] = 10; $s['stock']['companies'][$b]['available'] = 390;
StockMarket::credit($s, 0, 131999 - $s['players'][0]['cashUnits']);
maintain($s, [6, 6]); $r = $s['stock']['round']['maintenance']['results'];
eq($r[$a]['status'], 'unpaid', 'Recibir no financia pago propio');
eq($r[$a]['receivedUnits'], 3300, 'Aun impaga recibe dividendos ajenos');
check($s['players'][0]['cashUnits'] > $r[$a]['dueUnits'], 'Solvencia se evaluó antes de recibir');

$s = fresh(1); $a = $s['players'][0]['id'];
$s['stock']['holdings'][$a][$a] = 400; $s['stock']['companies'][$a]['available'] = 0;
$s['stock']['companies'][$a]['price'] = 50; $s['stock']['round']['prices'][$a] = 50;
closeMarket($s, [[$a => -400]]); settle($s); maintain($s, [0]);
eq($s['stock']['companies'][$a]['price'], 50, 'Piso $0,50 tras venta masiva'); inventory($s);

// Persistent commands: replay, rollback, phase guards and reload.
$store = new Store(['dsn' => 'sqlite::memory:', 'user' => null, 'password' => null]); $store->initialize();
$token = str_repeat('a', 64);
$v = $store->enter('create', ['name' => 'Persistida', 'stockMarket' => true], $token, 'create-stock-0001'); $code = $v['code'];
$store->mutate($code, $token, 'start-stock-00001', 'start', ['round' => 0]);
$id = $store->read($code)['players'][0]['id'];
$plan = ['round' => 1, 'stockOrders' => [$id => 10]];
$store->mutate($code, $token, 'pass-stock-000001', 'pass', $plan); $saved = $store->read($code);
$store->mutate($code, $token, 'pass-stock-000001', 'pass', $plan);
eq($store->read($code), $saved, 'Reintento no duplica acciones ni caja');
rejected(fn() => $store->mutate($code, $token, 'pass-stock-000001', 'pass', ['round' => 1]), 'Clave reutilizada con otro contenido');
rejected(fn() => $store->mutate($code, $token, 'pass-stock-000002', 'pass', $plan), 'Clave nueva no repite fase');
eq($store->read($code), $saved, 'Rechazos hacen rollback completo');
$store->mutate($code, $token, 'settle-stock-001', 'settle', ['round' => 1, 'player' => $id]);
$store->mutate($code, $token, 'maint-stock-0001', 'maintenance', ['round' => 1]);
$entry = ['round' => 1, 'mines' => 0, 'barracks' => 4, 'support' => 1, 'discs' => 0, 'pv' => 3];
$store->mutate($code, $token, 'maintain-stock01', 'maintain', $entry); $saved = $store->read($code);
$store->mutate($code, $token, 'maintain-stock01', 'maintain', $entry);
eq($store->read($code), $saved, 'Reintento no duplica cierre ni dividendos');
eq(count($saved['stock']['history']), 1, 'Historial se persiste una vez');
rejected(fn() => $store->mutate($code, $token, 'maintain-stock02', 'maintain', $entry), 'Clave nueva no repite mantenimiento');
$store->mutate($code, $token, 'next-stock-00001', 'next', ['round' => 1]);
rejected(fn() => $store->mutate($code, $token, 'stale-stock-0001', 'pass', $plan), 'Rechaza ronda anterior');
eq($store->read($code)['stock']['round']['round'], 2, 'Recarga conserva ronda y cartera');

// Cash movements and debt thresholds retain fractions from earlier dividends.
$s = fresh(1); $a = $s['players'][0]['id'];
StockMarket::credit($s, 0, -$s['players'][0]['cashUnits'] - 99999);
closeMarket($s); settle($s);
eq($s['players'][0]['lostPv'], 0, 'Deuda menor a $5 no se redondea para penalizar');
Game::command($s, 0, 'cash', ['amount' => 100, 'reason' => 'Ingreso exacto']);
eq($s['players'][0]['cashUnits'], -79999, 'Caja regular conserva fracción de centavo');

// Full treasury owes nothing, even if the issuer is otherwise in debt.
$s = fresh(1); $a = $s['players'][0]['id'];
closeMarket($s); settle($s); maintain($s, [3]); Game::command($s, 0, 'next', []);
$s['stock']['holdings'][$a][$a] = 400; $s['stock']['companies'][$a]['available'] = 0;
closeMarket($s); settle($s); StockMarket::credit($s, 0, -$s['players'][0]['cashUnits'] - 1);
maintain($s, [6]);
eq($s['stock']['round']['maintenance']['results'][$a]['status'], 'met', 'Tesorería total no requiere caja para dividendos');
eq($s['stock']['round']['maintenance']['results'][$a]['dueUnits'], 0, 'Tesorería total exenta de pago');

// Numeric-looking hexadecimal IDs must retain their string identity in the ledger.
$s = Game::create('ABCDEFGH', 'Numeric ID', str_repeat('a', 64), 4000, true);
$s['players'][0]['id'] = '1234567890123456'; $s['host'] = $s['players'][0]['id'];
Game::command($s, 0, 'start', []);
closeMarket($s, [['1234567890123456' => 1]]); settle($s); maintain($s, [3]);
foreach (array_filter($s['ledger'], fn($entry) => isset($entry['stock'])) as $entry) eq($entry['player'], '1234567890123456', 'Identidad de jugador conservada');

// Randomized complete rounds: invariants, immutable archives and exact ledger.
mt_srand(20261101);
$s = fresh(4, true, 100000); $firstArchive = null;
for ($round = 1; $round <= 60; ++$round) {
    $orders = []; $ids = array_column($s['players'], 'id');
    foreach ($s['players'] as $actor => $p) {
        $id = $ids[mt_rand(0, 3)]; $held = $s['stock']['holdings'][$id][$p['id']] ?? 0;
        $qty = $held && mt_rand(0, 1) ? -mt_rand(1, $held) : ($s['stock']['round']['buyAllowed'][$p['id']] ? mt_rand(0, 10) : 0);
        $orders[$actor] = [$id => $qty];
    }
    closeMarket($s, $orders); settle($s);
    $pv = array_map(fn($p) => $s['stock']['companies'][$p['id']]['pv'] + mt_rand(-1, 6), $s['players']);
    maintain($s, $pv); inventory($s);
    foreach ($s['players'] as $p) {
        $units = array_sum(array_column(array_filter($s['ledger'], fn($l) => $l['player'] === $p['id']), 'amountUnits'));
        eq($p['cashUnits'], $units, 'Libro contable reconcilia sin redondeo');
        check($s['stock']['companies'][$p['id']]['price'] >= 50, 'Cotización respeta piso');
    }
    $firstArchive ??= $s['stock']['history'][0];
    eq($s['stock']['history'][0], $firstArchive, 'Historial anterior inmutable');
    Game::command($s, 0, 'next', []);
}

echo "OK: $checks comprobaciones de reglas, compatibilidad y persistencia.\n";
