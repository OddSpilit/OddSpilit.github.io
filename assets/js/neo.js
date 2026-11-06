/* ---------- terminal typewriter ---------- */
(function(){
  var el = document.getElementById('term'); if(!el) return;
  var lines;
  try { lines = JSON.parse(el.getAttribute('data-lines')); } catch(e){ return; }
  var i = 0, buf = '';
  function nextLine(){
    if (i >= lines.length){ el.innerHTML = buf + '<span class="cursor"></span>'; return; }
    var L = lines[i], txt = L[1], cls = L[0], k = 0;
    if (cls === 'c'){
      (function type(){
        if (k <= txt.length){
          el.innerHTML = buf + '<div class="'+cls+'">'+ (cls==='c'?'<span class="p">$ </span>':'') + txt.slice(0,k) + '</div><span class="cursor"></span>';
          k++; setTimeout(type, 26);
        } else { buf += '<div class="'+cls+'"><span class="p">$ </span>'+txt+'</div>'; i++; setTimeout(nextLine, 380); }
      })();
    } else {
      buf += '<div class="'+cls+'">'+txt+'</div>'; i++;
      el.innerHTML = buf + '<span class="cursor"></span>';
      setTimeout(nextLine, 170);
    }
  }
  setTimeout(nextLine, 500);
})();

/* ---------- count up ---------- */
(function(){
  var els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      var t = +e.target.getAttribute('data-count'), s = null, dur = 1300;
      function step(ts){
        if (!s) s = ts;
        var pr = Math.min((ts-s)/dur, 1), ease = 1 - Math.pow(1-pr, 3);
        e.target.textContent = Math.floor(t*ease).toLocaleString('en-US');
        if (pr < 1) requestAnimationFrame(step); else e.target.textContent = t.toLocaleString('en-US');
      }
      requestAnimationFrame(step);
    });
  }, {threshold:.4});
  els.forEach(function(e){ io.observe(e); });
})();

/* ---------- reveal on scroll ---------- */
(function(){
  var els = document.querySelectorAll('.rv'); if(!els.length) return;
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.08, rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(e,i){ e.style.transitionDelay = (Math.min(i,8)*55)+'ms'; io.observe(e); });
})();

/* ---------- category filter ---------- */
(function(){
  var chips = document.querySelectorAll('.chip'); if(!chips.length) return;
  var cards = document.querySelectorAll('.card[data-cat]');
  chips.forEach(function(ch){
    ch.addEventListener('click', function(){
      chips.forEach(function(c){ c.classList.remove('on'); });
      ch.classList.add('on');
      var f = ch.getAttribute('data-f');
      cards.forEach(function(cd){
        var show = (f === 'all' || cd.getAttribute('data-cat') === f);
        cd.style.display = show ? '' : 'none';
      });
    });
  });
})();


/* ---------- theme switch ---------- */
(function(){
  var btn = document.getElementById('tsw'), val = document.getElementById('tswv');
  if (!btn) return;
  var root = document.documentElement;
  function paint(){ if (val) val.textContent = root.getAttribute('data-theme') || 'dark'; }
  paint();
  btn.addEventListener('click', function(){
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch(e){}
    paint();
  });
  // 跟随系统（仅当用户没手动选过）
  try {
    if (!localStorage.getItem('theme') && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e){
        root.setAttribute('data-theme', e.matches ? 'light' : 'dark'); paint();
      });
    }
  } catch(e){}
})();

/* ---------- hover scramble on skill names ---------- */
(function(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;
  var CH = 'abcdefghijklmnopqrstuvwxyz0123456789-_/#$%&*';
  document.querySelectorAll('[data-scramble]').forEach(function(el){
    var real = el.getAttribute('data-scramble'), timer = null, frame = 0;
    var card = el.closest('.card') || el;
    card.addEventListener('mouseenter', function(){
      clearInterval(timer); frame = 0;
      timer = setInterval(function(){
        frame++;
        var out = '';
        for (var i = 0; i < real.length; i++){
          if (i < frame * 0.9) out += real[i];
          else if (real[i] === ' ' || real[i] === '-') out += real[i];
          else out += CH[(Math.random() * CH.length) | 0];
        }
        el.textContent = out;
        if (frame * 0.9 >= real.length){ clearInterval(timer); el.textContent = real; }
      }, 26);
    });
    card.addEventListener('mouseleave', function(){ clearInterval(timer); el.textContent = real; });
  });
})();
