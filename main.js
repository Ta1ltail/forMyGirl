const CONFIG = {
herName: "Lim",
tagline: "To my favorite person in the world",
lead: "Hi mahal, sorri medyo corny, For you po Mahal ko.",
heroImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
yourName: "Justin",
loveLetter: "Mahal na mahal kita palagi.",
gallery: [
    { src: "images/526982710_1061974726135682_6828209082612659011_n.jpg", caption: "" },
    { src: "images/527806679_1297551501817323_4140887724333013788_n.jpg", caption: "" },
    { src: "images/528751367_1655214335883528_1151821300699829970_n.jpg", caption: "" },
    { src: "images/529894865_696489533429106_5511638301008290015_n.jpg", caption: "" },
    { src: "images/530809794_773269151784627_8111133105196474852_n.jpg", caption: "" }
],
reasons: [
    "Ngiti mo",
    "Kung ka mag tampo",
    "Yung amoy mo",
    "Yung yakap mo",
    "Yung mata mo",
    "Yung mindset mo",
    "Yung tawa mo",
    "Kung paano mo ako i-treat",
    "Kung paano mo ako suportahan",
    "Kung paano mo ako mahalin"
],
event:{ name:"Anniversary", date:"2025-06-28T00:00:00" },
music:{ src:"yung kai - blue (official music video).mp3", title:"Our Song" },
};

document.getElementById('herName').textContent = CONFIG.herName;
document.getElementById('tagline').textContent = CONFIG.tagline;
document.getElementById('leadText').textContent = CONFIG.lead;
document.getElementById('heroImg').src = "images/mahal.jpg";
document.getElementById('yourName').textContent = CONFIG.yourName;
document.getElementById('loveLetter').textContent = CONFIG.loveLetter;


const grid = document.getElementById('galleryGrid');
grid.innerHTML = '';
CONFIG.gallery.forEach(item=>{
    const fig = document.createElement('figure');
    const img = document.createElement('img'); img.loading = 'lazy'; img.src = item.src; img.alt = item.caption || 'Photo';
    const cap = document.createElement('figcaption'); cap.textContent = item.caption || '';
    fig.appendChild(img); fig.appendChild(cap); grid.appendChild(fig);
});


const ul = document.getElementById('loveList');
CONFIG.reasons.forEach((r,i)=>{
    const li = document.createElement('li'); li.textContent = `${i+1}. ${r}`; ul.appendChild(li);
});

const hearts = document.querySelector('.hearts');
for(let i=0;i<38;i++){
    const span=document.createElement('span');
    span.style.setProperty('--x', Math.random()*100 + '%');
    span.style.setProperty('--t', 7 + Math.random()*6 + 's');
    span.style.opacity = 0.18 + Math.random()*0.35;
    span.style.filter = 'blur('+(Math.random()*1.2)+'px)';
    hearts.appendChild(span);
}

const modal = document.getElementById('surpriseModal');
document.getElementById('btnSurprise').addEventListener('click', ()=>{
    modal.classList.add('open');
    confettiBurst();
    if(navigator.vibrate) navigator.vibrate(40);
});
document.getElementById('closeModal').addEventListener('click', ()=> modal.classList.remove('open'));

document.getElementById('shareBtn').addEventListener('click', async()=>{
    try{
    if(navigator.share){ await navigator.share({ title: document.title, text: CONFIG.loveLetter, url: location.href }); }
    else{ alert('Copy this link to share: '+location.href); }
    }catch(e){ console.log(e); }
});

const audio = document.getElementById('bgm');
audio.src = CONFIG.music.src;
audio.volume = 0.8;
const btnMusic = document.getElementById('btnMusic');
let playing = false;

window.addEventListener('load', async () => {
try {
await audio.play();
playing = true;
btnMusic.textContent = 'Pause music ♪';
} catch (e) {
console.log('Autoplay blocked by browser — user must click to start music.');
}
});

btnMusic.addEventListener('click', async () => {
try {
if (!playing) {
    await audio.play();
    playing = true;
    btnMusic.textContent = 'Pause music ♪';
} else {
    audio.pause();
    playing = false;
    btnMusic.textContent = 'Play music ♪';
}
} catch (e) {
alert('Add an MP3 named ' + CONFIG.music.src + ' next to this file to enable music.');
}
});

function confettiBurst(){
    const box = document.getElementById('confetti');
    for(let i=0;i<140;i++){
    const p = document.createElement('i');
    const size = 6 + Math.random()*10;
    p.style.width = size+'px'; p.style.height = (size*1.4)+'px';
    p.style.left = Math.random()*100 + 'vw';
    p.style.background = `hsl(${Math.random()*360}, 90%, 60%)`;
    p.style.top = '-5vh';
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    p.style.animationDuration = (900 + Math.random()*1200) + 'ms';
    p.style.opacity = .9;
    box.appendChild(p);
    setTimeout(()=> p.remove(), 1800);
    }
}

const eventName = document.getElementById('eventName');
const eventDate = document.getElementById('eventDate');
eventName.textContent = CONFIG.event.name;

const base = new Date(CONFIG.event.date); 

function getNextOccurrence() {
const now = new Date();
const next = new Date(
    now.getFullYear(),
    base.getMonth(),  
    base.getDate(),    
    base.getHours(),
    base.getMinutes(),
    base.getSeconds()
);

if (next <= now) next.setFullYear(next.getFullYear() + 1);
return next;
}

let targetDate = getNextOccurrence();
eventDate.textContent = targetDate.toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' });

function updateCountdown() {
const now = new Date();

if (now >= targetDate) {
    targetDate = getNextOccurrence();
    eventDate.textContent = targetDate.toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' });
}

const diffSec = Math.max(0, Math.floor((targetDate - now) / 1000));
const d  = Math.floor(diffSec / 86400);
const h  = Math.floor((diffSec % 86400) / 3600);
const m  = Math.floor((diffSec % 3600) / 60);
const ss = diffSec % 60;

document.getElementById('cdDays').textContent    = d;
document.getElementById('cdHours').textContent   = h;
document.getElementById('cdMinutes').textContent = m;
document.getElementById('cdSeconds').textContent = ss;
}

updateCountdown();

setInterval(updateCountdown, 1000);

function startMusic() {
    audio.play().then(() => {
        playing = true;
        btnMusic.textContent = 'Pause music ♪';
        console.log('Music started!');
    }).catch(err => {
        console.log('Autoplay blocked:', err);
    });

    // Remove listeners so it doesn't run twice
    document.removeEventListener('click', startMusic);
    document.removeEventListener('touchstart', startMusic);
}

// Attach listeners immediately so we catch the first tap
document.addEventListener('click', startMusic, { once: true });
document.addEventListener('touchstart', startMusic, { once: true });
