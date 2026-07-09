(function(){
  function init(){
    var host=document.getElementById('rh-tltabs');
    if(!host||host.dataset.rhtInit)return; host.dataset.rhtInit='1';
    host.innerHTML='<div id="rht-timeline" class="rht" aria-label="The Original Rich\'s Ice Cream history timeline"><div class="rht-track" role="tablist" aria-label="Company milestones"></div><div class="rht-stage"></div></div>';
    var root=document.getElementById('rht-timeline');
    if(!root)return;

  var IMG='https://oakleafdave.github.io/richs-ice-cream/assets/img/';
  var items=[
    {year:'1955',title:'The first stand',kind:'founding',photo:IMG+'fam2.jpg',text:'Rich &amp; June Gutwein open one of Ocean County&rsquo;s first Carvel stands at Route 37 East &amp; King Street in Toms River &mdash; homemade soft-serve, one little window, and a line down the block all summer long.'},
    {year:'1958',title:'A family business',kind:'milestone',photo:IMG+'fam3.jpg',text:'What began as a summer stand becomes the family&rsquo;s life&rsquo;s work. The Gutwein kids grow up behind the counter, learning the recipes that still run the shop today.'},
    {year:'1965',title:'The Richie Bar is born',kind:'signature',text:'Rich perfects his own chocolate-dipped ice cream bar &mdash; the legendary Richie Bar &mdash; drops the franchise, and strikes out under the family name: Rich&rsquo;s Ice Cream.'},
    {year:'1980s',title:'The next generation',kind:'milestone',photo:IMG+'fam1.jpg',text:'The second generation steps up in their Rich&rsquo;s shirts. Same hand-cranked recipes, same shore families coming back summer after summer.'},
    {year:'Today',title:'Third generation',kind:'milestone',photo:IMG+'richs-shop-today.jpg',text:'Grandson Hunter Gutwein carries the tradition forward across three shore shops &mdash; Lanoka Harbor, Toms River &amp; Manahawkin &mdash; still scooping the Richie Bar the original way.'},
    {year:'2026',title:'Surf City opens',kind:'branch',city:'Surf City',addr:'512 Long Beach Blvd',text:'Rich&rsquo;s brings the Richie Bar to the island. Our newest shop opens on Long Beach Blvd in Surf City &mdash; four locations, one seventy-year-old family recipe.'}
  ];
  var KIND={founding:'The Founding',milestone:'Milestone',signature:'Our Signature',branch:'Now Open'};
  var PIN='<svg class="rht-pin" viewBox="0 0 24 24" fill="#e0b34e" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
  var CONE='<svg class="rht-emblem-ico" viewBox="0 0 24 24" fill="none" stroke="#e0b34e" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M7 9a5 5 0 0 1 10 0"/><path d="M6.6 9.4a3 3 0 0 0 3 2.1 3 3 0 0 0 2.4 1.2 3 3 0 0 0 2.4-1.2 3 3 0 0 0 3-2.1"/><path d="M7.6 12.5 12 22l4.4-9.5"/></svg>';
  var track=root.querySelector('.rht-track'), stage=root.querySelector('.rht-stage');
  var line=document.createElement('div'); line.className='rht-line';
  var fill=document.createElement('span'); fill.className='rht-fill'; line.appendChild(fill); track.appendChild(line);
  items.forEach(function(it,i){
    var n=document.createElement('button');
    n.className='rht-node'; n.type='button'; n.setAttribute('role','tab');
    n.id='rht-t'+i; n.setAttribute('aria-controls','rht-p'+i); n.setAttribute('aria-selected','false'); n.tabIndex=-1;
    n.innerHTML='<span class="rht-dot"></span><span class="rht-yr">'+it.year+'</span>';
    track.appendChild(n);
    var media;
    if(it.kind==='branch') media='<div class="rht-media branch">'+PIN+'<div class="rht-city">'+it.city+', NJ</div><div class="rht-addr">'+it.addr+'</div><div class="rht-sub">Now open</div></div>';
    else if(it.photo&&it.year==='Today') media='<div class="rht-media photo"><img src="'+it.photo+'" alt="Rich&rsquo;s Ice Cream shop today" loading="lazy"></div>';
    else if(it.photo) media='<div class="rht-media hist"><img src="'+it.photo+'" alt="The Original Rich&rsquo;s Ice Cream, '+it.year+'" loading="lazy"></div>';
    else media='<div class="rht-media emblem"><span class="rht-wm">'+it.year+'</span>'+CONE+'</div>';
    var p=document.createElement('article');
    p.className='rht-panel'; p.id='rht-p'+i; p.setAttribute('role','tabpanel'); p.setAttribute('aria-labelledby','rht-t'+i);
    p.innerHTML='<div class="rht-body"><span class="rht-kind">'+(KIND[it.kind]||'Milestone')+'</span><div class="rht-pyr">'+it.year+'</div><div class="rht-h3">'+it.title+'</div><p class="rht-p">'+it.text+'</p></div>'+media;
    stage.appendChild(p);
  });
  var nodes=[].slice.call(track.querySelectorAll('.rht-node'));
  var panels=[].slice.call(stage.querySelectorAll('.rht-panel'));
  var cur=-1, timer=null;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var canHover=window.matchMedia&&window.matchMedia('(hover:hover)').matches;
  function center(i){var n=nodes[i]; track.scrollTo({left:n.offsetLeft-track.clientWidth/2+n.offsetWidth/2, behavior:reduce?'auto':'smooth'});}
  function activate(i,focus){
    if(i===cur)return; cur=i;
    nodes.forEach(function(n,j){var on=j===i; n.setAttribute('aria-selected',on?'true':'false'); n.tabIndex=on?0:-1;});
    panels.forEach(function(p,j){p.classList.toggle('active',j===i);});
    fill.style.width=(nodes.length>1?(i/(nodes.length-1))*100:100)+'%';
    center(i); if(focus)nodes[i].focus();
  }
  function next(){activate((cur+1)%nodes.length);}
  function play(){if(reduce||timer)return; timer=setInterval(next,4200);}
  function stop(){clearInterval(timer); timer=null;}
  nodes.forEach(function(n,i){
    n.addEventListener('click',function(){stop();activate(i,true);});
    if(canHover)n.addEventListener('mouseenter',function(){activate(i);});
    n.addEventListener('focus',function(){stop();activate(i);});
    n.addEventListener('keydown',function(e){
      var t=null;
      if(e.key==='ArrowRight'||e.key==='ArrowDown')t=(i+1)%nodes.length;
      else if(e.key==='ArrowLeft'||e.key==='ArrowUp')t=(i-1+nodes.length)%nodes.length;
      else if(e.key==='Home')t=0; else if(e.key==='End')t=nodes.length-1;
      if(t!==null){e.preventDefault();stop();activate(t,true);}
    });
  });
  root.addEventListener('mouseenter',stop);
  root.addEventListener('mouseleave',play);
  root.addEventListener('focusout',function(e){if(!root.contains(e.relatedTarget))play();});
  activate(0);
  if('IntersectionObserver'in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?play():stop();});},{threshold:.2});
    io.observe(root);
  }
  document.addEventListener('visibilitychange',function(){if(document.hidden)stop();});

  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
