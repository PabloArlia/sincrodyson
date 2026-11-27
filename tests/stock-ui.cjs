'use strict';
// Real Chrome + PHP/SQLite, using the browser's DevTools protocol; no npm packages.
const {spawn,spawnSync}=require('node:child_process');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),net=require('node:net');
const {randomBytes,randomUUID}=require('node:crypto');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'), temp=fs.mkdtempSync(path.join(os.tmpdir(),'sync-stock-ui-'));
const chrome=process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe';
const env={...process.env,DB_DSN:'sqlite:'+path.join(temp,'test.sqlite'),DB_USER:'',DB_PASSWORD:''};
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function port(){const server=net.createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const value=server.address().port;await new Promise(resolve=>server.close(resolve));return value;}
async function until(fn,label){for(let i=0;i<120;i++){try{if(await fn())return;}catch{}await pause(100);}throw new Error('Timeout: '+label);}
class CDP {
  constructor(ws){this.ws=ws;this.id=0;this.pending=new Map();this.errors=[];ws.addEventListener('message',event=>{const msg=JSON.parse(event.data);if(msg.id){const pending=this.pending.get(msg.id);if(pending){this.pending.delete(msg.id);msg.error?pending.reject(new Error(JSON.stringify(msg.error))):pending.resolve(msg.result);}}if(msg.method==='Runtime.exceptionThrown')this.errors.push(msg.params.exceptionDetails);});}
  send(method,params={}){return new Promise((resolve,reject)=>{const id=++this.id;this.pending.set(id,{resolve,reject});this.ws.send(JSON.stringify({id,method,params}));});}
  async eval(expression){const result=await this.send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails));return result.result.value;}
}
let server,browser,cdp,checks=0;
function check(value,label){assert(value,label);checks++;}
async function run(){
  const init=spawnSync('php',[path.join(root,'website/bin/init.php')],{env,encoding:'utf8',windowsHide:true});assert.equal(init.status,0,init.stderr);
  const httpPort=await port(),debugPort=await port(),base=`http://127.0.0.1:${httpPort}/`;
  server=spawn('php',['-S',`127.0.0.1:${httpPort}`,'-t',path.join(root,'website')],{env,stdio:'ignore',windowsHide:true});
  await until(async()=>{const response=await fetch(base);return response.ok;},'PHP server');
  browser=spawn(chrome,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check',`--remote-debugging-port=${debugPort}`,'--remote-debugging-address=127.0.0.1',`--user-data-dir=${path.join(temp,'chrome')}`,'about:blank'],{stdio:'ignore',windowsHide:true});
  let target;await until(async()=>{const targets=await(await fetch(`http://127.0.0.1:${debugPort}/json`)).json();target=targets.find(t=>t.type==='page');return !!target;},'Chrome');
  const ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});cdp=new CDP(ws);
  await cdp.send('Page.enable');await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  await cdp.send('Page.navigate',{url:base});await until(()=>cdp.eval("!!document.querySelector('#create-form')"),'create screen');
  check(await cdp.eval("document.querySelector('[name=stockMarket]').checked===false"),'Bolsa desmarcada por defecto');
  await cdp.eval("document.querySelector('#create-name').value='Empresa UI';document.querySelector('[name=stockMarket]').checked=true;document.querySelector('#create-form').requestSubmit()");
  await until(()=>cdp.eval("!!document.querySelector('[data-command=start]')"),'lobby');
  const session=await cdp.eval("JSON.parse(localStorage.getItem('syncrodyson-session-v1'))");
  const send=async(token,action,data={},code=session.code)=>{
    const response=await fetch(base+'api.php',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token,'Idempotency-Key':randomUUID()},body:JSON.stringify({action,code,data})});
    const body=await response.json();assert.equal(response.status,200,JSON.stringify(body));return body.game;
  };
  const read=async()=>{const response=await fetch(base+'api.php?code='+session.code,{headers:{Authorization:'Bearer '+session.token}});return(await response.json()).game;};
  const tokenB=randomBytes(32).toString('hex');const joined=await send(tokenB,'join',{name:'Otra empresa',code:session.code});const other=joined.me;
  await cdp.eval("document.querySelector('[data-command=start]').click()");await until(()=>cdp.eval("!!document.querySelector('.stock-panel')"),'stock planning');
  let state=await read();const own=state.me;
  await cdp.eval("document.querySelector('#game-menu').open=true;document.querySelector('[data-action=rename]').click()");
  check(await cdp.eval("document.querySelector('#rename-dialog').open&&document.querySelector('#player-name').value==='Empresa UI'"),'Menú permite editar el propio nombre');
  await cdp.eval("document.querySelector('#player-name').value='Nuevo nombre';document.querySelector('#rename-form').requestSubmit()");
  await until(()=>cdp.eval("!document.querySelector('#rename-dialog').open&&document.querySelector('.page-header').textContent.includes('Nuevo nombre')"),'rename player');
  await cdp.send('Page.reload');await until(()=>cdp.eval("document.querySelector('.page-header')?.textContent.includes('Nuevo nombre')"),'rename persists');
  check(await cdp.eval("JSON.parse(localStorage.getItem('syncrodyson-session-v1')).name==='Nuevo nombre'"),'Nombre actualizado persiste al recargar y en acceso local');
  await send(session.token,'rename',{name:'Empresa UI',round:1});
  await cdp.eval("document.querySelector('[data-action=refresh]').click()");
  await until(()=>cdp.eval("document.querySelector('.page-header').textContent.includes('Empresa UI')"),'restore test name');
  check(state.options.stockMarket&&Object.keys(state.stock.companies).length===2,'Opción persistida y una empresa por jugador');
  check(await cdp.eval("document.querySelectorAll('[data-stock-qty]').length===2"),'Un selector por empresa');
  check(await cdp.eval("(()=>{const row=document.querySelector('[data-qty=FT]').closest('tr'),icon=row.querySelector('img');return row.textContent.includes('Fichas de Técnica')&&!!row.querySelector('.sparkline')&&icon.complete&&icon.naturalWidth>0})()"),'FT tiene selector de cantidad, icono e historial');
  const setQty=async(id,qty)=>cdp.eval(`(()=>{const input=document.getElementById(${JSON.stringify('stock-qty-'+id)});input.value=${qty};input.dispatchEvent(new Event('input',{bubbles:true}));})()`);
  check(await cdp.eval("document.querySelectorAll('.market-table .stock-trade-row').length===2"),'Acciones en la misma tabla de recursos');
  check(await cdp.eval("[...document.querySelectorAll('.stock-trade-row .sparkline')].every(chart=>chart.querySelectorAll('circle').length===3&&chart.querySelector('polyline').getAttribute('points').split(' ').map(point=>point.split(',')[1]).every((y,_,values)=>y===values[0]))"),'Tres valores iniciales iguales en los graficos bursatiles');
  check(await cdp.eval("!document.querySelector('.stock-panel').classList.contains('card')&&!document.querySelector('#app').textContent.includes('Dividendos a recibir')&&!document.querySelector('#app').textContent.includes('400 acciones')&&!document.querySelector('#app').textContent.includes('10 compras')&&!document.querySelector('#app').textContent.includes('En cartera')"),'Resumen compacto sin caja ni etiquetas retiradas');
  await setQty(own,6);await setQty(other,5);
  check(await cdp.eval(`document.getElementById('stock-qty-${other}').value==='4'`),'Limita automaticamente las compras totales');
  check(await cdp.eval("[...document.querySelectorAll('[data-stock-step=\"1\"]')].every(button=>button.disabled)"),'Deshabilita sumas al alcanzar el limite');
  check((await read()).phase==='planning','Limitar no envia ordenes');
  await setQty(own,2);await setQty(other,8);
  check(await cdp.eval("document.querySelector('[data-finance=balance]').textContent.includes('30,00')"),'Balance incluye borrador bursátil');
  await cdp.send('Page.reload');await until(()=>cdp.eval(`document.getElementById(${JSON.stringify('stock-qty-'+other)})?.value==='8'`),'draft restored');checks++;
  await send(tokenB,'pass',{round:1,stockOrders:{[own]:3}});
  await cdp.eval("document.querySelector('[data-action=pass]').click()");await until(()=>cdp.eval("!!document.querySelector('#settle-form')"),'market');
  check(await cdp.eval("!document.querySelector('#closing-prices').open"),'Precios de cierre empiezan cerrados en Mercado');
  await cdp.eval("document.querySelector('#closing-prices summary').click()");
  check(await cdp.eval("document.querySelector('#closing-prices').open&&document.querySelector('#closing-prices .market-table').getBoundingClientRect().height>0"),'Desplegar muestra la tabla de precios');
  await cdp.eval("document.querySelector('[data-action=refresh]').click()");
  await until(()=>cdp.eval("!document.querySelector('[data-action=refresh]').disabled"),'prices refresh');
  check(await cdp.eval("document.querySelector('#closing-prices').open"),'Actualizar la misma fase conserva la tabla abierta');
  check(await cdp.eval("document.querySelector('.stock-panel').textContent.includes('Operaciones bursátiles')"),'Liquidación muestra operaciones');
  state=await read();check(state.stock.round.market.trades.length===3,'Servidor ejecutó todas las órdenes');
  await send(session.token,'settle',{round:1,player:state.settlement.order[0]});
  await cdp.eval("document.querySelector('[data-action=refresh]').click()");
  await until(()=>cdp.eval("document.querySelector('#settle-form .card-title')?.textContent.includes('Empresa UI')"),'host settlement');
  await cdp.eval("document.querySelector('#settle-form').requestSubmit()");await until(()=>cdp.eval("!!document.querySelector('[data-command=maintenance]')"),'execution');
  check(await cdp.eval("!document.querySelector('#closing-prices').open"),'Al pasar a Ejecutar los precios vuelven a empezar cerrados');
  await cdp.eval("document.querySelector('#closing-prices summary').click()");
  check(await cdp.eval("document.querySelector('#closing-prices thead th:last-child').textContent==='Compra de emergencia'&&document.querySelectorAll('[data-emergency-buy]').length===20"),'Columna de compra de emergencia para recursos, cuatro ingenieros y proyectos');
  check(await cdp.eval("document.querySelector('#closing-prices thead th:nth-child(3)').textContent==='Comprado'&&document.querySelectorAll('[data-emergency-count]').length===20&&[...document.querySelectorAll('[data-emergency-count]')].every(count=>count.textContent==='0')&&!document.querySelector('#closing-prices .sparkline')"),'Contadores en cero reemplazan al historial durante Ejecutar');
  let beforeEmergency=(await read()).players.find(p=>p.id===own).cash;
  for(const [item,price] of [['Fe',200],['FT',600],['IM',700],['project',300]]) {
    await cdp.eval(`document.querySelector('[data-emergency-buy="${item}"]').click()`);
    await until(async()=>{const current=await read();return current.players.find(p=>p.id===own).cash===beforeEmergency-price;},'emergency purchase '+item);
    await until(()=>cdp.eval("!document.querySelector('[data-emergency-buy]').disabled"),'emergency ready');
    beforeEmergency-=price;
    check((await read()).ledger.at(-1).emergency?.item===item,'Compra de emergencia registrada: '+item);
    check(await cdp.eval(`document.querySelector('[data-emergency-count="${item}"]').textContent==='1'`),'Contador aumenta tras confirmar: '+item);
  }
  await cdp.eval("document.querySelector('[data-emergency-buy=Fe]').click()");
  await until(()=>cdp.eval("document.querySelector('[data-emergency-count=Fe]').textContent==='2'"),'second emergency iron');
  await until(()=>cdp.eval("!document.querySelector('[data-emergency-buy]').disabled"),'second emergency ready');
  await send(tokenB,'emergency-buy',{round:1,item:'Fe'});
  await cdp.send('Page.reload');await until(()=>cdp.eval("!!document.querySelector('[data-emergency-count=Fe]')"),'reload emergency counts');
  await cdp.eval("document.querySelector('#closing-prices summary').click()");
  check(await cdp.eval("document.querySelector('[data-emergency-count=Fe]').textContent==='2'&&document.querySelector('[data-emergency-count=IM]').textContent==='1'&&document.querySelector('[data-emergency-count=project]').textContent==='1'"),'Recarga conserva las compras propias y excluye las de otro jugador');
  check(await cdp.eval("document.querySelector('#closing-prices').open"),'Comprar conserva abierto el panel de precios');
  check(await cdp.eval("(()=>{const form=document.querySelector('#cash-form'),next=form.querySelector('[data-command=maintenance]');return form.querySelector('h2').textContent==='Ahora se ejecutan los proyectos'&&!!form.querySelector('[aria-label=\"Orden de turno\"]')&&next?.type==='button'&&form.querySelector('[type=submit],button:not([type])').compareDocumentPosition(next)&Node.DOCUMENT_POSITION_FOLLOWING})()"),'Ejecución reúne orden, explicación, registro y avance en una sola caja');
  await cdp.eval("document.querySelector('[data-command=maintenance]').click()");await until(()=>cdp.eval("!!document.querySelector('#maintenance-pv')"),'PV declaration');
  check(await cdp.eval("!!document.querySelector('#closing-prices')&&!document.querySelector('#closing-prices').open"),'Precios de cierre cerrados también en Mantenimiento');
  check(await cdp.eval("(()=>{const form=document.querySelector('#maintenance-form'),panel=form.closest('.phase-card');return !!panel&&!form.classList.contains('card')&&panel.querySelectorAll('.card').length===0&&!panel.contains(document.querySelector('.maintenance-events'))&&!panel.contains(document.querySelector('#cash-form'))&&!panel.contains(document.querySelector('#closing-prices'))&&!panel.contains(document.querySelector('[data-command=next]'))})()"),'La tarjeta de pestañas termina con el formulario de mantenimiento; eventos, caja y precios quedan fuera');
  check(await cdp.eval("document.querySelector('#maintenance-pv').required&&document.querySelector('#maintenance-pv').value===''"),'PV obligatorio sin asumir puntaje');
  check(await cdp.eval("Array.from(document.querySelectorAll('.maintenance-track input')).map(input=>input.name).join(',')==='discs,mines,barracks,support'"),'Orden de selectores con bolsa: discos, yacimientos, barracas y soporte');
  check(await cdp.eval("document.querySelector('.maintenance-event-count').textContent==='Sacá 2 eventos'"),'Un evento por jugador, sin evento extra');
  check(await cdp.eval("document.querySelector('.maintenance-event-count').previousElementSibling.textContent==='Resolvé los eventos con efecto «en mantenimiento».'"),'Resolver efectos de mantenimiento antes de sacar eventos');
  check(await cdp.eval("!document.querySelector('#cash-form')&&!document.querySelector('#app').textContent.includes('Dinero por eventos')"),'Mantenimiento no muestra cobros ni pagos por eventos');
  await cdp.eval("document.querySelector('#maintenance-pv').value='6';document.querySelector('#maintenance-pv').dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('#maintenance-form').requestSubmit()");
  await until(()=>cdp.eval("!document.querySelector('#maintenance-form')"),'maintenance confirmation');
  check(!(await read()).stock.round.maintenance,'Espera a todos antes de evaluar dividendos');
  await send(tokenB,'maintain',{round:1,mines:3,barracks:0,support:0,pv:3});
  await cdp.eval("document.querySelector('[data-action=refresh]').click()");
  await until(()=>cdp.eval("document.querySelector('.stock-panel')?.textContent.includes('Resultados de mantenimiento')"),'stock results');
  check(await cdp.eval("document.querySelector('.stock-panel').textContent.includes('Sin expectativa')"),'Primera ronda exenta visible');
  check(await cdp.eval("document.querySelectorAll('.maintenance-pv-result').length===2&&!document.querySelector('#cash-form')"),'Resumen de puntos conserva oculto el formulario de dinero por eventos');
  await until(()=>cdp.eval("!document.querySelector('[data-command=next]').disabled"),'ready after events');
  await cdp.eval("document.querySelector('[data-command=next]').click()");
  await until(()=>cdp.eval("!!document.querySelector('[data-stock-qty]')"),'round two');
  state=await read();check(state.round===2&&state.stock.companies[own].price===345,'Nueva ronda conserva cierre y expectativas');
  // A second cycle exercises nonzero dividend payouts and the public history.
  await send(tokenB,'pass',{round:2});await cdp.eval("document.querySelector('[data-action=pass]').click()");
  await until(()=>cdp.eval("!!document.querySelector('#settle-form')"),'second market');
  state=await read();for(const player of state.settlement.order)await send(session.token,'settle',{round:2,player});
  await cdp.eval("document.querySelector('[data-action=refresh]').click()");
  await until(()=>cdp.eval("!!document.querySelector('[data-emergency-count=Fe]')"),'second execution counters');
  check(await cdp.eval("[...document.querySelectorAll('[data-emergency-count]')].every(count=>count.textContent==='0')"),'Los contadores empiezan en cero en la nueva ronda');
  await send(session.token,'maintenance',{round:2});
  await send(session.token,'maintain',{round:2,mines:3,barracks:0,support:0,pv:10});
  await send(tokenB,'maintain',{round:2,mines:3,barracks:0,support:0,pv:4});
  await cdp.eval("document.querySelector('[data-action=refresh]').click()");
  await until(()=>cdp.eval("document.querySelector('.stock-panel')?.textContent.includes('Cumple')"),'dividend results');
  check(await cdp.eval("document.querySelector('.stock-panel').textContent.includes('Historial bursátil')"),'Historial de ronda anterior visible');
  state=await read();check(state.stock.round.maintenance.results[own].paidUnits>0,'Dividendos debitados en segunda ronda');
  const penalty=state.stock.round.maintenance.results[other];
  check(penalty.pvDelta<0,'Segundo jugador incumple expectativas');
  check(await cdp.eval(`(()=>{const card=document.querySelector('[data-pv-player="${other}"]');return card.textContent.includes('Pierde ${-penalty.pvDelta} PV')&&card.textContent.includes('${penalty.finalPv} PV')&&parseFloat(getComputedStyle(card.querySelector('.maintenance-pv-change')).fontSize)>=25})()`),'Penalización y puntaje final destacados en grande');
  const artifacts=path.join(__dirname,'artifacts');fs.mkdirSync(artifacts,{recursive:true});
  let shot=await cdp.send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(artifacts,'stock-desktop.png'),Buffer.from(shot.data,'base64'));
  await cdp.eval("document.querySelector('[data-command=next]').click()");await until(()=>cdp.eval("!!document.querySelector('[data-stock-qty]')"),'round three');
  await cdp.send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await cdp.send('Page.reload');await until(()=>cdp.eval("!!document.querySelector('[data-stock-qty]')"),'mobile reload');
  check(await cdp.eval("document.documentElement.scrollWidth<=document.documentElement.clientWidth"),'Sin desborde horizontal en celular');
  check(await cdp.eval("document.querySelector('#app').getBoundingClientRect().width>=innerWidth-30"),'Aprovecha el ancho del celular');
  check(await cdp.eval("(()=>{const rect=document.querySelector('.finance-action').getBoundingClientRect();return rect.left>=0&&rect.right<=innerWidth&&rect.bottom<=innerHeight})()"),'Botón inferior visible en celular');
  await cdp.eval("document.querySelector('.stock-panel details').open=true");
  check(await cdp.eval("document.documentElement.scrollWidth<=document.documentElement.clientWidth"),'Historial abierto no desborda en celular');
  await cdp.eval("document.querySelector('.stock-panel details').open=false");
  await setQty(own,-1);
  check(await cdp.eval("document.querySelector('[data-finance=balance]').textContent.includes('+')"),'Venta actualiza balance en tiempo real');
  await cdp.eval(`document.querySelector('[data-stock-id="${own}"][data-stock-step="-1"]').click()`);
  check(await cdp.eval(`document.getElementById('stock-qty-${own}').value==='-2'`),'Stepper permite vender acciones propias');
  shot=await cdp.send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(artifacts,'stock-mobile.png'),Buffer.from(shot.data,'base64'));
  await cdp.send('Emulation.setDeviceMetricsOverride',{width:320,height:740,deviceScaleFactor:1,mobile:true});
  await cdp.send('Page.reload');await until(()=>cdp.eval("!!document.querySelector('[data-stock-qty]')"),'narrow phone');
  check(await cdp.eval("document.documentElement.scrollWidth<=document.documentElement.clientWidth"),'Sin desborde a 320px');
  check(await cdp.eval("(()=>{const items=[...document.querySelectorAll('.phase-tabs .nav-item')];return items.length===4&&items.every(item=>Math.abs(item.getBoundingClientRect().top-items[0].getBoundingClientRect().top)<1)})()"),'Las cuatro fases permanecen en una sola línea a 320px');
  check(await cdp.eval("(()=>{const strip=document.querySelector('.phase-steps'),bounds=strip.getBoundingClientRect();return strip.scrollWidth<=strip.clientWidth&&[...strip.querySelectorAll('.phase-step')].every(tab=>{const r=tab.getBoundingClientRect();return r.left>=bounds.left-1&&r.right<=bounds.right+1&&tab.scrollWidth<=tab.clientWidth})})()"),'Todas las pestañas y sus textos caben sin scroll a 320px');
  const phaseClip=await cdp.eval("(()=>{const r=document.querySelector('.phase-steps').getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height+2,scale:1}})()");
  const phaseShot=await cdp.send('Page.captureScreenshot',{format:'png',clip:phaseClip,captureBeyondViewport:true});
  fs.writeFileSync(path.join(artifacts,'phase-tabs-mobile.png'),Buffer.from(phaseShot.data,'base64'));
  // A game created without the option has neither stock controls nor a PV requirement.
  const plainToken=randomBytes(32).toString('hex');const plain=await send(plainToken,'create',{name:'Sin bolsa'});
  await send(plainToken,'start',{round:0},plain.code);
  await cdp.eval(`localStorage.setItem('syncrodyson-session-v1',${JSON.stringify(JSON.stringify({code:plain.code,token:plainToken,name:'Sin bolsa'}))})`);
  await cdp.send('Page.reload');await until(()=>cdp.eval("!!document.querySelector('[data-action=pass]')"),'plain planning');
  check(await cdp.eval("!document.querySelector('.stock-panel')&&!document.querySelector('[data-stock-qty]')"),'Partida sin bolsa conserva interfaz');
  check(await cdp.eval("(()=>{const tabs=document.querySelector('.phase-card > .card-header'),body=tabs.nextElementSibling,table=body.querySelector('.market-table-card');return tabs.parentElement.classList.contains('card')&&!!tabs.querySelector('.nav.nav-tabs.card-header-tabs')&&body.classList.contains('card-body')&&!!body.querySelector('.tab-content > .tab-pane.active.show')&&Math.abs(tabs.getBoundingClientRect().bottom-body.getBoundingClientRect().top)<1&&getComputedStyle(table).borderTopWidth==='0px'})()"),'Estructura Tabler: card, card-header con pestañas y card-body unidos');
  const attachedClip=await cdp.eval("(()=>{const r=document.querySelector('.phase-steps').getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height+125,scale:1}})()");
  const attachedShot=await cdp.send('Page.captureScreenshot',{format:'png',clip:attachedClip,captureBeyondViewport:true});
  fs.writeFileSync(path.join(artifacts,'phase-tabs-attached-mobile.png'),Buffer.from(attachedShot.data,'base64'));
  await cdp.eval("document.querySelector('[data-action=pass]').click()");await until(()=>cdp.eval("!!document.querySelector('#settle-form')"),'plain market');
  await cdp.eval("document.querySelector('#settle-form').requestSubmit()");await until(()=>cdp.eval("!!document.querySelector('[data-command=maintenance]')"),'plain execution');
  await cdp.eval("document.querySelector('[data-command=maintenance]').click()");await until(()=>cdp.eval("!!document.querySelector('#maintenance-form')"),'plain maintenance');
  check(await cdp.eval("!document.querySelector('#maintenance-pv')"),'Sin bolsa no se piden PV');
  check(await cdp.eval("document.querySelector('.maintenance-event-count').textContent==='Sacá 1 evento'&&!document.querySelector('#cash-form')"),'Un jugador saca un solo evento y no tiene caja de eventos');
  check(await cdp.eval("[...document.querySelectorAll('[data-maintenance-track=mines] .track-value')].map(e=>e.textContent).join(',')==='−$1,−$3,−$6,−$10,−$15,−$20'"),'Yacimientos muestran los nuevos costos');
  check(await cdp.eval("[...document.querySelectorAll('[data-maintenance-track=barracks] .track-value')].map(e=>e.textContent).join(',')==='−$2,−$4,−$6,−$8,−$10,−$13,−$15,−$18,−$20,−$23,−$25,−$30'"),'Doce costos de barracas coinciden con el tablero');
  await cdp.eval(`localStorage.setItem('syncrodyson-maintenance-${plain.code}',JSON.stringify({round:1,player:${JSON.stringify(plain.me)},choice:{mines:2,barracks:14,support:0,discs:0}}))`);
  await cdp.send('Page.reload');await until(()=>cdp.eval("!!document.querySelector('#maintenance-barracks')"),'maintenance old draft');
  check(await cdp.eval("document.querySelector('#maintenance-barracks').value==='11'&&Number.isFinite(Number(document.querySelector('#maintenance-total').textContent.replace(/[^0-9,.-]/g,'').replace(',','.')))"),'Selección antigua de barracas queda dentro de las doce posiciones');
  await cdp.eval("document.querySelector('[data-maintenance-track=barracks][data-value=\"0\"]').click()");
  check(await cdp.eval("document.querySelectorAll('[data-maintenance-track=discs]').length===17&&document.querySelectorAll('[data-maintenance-track=mines]').length===6"),'17 posiciones de discos y seis yacimientos');
  check(await cdp.eval("document.querySelector('[data-maintenance-track=discs][data-value=\"0\"]').textContent.includes('+$10')&&document.querySelector('[data-maintenance-track=discs][data-value=\"16\"]').textContent.includes('+$42')"),'Importes de discos coinciden con el tablero');
  await cdp.eval("document.querySelector('[data-maintenance-track=discs][data-value=\"16\"]').click();document.querySelector('[data-maintenance-track=mines][data-value=\"5\"]').click()");
  check(await cdp.eval("document.querySelector('#maintenance-total').textContent.includes('20,00')"),'Total inmediato: $42 de discos menos $20 de yacimientos y $2 de barracas');
  check(await cdp.eval("Array.from(document.querySelectorAll('.maintenance-track input')).map(input=>input.name).join(',')==='discs,mines,barracks,support'"),'Orden de selectores sin bolsa');
  check(await cdp.eval("(()=>{const button=document.querySelector('[data-maintenance-track=mines][data-value=\"5\"]'),label=button.querySelector('.track-value'),rect=label.getBoundingClientRect();return getComputedStyle(label).whiteSpace==='nowrap'&&rect.height<=parseFloat(getComputedStyle(label).lineHeight)+1&&rect.width<=button.clientWidth})()"),'El importe negativo del sexto yacimiento cabe en una sola línea a 320px');
  // Reproduce a browser that still has app.css from before the wrapping fix.
  await cdp.eval("(()=>{for(const sheet of document.styleSheets){if(!sheet.href?.includes('/assets/app.css'))continue;for(let i=sheet.cssRules.length-1;i>=0;i--){const rule=sheet.cssRules[i];if(rule.selectorText==='.maintenance-circle .track-value')sheet.deleteRule(i);else if(rule.selectorText==='.maintenance-circle')rule.style.removeProperty('padding')}}})()");
  check(await cdp.eval("[4,5].every(position=>{const button=document.querySelector('[data-maintenance-track=mines][data-value=\"'+position+'\"]'),label=button.querySelector('.track-value'),range=document.createRange();range.selectNodeContents(label);return range.getClientRects().length===1&&label.getBoundingClientRect().width<=button.clientWidth&&parseFloat(getComputedStyle(button).paddingLeft)===0})"),'Menos quince y menos veinte en un solo renglón incluso con el CSS anterior');
  const maintenanceClip=await cdp.eval("(()=>{const r=document.querySelector('#maintenance-mines').closest('fieldset').getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height,scale:1}})()");
  const maintenanceShot=await cdp.send('Page.captureScreenshot',{format:'png',clip:maintenanceClip,captureBeyondViewport:true});
  fs.writeFileSync(path.join(artifacts,'maintenance-values-mobile.png'),Buffer.from(maintenanceShot.data,'base64'));
  await cdp.send('Page.reload');await until(()=>cdp.eval("!!document.querySelector('#maintenance-discs')"),'maintenance draft reload');
  check(await cdp.eval("document.querySelector('#maintenance-discs').value==='16'&&document.querySelector('#maintenance-mines').value==='5'"),'Recarga conserva discos y sexto yacimiento sin confirmar');
  check(await cdp.eval("document.documentElement.scrollWidth<=document.documentElement.clientWidth"),'Mantenimiento con discos no desborda a 320px');
  await cdp.eval("document.querySelector('#maintenance-form').requestSubmit()");await until(()=>cdp.eval("!document.querySelector('#maintenance-form')"),'plain maintenance submitted');
  const nextPlain=await send(plainToken,'next',{round:1},plain.code);
  check(nextPlain.players[0].maintenanceChoice.discs===16&&nextPlain.players[0].maintenanceChoice.mines===5,'Servidor recuerda ambas selecciones');
  check(nextPlain.ledger.find(entry=>entry.maintenance)?.amount===2000,'Servidor acredita el mismo total mostrado');
  await cdp.eval(`localStorage.removeItem('syncrodyson-maintenance-${plain.code}')`);
  await cdp.send('Page.reload');await until(()=>cdp.eval("!!document.querySelector('[data-action=pass]')"),'plain next round');
  await cdp.eval("document.querySelector('[data-action=pass]').click()");await until(()=>cdp.eval("!!document.querySelector('#settle-form')"),'plain next market');
  await cdp.eval("document.querySelector('#settle-form').requestSubmit()");await until(()=>cdp.eval("!!document.querySelector('[data-command=maintenance]')"),'plain next execution');
  await cdp.eval("document.querySelector('[data-command=maintenance]').click()");await until(()=>cdp.eval("!!document.querySelector('#maintenance-form')"),'plain next maintenance');
  check(await cdp.eval("document.querySelector('#maintenance-discs').value==='16'&&document.querySelector('#maintenance-mines').value==='5'"),'Nueva ronda restaura selecciones desde el servidor sin almacenamiento local');
  await cdp.eval("document.querySelector('[data-tab=account]').click()");await until(()=>cdp.eval("!!document.querySelector('#cash-form')"),'plain account');
  check(await cdp.eval("!document.querySelector('#cash-amount').disabled"),'Caja manual sigue habilitada sin bolsa');
  check(cdp.errors.length===0,'Sin excepciones JavaScript: '+JSON.stringify(cdp.errors));
  console.log(`OK: ${checks} comprobaciones en Chrome real, dos rondas, recarga, dividendos y vista móvil.`);
}
run().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{
  if(cdp){try{await cdp.send('Browser.close');}catch{}cdp.ws.close();}
  if(browser)browser.kill();if(server)server.kill();
  // Only files created inside our unique OS temporary directory are removed.
  await pause(500);
  const resolved=path.resolve(temp);
  if(path.dirname(resolved)===path.resolve(os.tmpdir())&&path.basename(resolved).startsWith('sync-stock-ui-')) {
    try{fs.rmSync(resolved,{recursive:true,force:true});}catch{}
  }
});
