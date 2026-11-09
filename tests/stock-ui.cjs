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
  check(await cdp.eval("document.querySelector('.stock-panel').textContent.includes('Operaciones bursátiles')"),'Liquidación muestra operaciones');
  state=await read();check(state.stock.round.market.trades.length===3,'Servidor ejecutó todas las órdenes');
  await send(session.token,'settle',{round:1,player:state.settlement.order[0]});
  await cdp.eval("document.querySelector('[data-action=refresh]').click()");
  await until(()=>cdp.eval("document.querySelector('#settle-form .card-title')?.textContent.includes('Empresa UI')"),'host settlement');
  await cdp.eval("document.querySelector('#settle-form').requestSubmit()");await until(()=>cdp.eval("!!document.querySelector('[data-command=maintenance]')"),'execution');
  await cdp.eval("document.querySelector('[data-command=maintenance]').click()");await until(()=>cdp.eval("!!document.querySelector('#maintenance-pv')"),'PV declaration');
  check(await cdp.eval("document.querySelector('#maintenance-pv').required&&document.querySelector('#maintenance-pv').value===''"),'PV obligatorio sin asumir puntaje');
  check(await cdp.eval("document.querySelector('.maintenance-event-count').textContent==='Sacá 3 eventos'"),'Recordatorio de jugadores más un evento');
  check(await cdp.eval("document.querySelector('#cash-amount').disabled"),'Espera al cierre bursátil para registrar eventos');
  await cdp.eval("document.querySelector('#maintenance-pv').value='6';document.querySelector('#maintenance-pv').dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('#maintenance-form').requestSubmit()");
  await until(()=>cdp.eval("!document.querySelector('#maintenance-form')"),'maintenance confirmation');
  check(!(await read()).stock.round.maintenance,'Espera a todos antes de evaluar dividendos');
  await send(tokenB,'maintain',{round:1,mines:3,barracks:0,support:0,pv:3});
  await cdp.eval("document.querySelector('[data-action=refresh]').click()");
  await until(()=>cdp.eval("document.querySelector('.stock-panel')?.textContent.includes('Resultados de mantenimiento')"),'stock results');
  check(await cdp.eval("document.querySelector('.stock-panel').textContent.includes('Sin expectativa')"),'Primera ronda exenta visible');
  check(await cdp.eval("document.querySelectorAll('.maintenance-pv-result').length===2&&!document.querySelector('#cash-amount').disabled"),'Resumen de puntos por jugador y caja de eventos habilitada');
  const beforeEvent=(await read()).players.find(p=>p.id===own).cash;
  await cdp.eval("document.querySelector('#cash-amount').value='10';document.querySelector('#cash-form').requestSubmit()");
  await until(async()=>{const s=await read();return s.players.find(p=>p.id===own).cash===beforeEvent+1000;},'event income');
  await until(()=>cdp.eval("!document.querySelector('#cash-form button').disabled"),'event form ready');
  await cdp.eval("document.querySelector('#cash-kind').value='event-expense';document.querySelector('#cash-amount').value='4';document.querySelector('#cash-form').requestSubmit()");
  await until(async()=>{const s=await read();return s.players.find(p=>p.id===own).cash===beforeEvent+600;},'event expense');
  await until(()=>cdp.eval("!document.querySelector('[data-command=next]').disabled"),'ready after events');
  await cdp.eval("document.querySelector('[data-command=next]').click()");
  await until(()=>cdp.eval("!!document.querySelector('[data-stock-qty]')"),'round two');
  state=await read();check(state.round===2&&state.stock.companies[own].price===345,'Nueva ronda conserva cierre y expectativas');
  // A second cycle exercises nonzero dividend payouts and the public history.
  await send(tokenB,'pass',{round:2});await cdp.eval("document.querySelector('[data-action=pass]').click()");
  await until(()=>cdp.eval("!!document.querySelector('#settle-form')"),'second market');
  state=await read();for(const player of state.settlement.order)await send(session.token,'settle',{round:2,player});
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
  // A game created without the option has neither stock controls nor a PV requirement.
  const plainToken=randomBytes(32).toString('hex');const plain=await send(plainToken,'create',{name:'Sin bolsa'});
  await send(plainToken,'start',{round:0},plain.code);
  await cdp.eval(`localStorage.setItem('syncrodyson-session-v1',${JSON.stringify(JSON.stringify({code:plain.code,token:plainToken,name:'Sin bolsa'}))})`);
  await cdp.send('Page.reload');await until(()=>cdp.eval("!!document.querySelector('[data-action=pass]')"),'plain planning');
  check(await cdp.eval("!document.querySelector('.stock-panel')&&!document.querySelector('[data-stock-qty]')"),'Partida sin bolsa conserva interfaz');
  await cdp.eval("document.querySelector('[data-action=pass]').click()");await until(()=>cdp.eval("!!document.querySelector('#settle-form')"),'plain market');
  await cdp.eval("document.querySelector('#settle-form').requestSubmit()");await until(()=>cdp.eval("!!document.querySelector('[data-command=maintenance]')"),'plain execution');
  await cdp.eval("document.querySelector('[data-command=maintenance]').click()");await until(()=>cdp.eval("!!document.querySelector('#maintenance-form')"),'plain maintenance');
  check(await cdp.eval("!document.querySelector('#maintenance-pv')"),'Sin bolsa no se piden PV');
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
