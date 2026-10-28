<?php
declare(strict_types=1);

// Environment variables override .env. Apache blocks this file and .env via .htaccess.
$envFile = __DIR__ . '/.env';
if (is_file($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (str_starts_with(trim($line), '#') || !str_contains($line, '=')) continue;
        [$key, $value] = explode('=', $line, 2);
        if (getenv(trim($key)) === false) putenv(trim($key) . '=' . trim(trim($value), "\"'"));
    }
}
return [
    'dsn' => getenv('DB_DSN') ?: 'mysql:host=127.0.0.1;port=3306;dbname=syncrodyson;charset=utf8mb4',
    'user' => getenv('DB_USER') ?: 'syncrodyson',
    'password' => getenv('DB_PASSWORD') ?: '',
];
