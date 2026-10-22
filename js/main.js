(function(){
  /* Pestañas del programa */
  var tabs=[].slice.call(document.querySelectorAll('.tab'));
  var imgs=[].slice.call(document.querySelectorAll('.stage img'));
  var caps=['Fuerza · Estabilidad · Potencia','Fuera del agua · Pileta con tabla','Superficies planas o con pendiente'];
  var cap=document.getElementById('stage-cap');
  function pick(i,focus){
    tabs.forEach(function(t,k){t.setAttribute('aria-selected',k===i);t.tabIndex=k===i?0:-1});
    imgs.forEach(function(m,k){m.classList.toggle('on',k===i)});
    cap.textContent=caps[i]; if(focus)tabs[i].focus();
  }
  tabs.forEach(function(t,k){
    t.addEventListener('click',function(){pick(k)});
    t.addEventListener('keydown',function(e){
      if(e.key==='ArrowDown'||e.key==='ArrowRight'){e.preventDefault();pick((k+1)%3,true)}
      if(e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();pick((k+2)%3,true)}
    });
  });

  /* Carrusel */
  var rail=document.getElementById('rail');
  function step(){var c=rail.querySelector('.tool');return c?c.getBoundingClientRect().width+18:300}
  document.getElementById('prev').addEventListener('click',function(){rail.scrollBy({left:-step(),behavior:'smooth'})});
  document.getElementById('next').addEventListener('click',function(){rail.scrollBy({left:step(),behavior:'smooth'})});

  /* Calculadora de packs (precios de la propuesta) */
  var P={1:{t:40000,off:0},4:{t:152000,off:5},8:{t:288000,off:10},10:{t:340000,off:15}};
  /* Si data/planes.json está disponible, los precios salen de ahí */
  fetch('data/planes.json').then(function(r){return r.json()}).then(function(j){
    j.planes.forEach(function(p){P[p.clases]={t:p.precio,off:p.descuento}});
    var on=document.querySelector('.seg button[aria-pressed="true"]'); if(on)on.click();
  }).catch(function(){});
  var fmt=function(n){return '$'+n.toLocaleString('es-AR')};
  var amt=document.getElementById('amt'),per=document.getElementById('per'),save=document.getElementById('save'),off=document.getElementById('off');
  var segs=[].slice.call(document.querySelectorAll('.seg button'));
  segs.forEach(function(b){b.addEventListener('click',function(){
    var n=+b.dataset.n,p=P[n];
    segs.forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    amt.textContent=fmt(p.t); per.textContent=fmt(p.t/n); save.textContent=fmt(40000*n-p.t);
    off.hidden=!p.off; off.textContent=p.off+'% OFF';
  })});

  /* Copiar alias */
  var btn=document.getElementById('copy-alias'),code=document.getElementById('alias');
  function done(){btn.textContent='¡Copiado!';btn.classList.add('ok');setTimeout(function(){btn.textContent='Copiar';btn.classList.remove('ok')},1800)}
  function select(){var r=document.createRange();r.selectNodeContents(code);var s=getSelection();s.removeAllRanges();s.addRange(r);btn.textContent='Seleccionado'}
  btn.addEventListener('click',function(){try{navigator.clipboard.writeText(code.textContent.trim()).then(done,select)}catch(e){select()}});
})();
