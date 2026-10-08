// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    setupIntersectionObserver();
});

// Removed Envelope Logic



// Generate Floating Hearts
function createHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    const colors = ['#ff4d6d', '#ff8fa3', '#ffb3c1', '#ffffff'];
    
    // Create a heart every 500ms
    setInterval(() => {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'heart');
        
        // Randomize properties
        const left = Math.random() * 100; // 0 to 100 vw
        const size = Math.random() * 20 + 10; // 10px to 30px
        const color = colors[Math.floor(Math.random() * colors.length)];
        const animationDuration = Math.random() * 3 + 3; // 3s to 6s
        
        heart.style.left = `${left}vw`;
        heart.style.fontSize = `${size}px`;
        heart.style.color = color;
        heart.style.animationDuration = `${animationDuration}s, ${animationDuration - 1}s`;
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes to avoid memory leak
        setTimeout(() => {
            heart.remove();
        }, animationDuration * 1000);
        
    }, 400);
}

// Scroll Animation with Intersection Observer
function setupIntersectionObserver() {
    const cards = document.querySelectorAll('.memory-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: Stop observing once it's shown if you don't want it to fade out again
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Password Check Logic
function checkPassword() {
    const passwordInput = document.getElementById('gallery-password').value;
    const errorMsg = document.getElementById('password-error');
    const lockScreen = document.getElementById('site-lock-screen');
    
    // The secret password is "love"
    const secretPassword = "love"; 

    if (passwordInput.toLowerCase() === secretPassword) {
        errorMsg.style.opacity = '0';
        
        // Hide lock screen
        lockScreen.style.opacity = '0';
        
        setTimeout(() => {
            lockScreen.style.display = 'none';
            


            // Simulate loading for 3 seconds
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                const mainContent = document.getElementById('main-content');
                loadingScreen.style.opacity = '0';
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.classList.add('visible');
                }, 1000);
            }, 3000);
            
        }, 500);
    } else {
        errorMsg.style.opacity = '1';
        
        // Shake effect
        lockScreen.style.transform = 'translateX(-10px)';
        setTimeout(() => lockScreen.style.transform = 'translateX(10px)', 100);
        setTimeout(() => lockScreen.style.transform = 'translateX(-10px)', 200);
        setTimeout(() => lockScreen.style.transform = 'translateX(0)', 300);
    }
}

// Envelope Logic at the End
function showEnvelope() {
    const mainContent = document.getElementById('main-content');
    const envelopeScreen = document.getElementById('envelope-screen');

    // Fade out main content
    mainContent.style.opacity = '0';
    
    setTimeout(() => {
        mainContent.style.display = 'none';
        
        // Show envelope screen
        envelopeScreen.style.display = 'flex';
        setTimeout(() => {
            envelopeScreen.style.opacity = '1';
        }, 50);
    }, 1000); // Wait for main content to fade out
}

function openEnvelope() {
    const wrapper = document.querySelector('.envelope-wrapper');
    wrapper.classList.add('open');
}

function showAtmScreen() {
    const envelopeScreen = document.getElementById('envelope-screen');
    const finalAtmScreen = document.getElementById('final-atm-screen');
    
    envelopeScreen.style.opacity = '0';
    setTimeout(() => {
        envelopeScreen.style.display = 'none';
        finalAtmScreen.style.display = 'flex';
        setTimeout(() => {
            finalAtmScreen.style.opacity = '1';
        }, 50);
    }, 1000);
}

// ATM Logic
let currentPin = '';

function insertCard() {
    const card = document.getElementById('atm-card');
    const machine = document.getElementById('atm-machine-ui');
    const instructions = document.getElementById('atm-main-instruction');
    const hint = document.getElementById('atm-hint-instruction');
    
    card.classList.add('inserted');
    
    setTimeout(() => {
        card.style.visibility = 'hidden';
        
        machine.style.pointerEvents = 'auto';
        machine.style.opacity = '1';
        
        instructions.textContent = "Enter PIN for Final Surprise";
        hint.style.opacity = '1';
        
        document.getElementById('atm-display').textContent = "_";
        currentPin = "";
    }, 600);
}

function pressKeyAtm(num) {
    if (currentPin.length < 4) {
        currentPin += num;
        updateAtmDisplay();
    }
}

function clearAtmPin() {
    currentPin = '';
    updateAtmDisplay();
}

function updateAtmDisplay() {
    const display = document.getElementById('atm-display');
    if (currentPin.length === 0) {
        display.textContent = "_";
    } else {
        display.textContent = '*'.repeat(currentPin.length);
    }
}

function submitAtmPin() {
    const errorMsg = document.getElementById('atm-error');
    const lockScreen = document.querySelector('#final-atm-screen .atm-style');
    
    const secretPin = "1402"; 

    if (currentPin === secretPin) {
        errorMsg.style.opacity = '0';
        
        // Show media in ATM
        const atmDisplay = document.getElementById('atm-display');
        const instructions = document.getElementById('atm-main-instruction');
        const hint = document.getElementById('atm-hint-instruction');
        
        // Hide asterisks
        atmDisplay.style.display = 'none';
        
        instructions.textContent = "Press top right button for next memory ✨";
        hint.style.opacity = '0'; // hide hint
        
        // Show first media
        currentMediaIndex = 0;
        const current = atmMedia[0];
        const img = document.getElementById('atm-photo-display');
        const vid = document.getElementById('atm-video-display');
        
        if (current.type === 'image') {
            img.style.display = 'block';
            img.src = current.src;
            setTimeout(() => {
                img.style.opacity = '1';
            }, 50);
        } else {
            vid.style.display = 'block';
            vid.src = current.src;
            setTimeout(() => {
                vid.style.opacity = '1';
            }, 50);
        }
    } else {
        errorMsg.style.opacity = '1';
        clearAtmPin();
        
        lockScreen.style.transform = 'translateX(-10px)';
        setTimeout(() => lockScreen.style.transform = 'translateX(10px)', 100);
        setTimeout(() => lockScreen.style.transform = 'translateX(-10px)', 200);
        setTimeout(() => lockScreen.style.transform = 'translateX(0)', 300);
    }
}

// Slideshow Logic
const atmMedia = [
    { type: 'image', src: "images/memory_roses.png" },
    { type: 'image', src: "images/memory_coffee.png" },
    { type: 'image', src: "images/hero_couple.png" },
    { type: 'image', src: "images/photo_2026-10-08_22-40-50.jpg" },
    { type: 'image', src: "images/photo_2026-10-08_22-40-55.jpg" },
    { type: 'image', src: "images/photo_2026-10-08_22-41-01.jpg" },
    { type: 'image', src: "images/photo_2026-10-08_22-42-12.jpg" },
    { type: 'image', src: "images/photo_2026-10-08_22-42-22.jpg" },
    { type: 'video', src: "images/IMG_1224.MOV" },
    { type: 'video', src: "images/IMG_1225.MOV" }
];
let currentMediaIndex = 0;

function showAtmMedia(index) {
    const img = document.getElementById('atm-photo-display');
    const vid = document.getElementById('atm-video-display');
    const current = atmMedia[index];

    img.style.opacity = '0';
    vid.style.opacity = '0';

    setTimeout(() => {
        if (current.type === 'image') {
            vid.style.display = 'none';
            img.style.display = 'block';
            img.src = current.src;
            setTimeout(() => img.style.opacity = '1', 50);
        } else {
            img.style.display = 'none';
            vid.style.display = 'block';
            vid.src = current.src;
            setTimeout(() => vid.style.opacity = '1', 50);
        }
    }, 300);
}

function nextPhoto() {
    const atmDisplay = document.getElementById('atm-display');
    if (atmDisplay.style.display !== 'none') return; // Do not trigger if still entering PIN

    currentMediaIndex++;
    
    if (currentMediaIndex >= atmMedia.length) {
        currentMediaIndex = 0;
    }
    
    showAtmMedia(currentMediaIndex);
}
