const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');

for(const archivo of ['modulos.html']){
 const sheet={innerHTML:''};
 const eventos={};
 const panel={style:{},setAttribute(){},getBoundingClientRect(){return {width:360,height:420}}};
 const ctx={window:{addEventListener(){}},document:{
  body:{append(){}},createElement(){return panel},
  addEventListener(tipo,fn){eventos[tipo]=fn},
  getElementById(id){return id==='sheet'?sheet:{checked:true,addEventListener(){}}}
 }};
 vm.createContext(ctx);
 vm.runInContext(fs.readFileSync('modulos.js','utf8'),ctx);
 vm.runInContext(fs.readFileSync('balance.js','utf8'),ctx);
 const html=fs.readFileSync(archivo,'utf8');
 vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],ctx);
 const cartas=ctx.window.modulos;
 const balance=id=>ctx.balanceModulo(cartas.find(m=>m.id===id));

 assert.equal((sheet.innerHTML.match(/<article class="card"/g)||[]).length,cartas.length);
 assert(!sheet.innerHTML.includes('NaN'));
 for(const m of cartas){
  for(const campo of ['puntos_carta','puntos_capas','puntos_ingenieros'])assert(Number.isFinite(m[campo]),`${m.id}: ${campo}`);
  const b=ctx.balanceModulo(m);
  assert.equal(Object.values(b.costosOperativos).reduce((a,v)=>a+v,0),b.operativos);
  if(m.puntos_otros===null){assert.equal(b.base,null);assert.equal(b.coef,null);}
  else assert.equal(b.base,m.puntos_carta+m.puntos_capas+m.puntos_ingenieros+(m.puntos_otros||0)+3*m.discos+9*m.disco_soporte);
  const tarjeta=ctx.render(m);
  assert(tarjeta.includes('data-balance="'+ctx.escapeHTML(ctx.diagnosticoBalance(m,b))+'"'));
 }
 const carta={dataset:{balance:'Diagnóstico de prueba'},setAttribute(){},removeAttribute(){},contains(){return false}};
 const hijo={closest(){return carta}};
 eventos.pointerover({target:hijo,clientX:900,clientY:700});
 assert.equal(panel.hidden,false);
 assert.equal(panel.textContent,'Diagnóstico de prueba');
 assert(Number.parseFloat(panel.style.left)>=12);
 assert(Number.parseFloat(panel.style.top)+420<=768);
 eventos.pointerout({relatedTarget:null});
 assert.equal(panel.hidden,true);
 eventos.pointerover({target:hijo,clientX:100,clientY:100});
 eventos.keydown({key:'Escape'});
 assert.equal(panel.hidden,true);
 // Una carta sintética permite comprobar precios y sumas sin reflejar los datos migrados.
 const muestra={id:'TEST',nombre:'Diagnóstico',etapas:[{m:{Fe:2,Cu:1},o:{En:2,Tr:1,IE:1}},{m:{Ti:1},o:{}}],puntos_carta:10,puntos_capas:8,puntos_ingenieros:-8,puntos_otros:0,discos:-1,disco_soporte:2};
 const b=ctx.balanceModulo(muestra);
 assert.equal(b.materiales,11);
 assert.equal(b.operativos,15);
 assert.equal(b.costosOperativos.ingenieros,4);
 assert.equal(b.costosOperativos.energia,4);
 assert.equal(b.costosOperativos.transporte,7);
 assert.equal(b.costosOperativos.otros,0);
 assert.equal(b.costo,26);
 assert.equal(b.aproximados,10);
 assert.equal(b.discos,-3);
 assert.equal(b.soporte,18);
 assert.equal(b.base,25);
 assert(Math.abs(b.costoAjustado-75.14)<1e-8);
 assert(Math.abs(b.coef-75.14/25)<1e-8);
 const diagnostico=ctx.diagnosticoBalance(muestra,b);
 assert(!diagnostico.includes('Costo de operativos:'));
 assert(!diagnostico.includes('Puntos aproximados (suma):'));
 assert.equal(balance('P064').capas,40);
 assert.equal(balance('P071').capas,12);
 assert.equal(balance('P072').aproximados,4);
 assert.equal(balance('P067').ingenieros,-12);
 assert.equal(balance('P067').aproximados,8);
 assert.equal(balance('P082').ingenieros,-8);
 assert.equal(balance('P062').capas,-4);
 assert.equal(balance('P078').capas,-6);
 assert.equal(balance('P080').base,null);
 assert.equal(balance('P001').base,0);
 assert.equal(balance('P001').coef,null);
 vm.runInContext('supuestosBalance.costoIngenieroAnclado=3',ctx);
 assert.equal(balance('P067').ingenieros,-9);
 assert.equal(balance('P067').aproximados,11);
 console.log(`${archivo}: ${cartas.length} cartas y diagnóstico verificados.`);
}
