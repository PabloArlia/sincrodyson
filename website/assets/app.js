'use strict';
(() => {
  const $ = (s) => document.querySelector(s);
  const app = $('#app');
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = v => {
    const cents=Math.floor((Math.abs(Math.round(v*200))+100)/200);
    return (v<0?'−':'')+'$'+(cents/100).toLocaleString('es-AR',{minimumFractionDigits:2,maximumFractionDigits:2});
  };
  const signed = v => (v > 0 ? '+' : v < 0 ? '−' : '') + money(Math.abs(v));
  const random = (n = 32) => Array.from(crypto.getRandomValues(new Uint8Array(n)), b => b.toString(16).padStart(2,'0')).join('');
  const key = 'syncrodyson-session-v1';
  const pendingKey = 'syncrodyson-pending-v1';
  const draftKey = code => 'syncrodyson-draft-' + code;
  const readLocal = name => { try { return JSON.parse(localStorage.getItem(name) || 'null'); } catch { return null; } };
  const invitation = (new URL(location.href).searchParams.get('join') || '').trim().toUpperCase();
  const inviteCode = /^[A-Z2-9]{8}$/.test(invitation) ? invitation : '';
  let session = readLocal(key), game = null, tab = 'market', busy = false, polling = false, timer;
  let invitationPending = !!inviteCode && session?.code !== inviteCode;
  let restoring = !!session && !invitationPending;
  const replacedSession = invitationPending ? session : null;
  let fixedDraft = {};
  let stockDraft = {};
  let draft = {}, dirty = false, draftRound = null, noticeTimer, connection = false;
  function storage(name, value) {
    try {
      if(value === null) localStorage.removeItem(name);
      else { const serialized=JSON.stringify(value); if(localStorage.getItem(name)!==serialized) localStorage.setItem(name,serialized); }
    }
    catch { throw new Error('No se pudo guardar tu acceso en este navegador. Habilitá el almacenamiento antes de continuar.'); }
  }
  function notify(text, error = false) {
    clearTimeout(noticeTimer); const n = $('#notice'); n.textContent = text; n.classList.toggle('error', error); n.hidden = false;
    noticeTimer = setTimeout(() => { n.hidden = true; }, error ? 10000 : 4500);
  }
  function connected(ok) {
    connection = ok; $('#connection-text').textContent = ok ? 'En línea' : 'Sin sincronizar';
    $('#connection-dot').className = 'status-dot ' + (ok ? 'bg-green' : 'bg-yellow');
  }
  async function request(path, options = {}) {
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(path, {...options, signal:controller.signal, cache:'no-store', credentials:'omit'});
      let body; try { body = await response.json(); } catch { throw new Error('El servidor respondió de forma inesperada.'); }
      if (!response.ok) { const e = new Error(body.error || 'No se pudo completar la operación.'); e.status = response.status; throw e; }
      connected(true); return body;
    } catch(e) { if (!e.status || e.status >= 500) connected(false); throw e; }
    finally { clearTimeout(timeout); }
  }
  function accept(s) {
    if (game && game.code === s.code && game.version > s.version) return;
    const previous = game;
    game = s; session = {code:s.code, token:session.token, name:s.players.find(p=>p.id===s.me).name};
    // Polling in an older tab must never overwrite a QR login made in another tab.
    const savedSession=readLocal(key);
    if(savedSession?.code===session.code&&savedSession?.token===session.token) storage(key,session);
    if (s.code === inviteCode) invitationPending = false;
    const me = s.players.find(p => p.id === s.me);
    if (!previous || previous.code !== s.code || draftRound !== s.round || previous.phase !== s.phase || me.pass !== null) {
      const saved = readLocal(draftKey(s.code));
      draft = s.phase === 'planning' && saved?.round === s.round && saved?.player === s.me && me.pass === null
        ? saved.orders : {...me.orders};
      fixedDraft = s.phase === 'planning' && saved?.round === s.round && saved?.player === s.me && me.pass === null
        ? {...saved.fixedOrders} : {...me.fixedOrders};
      stockDraft = s.options?.stockMarket && s.phase === 'planning' && saved?.round === s.round && saved?.player === s.me && me.pass === null
        ? {...saved.stockOrders} : {...me.stockOrders};
      dirty = s.phase === 'planning' && (JSON.stringify(draft) !== JSON.stringify(me.orders) || JSON.stringify(fixedDraft) !== JSON.stringify(me.fixedOrders || {}) || JSON.stringify(stockDraft) !== JSON.stringify(me.stockOrders || {}));
      draftRound = s.round;
    } else if (!dirty) { draft = {...me.orders}; fixedDraft = {...me.fixedOrders}; stockDraft = {...me.stockOrders}; }
    if(s.stock && s.phase==='planning' && me.pass===null) {
      const normalized={}; let remaining=s.stock.round.buyAllowed[s.me]?10:0;
      for(const [id,value] of Object.entries(stockDraft)) {
        if(!s.stock.companies[id]||!Number.isInteger(value)) continue;
        const held=s.stock.holdings[id]?.[s.me]||0;
        const qty=Math.max(-held,Math.min(remaining,value));
        if(qty) normalized[id]=qty;
        remaining-=Math.max(0,qty);
      }
      if(JSON.stringify(normalized)!==JSON.stringify(stockDraft)) dirty=true;
      stockDraft=normalized;
    }
    render();
  }
  async function poll(force = false) {
    // Skipping a tick must not stop synchronization for the rest of the visit.
    if (invitationPending || !session || busy || polling || (document.hidden && !force)) { schedule(); return; }
    const queriedSession = {...session};
    polling = true;
    try {
      const data = await request(`api.php?code=${encodeURIComponent(queriedSession.code)}${!force && game ? '&version='+game.version : ''}&_=${Date.now()}`, {headers:{Authorization:'Bearer '+queriedSession.token}});
      if (!session || session.code !== queriedSession.code || session.token !== queriedSession.token) return;
      if (data.game) {
        // Defer passive redraws while typing. A phase transition is always shown immediately.
        if (!force && game && data.game.phase === game.phase && app.contains(document.activeElement) && /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
        accept(data.game);
      }
    } catch(e) { if (force || e.status === 401 || e.status === 404) notify(e.message, true); }
    finally {
      polling = false;
      if(restoring) { restoring=false; if(!game) render(); }
      schedule();
    }
  }
  function schedule() { clearTimeout(timer); timer = setTimeout(() => poll(), connection ? 2500 : 6000); }
  async function execute(pending) {
    const result = await request('api.php', {method:'POST', headers:{'Content-Type':'application/json', Authorization:'Bearer '+pending.token, 'Idempotency-Key':pending.id}, body:JSON.stringify(pending.body)});
    session = {code:result.game.code, token:pending.token, name:result.game.players.find(p=>p.id===result.game.me).name}; storage(key, session); storage(pendingKey, null);
    if (['pass','plan'].includes(pending.body.action)) { dirty = false; storage(draftKey(result.game.code), null); }
    accept(result.game); return result;
  }
  async function act(action, data = {}, entryToken = null) {
    if (busy) return;
    if (readLocal(pendingKey)) { notify('Hay una acción pendiente. Reintentala antes de continuar.', true); return; }
    const pending = {id:random(16), token:entryToken || session.token,
      body:{action, code:session?.code, data:{...data, ...(!['create','join'].includes(action) ? {round:game.round} : {})}}};
    busy = true;
    try { storage(pendingKey, pending); render(); await execute(pending); }
    catch(e) {
      if (e.status && e.status < 500) { storage(pendingKey, null); }
      notify(e.name === 'AbortError' ? 'La respuesta tardó demasiado. Reintentá la acción pendiente.' : e.message, true);
    } finally { busy = false; render(); schedule(); }
  }
  function pendingBanner() {
    const pending = readLocal(pendingKey);
    return pending ? `<div class="alert alert-warning pending-banner"><div><strong>Acción pendiente de confirmar</strong><div>Si se cortó la conexión, podés repetirla sin duplicar movimientos.</div><button class="btn btn-sm btn-warning mt-2" data-action="retry" ${busy?'disabled':''}>${busy?'Enviando…':'Reintentar'}</button></div></div>` : '';
  }
  function render() {
    const scroll = window.scrollY;
    const menuWasOpen = $('#game-menu')?.open;
    $('#header-menu').innerHTML = game ? navigationMenu() : '';
    document.body.classList.toggle('has-finance-bar', !!game);
    app.innerHTML = pendingBanner() + (game ? gameView() : restoring ? '<div class="card"><div class="card-body"><h2 class="card-title">Recuperando tu sala…</h2><p class="text-secondary mb-0">Estamos sincronizando la partida guardada.</p></div></div>' : welcome());
    if(game) updateFinanceBar();
    if(menuWasOpen && $('#game-menu')) $('#game-menu').open=true;
    window.scrollTo(0, scroll);
  }
  function welcome() {
    const invite = invitationPending ? inviteCode : '';
    if (invite) return `<div class="welcome"><div class="welcome-decoration"><div class="eyebrow mb-3">Invitación a la mesa</div><h1>Unite a la partida<br><span class="room-code">${esc(invite)}</span></h1><p class="lead mt-3">${busy?'Entrando a la sala…':'Ingresá tu nombre para sumarte a esta sala.'}</p></div><form class="card" id="join-form"><div class="card-body"><h2 class="card-title">Unirme a ${esc(invite)}</h2><label class="form-label" for="join-name">Tu nombre</label><input id="join-name" name="name" class="form-control mb-3" maxlength="40" required autocomplete="nickname" placeholder="Tu nombre en la mesa" value="${esc(replacedSession?.name||'')}"><input type="hidden" name="code" value="${esc(invite)}"><button class="btn btn-primary w-100" ${busy?'disabled':''}>Entrar a esta sala</button></div></form></div>`;
    return `<div class="welcome"><div class="welcome-decoration"><div class="eyebrow mb-3">La economía de una nueva estrella</div><h1>Tu próximo movimiento<br>empieza en el mercado.</h1><p class="lead mt-3">Planeá tus operaciones. Pasá para fijar tu turno. El mercado revela el precio cuando todos están listos.</p></div>
    ${session ? `<div class="alert alert-info"><div>Tu partida <strong class="room-code">${esc(session.code)}</strong> sigue guardada. <button class="btn btn-sm ms-2" data-action="refresh">Reconectar</button></div></div>` : ''}
    <div class="row g-4"><div class="col-md-6"><form class="card h-100" id="create-form"><div class="card-body"><div class="eyebrow mb-2">01 / Nueva mesa</div><h2 class="card-title mb-3">Crear una partida</h2><label class="form-label" for="create-name">Tu nombre</label><input id="create-name" name="name" class="form-control mb-3" placeholder="¿Cómo te llamás?" maxlength="40" required autocomplete="nickname"><label class="form-label" for="initial-cash">Dinero inicial por jugador</label><div class="input-group mb-3"><span class="input-group-text">$</span><input id="initial-cash" name="cash" type="number" min="0" max="1000000" step="0.01" value="40" class="form-control" required></div><label class="form-check mb-3"><input class="form-check-input" type="checkbox" name="stockMarket"><span class="form-check-label">Activar mercado burs&#225;til</span></label><button class="btn btn-primary w-100" ${busy?'disabled':''}>Crear partida</button></div></form></div>
    <div class="col-md-6"><form class="card h-100" id="join-form"><div class="card-body"><div class="eyebrow mb-2">02 / Ya hay una mesa</div><h2 class="card-title mb-3">Unirme con código</h2><label class="form-label" for="join-name">Tu nombre</label><input id="join-name" name="name" class="form-control mb-3" maxlength="40" required autocomplete="nickname" placeholder="Tu nombre en la mesa"><label class="form-label" for="join-code">Código de partida</label><input id="join-code" name="code" class="form-control room-code text-uppercase mb-3" maxlength="8" minlength="8" required value="${esc(invite)}" placeholder="ABCD2345" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="btn w-100" ${busy?'disabled':''}>Entrar a la sala</button></div></form></div></div>
    </div>`;
  }
  function me() { return game.players.find(p => p.id === game.me); }
  function person(id) { return game.players.find(p => p.id === id); }
  const isHost = () => game.host === game.me;
  function navigationMenu() {
    return `<details id="game-menu" class="game-menu"><summary class="btn menu-summary"><span aria-hidden="true">☰</span> Menú</summary><div class="game-menu-panel"><nav aria-label="Secciones de la partida"><button class="game-menu-item ${tab==='market'?'active':''}" data-tab="market" ${tab==='market'?'aria-current="page"':''}>Mercado</button><button class="game-menu-item ${tab==='account'?'active':''}" data-tab="account" ${tab==='account'?'aria-current="page"':''}>Caja y deudas</button><button class="game-menu-item ${tab==='activity'?'active':''}" data-tab="activity" ${tab==='activity'?'aria-current="page"':''}>Registro público</button></nav><div class="game-menu-code"><span class="eyebrow">Código de partida</span><strong class="room-code">${esc(game.code)}</strong></div><button class="game-menu-item" data-action="share">Invitar jugadores · QR y enlace</button><div class="game-menu-divider"></div><button class="game-menu-item" data-action="refresh">Actualizar ahora</button><button class="game-menu-item" data-action="leave">Cambiar de partida</button></div></details>`;
  }
  function gameView() {
    const p = me();
    const phases = {lobby:'Sala de espera',planning:'Planificación',settlement:'Mercado',execution:'Ejecución',maintenance:'Mantenimiento',finished:'Partida finalizada'};
    return `<div class="page-header m-0 mb-3"><div><div class="eyebrow">${game.round ? 'Ronda '+game.round : 'Preparación'} / ${esc(p.name)}${game.options?.stockMarket?' / Bolsa activada':''}</div>${game.phase!=='planning'?`<h1 class="page-title mt-1">${phases[game.phase]}</h1>`:''}</div></div>
    ${!connection?'<div class="alert alert-warning sync-warning">Reconectando. Las acciones pendientes se pueden reintentar sin duplicarlas.</div>':''}
    <div class="top-stats"><div class="card"><div class="card-body"><div class="eyebrow">Tu saldo</div><div class="stat-value ${p.cash<0?'money-negative':''}">${money(p.cash)}</div></div></div><div class="card"><div class="card-body"><div class="eyebrow">PV por deudas</div><div class="stat-value ${p.lostPv?'money-negative':''}">−${p.lostPv} <span class="small">PV</span></div></div></div><div class="card"><div class="card-body"><div class="eyebrow">${game.phase==='maintenance'?'Mantenimientos':game.phase==='lobby'?'En la sala':'Pases recibidos'}</div><div class="stat-value">${game.phase==='maintenance'?Object.keys(game.maintenance?.results||{}).length:game.phase==='lobby'?game.players.length:game.players.filter(p=>p.pass!==null).length} <span class="text-secondary small">/ ${game.phase==='lobby'?12:game.players.length}</span></div></div></div></div>
    <div class="phase-steps mb-4"><span class="phase-step ${game.phase==='planning'?'active':''}">1. Planificar</span><span class="phase-step ${game.phase==='settlement'?'active':''}">2. Mercado</span><span class="phase-step ${game.phase==='execution'?'active':''}">3. Ejecutar</span><span class="phase-step ${game.phase==='maintenance'?'active':''}">4. Mantenimiento</span></div>
    ${tab==='account'?account():tab==='activity'?activity():marketView()}${financeBar()}`;
  }
  function financeValues() {
    const p=me(), entries=game.ledger.filter(entry=>entry.player===game.me);
    let balance=game.round ? entries.filter(entry=>entry.round===game.round).reduce((total,entry)=>total+entry.amount,0) : 0;
    const pendingMarket=game.phase==='planning'||(game.phase==='settlement'&&!game.settlement.results[game.me]);
    if(pendingMarket) {
      const editable=fixedTradeAllowed(), orders=editable?draft:p.orders, fixedOrders=editable?fixedDraft:p.fixedOrders;
      for(const [id,qty] of Object.entries(orders||{})) {
        const history=game.history[id];
        const price=game.settlement?.prices[id]??history[history.length-1].price;
        balance-=qty*price;
      }
      for(const [id,qty] of Object.entries(fixedOrders||{})) balance+=fixedTradeInfo(id,qty).amount;
      if(game.stock && game.phase==='planning') {
        for(const [id,qty] of Object.entries(editable?stockDraft:p.stockOrders||{})) balance-=qty*game.stock.round.prices[id];
      }
    }
    const maintenance=[...entries].reverse().find(entry=>entry.maintenance)?.amount??0;
    return {funds:p.cash,balance,maintenance};
  }
  function financeBar() {
    return `<aside class="finance-bar" aria-label="Resumen de tus fondos"><div class="finance-bar-inner ${game.phase==='planning'?'has-action':''}">${[['funds','Fondos'],['balance','Balance (est)']].map(([id,label])=>`<div class="finance-stat"><span class="finance-label">${label}</span><strong data-finance="${id}"${id==='balance'?' title="Balance de la ronda; durante la planificaci\u00f3n se estima con los \u00faltimos precios."':''}></strong></div>`).join('')}${game.phase==='planning'?`<div class="finance-action">${passButton()}</div>`:''}</div></aside>`;
  }
  function updateFinanceBar() {
    const values={...financeValues(),dividends:0};
    for(const [id,value] of Object.entries(values)) {
      const element=$('[data-finance="'+id+'"]');
      if(!element) continue;
      element.textContent=id==='dividends'?'0':id==='funds'?money(value):signed(value);
      element.classList.toggle('money-positive',id!=='funds'&&value>0);
      element.classList.toggle('money-negative',value<0);
    }
  }
  function playersPanel() {
    const sorted = [...game.players].sort((a,b)=>(a.pass??Infinity)-(b.pass??Infinity));
    return `<div class="card players-panel"><div class="card-header"><h3 class="card-title">La mesa</h3></div><div class="card-body py-1">${sorted.map((p,i)=>{
      const ready=game.phase==='maintenance'?!!game.maintenance?.results[p.id]:p.pass!==null;
      const status=game.phase==='maintenance'?(ready?'Listo':'Pendiente'):p.pass!==null?'Pasó':game.phase==='lobby'?'En sala':'Planea';
      return `<div class="player-line"><span class="avatar bg-blue-lt">${p.pass!==null?i+1:esc(p.name.slice(0,1).toUpperCase())}</span><div class="flex-fill"><div class="fw-medium">${esc(p.name)} ${p.id===game.me?'<span class="text-secondary small">(vos)</span>':''}</div><div class="small ${p.cash<0?'money-negative':'text-secondary'}">${money(p.cash)} · −${p.lostPv} PV</div></div><span class="badge ${ready?'bg-green-lt':'bg-secondary-lt'}">${status}</span></div>`;
    }).join('')}</div></div>`;
  }
  function marketView() {
    if(game.phase==='maintenance') return `<div class="market-layout"><div>${maintenance()}${stockPanel()}${resourceGroups()}</div><aside class="market-sidebar"><div class="sticky-panel">${playersPanel()}</div></aside></div>`;
    if (game.phase==='lobby') return `<div class="row g-4"><div class="col-md-7"><div class="card"><div class="card-body p-4"><div class="eyebrow mb-2">Todo empieza con una mesa</div><h2>Jugá solo o invitá a otros jugadores</h2><p class="text-secondary">Podés iniciar con un solo jugador. Para jugar acompañado, compartí el código o el QR desde Menú antes de comenzar.</p>${isHost()?`<button class="btn btn-primary" data-command="start" ${busy?'disabled':''}>Iniciar partida</button>`:'<span class="text-secondary">Esperando al anfitrión…</span>'}</div></div><div class="card mt-3"><div class="card-body"><h3>Dos cierres antes de empezar</h3><p class="text-secondary mb-0">El mercado ya tiene dos rondas simuladas. Los precios conservarán su historia durante la partida. El último cierre orienta tus decisiones; el precio de tus órdenes se conoce al pasar todos.</p></div></div></div><div class="col-md-5">${playersPanel()}</div></div>`;
    return `<div class="market-layout"><div>${game.phase==='settlement'?settlement():game.phase==='execution'||game.phase==='finished'?execution():''}${stockPanel()}${game.phase!=='planning'?'<div class="mb-3"><h2 class="mb-1">Precios de cierre</h2><p class="text-secondary mb-0 small">Un mismo precio para todos. El agente externo cubre las diferencias.</p></div>':''}${resourceGroups()}</div><aside class="market-sidebar"><div class="sticky-panel">${planningPanel()}${playersPanel()}</div></aside></div>`;
  }
  function stockPanel() {
    if(!game.stock) return '';
    const stock=game.stock, r=stock.round, own=stock.companies[game.me];
    const ownShares=stock.holdings[game.me]?.[game.me]||0;
    const due=own.expectation?own.price*(400-ownShares)/200:0;
    return `<section class="stock-panel mb-3" aria-label="Resumen burs&#225;til"><div class="stock-summary"><span>${r.maintenance?'Pr&#243;xima ronda &#183; ':''}PV exigidos <strong>${own.requiredPv}</strong></span><span>Dividendos a pagar (est) <strong>${money(due)}</strong></span></div>
      ${fixedTradeAllowed()&&!r.buyAllowed[game.me]?'<p class="small text-secondary mt-2">Comenzaste con saldo negativo: solo pod&#233;s vender acciones esta ronda.</p>':''}
      ${r.market?stockRoundResult(r):''}
      ${stock.history.some(entry=>entry.round!==r.round)?`<details class="mt-2"><summary>Historial burs&#225;til</summary>${stock.history.filter(entry=>entry.round!==r.round).slice().reverse().map(entry=>stockRoundResult(entry)).join('')}</details>`:''}</section>`;
  }
  function stockOrderMaximum(id) {
    if(!game.stock.round.buyAllowed[game.me]) return 0;
    const otherBuys=Object.entries(stockDraft).reduce((total,[company,qty])=>total+(company!==id?Math.max(0,qty):0),0);
    return Math.max(0,10-otherBuys);
  }
  function stockRows() {
    if(!game.stock) return '';
    const editable=fixedTradeAllowed(), orders=editable?stockDraft:me().stockOrders||{};
    const disabled=busy||!!readLocal(pendingKey);
    return Object.entries(game.stock.companies).map(([id,c])=>{
      const held=game.stock.holdings[id]?.[game.me]||0, qty=orders[id]||0, max=editable?stockOrderMaximum(id):0;
      const history=c.priceHistory.slice(-3);
      while(history.length<3) history.unshift(history[0]);
      const delta=history[2].price-history[1].price, name=person(id).name;
      const chart={min:50,max:Math.max(300,...history.map(point=>point.price)),nominal:300,color:'#68a8ff'};
      return `<tr class="stock-trade-row" style="--resource-color:#68a8ff"><th scope="row"><span class="market-symbol">AC</span><span class="market-resource-name">${esc(name)}</span></th><td><span class="market-price-line"><strong class="market-close">${money(c.price)}</strong></span><span class="market-change ${delta>0?'money-positive':delta<0?'money-negative':'text-secondary'}">${delta>0?'&#8599;':delta<0?'&#8600;':'&#8594;'} ${money(Math.abs(delta))}</span></td><td class="market-history">${spark(chart,history)}</td><td><div class="signed-order" data-stock-order="${id}" data-side="${qty>0?'buy':qty<0?'sell':'none'}">${editable?`<div class="quantity-stepper"><button type="button" class="btn step-button" data-stock-step="-1" data-stock-id="${id}" aria-label="Restar una acci&#243;n de ${esc(name)}" ${disabled||qty<=-held?'disabled':''}>&#8722;</button><label class="visually-hidden" for="stock-qty-${id}">Acciones de ${esc(name)}: positivo compra, negativo vende</label><input id="stock-qty-${id}" class="form-control signed-quantity" type="number" inputmode="numeric" step="1" min="${-held}" max="${max}" value="${esc(qty)}" data-stock-qty="${id}" required ${disabled?'disabled':''}><button type="button" class="btn step-button" data-stock-step="1" data-stock-id="${id}" aria-label="Sumar una acci&#243;n de ${esc(name)}" ${disabled||qty>=max?'disabled':''}>+</button></div>`:`<strong class="settled-quantity">${qty>0?'+':''}${qty}</strong>`}<span class="order-direction" data-stock-direction>${qty>0?'Compra':qty<0?'Venta':'&#8212;'}</span></div></td></tr>`;
    }).join('');
  }
  function refreshStockLimits() {
    for(const input of app.querySelectorAll('[data-stock-qty]')) {
      const id=input.dataset.stockQty, max=stockOrderMaximum(id), qty=Number(input.value);
      input.max=String(max);
      const control=input.closest('[data-stock-order]');
      control.dataset.side=qty>0?'buy':qty<0?'sell':'none';
      control.querySelector('[data-stock-direction]').textContent=qty>0?'Compra':qty<0?'Venta':String.fromCharCode(8212);
      control.querySelector('[data-stock-step="1"]').disabled=busy||!!readLocal(pendingKey)||qty>=max;
      control.querySelector('[data-stock-step="-1"]').disabled=busy||!!readLocal(pendingKey)||qty<=Number(input.min);
    }
  }
  function stockRoundResult(r) {
    const names={exempt:'Sin expectativa',missed:'Incumple PV',unpaid:'Impaga dividendos',met:'Cumple',exceeded:'Supera'};
    return `<div class="stock-round-result"><h3 class="card-title mt-3">Operaciones bursátiles · ronda ${r.round}</h3><div class="stock-scroll"><table class="table table-sm"><thead><tr><th>Jugador</th><th>Empresa</th><th>Solicitadas</th><th>Ejecutadas</th><th>Precio</th><th>Movimiento</th></tr></thead><tbody>${r.market.trades.length?r.market.trades.map(t=>`<tr><td>${esc(person(t.player).name)}</td><td>${esc(person(t.company).name)}</td><td>${t.requested>0?'+':''}${t.requested}</td><td>${t.qty>0?'+':''}${t.qty}</td><td>${money(t.price)}</td><td class="${t.amount<0?'money-negative':'money-positive'}">${signed(t.amount)}</td></tr>`).join(''):'<tr><td colspan="6">Sin operaciones bursátiles.</td></tr>'}</tbody></table></div>
      ${r.maintenance?`<h3 class="card-title">Resultados de mantenimiento · ronda ${r.round}</h3><div class="stock-scroll"><table class="table table-sm"><thead><tr><th>Empresa</th><th>PV exigidos / obtenidos</th><th>Resultado</th><th>Dividendos exigidos / pagados / recibidos</th><th>Ajuste / PV finales</th><th>Cotización nueva</th><th>Próxima ronda</th></tr></thead><tbody>${Object.entries(r.maintenance.results).map(([id,result])=>`<tr><th scope="row">${esc(person(id).name)}</th><td>${result.requiredPv} / ${result.gainedPv}</td><td>${names[result.status]}</td><td>${money(result.dueUnits/200)} / ${money(result.paidUnits/200)} / ${money(result.receivedUnits/200)}</td><td>${result.pvDelta>0?'+':''}${result.pvDelta} / ${result.finalPv} PV</td><td>${money(result.newPrice)}</td><td>Expectativa ${result.nextExpectation}<br>Demanda ${result.nextDemand}<br>Objetivo +${result.nextRequiredPv} PV</td></tr>`).join('')}</tbody></table></div><p class="small text-secondary">Los pagos y cobros ya están aplicados a la caja. Aplicá el ajuste bursátil de PV al puntaje de tu tablero.</p>`:game.phase==='maintenance'?'<p class="text-secondary small">El resultado bursátil se calcula cuando todos confirman su mantenimiento y sus PV.</p>':''}</div>`;
  }
  function updateStockOrder(input) {
    if(!fixedTradeAllowed()||busy||readLocal(pendingKey)) return;
    const id=input.dataset.stockQty, value=Number(input.value);
    if(input.value.trim()===''||!Number.isInteger(value)) return;
    const qty=Math.max(Number(input.min),Math.min(stockOrderMaximum(id),value));
    input.value=String(qty);
    if(qty) stockDraft[id]=qty; else delete stockDraft[id];
    refreshStockLimits();
    try { persistDraft(); } catch(err) { notify(err.message,true); }
    updateFinanceBar();
  }
  function fixedTradeAllowed() {
    return game.phase==='planning' && me().pass===null;
  }
  function fixedTradeInfo(id, qty) {
    const engineer=id!=='project';
    const operation=engineer?(qty<0?'engineer-fire':'engineer-hire'):(qty<0?'project-sell':'project-buy');
    const amount=(game.settlement?.fixedRules || game.tradeRules)[operation].unitAmount*Math.abs(qty);
    const direction=qty===0?'—':engineer?(qty<0?'Despedir':'Contratar'):(qty<0?'Venta':'Compra');
    const total=qty===0?'Precio fijo':amount===0?'Sin devolución de dinero':`${amount<0?'Pagás':'Cobrás'} ${money(Math.abs(amount))}`;
    return {operation,amount,direction,total};
  }
  function resourceIcon(id) {
    const icons={IM:'IM-ingeniero-electromecanico.svg',IQ:'IQ-ingeniero-quimico.svg',IE:'IE-ingeniero-estructural.svg',IS:'IS-ingeniero-sistemas.svg',project:'CP-carta-proyecto.svg',En:'En-energia.svg',Tr:'Tr-transporte.svg',H2SO4:'RQ-reactivos.svg',HCl:'RQ-reactivos.svg'};
    const colors={Fe:'#d84242',Cu:'#3977dc',Si:'#f0d54d',Ti:'#58a85c',Al:'#292929',C:'#fff',Nd:'#e345ad',Gd:'#42c5c1',Er:'#ec933c',Ce:'#94623d'};
    const symbol=id==='project'?'CP':id==='H2SO4'?'H'+String.fromCharCode(8322)+'SO'+String.fromCharCode(8324):id;
    const icon=icons[id]?`<img class="market-resource-icon" src="assets/icons/${icons[id]}" alt="">`:`<span class="market-resource-token" style="--token-color:${colors[id]||'#fff'};--token-ink:${['Al','Ce','Nd','Cu','Ti','Er'].includes(id)?'#fff':'#111'}" aria-hidden="true">${esc(symbol)}</span>`;
    return icon;
  }
  function fixedTradeRows() {
    if(!game.tradeRules) return '';
    const disabled=!fixedTradeAllowed() || busy || !!readLocal(pendingKey);
    return [['project','Cartas de proyecto'],...Object.entries(game.engineerTypes).map(([id,name])=>[id,'Ingeniero '+name.toLocaleLowerCase('es')])].map(([id,name])=>{
      const engineer=id!=='project', qty=(fixedTradeAllowed()?fixedDraft:me().fixedOrders)?.[id]||0, info=fixedTradeInfo(id,qty);
      const buy=-game.tradeRules[engineer?'engineer-hire':'project-buy'].unitAmount;
      const sell=game.tradeRules[engineer?'engineer-fire':'project-sell'].unitAmount;
      return `<tr class="fixed-trade-row" style="--resource-color:${engineer?({IM:'#e74c3c',IQ:'#2ecc71',IE:'#f1c40f'}[id]||'#8eafff'):'#de7ebe'}"><th scope="row"><span class="market-symbol">${engineer?esc(id):'CP'}</span><span class="market-resource-name">${esc(name)}</span></th><td><span class="market-price-line"><strong class="market-close">${money(buy)}</strong></span><span class="market-change text-secondary">${engineer?'Despedir':'Vender'} ${money(sell)}</span></td><td class="market-history"><span class="text-secondary small">Precio fijo</span></td><td><div class="signed-order fixed-trade-order" data-fixed-id="${id}" data-side="${qty>0?'buy':qty<0?'sell':'none'}">${fixedTradeAllowed()?`<div class="quantity-stepper"><button type="button" class="btn step-button" data-fixed-step="-1" data-fixed-id="${id}" aria-label="Restar una unidad de ${esc(name)}" ${disabled?'disabled':''}>−</button><label class="visually-hidden" for="fixed-qty-${id}">Cantidad de ${esc(name)}: positivo ${engineer?'contrata':'compra'}, negativo ${engineer?'despide':'vende'}</label><input id="fixed-qty-${id}" data-fixed-qty="${id}" class="form-control signed-quantity" type="number" inputmode="decimal" min="-1000000" max="1000000" step="1" value="${qty}" required ${disabled?'disabled':''}><button type="button" class="btn step-button" data-fixed-step="1" data-fixed-id="${id}" aria-label="Sumar una unidad de ${esc(name)}" ${disabled?'disabled':''}>+</button></div>`:`<strong class="settled-quantity">${qty>0?'+':''}${qty}</strong>`}<span class="order-direction" data-fixed-direction>${info.direction}</span></div></td></tr>`;
    }).join('');
  }
  function updateTradeTotal(control) {
    const id=control.dataset.fixedId, input=control.querySelector('[data-fixed-qty]'), qty=Number(input.value);
    const valid=input.value.trim()!=='' && Number.isInteger(qty) && Math.abs(qty)<=1000000;
    if(valid) { if(qty) fixedDraft[id]=qty; else delete fixedDraft[id]; }
    const info=fixedTradeInfo(id,valid?qty:0);
    control.dataset.side=valid?(qty>0?'buy':qty<0?'sell':'none'):'none';
    control.querySelector('[data-fixed-direction]').textContent=valid?info.direction:'Cantidad inválida';
    try { persistDraft(); } catch(err) { notify(err.message,true); }
    updateFinanceBar();
  }
  function planningPanel() {
    if (game.phase!=='planning') return `<div class="card mb-3"><div class="card-body"><div class="eyebrow mb-2">Agente externo</div><p class="text-secondary small mb-0">Compra el excedente y vende lo que falta. Sin inventario ni límite de unidades. Los precios se acercan al nominal cuando baja la presión.</p></div></div>`;
    return '';
  }
  function passButton() {
    const passed = me().pass!==null, disabled = busy || !!readLocal(pendingKey);
    return `<button class="btn ${passed?'':'btn-primary'} w-100" ${passed?'data-command="unpass"':'data-action="pass"'} ${disabled?'disabled':''}>${passed?'Retirar mi pase':'Guardar y pasar'}</button>`;
  }
  function spark(r, history) {
    const h = history.slice(-3), low = r.min, high = Math.max(low+100,r.max);
    const y = price => 43 - (price-low)/(high-low)*36;
    const points = h.map((v,i)=>`${8+i*92},${y(v.price).toFixed(2)}`).join(' ');
    const nominalY = y(r.nominal);
    const desc = h.map(v=>`${v.simulated?'Simulación':'Ronda '+v.round}: ${money(v.price)}`).join('; ');
    return `<svg class="sparkline" viewBox="0 0 200 50" role="img" aria-label="${esc(desc)}"><line x1="0" x2="200" y1="${nominalY}" y2="${nominalY}" stroke="#71839b" stroke-dasharray="3 4" opacity=".5"/><polyline points="${points}" fill="none" stroke="${r.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${h.map((v,i)=>`<circle cx="${8+i*92}" cy="${y(v.price)}" r="3" fill="${r.color}"/>`).join('')}</svg><div class="chart-labels">${h.map(v=>`<span>${money(v.price)}</span>`).join('')}</div>`;
  }
  function resourceGroups() {
    return `<div class="card market-table-card"><table class="table table-vcenter market-table mb-0"><colgroup><col class="market-resource-col"><col class="market-price-col"><col class="market-chart-col"><col class="market-order-col"></colgroup><thead><tr><th scope="col">Recurso</th><th scope="col">Precio</th><th scope="col">Historial</th><th scope="col" class="text-center">Cantidad</th></tr></thead><tbody>${Object.values(game.catalog).map(resourceRow).join('')}${fixedTradeRows()}${stockRows()}</tbody></table></div><p class="text-secondary small mt-2">Proyectos e ingenieros: positivo compra o contrata; negativo vende o despide. Se guardan con Guardar y pasar y se liquidan junto con los recursos. Los componentes se manejan en la mesa.</p>`;
  }
  function resourceRow(r) {
    const h=game.history[r.id], last=h[h.length-1].price, delta=last-h[h.length-2].price;
    const editable=game.phase==='planning'&&me().pass===null;
    const disabled=busy||!!readLocal(pendingKey);
    const q=editable?(draft[r.id]||0):(me().orders[r.id]||0);
    return `<tr style="--resource-color:${r.color}"><th scope="row"><span class="market-symbol">${esc(r.id)}</span><span class="market-resource-name">${esc(r.name)}</span></th><td><span class="market-price-line"><strong class="market-close">${money(last)}</strong> <span class="market-nominal">(r ${money(r.nominal)})</span></span><span class="market-change ${delta>0?'money-positive':delta<0?'money-negative':'text-secondary'}">${delta>0?'↗':delta<0?'↘':'→'} ${money(Math.abs(delta))}</span></td><td class="market-history">${spark(r,h)}</td><td><div class="signed-order" data-order="${r.id}" data-side="${q>0?'buy':q<0?'sell':'none'}">${editable?`<div class="quantity-stepper"><button type="button" class="btn step-button" data-step="-1" data-resource="${r.id}" aria-label="Restar una unidad de ${esc(r.name)}" ${disabled?'disabled':''}>−</button><label class="visually-hidden" for="qty-${r.id}">Cantidad de ${esc(r.name)}: negativo vende, positivo compra</label><input id="qty-${r.id}" data-qty="${r.id}" class="form-control signed-quantity" type="number" inputmode="decimal" min="-1000000" max="1000000" step="1" value="${q}" ${disabled?'disabled':''}><button type="button" class="btn step-button" data-step="1" data-resource="${r.id}" aria-label="Sumar una unidad de ${esc(r.name)}" ${disabled?'disabled':''}>+</button></div>`:`<strong class="settled-quantity">${q>0?'+':''}${q}</strong>`}<span id="side-${r.id}" class="order-direction">${q>0?'Compra':q<0?'Venta':'—'}</span></div></td></tr>`;
  }
  function fixedOrderSummary(orders) {
    return Object.entries(orders || {}).map(([id,qty])=>{
      const info=fixedTradeInfo(id,qty), name=id==='project'?'cartas de proyecto':'ingenieros \u00b7 '+game.engineerTypes[id];
      return `<div class="small text-secondary">${info.direction}: ${Math.abs(qty)} ${esc(name)} \u00b7 ${info.total}</div>`;
    }).join('');
  }
  function fixedSettlementRows(orders) {
    return Object.entries(orders||{}).map(([id,qty])=>{
      const info=fixedTradeInfo(id,qty), engineer=id!=='project';
      const name=engineer?'Ingeniero '+game.engineerTypes[id]:'Cartas de proyecto';
      const rules=game.settlement.fixedRules||game.tradeRules;
      const unitAmount=rules[info.operation].unitAmount;
      return `<div class="trade-row"><div class="settlement-resource">${resourceIcon(id)}<div><strong>${esc(info.direction)} ${Math.abs(qty)} ${esc(name)}</strong><div class="text-secondary small">${money(Math.abs(unitAmount))} por unidad &middot; ${info.amount<0?'paga':info.amount>0?'cobra':'sin movimiento de dinero'}${info.amount?' '+money(Math.abs(info.amount)):''}</div></div></div></div>`;
    }).join('');
  }
  function settlement() {
    const s=game.settlement, id=s.order[s.index], p=person(id), can=id===game.me||isHost();
    const total=Object.entries(p.orders).reduce((a,[rid,q])=>a-q*s.prices[rid],0)+Object.entries(p.fixedOrders||{}).reduce((a,[id,q])=>a+fixedTradeInfo(id,q).amount,0);
    return `<form id="settle-form" class="card liquidation mb-4"><div class="card-header"><div><h2 class="card-title">Liquidaci&#243;n ${esc(p.name)}</h2></div></div><div class="card-body"><p class="text-secondary small">Entregá las ventas al banco y tomá las compras. Las unidades que no puedas entregar quedan como deuda; el cobro de la venta se mantiene.</p>${Object.entries(p.orders).length?Object.entries(p.orders).map(([rid,q])=>`<div class="trade-row"><div class="settlement-resource">${resourceIcon(rid)}<div><strong>${q>0?'Recibe':'Entrega'} ${Math.abs(q)} ${esc(game.catalog[rid].name)}</strong><div class="text-secondary small">${money(s.prices[rid])} por unidad · ${q>0?'paga':'cobra'} ${money(Math.abs(q)*s.prices[rid])}</div></div></div>${q<0&&can?`<div class="debt-input"><label class="form-label small" for="missing-${rid}">No entrega</label><input id="missing-${rid}" name="missing-${rid}" type="number" min="0" max="${-q}" step="1" value="0" class="form-control" inputmode="numeric"></div>`:''}</div>`).join(''):Object.keys(p.fixedOrders||{}).length?'':'<p>Sin compras ni ventas en esta ronda.</p>'}${fixedSettlementRows(p.fixedOrders)}<div class="d-flex justify-content-between align-items-center mt-3"><div><div class="text-secondary small">Movimiento de caja</div><strong class="fs-2 ${total<0?'money-negative':'money-positive'}">${total>=0?'Cobra':'Paga'} ${money(Math.abs(total))}</strong></div><div class="text-end"><div class="text-secondary small">Saldo después</div><strong class="fs-2">${money(p.cash+total)}</strong></div></div>${can?`<button class="btn btn-primary w-100 mt-4" ${busy?'disabled':''}>Confirmar entregas y liquidación${id!==game.me?' como anfitrión':''}</button>`:`<div class="alert alert-info mt-3 mb-0">Esperando la confirmación de ${esc(p.name)} o del anfitrión.</div>`}</div></form>`;
  }
  function execution() {
    return `<div class="card mb-4"><div class="card-body"><div class="eyebrow mb-2">${game.phase==='finished'?'Registro final':'Mercado liquidado'}</div><h2>${game.phase==='finished'?'La partida terminó':'Ahora se ejecutan los proyectos'}</h2><p class="text-secondary">${game.phase==='execution'?'Registrá acá los cobros y pagos a la reserva o las transferencias a otros jugadores.':'Consultá los saldos y movimientos en Caja y deudas y en el Registro público.'}</p><div class="d-flex flex-wrap gap-2">${game.settlement.order.map((id,i)=>`<span class="badge bg-blue-lt">${i+1}. ${esc(person(id).name)}</span>`).join('')}</div>${isHost()&&game.phase==='execution'?`<button class="btn btn-primary mt-3" data-command="maintenance" ${busy?'disabled':''}>Ir a Mantenimiento</button>`:''}</div></div>${game.phase==='execution'?cashForm():''}`;
  }
  function maintenanceChoice() {
    const saved=readLocal('syncrodyson-maintenance-'+game.code);
    const choice=saved?.round===game.round&&saved.player===game.me?saved.choice:me().maintenanceChoice||(saved?.player===game.me?saved.choice:{mines:2,barracks:0,support:0});
    return {...choice,mines:Math.max(0,Math.min(game.maintenanceRules.mines.length-1,choice.mines)),support:Math.max(0,Math.min(14,choice.support))};
  }
  function maintenanceAmount(choice) {
    const rules=game.maintenanceRules;
    return rules.mines[choice.mines]-rules.barracks[choice.barracks]+choice.support*rules.supportPerEngineer;
  }
  function maintenanceTrack(kind,title,icon,values,selected,disabled) {
    return `<fieldset class="maintenance-track ${kind==='support'?'engineer-track':''}"><legend class="maintenance-track-title"><img src="assets/icons/${icon}" alt="">${title}</legend><input id="maintenance-${kind}" name="${kind}" type="hidden" value="${selected}"><div class="maintenance-circles">${values.map((value,index)=>{
      const position=kind==='support'?value:index;
      const label=kind==='support'?String(value):(value<0?'−':kind==='mines'&&value>0?'+':'')+'$'+Math.abs(value)/100;
      return `<button type="button" class="maintenance-circle ${position<=selected?'uncovered':'covered'} ${position===selected?'selected':''}" data-maintenance-track="${kind}" data-value="${position}" aria-pressed="${position===selected}" aria-label="${esc(title)}: ${esc(kind==='support'?value+' ingenieros':label)}" title="${esc(kind==='support'?value+' ingenieros':label)}" ${disabled?'disabled':''}>${kind==='support'&&value>0?'<img class="track-engineer" src="assets/icons/II-ingeniero.svg" alt="">':''}<span class="track-value">${esc(label)}</span><img class="track-cover" src="assets/icons/${icon}" alt=""></button>`;
    }).join('')}</div></fieldset>`;
  }
  function maintenance() {
    const rules=game.maintenanceRules,choice=maintenanceChoice();
    const result=game.maintenance.results[game.me],complete=Object.keys(game.maintenance.results).length===game.players.length&&(!game.stock||!!game.stock.round.maintenance);
    const disabled=busy||!!readLocal(pendingKey);
    const supportValues=Array.from({length:15},(_,i)=>i);
    return `${result?`<div class="card mb-3"><div class="card-body"><h2 class="card-title">Mantenimiento registrado</h2><strong class="fs-2 ${result.amount<0?'money-negative':'money-positive'}">${signed(result.amount)}</strong></div></div>`:`<form id="maintenance-form" class="card mb-3"><div class="card-body">${game.stock?`<label class="form-label" for="maintenance-pv">Puntaje actual del tablero (PV)</label><input id="maintenance-pv" name="pv" type="number" min="-1000000" max="1000000" step="1" inputmode="numeric" class="form-control mb-2" value="${esc(choice.pv??'')}" required ${disabled?'disabled':''}><p class="small text-secondary mb-3">Incluí las penalizaciones por deudas y los ajustes bursátiles anteriores. No incluyas el premio o penalización bursátil de esta ronda. Puntaje al comenzar: ${game.stock.round.basePv[game.me]} PV.</p>`:''}${game.stock?maintenanceTrack('support','Soporte externo','SP-soporte-externo.svg',supportValues,choice.support,disabled):''}${maintenanceTrack('mines','Yacimientos','YA-yacimientos.svg',rules.mines,choice.mines,disabled)}${maintenanceTrack('barracks','Barracas · contratos','CN-ficha-contratacion.svg',rules.barracks,choice.barracks,disabled)}${!game.stock?maintenanceTrack('support','Soporte externo · ingenieros','SP-soporte-externo.svg',supportValues,choice.support,disabled):''}<button type="button" class="btn btn-sm mb-3" data-action="more-support" ${disabled?'disabled':''}>Más ingenieros</button><div class="d-flex justify-content-between align-items-center mb-3"><span>Total</span><strong id="maintenance-total" class="fs-2">${signed(maintenanceAmount(choice))}</strong></div><button class="btn btn-primary w-100" ${disabled?'disabled':''}>Confirmar mantenimiento</button></div></form>`}${isHost()?`<div class="d-flex flex-wrap gap-2"><button class="btn btn-primary" data-command="next" ${!complete||disabled?'disabled':''}>Abrir ronda ${game.round+1}</button><button class="btn" data-action="finish" ${!complete||disabled?'disabled':''}>Finalizar partida</button></div>`:''}`;
  }
  function updateMaintenanceChoice() {
    const form=$('#maintenance-form');
    if(!form) return;
    const data=new FormData(form),choice={mines:Number(data.get('mines')),barracks:Number(data.get('barracks')),support:Number(data.get('support'))};
    if(!Number.isInteger(choice.support)||choice.support<0||choice.support>14) return;
    if(game.stock) choice.pv=data.get('pv');
    storage('syncrodyson-maintenance-'+game.code,{round:game.round,player:game.me,choice});
    for(const button of form.querySelectorAll('[data-maintenance-track]')) {
      const value=Number(button.dataset.value),selected=choice[button.dataset.maintenanceTrack];
      button.classList.toggle('uncovered',value<=selected);
      button.classList.toggle('covered',value>selected);
      button.classList.toggle('selected',value===selected);
      button.setAttribute('aria-pressed',String(value===selected));
    }
    $('#maintenance-total').textContent=signed(maintenanceAmount(choice));
  }
  function cashForm() {
    const p=me(), allowed=['lobby','planning','execution','maintenance'].includes(game.phase)&&!(game.stock&&game.phase==='maintenance');
    const others=game.players.filter(x=>x.id!==p.id);
    return `<form id="cash-form" class="card mb-4"><div class="card-header"><h2 class="card-title">Registrar dinero del tablero</h2></div><div class="card-body"><p class="text-secondary small">Ingresos, contratación, proyectos, eventos o correcciones. Todo queda visible en el registro público.</p><label class="form-label" for="cash-kind">Movimiento</label><select id="cash-kind" name="kind" class="form-select mb-3" ${allowed?'':'disabled'}><option value="income">Cobro de la reserva</option><option value="expense">Pago a la reserva</option>${others.map(x=>`<option value="transfer:${esc(x.id)}">Transferir a ${esc(x.name)}</option>`).join('')}</select><label class="form-label" for="cash-amount">Importe ($)</label><input id="cash-amount" name="amount" type="number" min="0.01" max="1000000" step="0.01" inputmode="decimal" class="form-control mb-3" required ${allowed?'':'disabled'}><button class="btn btn-primary w-100" ${!allowed||busy||readLocal(pendingKey)?'disabled':''}>Registrar movimiento</button>${!allowed?`<p class="small text-secondary mt-2 mb-0">${game.stock&&game.phase==='maintenance'?'La caja se reabre en la próxima ronda, después de resolver los dividendos.':'La caja se habilita fuera de la liquidación y antes de finalizar la partida.'}</p>`:''}</div></form>`;
  }
  function account() {
    const p=me();
    const debtValue=Object.entries(p.debts).reduce((a,[rid,q])=>a+q*game.catalog[rid].max,Math.max(0,-p.cash));
    return `<div class="account-grid"><div>${cashForm()}</div><div><div class="card mb-3"><div class="card-header"><h2 class="card-title">Tus deudas</h2></div><div class="card-body"><div class="d-flex justify-content-between"><span>Descubierto monetario</span><strong>${money(Math.max(0,-p.cash))}</strong></div>${Object.entries(p.debts).map(([rid,q])=>`<form class="repay-form debt-row" data-resource="${rid}"><div><strong>${q} ${esc(game.catalog[rid].name)}</strong><div class="small text-secondary">Valor máximo: ${money(q*game.catalog[rid].max)}</div></div><div class="d-flex gap-2"><label class="visually-hidden" for="repay-${rid}">Unidades a devolver de ${esc(game.catalog[rid].name)}</label><input id="repay-${rid}" name="qty" type="number" min="1" max="${q}" value="${q}" step="1" class="form-control" style="width:75px" required><button class="btn btn-sm" ${!['planning','execution','maintenance'].includes(game.phase)||busy?'disabled':''}>Entregar</button></div></form>`).join('')}<hr><div class="d-flex justify-content-between"><span>Valor penalizable actual</span><strong>${money(debtValue)}</strong></div><p class="text-secondary small mt-3 mb-0">Con esta deuda perderías <strong>${Math.floor(debtValue/500)} PV</strong> al terminar el próximo mercado. Se suma el descubierto y los recursos pendientes a precio máximo. Entregar recursos no mueve dinero ni devuelve PV perdidos.</p></div></div></div></div>`;
  }
  function activity() {
    return `<div class="card"><div class="card-header"><h2 class="card-title">Movimientos de toda la mesa</h2><button class="btn btn-sm ms-auto" data-action="export">Exportar registro</button></div><div class="table-responsive"><table class="table table-vcenter ledger-table mb-0"><thead><tr><th>Ronda</th><th>Jugador</th><th>Motivo</th><th class="text-end">Movimiento</th></tr></thead><tbody>${[...game.ledger].reverse().map(l=>`<tr><td>${l.round||'Inicio'}</td><td>${esc(person(l.player)?.name)}</td><td>${esc(l.reason)}${l.by&&l.by!==l.player?`<div class="small text-secondary">Confirmó ${esc(person(l.by)?.name)}</div>`:''}${l.debtValue!==undefined?`<div class="small text-secondary">Deuda valorada: ${money(l.debtValue)}</div>`:''}${fixedOrderSummary(l.fixedOrders)}${l.stock?`<div class="small text-secondary">Empresa: ${esc(person(l.stock.company)?.name)}${l.stock.requested!==undefined?` · ${l.stock.qty} acciones de ${l.stock.requested} solicitadas · ${money(l.stock.price)} por acción`:''}${l.stock.result?` · ${l.stock.result.declaredPv} PV declarados → ${l.stock.result.finalPv} PV finales`:''}</div>`:''}${l.trade?`<div class="small text-secondary">${l.trade.qty} ${l.trade.type?'ingenieros · '+esc(game.engineerTypes[l.trade.type]):'cartas de proyecto'} · ${l.trade.unitAmount===0?'sin devolución de dinero':money(Math.abs(l.trade.unitAmount))+' por unidad'}</div>`:''}${l.maintenance?`<div class="small text-secondary">Yacimientos ${signed(l.maintenance.mines)} / Barracas ${signed(-l.maintenance.barracks)} / Soporte ${signed(l.maintenance.supportIncome)}</div>`:''}${l.units?`<div class="small text-secondary">${Object.entries(l.units).map(([r,q])=>`${q} ${esc(r)}`).join(' · ')}</div>`:''}${l.missing&&Object.keys(l.missing).length?`<div class="small money-negative">Pendiente: ${Object.entries(l.missing).map(([r,q])=>`${q} ${esc(r)}`).join(' · ')}</div>`:''}</td><td class="text-end ${l.amount<0||l.pv<0?'money-negative':l.amount>0?'money-positive':''}">${l.pv!==undefined?l.pv+' PV':signed(l.amount)}</td></tr>`).join('')}</tbody></table></div></div>`;
  }
  function showShare() {
    const url=new URL(location.pathname,location.origin); url.searchParams.set('join',game.code);
    let qr=''; try { const code=qrcode(0,'M'); code.addData(url.href); code.make(); qr=`<div class="qr">${code.createSvgTag({scalable:true,margin:2})}</div>`; } catch { qr='<p>El enlace es demasiado largo para generar el QR.</p>'; }
    $('#share-content').innerHTML=`<p class="text-secondary">Escaneá el QR o ingresá el código en otro teléfono. Al abrir el enlace, verificá este código y completá tu nombre para entrar.</p><div class="room-code fs-1 text-center">${game.code}</div>${qr}<label class="form-label" for="invite-url">Enlace de invitación</label><input id="invite-url" class="form-control mb-3" readonly value="${esc(url.href)}"><button class="btn btn-primary w-100" data-action="copy-invite">Copiar enlace</button>${['localhost','127.0.0.1'].includes(location.hostname)?'<p class="text-warning small mt-3 mb-0">Este enlace local solo funciona en esta computadora. Para otros teléfonos, abrí la app con la dirección de red del servidor o con su dominio.</p>':''}`;
    $('#share-dialog').showModal();
  }
  async function copy(text) { try { await navigator.clipboard.writeText(text); notify('Copiado.'); } catch { notify('Seleccioná y copiá el texto del campo.',true); } }
  function persistDraft() {
    dirty=true; storage(draftKey(game.code), {round:game.round,player:game.me,orders:draft,fixedOrders:fixedDraft,stockOrders:stockDraft});
    const label=$('#draft-status'); if(label) label.textContent='Cambios guardados en este teléfono.';
  }
  function collectOrders() {
    for(const input of app.querySelectorAll('[data-qty]')) {
      if(!input.reportValidity()) return null;
      const id=input.dataset.qty, qty=Number(input.value);
      if(!Number.isInteger(qty)||qty< -1000000||qty>1000000) { notify('Usá cantidades enteras entre −1.000.000 y 1.000.000.',true); return null; }
      if(qty) draft[id]=qty; else delete draft[id];
    }
    for(const input of app.querySelectorAll('[data-fixed-qty]')) {
      if(!input.reportValidity()) return null;
      const qty=Number(input.value);
      if(!Number.isInteger(qty)||Math.abs(qty)>1000000) return null;
      if(qty) fixedDraft[input.dataset.fixedQty]=qty; else delete fixedDraft[input.dataset.fixedQty];
    }
    if(game.stock) {
      for(const input of app.querySelectorAll('[data-stock-qty]')) {
        updateStockOrder(input);
        if(!input.reportValidity()) return null;
        const qty=Number(input.value);
        if(qty) stockDraft[input.dataset.stockQty]=qty; else delete stockDraft[input.dataset.stockQty];
      }
    }
    return {orders:{...draft},fixedOrders:{...fixedDraft},...(game.stock?{stockOrders:{...stockDraft}}:{})};
  }
  function updateOrder(id,qty) {
    if(qty) draft[id]=qty; else delete draft[id];
    const control=$('[data-order="'+id+'"]');
    if(control) control.dataset.side=qty>0?'buy':qty<0?'sell':'none';
    const label=$('#side-'+id);
    if(label) label.textContent=qty>0?'Compra':qty<0?'Venta':'—';
    try { persistDraft(); } catch(err) { notify(err.message,true); }
    updateFinanceBar();
  }
  document.addEventListener('input',e=>{
    const input=e.target;
    if(input.closest('.fixed-trade-order') && fixedTradeAllowed()) updateTradeTotal(input.closest('.fixed-trade-order'));
    if(input.id==='maintenance-support') updateMaintenanceChoice();
    if(input.id==='maintenance-pv') updateMaintenanceChoice();
    if(input.dataset.stockQty) updateStockOrder(input);
    if(input.dataset.qty&&game?.phase==='planning') {
      const n=Number(input.value); if(Number.isInteger(n)&&n>= -1000000&&n<=1000000) updateOrder(input.dataset.qty,n);
    }
  });
  document.addEventListener('change',e=>{
    if(e.target.closest('.fixed-trade-order') && fixedTradeAllowed()) updateTradeTotal(e.target.closest('.fixed-trade-order'));
    if(e.target.closest('#maintenance-form')) updateMaintenanceChoice();

  });
  document.addEventListener('submit',async e=>{
    e.preventDefault(); if(busy) return;
    const f=e.target, values=Object.fromEntries(new FormData(f));
    if(!f.reportValidity()) return;
    if(f.id==='create-form'||f.id==='join-form') {
      const data={name:values.name}; const action=f.id==='create-form'?'create':'join';
      if(action==='create') { data.cash=Math.round(Number(values.cash)*100); data.stockMarket=values.stockMarket==='on'; } else data.code=values.code.toUpperCase().trim();
      await act(action,data,random());
    } else if(f.id==='maintenance-form') {
      await act('maintain',{mines:Number(values.mines),barracks:Number(values.barracks),support:Number(values.support),...(game.stock?{pv:Number(values.pv)}:{})});
    } else if(f.id==='settle-form') {
      const missing={}; for(const [k,v] of Object.entries(values)) if(k.startsWith('missing-')&&Number(v)) missing[k.slice(8)]=Number(v);
      const player=game.settlement.order[game.settlement.index];
      await act('settle',{missing,player});
    } else if(f.id==='cash-form') {
      const amount=Math.round(Number(values.amount)*100);
      const transfer=values.kind.startsWith('transfer:');
      const recipient=transfer?person(values.kind.slice('transfer:'.length)):null;
      if(transfer&&(!recipient||recipient.id===game.me)) return notify('Elegí otro jugador para transferir.',true);
      await act(transfer?'transfer':'cash',{amount:values.kind==='expense'?-amount:amount,
        reason:transfer?'Transferencia entre jugadores':values.kind==='income'?'Cobro de la reserva':'Pago a la reserva',to:recipient?.id});
    } else if(f.classList.contains('repay-form')) {
      await act('repay',{units:{[f.dataset.resource]:Number(values.qty)}});
    }
  });
  document.addEventListener('click',async e=>{
    const b=e.target.closest('button');
    const menu=$('#game-menu');
    if(menu?.open && (!menu.contains(e.target) || b && menu.contains(b))) menu.open=false;
    if(!b||b.disabled) return;
    if(b.dataset.maintenanceTrack) {
      if(busy||game?.phase!=='maintenance'||game.maintenance.results[game.me]||readLocal(pendingKey)) return;
      $('#maintenance-'+b.dataset.maintenanceTrack).value=b.dataset.value;
      updateMaintenanceChoice();return;
    }
    if(b.dataset.stockStep) {
      if(busy||!fixedTradeAllowed()||readLocal(pendingKey)) return;
      const input=$('#stock-qty-'+b.dataset.stockId);
      if(!input.reportValidity()) return;
      input.value=String(Math.max(Number(input.min),Math.min(Number(input.max),Number(input.value)+Number(b.dataset.stockStep))));
      updateStockOrder(input); return;
    }
    if(b.dataset.fixedStep) {
      if(busy || !fixedTradeAllowed() || readLocal(pendingKey)) return;
      const input=$('#fixed-qty-'+b.dataset.fixedId);
      if(!input.reportValidity()) return;
      input.value=String(Math.max(-1000000,Math.min(1000000,Number(input.value)+Number(b.dataset.fixedStep))));
      updateTradeTotal(input.closest('.fixed-trade-order'));return;
    }
    if(b.dataset.step) {
      if(busy||game?.phase!=='planning'||me().pass!==null||readLocal(pendingKey)) return;
      const id=b.dataset.resource,input=$('#qty-'+id);
      if(!input.reportValidity()) return;
      const qty=Math.max(-1000000,Math.min(1000000,Number(input.value)+Number(b.dataset.step)));
      input.value=String(qty);updateOrder(id,qty);return;
    }
    if(b.dataset.tab) { tab=b.dataset.tab; render(); return; }
    if(b.dataset.command) {
      await act(b.dataset.command); return;
    }
    switch(b.dataset.action) {
      case 'pass': case 'save-plan': { const plan=collectOrders(); if(plan!==null) await act(b.dataset.action==='pass'?'pass':'plan',plan); break; }
      case 'refresh': await poll(true); break;
      case 'share': showShare(); break;
      case 'copy-invite': await copy($('#invite-url').value); break;
      case 'close-dialog': b.closest('dialog').close(); break;
      case 'finish': await act('finish'); break;
      case 'leave':
        if(readLocal(pendingKey)) return notify('Primero resolvé la acción pendiente.',true);
        storage(key,null); session=null; game=null; tab='market';invitationPending=false; history.replaceState(null,'',location.pathname); render(); break;
      case 'retry':
        if(busy) return; busy=true; render();
        try { const pending=readLocal(pendingKey); if(pending) await execute(pending); }
        catch(err) { if(err.status&&err.status<500) storage(pendingKey,null); notify(err.message,true); }
        finally { busy=false; render(); schedule(); } break;
      case 'export': {
        const blob=new Blob([JSON.stringify(game,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
        a.href=url;a.download=`syncrodyson-${game.code}-ronda-${game.round}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);break;
      }
    }
  });
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden) poll(true); });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape' && $('#game-menu')?.open) { $('#game-menu').open=false;$('#game-menu summary').focus(); }
  });
  window.addEventListener('pageshow',()=>poll(true));
  window.addEventListener('online',()=>poll(true));
  window.addEventListener('offline',()=>connected(false));
  // Each open tab keeps its own active identity. Other tabs may update saved access,
  // but that must not clear this tab's screen or start a cross-tab login loop.
  async function openInvitation() {
    // An invitation replaces only this device's access, never the old room on the server.
    session=null;storage(key,null);storage('syncrodyson-previous-session-v1',null);
    const pending=readLocal(pendingKey);
    if(pending?.body?.action==='join'&&pending.body.data.code===inviteCode) { render();schedule();return; }
    storage(pendingKey,null);
    if(replacedSession) storage(draftKey(replacedSession.code),null);
    render();
    let name=replacedSession?.name;
    if(!name&&replacedSession) {
      try {
        const result=await request(`api.php?code=${encodeURIComponent(replacedSession.code)}&_=${Date.now()}`,{headers:{Authorization:'Bearer '+replacedSession.token}});
        name=result.game.players.find(p=>p.id===result.game.me)?.name;
      } catch { /* A first-time or unrecoverable visitor can enter a name manually. */ }
    }
    if(!invitationPending) return;
    if(name) {
      if(replacedSession) replacedSession.name=name;
      await act('join',{code:inviteCode,name},random());
    } else { $('#connection-text').textContent='Invitación recibida';schedule(); }
  }
  render();
  if(invitationPending) openInvitation().catch(e=>notify(e.message,true));
  else if(session) poll(true);
  else { $('#connection-text').textContent='Lista para jugar';schedule(); }
})();
