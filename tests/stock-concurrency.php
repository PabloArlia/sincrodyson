<?php
declare(strict_types=1);
require_once __DIR__ . '/../website/src/Store.php';

if (($argv[1] ?? '') === '--worker') {
    $store = new Store(['dsn' => 'sqlite:' . $argv[2], 'user' => null, 'password' => null]);
    $job = json_decode(base64_decode($argv[3]), true, 512, JSON_THROW_ON_ERROR);
    try {
        $store->mutate($job['code'], $job['token'], $job['request'], $job['action'], $job['data']);
        echo json_encode(['ok' => true]);
    } catch (GameError $e) { echo json_encode(['ok' => false, 'status' => $e->status]); }
    exit;
}

$checks = 0;
function verify(bool $condition, string $message): void {
    global $checks; ++$checks;
    if (!$condition) throw new RuntimeException($message);
}
function parallel(string $path, array $jobs): array {
    $workers = [];
    foreach ($jobs as $job) {
        $process = proc_open([PHP_BINARY, __FILE__, '--worker', $path, base64_encode(json_encode($job))],
            [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes, null, null, ['bypass_shell' => true]);
        if (!is_resource($process)) throw new RuntimeException('No pudo iniciar worker.');
        fclose($pipes[0]); $workers[] = [$process, $pipes];
    }
    $results = [];
    foreach ($workers as [$process, $pipes]) {
        $text = stream_get_contents($pipes[1]); $error = stream_get_contents($pipes[2]);
        fclose($pipes[1]); fclose($pipes[2]); $exit = proc_close($process);
        if ($exit !== 0 || $error) throw new RuntimeException('Worker: ' . $error . $text);
        $results[] = json_decode($text, true, 512, JSON_THROW_ON_ERROR);
    }
    return $results;
}

$path = tempnam(sys_get_temp_dir(), 'sync-stock-');
try {
    $store = new Store(['dsn' => 'sqlite:' . $path, 'user' => null, 'password' => null]); $store->initialize();
    $aToken = str_repeat('a', 64); $bToken = str_repeat('b', 64);
    $view = $store->enter('create', ['name' => 'A', 'stockMarket' => true], $aToken, 'concurrent-create-01'); $code = $view['code'];
    $store->enter('join', ['name' => 'B', 'code' => $code], $bToken, 'concurrent-join-001');
    $store->mutate($code, $aToken, 'concurrent-start-01', 'start', ['round' => 0]);
    $a = $store->read($code)['players'][0]['id'];
    $job = fn($token, $request, $action, $data) => ['code' => $code] + compact('token', 'request', 'action', 'data');
    $passA = $job($aToken, 'concurrent-pass-a01', 'pass', ['round' => 1, 'stockOrders' => [$a => 10]]);
    $passB = $job($bToken, 'concurrent-pass-b01', 'pass', ['round' => 1, 'stockOrders' => [$a => 10]]);
    $results = parallel($path, [$passA, $passB]);
    verify($results[0]['ok'] && $results[1]['ok'], 'Pases simultáneos aceptados');
    $s = $store->read($code);
    verify($s['phase'] === 'settlement', 'Un único cierre de mercado');
    verify(count($s['stock']['round']['market']['trades']) === 2, 'Dos adjudicaciones únicas');
    verify($s['stock']['companies'][$a]['available'] === 380, 'Inventario consistente');
    $results = parallel($path, [$passA, $passA]);
    verify($results[0]['ok'] && $results[1]['ok'], 'Reintentos concurrentes de misma clave');
    verify($store->read($code) === $s, 'Reintentos no modifican estado');

    $active = $s['settlement']['order'][0]; $ownerToken = $active === $a ? $aToken : $bToken;
    $results = parallel($path, [
        $job($aToken, 'concurrent-settle-01', 'settle', ['round' => 1, 'player' => $active]),
        $job($ownerToken, 'concurrent-settle-02', 'settle', ['round' => 1, 'player' => $active])]);
    verify(count(array_filter($results, fn($r) => $r['ok'])) === 1, 'Liquidación concurrente aplica una vez');
    $s = $store->read($code);
    $store->mutate($code, $aToken, 'concurrent-settle-03', 'settle', ['round' => 1, 'player' => $s['settlement']['order'][1]]);
    $store->mutate($code, $aToken, 'concurrent-maint-01', 'maintenance', ['round' => 1]);
    $entry = ['round' => 1, 'mines' => 3, 'barracks' => 0, 'support' => 0, 'pv' => 3];
    $results = parallel($path, [
        $job($aToken, 'concurrent-maint-a01', 'maintain', $entry),
        $job($bToken, 'concurrent-maint-b01', 'maintain', $entry)]);
    verify($results[0]['ok'] && $results[1]['ok'], 'Mantenimientos simultáneos aceptados');
    $s = $store->read($code);
    verify(count($s['stock']['history']) === 1, 'Cierre bursátil archivado una sola vez');
    verify(count(array_filter($s['ledger'], fn($l) => $l['reason'] === 'Resultado bursátil')) === 2, 'Un resultado por empresa');
    $results = parallel($path, [
        $job($aToken, 'concurrent-next-001', 'next', ['round' => 1]),
        $job($aToken, 'concurrent-next-002', 'next', ['round' => 1])]);
    verify(count(array_filter($results, fn($r) => $r['ok'])) === 1, 'Avance concurrente aplica una vez');
    verify($store->read($code)['round'] === 2, 'No saltea rondas');
    echo "OK: $checks comprobaciones de concurrencia con procesos y SQLite reales.\n";
} finally {
    unset($store);
    if (is_file($path)) unlink($path);
}
