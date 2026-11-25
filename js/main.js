(function () {
  // mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // hero slideshow (sliding)
  var hero = document.querySelector('.hero');
  if (hero) {
    var track = hero.querySelector('.track');
    var dots = hero.querySelectorAll('.dots button');
    var n = track.children.length;                    // real slides
    track.appendChild(track.children[0].cloneNode(true)); // clone of first slide for a seamless loop
    track.lastElementChild.setAttribute('aria-hidden', 'true');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var pos = 0, busy = false, timer, guard;

    var setPos = function (p, animate) {
      track.style.transition = animate && !reduced ? '' : 'none';
      track.style.transform = 'translateX(-' + (p * 100) + '%)';
      pos = p;
    };
    var lightTimer, animated = false;
    var update = function () {
      var i = ((pos % n) + n) % n;
      dots.forEach(function (d, k) { d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
      clearTimeout(lightTimer);
      var apply = function () {
        hero.classList.toggle('light', i === 0);
        document.body.classList.toggle('on-light', i === 0);
      };
      if (reduced || !animated) apply(); else lightTimer = setTimeout(apply, 450); // switch menu colour mid-slide
    };
    var finish = function () {
      clearTimeout(guard);
      if (pos >= n) setPos(0, false);
      busy = false;
    };
    var move = function (target) {
      if (busy) return;
      busy = true;
      setPos(target, true);
      animated = true;
      update();
      if (reduced) finish(); else guard = setTimeout(finish, 1300);
    };
    track.addEventListener('transitionend', function (e) {
      if (e.target === track && e.propertyName === 'transform') finish();
    });
    var next = function () { move(pos + 1); };
    var prev = function () {
      if (busy) return;
      if (pos === 0) { setPos(n, false); track.getBoundingClientRect(); }
      move(pos - 1);
    };
    var start = function () {
      clearInterval(timer);
      if (reduced) return;
      timer = setInterval(next, 5500);
    };
    dots.forEach(function (d, k) { d.addEventListener('click', function () { move(k); start(); }); });
    var pb = hero.querySelector('.prev'), nb = hero.querySelector('.next');
    if (pb) pb.addEventListener('click', function () { prev(); start(); });
    if (nb) nb.addEventListener('click', function () { next(); start(); });

    // swipe on touch screens
    var x0 = null;
    hero.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { (dx < 0 ? next : prev)(); start(); }
    }, { passive: true });

    animated = false; update(); start();
  }

  // portfolio filters
  var fbtns = document.querySelectorAll('.filters button');
  var tiles = document.querySelectorAll('.tile');
  fbtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      fbtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      tiles.forEach(function (t) {
        var cats = (t.getAttribute('data-cat') || '').split(' ');
        t.hidden = !(f === 'all' || cats.indexOf(f) > -1);
      });
    });
  });

  // reveal on scroll
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
