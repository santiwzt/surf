(function(){
  document.documentElement.classList.add('js');

  /* Al abrir el link, siempre arrancar en la portada */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  function toTop(){
    if (location.hash) { try { history.replaceState(null, '', location.pathname + location.search); } catch(e){} }
    window.scrollTo(0, 0);
  }
  toTop();
  window.addEventListener('load', toTop);
  window.addEventListener('pageshow', function(e){ if (e.persisted) window.scrollTo(0, 0); });
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header sólido al bajar */
  var top = document.getElementById('top');
  var heroBg = document.querySelector('.hero-bg');
  function onScroll(){
    var y = window.scrollY || 0;
    top.classList.toggle('solid', y > 60);
    if (heroBg && !reduce && y < 1200) heroBg.style.transform = 'translateY(' + (y * 0.25) + 'px)';
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* Aparición suave de secciones */
  var items = [].slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {rootMargin:'0px 0px -8% 0px'});
    items.forEach(function(el){ io.observe(el); });
  } else {
    items.forEach(function(el){ el.classList.add('in'); });
  }

  /* Solo una pregunta abierta a la vez */
  var qs = [].slice.call(document.querySelectorAll('.qa details'));
  qs.forEach(function(d){
    d.addEventListener('toggle', function(){
      if (d.open) qs.forEach(function(o){ if (o !== d) o.open = false; });
    });
  });

  /* Copiar alias */
  var btn = document.getElementById('copy-alias'), code = document.getElementById('alias');
  if (btn){
    var done = function(){ btn.textContent = '¡Copiado!'; btn.classList.add('ok'); setTimeout(function(){ btn.textContent = 'Copiar'; btn.classList.remove('ok'); }, 1800); };
    var select = function(){ var r = document.createRange(); r.selectNodeContents(code); var s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = 'Seleccionado'; };
    btn.addEventListener('click', function(){
      try { navigator.clipboard.writeText(code.textContent.trim()).then(done, select); } catch(e){ select(); }
    });
  }
})();
