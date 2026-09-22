function goToPage(name){
    document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
    var target = document.getElementById('page-' + name);
    if(target){ target.classList.add('active'); }
    document.querySelectorAll('.main-nav button').forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-page') === name);
    });
    document.getElementById('mainNav').classList.remove('open');
    window.scrollTo({top:0, behavior:'instant' in window ? 'instant' : 'auto'});
    runCounters();
  }
  document.querySelectorAll('[data-page]').forEach(function(btn){
    btn.addEventListener('click', function(){ goToPage(btn.getAttribute('data-page')); });
  });
  document.querySelectorAll('[data-page-link]').forEach(function(el){
    el.addEventListener('click', function(e){ e.preventDefault(); goToPage(el.getAttribute('data-page-link')); });
  });
  document.getElementById('navToggle').addEventListener('click', function(){
    document.getElementById('mainNav').classList.toggle('open');
  });

  var countedGroups = new WeakSet();
  function animateGroup(nums){
    nums.forEach(function(el){
      var target = parseInt(el.getAttribute('data-count'), 10);
      var start = 0;
      var duration = 1400;
      var startTime = null;
      function tick(ts){
        if(!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(start + (target - start) * eased);
        if(progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
  function runCounters(){
    document.querySelectorAll('.page.active .stats-band').forEach(function(band){
      if(countedGroups.has(band)) return;
      var rect = band.getBoundingClientRect();
      if(rect.top < window.innerHeight){
        countedGroups.add(band);
        animateGroup(band.querySelectorAll('.stat-num'));
      }
    });
  }
  window.addEventListener('scroll', runCounters);
  window.addEventListener('resize', runCounters);
  runCounters();
