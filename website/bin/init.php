<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') exit(1);
require_once __DIR__ . '/../src/Store.php';
$config = require __DIR__ . '/../config.php';
$store = new Store($config);
$store->initialize();
echo "Esquema instalado.\n";
