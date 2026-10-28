<?php
declare(strict_types=1);
require_once __DIR__ . '/src/http.php';
require_once __DIR__ . '/src/Store.php';
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

function output(array $data, int $status = 200): never {
    http_response_code($status);
    echo json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $method = $_SERVER['REQUEST_METHOD'];
    if (!in_array($method, ['GET', 'POST'], true)) output(['error' => 'Método no permitido.'], 405);
    // No cross-origin requests, cookies or PHP session locks. Bearer credentials stay off URLs.
    $token = preg_replace('/^Bearer\s+/i', '', $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '');
    if (!preg_match('/^[a-f0-9]{64}$/', $token)) throw new GameError('Falta la clave personal.', 401);
    $store = new Store(require __DIR__ . '/config.php');
    if ($method === 'GET') {
        $s = $store->read(Store::validCode($_GET['code'] ?? ''));
        $actor = Game::actor($s, $token);
        if (isset($_GET['version']) && (string) $s['version'] === $_GET['version']) output(['unchanged' => true, 'version' => $s['version']]);
        output(['game' => Game::view($s, $actor)]);
    }
    if (!str_starts_with($_SERVER['CONTENT_TYPE'] ?? '', 'application/json')) throw new GameError('Se requiere JSON.', 415);
    if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 32768) throw new GameError('Solicitud demasiado grande.', 413);
    $raw = file_get_contents('php://input', false, null, 0, 32769);
    if (strlen($raw) > 32768) throw new GameError('Solicitud demasiado grande.', 413);
    $body = json_decode($raw, true, 32, JSON_THROW_ON_ERROR);
    if (!is_array($body) || !is_string($body['action'] ?? null) || !is_array($body['data'] ?? null)) throw new GameError('Solicitud inválida.');
    $request = $_SERVER['HTTP_IDEMPOTENCY_KEY'] ?? '';
    if (!preg_match('/^[a-zA-Z0-9-]{16,80}$/', $request)) throw new GameError('Falta el identificador de operación.');
    $action = $body['action']; $data = $body['data'];
    // Retry transient serialization failures with the same idempotency key.
    for ($attempt = 0; ; ++$attempt) {
        try {
            $view = in_array($action, ['create', 'join'], true)
                ? $store->enter($action, $data, $token, $request)
                : $store->mutate(Store::validCode($body['code'] ?? ''), $token, $request, $action, $data);
            output(['game' => $view]);
        } catch (PDOException $e) {
            if ($attempt < 2 && in_array((string) $e->getCode(), ['40001', '23000'], true)) { usleep(30000); continue; }
            throw $e;
        }
    }
} catch (GameError $e) { output(['error' => $e->getMessage()], $e->status); }
catch (JsonException | TypeError $e) { output(['error' => 'Solicitud JSON inválida.'], 400); }
catch (Throwable $e) {
    error_log((string) $e);
    output(['error' => 'El servidor no pudo completar la operación. Reintentá; tu acción no se duplicará.'], 503);
}
