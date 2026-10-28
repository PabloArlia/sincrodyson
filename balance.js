// Supuestos de balance; no modifican las reglas ni los puntos impresos.
const supuestosBalance={puntosDisco:3,puntosSoporte:9,costoIngenieroAnclado:4,costoIngeniero:4,costoEnergia:2,costoTransporte:7,factorEtapa:1.5};
const codigosIngenieros=['II','IQ','IE','IM','IS','AE','AM','AQ','AS','AI','EE','EM','EQ','SX','EI'];
function costoOperativo(id){
 if(id==='En')return supuestosBalance.costoEnergia;
 if(id==='Tr')return supuestosBalance.costoTransporte;
 return codigosIngenieros.includes(id)?supuestosBalance.costoIngeniero:3;
}
function balanceModulo(m){
 const suma=valores=>valores.every(Number.isFinite)?valores.reduce((a,b)=>a+b,0):null;
 const carta=m.puntos_carta,capas=m.puntos_capas,otros=m.puntos_otros===undefined?0:m.puntos_otros;
 const ingenieros=Number.isFinite(m.puntos_ingenieros)?m.puntos_ingenieros*supuestosBalance.costoIngenieroAnclado/4:null;
 const aproximados=suma([carta,capas,ingenieros,otros]);
 const discos=(m.discos||0)*supuestosBalance.puntosDisco;
 const soporte=(m.disco_soporte||0)*supuestosBalance.puntosSoporte;
 const base=aproximados===null?null:aproximados+discos+soporte;
 const materiales=m.etapas.reduce((s,e)=>s+Object.entries(e.m||{}).reduce((a,[id,n])=>a+n*(precios[id]||0),0),0);
 const costosOperativos={ingenieros:0,energia:0,transporte:0,otros:0};
 for(const etapa of m.etapas){
  for(const [id,n] of Object.entries(etapa.o||{})){
   if(id==='En')costosOperativos.energia+=n*costoOperativo(id);
   else if(id==='Tr')costosOperativos.transporte+=n*costoOperativo(id);
   else if(codigosIngenieros.includes(id))costosOperativos.ingenieros+=n*costoOperativo(id);
   else costosOperativos.otros+=n*costoOperativo(id);
  }
 }
 const costo=costoModulo(m),etapas=m.etapas.length,factor=Math.pow(supuestosBalance.factorEtapa,etapas),costoAjustado=costo*factor;
 const coef=base?costoAjustado/base:null;
 return {carta,capas,ingenieros,otros,aproximados,discos,soporte,base,materiales,costosOperativos,operativos:costo-materiales,costo,etapas,factor,costoAjustado,coef};
}
function diagnosticoBalance(m,b){
 const numero=n=>Number.isFinite(n)?n.toLocaleString('es-AR',{maximumFractionDigits:2}):'Pendiente';
 return [
  `${m.id} · ${m.nombre}`,
  `Costo de materiales: $${numero(b.materiales)}`,
  `Costo de ingenieros: $${numero(b.costosOperativos.ingenieros)}`,
  `Costo de energía: $${numero(b.costosOperativos.energia)}`,
  `Costo de transporte: $${numero(b.costosOperativos.transporte)}`,
  ...(b.costosOperativos.otros?[`Costo de otros operativos: $${numero(b.costosOperativos.otros)}`]:[]),
  `Costo total: $${numero(b.costo)}`,
  `Etapas: ${b.etapas}; factor: 1,7 ^ ${b.etapas} = ${numero(b.factor)}`,
  `Costo multiplicado por etapas: $${numero(b.costoAjustado)}`,
  '',
  `Puntos de carta (fijos): ${numero(b.carta)}`,
  `Puntos por ingenieros: ${numero(b.ingenieros)} (−${supuestosBalance.costoIngenieroAnclado} por anclado)`,
  `Otros puntos estimados: ${numero(b.otros)}`,
  `Puntos por discos de sector: ${numero(b.discos)} (${m.discos||0} × ${supuestosBalance.puntosDisco})`,
  `Puntos por discos de soporte: ${numero(b.soporte)} (${m.disco_soporte||0} × ${supuestosBalance.puntosSoporte})`,
  `Puntos base: ${numero(b.base)}`,
  `Coeficiente: ${numero(b.coef)}`,
  ...(m.balance_pendiente?.length?['','Revisar:',...m.balance_pendiente]:[])
 ].join('\n');
}
function activarDiagnosticoBalance(){
 const panel=document.createElement('div');
 panel.id='diagnostico-balance';
 panel.className='balance-tooltip';
 panel.setAttribute('role','tooltip');
 panel.hidden=true;
 document.body.append(panel);
 let activa=null;
 function ocultar(){
  activa?.removeAttribute('aria-describedby');
  activa=null;
  panel.hidden=true;
 }
 function posicionar(x,y){
  const margen=12,ancho=window.innerWidth||1024,alto=window.innerHeight||768;
  const rect=panel.getBoundingClientRect();
  const izquierda=x+16+rect.width>ancho-margen?x-rect.width-16:x+16;
  panel.style.left=Math.max(margen,Math.min(izquierda,ancho-rect.width-margen))+'px';
  panel.style.top=Math.max(margen,Math.min(y+16,alto-rect.height-margen))+'px';
 }
 function mostrar(carta,x,y){
  if(activa!==carta){
   activa?.removeAttribute('aria-describedby');
   activa=carta;
   panel.textContent=carta.dataset.balance;
   carta.setAttribute('aria-describedby',panel.id);
  }
  panel.hidden=false;
  posicionar(x,y);
 }
 document.addEventListener('pointerover',evento=>{
  const carta=evento.target.closest('.card[data-balance]');
  if(carta)mostrar(carta,evento.clientX,evento.clientY);
  else ocultar();
 });
 document.addEventListener('pointermove',evento=>{if(activa)posicionar(evento.clientX,evento.clientY)});
 document.addEventListener('pointerout',evento=>{
  if(activa&&!activa.contains(evento.relatedTarget))ocultar();
 });
 document.addEventListener('focusin',evento=>{
  const carta=evento.target.closest('.card[data-balance]');
  if(carta){const rect=carta.getBoundingClientRect();mostrar(carta,rect.right,rect.top)}
 });
 document.addEventListener('focusout',ocultar);
 document.addEventListener('keydown',evento=>{if(evento.key==='Escape')ocultar()});
 window.addEventListener('blur',ocultar);
 window.addEventListener('beforeprint',ocultar);
}
function resumenCartas(cartas){
 const tipos=new Map();
 for(const carta of cartas){
  if(!tipos.has(carta.tipo))tipos.set(carta.tipo,{tipo:carta.tipo,total:0,unicas:0,discos:0});
  const grupo=tipos.get(carta.tipo);
  grupo.total+=carta.copias??1;
  const campoDiscos=['sensores','control','mantenimiento'].includes(carta.tipo)?'disco_soporte':'discos';
  grupo.discos+=(carta.copias??1)*(carta[campoDiscos]??0);
  grupo.unicas++;
 }
 return {tipos:[...tipos.values()],total:[...tipos.values()].reduce((s,t)=>s+t.total,0),unicas:cartas.length,discos:[...tipos.values()].reduce((s,t)=>s+t.discos,0)};
}
function renderResumenCartas(cartas){
 const resumen=resumenCartas(cartas);
 const nombres={bateria:'Baterías',economia:'Economía',estructura:'Estructura',fotovoltaico:'Fotovoltaica',transmision:'Transmisión',refrigeracion:'Refrigeración',microondas:'Microondas',generador:'Generadores',mejora_soporte_externo:'Mejoras de soporte',recursoshumanos:'Recursos humanos',produccion:'Producción',sensores:'Sensores',control:'Control',mantenimiento:'Mantenimiento'};
 return resumen.tipos.map(t=>`<div class="summary-row" title="${escapeHTML(nombres[t.tipo]||t.tipo)}: ${t.discos} discos (copias × ${['sensores','control','mantenimiento'].includes(t.tipo)?'disco_soporte':'discos'})" aria-label="${escapeHTML(nombres[t.tipo]||t.tipo)}: ${t.total} cartas, ${t.unicas} únicas, ${t.discos} discos"><span class="summary-icon">${imagenIcono(tiposIcono[t.tipo]||'PR')}</span><span>: ${t.total} (${t.unicas}) &bull; ${t.discos}</span></div>`).join('')+`<div class="summary-row summary-total">Σ : ${resumen.total} (${resumen.unicas}) &bull; ${resumen.discos}</div>`;
}
