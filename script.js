<script>
// Loader
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('done'),1400));

// Cursor
const cursor=document.getElementById('cursor');
document.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
document.querySelectorAll('a,button,input,textarea,select,.gallery-item,.faq-item,.dish').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor.classList.add('hover'));
  el.addEventListener('mouseleave',()=>cursor.classList.remove('hover'));
});

// Progress + nav scroll
window.addEventListener('scroll',()=>{
  const s=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById('progress').style.width=(s/h*100)+'%';
  document.getElementById('nav').classList.toggle('scrolled',s>50);
  document.getElementById('backTop').classList.toggle('show',s>500);
});

// Theme
const theme=document.getElementById('theme');
theme.onclick=()=>{document.documentElement.classList.toggle('light');theme.textContent=document.documentElement.classList.contains('light')?'☀':'☾'};

// Open/closed status
function checkStatus(){
  const d=new Date(),day=d.getDay(),h=d.getHours();
  const open=day!==1 && h>=17 && h<23;
  document.getElementById('status').classList.toggle('closed',!open);
  document.getElementById('statusText').textContent=open?'Open Now':'Closed';
}
checkStatus();setInterval(checkStatus,60000);

// Hamburger
document.getElementById('hamburger').onclick=()=>document.getElementById('navLinks').classList.toggle('open');
document.querySelectorAll('.nav-links a').forEach(a=>a.onclick=()=>document.getElementById('navLinks').classList.remove('open'));

// Menu data
const menu={
  small:[
    {n:'Tandoori Burrata',d:'Wood-fired burrata, smoked tomato chutney, naan crisps',p:'$18',tags:['signature','veg']},
    {n:'Chili Crab Toast',d:'Soft-shell crab, kasundi mustard, brioche',p:'$22',tags:['new','spicy']},
    {n:'Truffle Samosa',d:'Black truffle, potato, pea, mint chutney',p:'$16',tags:['veg']},
    {n:'Smoked Paneer Tikka',d:'Charcoal-grilled paneer, pickled onion',p:'$17',tags:['veg','signature']}
  ],
  mains:[
    {n:'Butter Chicken Royale',d:'48-hour marinated chicken, tomato-cashew velvet',p:'$32',tags:['signature']},
    {n:'Lamb Galouti',d:'Slow-cooked lamb, 26 spices, ulte tawa paratha',p:'$38',tags:['spicy','signature']},
    {n:'Goan Sea Bass',d:'Coconut, kokum, curry leaf, jasmine rice',p:'$36',tags:['new']},
    {n:'Dal Smoked Overnight',d:'Black lentils, butter, fenugreek, naan',p:'$22',tags:['veg','signature']}
  ],
  drinks:[
    {n:'Saffron Old Fashioned',d:'Bourbon, saffron syrup, orange bitters',p:'$16',tags:['signature']},
    {n:'Curry Leaf Gimlet',d:'Gin, curry leaf cordial, lime',p:'$15',tags:['new']},
    {n:'Tamarind Margarita',d:'Mezcal, tamarind, chili salt',p:'$16',tags:['spicy']},
    {n:'Rose Lassi Spritz',d:'Rose, yogurt, prosecco',p:'$14',tags:['new']}
  ],
  dessert:[
    {n:'Cardamom Crème Brûlée',d:'Vanilla, green cardamom, saffron tuile',p:'$14',tags:['veg','signature']},
    {n:'Gulab Jamun Sundae',d:'Warm gulab jamun, rabri ice cream, pistachio',p:'$13',tags:['veg','new']},
    {n:'Mango Kulfi Sticks',d:'Alphonso mango, salted pistachio',p:'$10',tags:['veg']},
    {n:'Dark Chocolate Halwa',d:'70% chocolate, ghee, almond brittle',p:'$15',tags:['veg','signature']}
  ]
};
let activeCat='small',activeFilter='all',searchTerm='';
function renderMenu(){
  const g=document.getElementById('menuGrid');
  let items=menu[activeCat];
  if(activeFilter!=='all')items=items.filter(i=>i.tags.includes(activeFilter));
  if(searchTerm)items=items.filter(i=>i.n.toLowerCase().includes(searchTerm)||i.d.toLowerCase().includes(searchTerm));
  g.innerHTML=items.length?items.map(i=>`
    <div class="dish">
      <div class="dish-head"><div class="dish-name">${i.n}</div><div class="dish-price">${i.p}</div></div>
      <div class="dish-desc">${i.d}</div>
      <div>${i.tags.map(t=>`<span class="tag ${t}">${t}</span>`).join('')}</div>
    </div>`).join(''):'<p style="text-align:center;color:var(--cream-dim);grid-column:1/-1">No dishes match your search.</p>';
}
renderMenu();
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');activeCat=t.dataset.cat;renderMenu();
});
document.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{
  document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));
  c.classList.add('active');activeFilter=c.dataset.filter;renderMenu();
});
document.getElementById('search').oninput=e=>{searchTerm=e.target.value.toLowerCase();renderMenu()};

// Gallery
const imgs=[
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
  'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=800&q=80'
];
document.getElementById('gallery').innerHTML=imgs.map((s,i)=>`<div class="gallery-item" data-i="${i}"><img src="${s}" alt="dish"/></div>`).join('');

// Lightbox
let lbI=0;
const lb=document.getElementById('lightbox'),lbImg=document.getElementById('lbImg');
document.querySelectorAll('.gallery-item').forEach(el=>el.onclick=()=>{lbI=+el.dataset.i;lbImg.src=imgs[lbI];lb.classList.add('open')});
document.getElementById('lbClose').onclick=()=>lb.classList.remove('open');
document.getElementById('lbPrev').onclick=()=>{lbI=(lbI-1+imgs.length)%imgs.length;lbImg.src=imgs[lbI]};
document.getElementById('lbNext').onclick=()=>{lbI=(lbI+1)%imgs.length;lbImg.src=imgs[lbI]};
lb.onclick=e=>{if(e.target===lb)lb.classList.remove('open')};

// Testimonials
const tests=[
  {q:'The lamb galouti melted before I could blink. This is the best Indian meal I have had outside Delhi.',a:'Maya R. · Food Critic',s:5},
  {q:'A sensory evening. The smoked dal alone is worth the trip — twice.',a:'James K. · Regular Guest',s:5},
  {q:'Booked for our anniversary. They turned a dinner into a memory.',a:'Priya & Sam',s:5},
  {q:'Every cocktail tells a story. The saffron old fashioned is criminal.',a:'Leo B. · Bartender',s:5}
];
let ti=0;
function showT(){
  const t=tests[ti];
  document.getElementById('testimonial').innerHTML=`<div class="t-stars">${'★'.repeat(t.s)}</div><div class="t-quote">"${t.q}"</div><div class="t-author">— ${t.a}</div>`;
  document.querySelectorAll('.dots .dot').forEach((d,i)=>d.classList.toggle('active',i===ti));
}
document.getElementById('dots').innerHTML=tests.map((_,i)=>`<button class="dot ${i===0?'active':''}" data-i="${i}"></button>`).join('');
document.querySelectorAll('.dots .dot').forEach(d=>d.onclick=()=>{ti=+d.dataset.i;showT()});
showT();setInterval(()=>{ti=(ti+1)%tests.length;showT()},5500);

// FAQ
const faqs=[
  ['Do you take walk-ins?','Yes, but Friday and Saturday fill fast. Reservations are strongly recommended.'],
  ['Are you vegetarian friendly?','Absolutely — over 40% of our menu is vegetarian, and most can be made vegan on request.'],
  ['Do you host private events?','Yes. Our back room seats up to 24 for private dinners. Email events@saffronandsmoke.com.'],
  ['Is there a dress code?','Smart casual. We just ask you come hungry.'],
  ['Do you offer parking?','Complimentary valet Thursday through Sunday after 6 PM.']
];
document.getElementById('faq').innerHTML=faqs.map(([q,a])=>`<div class="faq-item"><div class="faq-q"><span>${q}</span><span>+</span></div><div class="faq-a">${a}</div></div>`).join('');
document.querySelectorAll('.faq-item').forEach(f=>f.onclick=()=>f.classList.toggle('open'));

// Forms
function toast(msg){const t=document.getElementById('toast');t.textContent='✓ '+msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000)}
document.getElementById('resForm').onsubmit=e=>{e.preventDefault();toast('Reservation Received');e.target.reset()};
document.getElementById('newsForm').onsubmit=e=>{e.preventDefault();toast('Subscribed — Welcome');e.target.reset()};

// Back to top
document.getElementById('backTop').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

// Reveal
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
</script>