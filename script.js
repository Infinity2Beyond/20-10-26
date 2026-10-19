let userName = "cậu";
let isWishLocked = false;
let isMoonClicked = false;
let hasCustomImage = false;

// 1. 
const wishes = [
    "Chúc cậu luôn xinh đẹp, rạng rỡ và ngập tràn niềm vui nhé!",
    "Chúc cậu một ngày nhận được thật nhiều hoa và quà!",
    "Chúc cậu mãi luôn tự tin, yêu đời và thành công trong mọi dự định!",
    "Gửi đến cậu ngàn đóa hoa tươi thắm nhất. Luôn thật hạnh phúc nha!",
    "Chúc bông hoa xinh đẹp nhất luôn tỏa sáng theo cách của riêng mình!",
    "Nụ cười của cậu rất đẹp, hãy luôn giữ nụ cười ấy trên môi nhé!",
    "Chúc cậu mỗi ngày thức dậy đều mang một niềm vui mới và một nụ cười thật tươi!",
    "Mong cậu luôn an nhiên, rạng rỡ và được vây quanh bởi những điều ấm áp nhất.",
    "Chúc cậu luôn kiên cường bước qua mọi thử thách và kiêu hãnh như một đóa hồng.",
    "Thế giới này đẹp hơn rất nhiều vì có sự xuất hiện của cậu đấy, hãy luôn hạnh phúc nhé!",
    "Mong rằng những điều dịu dàng và may mắn nhất sẽ luôn tìm đến bên cậu.",
    "Hãy cứ tự tin làm những gì cậu thích, vì cậu tuyệt vời nhất khi là chính mình!",
    "Chúc cậu luôn tràn đầy năng lượng tích cực và gặt hái được thật nhiều thành công.",
    "Gửi đến cậu một cái ôm thật ấm áp, chúc cậu có một ngày thật đặc biệt và ý nghĩa!",
    "Mong cậu một đời bình an, làm những việc mình yêu và luôn tỏa sáng rực rỡ."
];
let lastWishIndex = -1;

const ground = document.getElementById('ground');
const numFlowers = 55; 
const isMobile = window.innerWidth < 768;
const sizeMultiplier = isMobile ? 1.8 : 1; 

const flowerHTML = `
    <div class="flower-glow"></div> 
    <div class="flower-top">
        <div class="flower-petal flower-petal__1"></div>
        <div class="flower-petal flower-petal__2"></div>
        <div class="flower-petal flower-petal__3"></div>
        <div class="flower-petal flower-petal__4"></div>
        <div class="flower-petal flower-petal__5"></div>
        <div class="flower-petal flower-petal__6"></div>
        <div class="flower-petal flower-petal__7"></div>
        <div class="flower-petal flower-petal__8"></div>
        <div class="flower-circle"></div>
        <div class="flower-light flower-light__1"></div>
        <div class="flower-light flower-light__2"></div>
        <div class="flower-light flower-light__3"></div>
    </div>
    <div class="flower-bottom">
        <div class="flower-stem"></div>
        <div class="flower-leaf flower-leaf__1"></div>
        <div class="flower-leaf flower-leaf__2"></div>
        <div class="flower-leaf flower-leaf__3"></div>
        <div class="flower-leaf flower-leaf__4"></div>
        <div class="flower-leaf flower-leaf__5"></div>
        <div class="flower-leaf flower-leaf__6"></div>
        <div class="flower-grass flower-grass__1"></div>
        <div class="flower-grass flower-grass__2"></div>
    </div>`;

// 2. RẢI HOA BẰNG TOÁN HỌC (FIBONACCI PHYLLOTAXIS)
let gridPositions = [];
const centerX = 50; 
const centerY = isMobile ? 80 : 70; 
const spreadX = isMobile ? 7 : 4.5; 
const spreadY = isMobile ? 2 : 2; 
const goldenAngle = 137.5 * (Math.PI / 180);

let n = 2; 
let added = 0;

while (added < numFlowers) {
    let radius = Math.sqrt(n);
    let angle = n * goldenAngle;

    let posX = centerX + (radius * Math.cos(angle) * spreadX);
    let posY = centerY + (radius * Math.sin(angle) * spreadY);

    let jitterX = (Math.random() - 0.5) * 1.5;
    let jitterY = (Math.random() - 0.5) * 1;

    if (posX > 2 && posX < 98 && posY > 53 && posY < 95) {
        gridPositions.push({ x: posX + jitterX, y: posY + jitterY });
        added++;
    }
    n++;
    if (n > 1000) break;
}

const fragment = document.createDocumentFragment();
const popup = document.getElementById('wish-popup');
const wishText = document.getElementById('wish-text');
const bgMusic = document.getElementById('bg-music');
const flowers = document.querySelectorAll('.flower-container');
const startBtn = document.getElementById('start-btn');
const nameInput = document.getElementById('username-input');
const wishTitle = document.getElementById('wish-title');
const introScreen = document.getElementById('intro-screen');


let unreadWishes = [...wishes];
const totalWishes = wishes.length;

const showWish = (e) => {
    if (!isMoonClicked) {
        wishTitle.innerText = `Gợi ý cho ${userName} nè`;
        wishText.innerHTML = 'Hãy chạm vào vầng trăng sáng nhé...';
        popup.classList.remove('hidden');
        return;
    }

    if (isWishLocked) return;

    const clickedFlower = e.currentTarget;
    if (clickedFlower && !clickedFlower.classList.contains('collected')) {
        clickedFlower.classList.add('collected');
    }

    if (unreadWishes.length > 0) {
        const randomIndex = Math.floor(Math.random() * unreadWishes.length);
        let rawWish = unreadWishes[randomIndex];
        let personalizedWish = rawWish.replace(/cậu/gi, userName);
        
        // Xóa lời chúc vừa rút khỏi túi
        unreadWishes.splice(randomIndex, 1);

        let collectedCount = totalWishes - unreadWishes.length;
        if (wishTitle) wishTitle.innerText = `💌 Tìm thấy ${collectedCount}/${totalWishes} lời chúc`;
        wishText.innerHTML = personalizedWish;
    } 
    else {
        if (wishTitle) wishTitle.innerText = `🎁 Quà tặng đặc biệt`;
        wishText.innerHTML = `Cậu đã đọc hết tất cả lời chúc trong khu vườn rồi!<br>Hãy nhấn vào <a href="https://drive.google.com/file/d/151r4ibuh031LBsCBRbw_fnpNxribYn11/view?usp=sharing" target="_blank" style="color: #ff3366; text-decoration: underline; font-weight: bold;">đường link này</a> để nhận một món quà bí mật nhé! 💖`;
    }
    
    popup.classList.remove('hidden');
};

const mainFlower = document.createElement('div');
const mainSize = 5.5 * sizeMultiplier; 
mainFlower.className = 'flower-container flower-main';
mainFlower.style.setProperty('--hue', Math.floor(Math.random() * 120) + 180);
mainFlower.style.top = `${centerY}%`;
mainFlower.style.left = `${centerX - (mainSize / 2)}%`; 
mainFlower.style.width = `${mainSize}%`;
mainFlower.style.zIndex = Math.floor(centerY);
mainFlower.innerHTML = flowerHTML;
mainFlower.addEventListener('click', showWish);
mainFlower.addEventListener('touchstart', showWish, { passive: true });
fragment.appendChild(mainFlower);

const subSize = 4.5 * sizeMultiplier; 
for (let i = 0; i < gridPositions.length; i++) {
    const flower = document.createElement('div');
    flower.className = 'flower-container';
    flower.style.setProperty('--hue', Math.floor(Math.random() * 120) + 180);
    flower.style.top = `${gridPositions[i].y}%`;
    flower.style.left = `${gridPositions[i].x - (subSize / 2)}%`; 
    flower.style.width = `${subSize}%`;
    flower.style.zIndex = Math.floor(gridPositions[i].y);
    flower.innerHTML = flowerHTML;

    flower.addEventListener('dblclick', showWish);
    fragment.appendChild(flower);
    let lastTap = 0;
    flower.addEventListener('touchstart', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 300 && tapLength > 0) {
            showWish(e);
            e.preventDefault(); 
        } else {
            if (!flower.classList.contains('sway')) {
                flower.classList.add('sway');
                setTimeout(() => flower.classList.remove('sway'), 800);
            }
        }
        lastTap = currentTime;
    }, { passive: false });
}
ground.appendChild(fragment); 

// KỊCH BẢN

function handleStart() {
    nameInput.blur();
    introScreen.style.pointerEvents = 'none';
    
    let name = nameInput.value.trim();
    if (name) userName = name; 
    document.title = `Gửi tặng ${userName} 🌸`;

    introScreen.style.opacity = '0';

    setTimeout(() => {
        introScreen.style.display = 'none'; 
        window.scrollTo(0, 0); 

        const mainScene = document.getElementById('main-scene');
        mainScene.style.display = 'block'; 
        void mainScene.offsetWidth; 
        mainScene.style.opacity = '1'; 

        ground.classList.add('start-zoom');
        const mainFlower = document.querySelector('.flower-main');
        if (mainFlower) mainFlower.classList.add('animate');
        
        const moon = document.getElementById('moon');
        if(moon) {
            moon.classList.add('moon-activate');
            moon.addEventListener('click', cinemaIntro, { once: true });
        }
    }, 600); 
}

startBtn.addEventListener('click', handleStart);
nameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleStart(); });

// THƠ, TRĂNG 
function typeSkyPoem() {
    const element = document.getElementById('sky-poem');
    if (!element) return;
    
    const text = element.getAttribute('data-text');
    element.innerHTML = '<span class="text-content"></span><span class="typing-cursor" style="color:#ff3366">|</span>'; 
    const textContent = element.querySelector('.text-content');
    const cursor = element.querySelector('.typing-cursor');
    
    let i = 0;
    const speed = 55;

    function typing() {
        if (i < text.length) {
            let char = text.charAt(i);
            textContent.innerHTML += (char === '|') ? "<br>" : char;
            i++;
            setTimeout(typing, speed);
        } else {
            cursor.style.display = 'none'; 
        }
    }
    typing();
}

// HIỆU ỨNG

function cinemaIntro() {
    isMoonClicked = true;
    isWishLocked = true;

    moon.style.opacity = "0";
    moon.style.transform = "translate(-50%, -50%) scale(0)";

    bgMusic.play();
    if(mainFlower) mainFlower.style.animationPlayState = 'paused';

    typeSkyPoem();
}

function dropPetalsToBase() {
    const mainPetals = document.querySelectorAll('.flower-main .flower-petal');
    
    let xPositions = [-80, -60, -45, -30, 30, 45, 60, 80];
    
    xPositions.sort(() => Math.random() - 0.5); 
    
    mainPetals.forEach((petal, index) => {
        setTimeout(() => {
            const currentTransform = window.getComputedStyle(petal).transform;
            petal.style.animation = "none";
            petal.style.opacity = "1";
            void petal.offsetWidth;

            const baseDropX = xPositions[index]; 
            
            const dropX = baseDropX + (Math.random() - 0.5) * 20; 
            
            const dropY = 80 + Math.random() * 40;   
            
            const dropRotZ = Math.random() * 360;     
            
            petal.style.transition = "all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            petal.style.transform = `translate(${dropX}px, ${dropY}px) ${currentTransform} rotateZ(${dropRotZ}deg) scale(0.6)`;
            
        }, index * 1500); 
    });
}

function glowFallenPetals() {
    const mainPetals = document.querySelectorAll('.flower-main .flower-petal');
    mainPetals.forEach((petal, index) => {
        setTimeout(() => {
            petal.classList.add('petal-glow');
        }, index * 1500); 
    });
}

function showDaytimeScene() {
    
    document.body.classList.add('daytime'); 
    
    const skyPoem = document.getElementById('sky-poem');
    if(skyPoem) skyPoem.classList.add('poem-fade-out');

    const mainPetals = document.querySelectorAll('.flower-main .flower-petal');
    mainPetals.forEach(p => p.style.opacity = "0"); 

    const flowers = document.querySelectorAll('.flower-container');
    flowers.forEach((f, idx) => {
        if(!f.classList.contains('flower-main')) {
            setTimeout(() => f.classList.add('animate'), idx * 50);
        }
    });
    
    const dayWish = document.createElement('div');
    dayWish.className = 'daylight-wish';
    dayWish.innerHTML = `Mong ${userName} luôn rực rỡ<br>như những đóa hoa này nha!`;
    document.body.appendChild(dayWish);
    
    setTimeout(() => {
        dayWish.classList.add('show');
        createBlowingPetals();
        isWishLocked = false;
    }, 2500);
}

// TIMELINE
let isZoomed = false;
let isPetalsDropped = false;
let isPetalsGlowed = false;
let hasDaytimeStarted = false; 

bgMusic.addEventListener('timeupdate', () => {
    const currentTime = bgMusic.currentTime;

    if (currentTime >= 14 && !isZoomed) {
        isZoomed = true;
        document.body.classList.add('camera-zoom-in');
    }

    if (currentTime >= 15 && !isPetalsDropped) {
        isPetalsDropped = true;
        dropPetalsToBase();
    }

    if (currentTime >= 28 && !isPetalsGlowed) {
        isPetalsGlowed = true;
        glowFallenPetals();
    }

    if (currentTime >= 40 && !hasDaytimeStarted) {
        hasDaytimeStarted = true;
        document.body.classList.remove('camera-zoom-in'); 
        document.body.classList.add('camera-zoom-out');   
        showDaytimeScene();
    }

    const timeLeft = bgMusic.duration - currentTime;
    if (timeLeft <= 15 && !skyHeart.classList.contains('animate-heart')) {
        skyHeart.classList.add('animate-heart');
        setTimeout(() => {
            skyHeart.classList.add('fill-blue');
            const centerBtn = document.getElementById('heart-center-btn');
            if (centerBtn) centerBtn.classList.remove('hidden');
        }, 4000);
    }
});


// OUTRO
function createStars() {
    for (let i = 0; i < (isMobile ? 50 : 100); i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 60 + 'vh';
        star.style.width = (Math.random() * 2 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(star);
    }
}
createStars();

const skyHeart = document.createElement('div');
const bgMusic2 = document.getElementById('bg-music-2');

skyHeart.className = 'sky-heart';
skyHeart.innerHTML = `<svg style="background:transparent" viewBox="0 0 100 100"><path class="heart-path" d="M50 85 C50 85 10 55 10 30 C10 10 35 10 50 30 C65 10 90 10 90 30 C90 55 50 85 50 85 Z" /></svg>`;
document.body.appendChild(skyHeart);

const centerBtn = document.getElementById('heart-center-btn');
if (centerBtn) {
    skyHeart.appendChild(centerBtn); 
}

if (centerBtn) {
    centerBtn.addEventListener('click', () => {
        document.getElementById('main-scene').style.display = 'none';
        
        const heart = document.querySelector('.sky-heart');
        if (heart) heart.style.display = 'none';
        
        const dayWish = document.querySelector('.daylight-wish');
        if (dayWish) dayWish.style.display = 'none';

        if (bgMusic) bgMusic.pause();
        if (bgMusic2) bgMusic2.play();

        const roseScreen = document.getElementById('rose-screen');
        document.body.style.transform = 'none';

        roseScreen.classList.remove('hidden');
        roseScreen.style.zIndex = '999999';
        startAutoBloomRose(); 
    });
}

document.getElementById('close-wish').onclick = () => document.getElementById('wish-popup').classList.add('hidden');

function createClouds() {
    const numClouds = isMobile ? 7 : 11;
    for (let i = 0; i < numClouds; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = (Math.random() * 35 + 5) + '%'; 
        cloud.style.left = (Math.random() * 80) + '%';
        const scale = 0.4 + Math.random() * 0.6;
        cloud.style.setProperty('--scale', scale);
        cloud.style.animationDuration = (Math.random() * 10 + 15) + 's';
        document.body.appendChild(cloud);
    }
}
createClouds();

function createBlowingPetals() {
    const numPetals = isMobile ? 50 : 100;
    const container = document.body;

    for (let i = 0; i < numPetals; i++) {
        setTimeout(() => {
            spawnSinglePetal(container);
            setInterval(() => spawnSinglePetal(container), Math.random() * 4000 + 4000);
        }, Math.random() * 5000);
    }
}

function spawnSinglePetal(container) {
    if (!document.body.classList.contains('daytime')) return;

    const petal = document.createElement('div');
    petal.className = 'blowing-petal';
    
    const randomHue = Math.floor(Math.random() * 120) + 180;
    petal.style.setProperty('--hue', randomHue);

    const startX = Math.random() * 100; 
    const startY = 65 + Math.random() * 35; 
    petal.style.left = `${startX}vw`;
    petal.style.top = `${startY}vh`;

    const directionX = (Math.random() > 0.3 ? 1 : -1); 
    const endX = directionX * (Math.random() * 60 + 40) + 'vw'; 
    const endY = -(Math.random() * 60 + 50) + 'vh'; 
    petal.style.setProperty('--endX', endX);
    petal.style.setProperty('--endY', endY);

    petal.style.setProperty('--rotX', Math.random() * 1080 + 'deg');
    petal.style.setProperty('--rotY', Math.random() * 1080 + 'deg');
    petal.style.setProperty('--rotZ', (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 720) + 'deg');

    const duration = Math.random() * 5 + 5; 
    petal.style.animation = `flyingPetal ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;

    container.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

document.addEventListener('touchmove', (e) => {
    if (!document.body.classList.contains('daytime')) return;

    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element) {
        const flower = element.closest('.flower-container');
        if (flower && !flower.classList.contains('sway')) {
            flower.classList.add('sway');
            setTimeout(() => flower.classList.remove('sway'), 800);
        }
    }
}, { passive: true });

document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1 || event.scale !== 1) {
        event.preventDefault(); 
    }
}, { passive: false });

let lastTouchTime = 0;
document.addEventListener('touchstart', function (event) {
    
    if (event.target.closest('.flower-container')) {
        return;
    }
    
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastTouchTime;
    
    if (timeDifference < 300 && timeDifference > 0) {
        event.preventDefault(); 
    }
    
    lastTouchTime = currentTime;
}, { passive: false });

const roseContainer = document.querySelector('.rose-container');

const showSpecialWish = (e) => {
    wishTitle.innerText = `Thân gửi ${userName} 💖`;
    wishText.innerHTML = `Lời cuối cùng, mình xin chúc ${userName} ngày 20/10 cũng như mọi ngày đều ngập tràn niềm vui, luôn tự tin, xinh đẹp và tỏa sáng rực rỡ như đóa hồng này nhé! ❤️`;
    popup.style.zIndex = '9999999';
    popup.classList.remove('hidden');
};

let isRoseFullyBloomed = false;
let lastRoseTap = 0;

function startAutoBloomRose() {
    if (!roseContainer) return;
    roseContainer.className = 'rose-container';
    isRoseFullyBloomed = false;

    setTimeout(() => {
        roseContainer.className = 'rose-container bloom-1';
    }, 500);

    setTimeout(() => {
        roseContainer.className = 'rose-container bloom-2';
    }, 2200);

    setTimeout(() => {
        roseContainer.className = 'rose-container bloom-3';
    }, 4500);

    setTimeout(() => {
        isRoseFullyBloomed = true;
        roseContainer.style.cursor = 'pointer';
    }, 9500);
}

if (roseContainer) {
    roseContainer.addEventListener('dblclick', (e) => {
        if (isRoseFullyBloomed) {
            showSpecialWish(e);
        }
    });

    roseContainer.addEventListener('touchstart', (e) => {
        if (isRoseFullyBloomed) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastRoseTap;
            
            if (tapLength < 300 && tapLength > 0) {
                e.preventDefault();
                showSpecialWish(e);
            }
            lastRoseTap = currentTime;
        }
    }, { passive: false });
}

function createFloatingHearts() {
    const roseScreen = document.getElementById('rose-screen');
    if (!roseScreen) return;

    setInterval(() => {
        if (roseScreen.classList.contains('hidden')) return;

        const heartWrapper = document.createElement('div');
        heartWrapper.className = 'floating-heart-wrapper';

        const startLeft = Math.random() * 100;
        heartWrapper.style.left = `${startLeft}vw`;

        const size = Math.random() * 0.8 + 0.6;
        
        const floatDuration = Math.random() * 6 + 6; 
        const swayDuration = Math.random() * 3 + 2;  

        heartWrapper.style.animation = `
            heartFloatUp ${floatDuration}s ease-in forwards, 
            heartSway ${swayDuration}s ease-in-out infinite alternate
        `;
        heartWrapper.style.transform = `scale(${size})`;

        const heart = document.createElement('div');
        heart.className = 'floating-heart';

        const colors = ['#ff4d79', '#ff3366', '#ffb6c1', '#ff1493', '#ff69b4', '#ff8da1'];
        heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        heartWrapper.appendChild(heart);
        roseScreen.appendChild(heartWrapper);

        setTimeout(() => {
            heartWrapper.remove();
        }, floatDuration * 1000);
        
    }, 300);
}

createFloatingHearts();

const roseScreenElement = document.getElementById('rose-screen');

function repelHearts(clientX, clientY) {
    if (roseScreenElement.classList.contains('hidden')) return;

    const hearts = document.querySelectorAll('.floating-heart-wrapper');
    const pushRadius = 120; 

    hearts.forEach(wrapper => {
        const rect = wrapper.getBoundingClientRect();
        const heartCenterX = rect.left + rect.width / 2;
        const heartCenterY = rect.top + rect.height / 2;
        
        const dx = heartCenterX - clientX;
        const dy = heartCenterY - clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const innerHeart = wrapper.querySelector('.floating-heart');
        if (!innerHeart) return;

        if (distance < pushRadius) {
            const force = (pushRadius - distance) / pushRadius; 
            const pushX = (dx / distance) * force * 100; 
            const pushY = (dy / distance) * force * 100;
            
            innerHeart.style.setProperty('--pushX', `${pushX}px`);
            innerHeart.style.setProperty('--pushY', `${pushY}px`);
            
            clearTimeout(innerHeart.pushTimeout);
            
            innerHeart.pushTimeout = setTimeout(() => {
                innerHeart.style.setProperty('--pushX', `0px`);
                innerHeart.style.setProperty('--pushY', `0px`);
            }, 500); 
        }
    });
}

if (roseScreenElement) {
    roseScreenElement.addEventListener('mousemove', (e) => {
        repelHearts(e.clientX, e.clientY);
    });

    roseScreenElement.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            repelHearts(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });
}