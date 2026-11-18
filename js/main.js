const root=document.documentElement,themeBtn=document.getElementById('themeBtn');themeBtn.addEventListener('click',()=>{const dark=root.getAttribute('data-theme')!=='dark';root.setAttribute('data-theme',dark?'dark':'light');themeBtn.textContent=dark?'☀':'☾';});
const menuBtn=document.getElementById('menuBtn'),nav=document.getElementById('navlinks');menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();document.getElementById('topBtn').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
document.querySelectorAll('img').forEach(img=>{img.referrerPolicy='no-referrer';const fallback=()=>{if(img.dataset.fb&&!img.dataset.tried){img.dataset.tried='1';img.src=img.dataset.fb}else if(img.closest('.poster')){img.classList.add('img-failed')}};img.addEventListener('error',fallback);if(img.complete&&img.naturalWidth===0&&img.getAttribute('src')){fallback()}});

const lightbox=document.createElement('div');
lightbox.className='lightbox';
lightbox.setAttribute('aria-hidden','true');
lightbox.innerHTML='<button class="lightbox-close" aria-label="Close image">&times;</button><img class="lightbox-image" alt="">';
document.body.appendChild(lightbox);

const lightboxImage=lightbox.querySelector('.lightbox-image');
const lightboxClose=lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.hobby img').forEach(img=>{
    img.style.cursor='pointer';
    img.addEventListener('click',()=>{
        lightboxImage.src=img.src;
        lightboxImage.alt=img.alt;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden','false');
    });
});

const closeLightbox=()=>{
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden','true');
};

lightboxClose.addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{
    if(e.target===lightbox)closeLightbox();
});
document.addEventListener('keydown',e=>{
    if(e.key==='Escape')closeLightbox();
});
