<?php
declare(strict_types=1);
require_once __DIR__ . '/src/http.php';
?>
<!doctype html>
<html lang="es" data-bs-theme="dark" data-bs-theme-base="slate">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#182433">
  <title>Syncrodyson · Mercado</title>
  <link rel="stylesheet" href="assets/vendor/tabler.min.css">
  <link rel="stylesheet" href="assets/app.css?v=<?= filemtime(__DIR__ . '/assets/app.css') ?>">
  <script src="assets/vendor/qrcode.js" defer></script>
  <script src="assets/app.js?v=<?= filemtime(__DIR__ . '/assets/app.js') ?>" defer></script>
</head>
<body>
<div class="page">
  <header class="navbar navbar-expand-md d-print-none">
    <div class="container-xl">
      <div class="d-flex align-items-center gap-2"><a class="navbar-brand brand" href="./" aria-label="Syncrodyson, inicio"><span class="brand-orbit" aria-hidden="true">✳</span> SYNCRODYSON</a><div id="header-menu"></div></div>
      <div class="connection"><span class="status-dot bg-secondary" id="connection-dot"></span><span id="connection-text" role="status">Conectando…</span></div>
    </div>
  </header>
  <div class="page-wrapper">
    <main class="container-xl py-4" id="app"><div class="card"><div class="card-body">Cargando el mercado…</div></div></main>
    <footer class="footer footer-transparent d-print-none"><div class="container-xl text-secondary small">Syncrodyson · Mercado común, decisiones propias.</div></footer>
  </div>
</div>
<div id="notice" class="notice" role="status" aria-live="polite" hidden></div>
<dialog id="share-dialog" aria-labelledby="share-title"><div class="dialog-body"><div class="d-flex justify-content-between align-items-center mb-3"><h2 id="share-title" class="m-0">Invitar a la partida</h2><button class="btn btn-icon" data-action="close-dialog" aria-label="Cerrar">×</button></div><div id="share-content"></div></div></dialog>
<dialog id="recovery-dialog" aria-labelledby="recovery-title"><div class="dialog-body"><div class="d-flex justify-content-between align-items-center mb-3"><h2 id="recovery-title" class="m-0">Tu acceso personal</h2><button class="btn btn-icon" data-action="close-dialog" aria-label="Cerrar">×</button></div><p>Guardá esta clave para recuperar tu jugador en otro teléfono. Es privada: quien la tenga puede actuar por vos.</p><label class="form-label" for="recovery-key">Clave personal</label><textarea id="recovery-key" class="form-control font-monospace mb-3" readonly rows="4"></textarea><button class="btn btn-primary w-100" data-action="copy-recovery">Copiar clave</button></div></dialog>
<dialog id="rename-dialog" aria-labelledby="rename-title"><form id="rename-form" class="dialog-body"><div class="d-flex justify-content-between align-items-center mb-3"><h2 id="rename-title" class="m-0">Cambiar mi nombre</h2><button type="button" class="btn btn-icon" data-action="close-dialog" aria-label="Cerrar">×</button></div><label class="form-label" for="player-name">Tu nombre en la mesa</label><input id="player-name" name="name" type="text" class="form-control mb-3" maxlength="40" required autocomplete="nickname"><button type="submit" class="btn btn-primary w-100">Guardar nombre</button></form></dialog>
</body>
</html>
