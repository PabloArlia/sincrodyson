<?php
declare(strict_types=1);
require_once __DIR__ . '/Game.php';

final class Store
{
    public PDO $db;
    private bool $sqlite;

    public function __construct(array $config)
    {
        $this->db = new PDO($config['dsn'], $config['user'], $config['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $this->sqlite = $this->db->getAttribute(PDO::ATTR_DRIVER_NAME) === 'sqlite';
        if ($this->sqlite) $this->db->exec('PRAGMA busy_timeout = 10000');
    }

    public function initialize(): void
    {
        if ($this->sqlite) {
            $this->db->exec('CREATE TABLE IF NOT EXISTS games (code TEXT PRIMARY KEY, state TEXT NOT NULL, version INTEGER NOT NULL);
                CREATE TABLE IF NOT EXISTS commands (game_code TEXT, actor_hash TEXT, request_id TEXT, payload_hash TEXT, PRIMARY KEY(game_code,actor_hash,request_id));
                CREATE TABLE IF NOT EXISTS entry_requests (request_id TEXT PRIMARY KEY, payload_hash TEXT, game_code TEXT);');
        } else $this->db->exec(file_get_contents(__DIR__ . '/../database/mysql.sql'));
    }

    private function begin(): void
    {
        if ($this->sqlite) $this->db->exec('BEGIN IMMEDIATE');
        else $this->db->beginTransaction();
    }

    private function end(bool $commit): void
    {
        if ($this->sqlite) $this->db->exec($commit ? 'COMMIT' : 'ROLLBACK');
        elseif ($commit) $this->db->commit();
        else $this->db->rollBack();
    }

    public function read(string $code, bool $lock = false): array
    {
        $q = $this->db->prepare('SELECT state FROM games WHERE code = ?' . ($lock && !$this->sqlite ? ' FOR UPDATE' : ''));
        $q->execute([$code]);
        $row = $q->fetchColumn();
        if ($row === false) throw new GameError('No encontramos esa partida.', 404);
        return json_decode($row, true, 512, JSON_THROW_ON_ERROR);
    }

    private function save(array $s): void
    {
        $q = $this->db->prepare('UPDATE games SET state = ?, version = ? WHERE code = ?');
        $q->execute([json_encode($s, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE), $s['version'], $s['code']]);
    }

    /** A caller-generated secret makes create/join safe to retry without storing raw credentials. */
    public function enter(string $action, array $data, string $token, string $request): array
    {
        $hash = hash('sha256', json_encode([$action, $data, hash('sha256', $token)], JSON_THROW_ON_ERROR));
        $this->begin();
        try {
            // Claim the request before changing a room. A duplicate races safely on its unique key.
            $q = $this->db->prepare('SELECT * FROM entry_requests WHERE request_id = ?' . (!$this->sqlite ? ' FOR UPDATE' : ''));
            $q->execute([$request]); $prior = $q->fetch(PDO::FETCH_ASSOC);
            if ($prior) {
                if (!hash_equals($prior['payload_hash'], $hash)) throw new GameError('Identificador de operación reutilizado.', 409);
                $s = $this->read($prior['game_code']);
            } else {
                $code = $action === 'create' ? self::code() : self::validCode($data['code'] ?? '');
                $q = $this->db->prepare('INSERT INTO entry_requests(request_id,payload_hash,game_code) VALUES(?,?,?)');
                $q->execute([$request, $hash, $code]);
                if ($action === 'create') {
                    $stockMarket = $data['stockMarket'] ?? false;
                    if (!is_bool($stockMarket)) throw new GameError('La opción de mercado bursátil debe ser verdadera o falsa.');
                    $s = Game::create($code, Game::name($data['name'] ?? ''), $token,
                        Game::integer($data['cash'] ?? 6000, 0, 100000000), $stockMarket);
                    $q = $this->db->prepare('INSERT INTO games(code,state,version) VALUES(?,?,?)');
                    $q->execute([$code, json_encode($s, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE), 1]);
                } else {
                    $s = $this->read($code, true);
                    Game::join($s, Game::name($data['name'] ?? ''), $token);
                    ++$s['version']; $this->save($s);
                }
            }
            $actor = Game::actor($s, $token);
            $this->end(true);
            return Game::view($s, $actor);
        } catch (Throwable $e) { $this->end(false); throw $e; }
    }

    public function mutate(string $code, string $token, string $request, string $action, array $data): array
    {
        $this->begin();
        try {
            $s = $this->read($code, true);
            $actor = Game::actor($s, $token);
            $hash = hash('sha256', json_encode([$action, $data], JSON_THROW_ON_ERROR));
            $actorHash = hash('sha256', $token);
            $q = $this->db->prepare('SELECT payload_hash FROM commands WHERE game_code=? AND actor_hash=? AND request_id=?');
            $q->execute([$code, $actorHash, $request]); $prior = $q->fetchColumn();
            if ($prior !== false) {
                if (!hash_equals($prior, $hash)) throw new GameError('Identificador de operación reutilizado.', 409);
            } else {
                if (($data['round'] ?? null) !== $s['round']) throw new GameError('La ronda cambió. Actualizá antes de continuar.', 409);
                if ($action === 'settle' && ($data['player'] ?? null) !== ($s['settlement']['order'][$s['settlement']['index']] ?? null)) {
                    throw new GameError('La liquidación ya avanzó a otro jugador.', 409);
                }
                Game::command($s, $actor, $action, $data);
                ++$s['version']; $this->save($s);
                $q = $this->db->prepare('INSERT INTO commands(game_code,actor_hash,request_id,payload_hash) VALUES(?,?,?,?)');
                $q->execute([$code, $actorHash, $request, $hash]);
            }
            $this->end(true);
            return Game::view($s, $actor);
        } catch (Throwable $e) { $this->end(false); throw $e; }
    }

    public static function validCode(mixed $value): string
    {
        if (!is_string($value) || !preg_match('/^[A-Z2-9]{8}$/', strtoupper($value))) throw new GameError('El código debe tener 8 letras o números.');
        return strtoupper($value);
    }

    private static function code(): string
    {
        $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; $out = '';
        for ($i = 0; $i < 8; ++$i) $out .= $alphabet[random_int(0, strlen($alphabet) - 1)];
        return $out;
    }
}
