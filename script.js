// ========================================
// WELCOME SCREEN & MUSIC
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const welcomeMusic = document.getElementById('welcomeMusic');
    const skipBtn = document.querySelector('.skip-btn');
    let musicStarted = false;

    function startMusic() {
        if (welcomeMusic && !musicStarted) {
            welcomeMusic.volume = 0.5;
            welcomeMusic.play().catch(error => {
                console.log("Autoplay blocked:", error);
            });
            musicStarted = true;
        }
    }

    window.skipWelcome = function() {
        if (welcomeMusic) {
            welcomeMusic.pause();
            welcomeMusic.currentTime = 0;
        }
        if (welcomeScreen) {
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
            }, 500);
        }
    };

    // Click anywhere on welcome screen = play music THEN after a delay, enter
    if (welcomeScreen) {
        welcomeScreen.addEventListener('click', function(e) {
            if (!e.target.classList.contains('skip-btn')) {
                startMusic(); // play music
                setTimeout(() => {
                    window.skipWelcome(); // enter site after small delay so music is heard
                }, 1500);
            }
        });
    }

    // Skip button = no music, just skip
    if (skipBtn) {
        skipBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            window.skipWelcome();
        });
    }
});

// ========================================
// LIGHTBOX FUNCTIONALITY
// ========================================

let currentIndex = 0;
let galleryItems = [];

// Wait for DOM to fully load before accessing gallery items
window.addEventListener('load', function() {
    galleryItems = document.querySelectorAll('.gallery img, .gallery .video-container video');
});

function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const mediaContainer = document.getElementById('lightbox-media');
    
    if (!lightbox || !mediaContainer) return;
    
    lightbox.classList.add('active');
    mediaContainer.innerHTML = '';
    
    const item = galleryItems[index];
    
    if (!item) return;
    
    if (item.tagName === 'IMG') {
        // Display image
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.className = 'lightbox-content';
        mediaContainer.appendChild(img);
    } else if (item.tagName === 'VIDEO') {
        // Display video with controls
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.className = 'lightbox-content';
        video.style.maxWidth = '90%';
        video.style.maxHeight = '90%';
        
        const source = document.createElement('source');
        source.src = item.querySelector('source').src;
        source.type = 'video/mp4';
        
        video.appendChild(source);
        mediaContainer.appendChild(video);
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    
    // Stop video if playing
    const video = document.querySelector('.lightbox video');
    if (video) {
        video.pause();
    }
}

function changeMedia(direction) {
    if (galleryItems.length === 0) return;
    
    currentIndex += direction;
    
    // Loop around if at the end
    if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    }
    
    openLightbox(currentIndex);
}

// Close lightbox on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Navigate with arrow keys
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            changeMedia(-1);
        } else if (e.key === 'ArrowRight') {
            changeMedia(1);
        }
    }
});

// ========================================
// CUSTOM CURSOR EFFECT
// ========================================

const cursor = document.querySelector('.custom-cursor');
let mouseX = 0;
let mouseY = 0;
let isScrolling = false;
let scrollTimeout;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor position
    if (cursor) {
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    }
});

// Create number effect on scroll
document.addEventListener('scroll', () => {
    // Clear previous timeout
    clearTimeout(scrollTimeout);
    
    if (!isScrolling) {
        isScrolling = true;
    }
    
    // Create multiple numbers while scrolling
    createNumberTrail(mouseX, mouseY);
    
    // Stop after scrolling ends
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 100);
});

// Create number trail effect
function createNumberTrail(x, y) {
    // Generate random number (0-99)
    const randomNum = Math.floor(Math.random() * 100);
    
    // Create number element
    const number = document.createElement('div');
    number.className = 'number-trail';
    number.textContent = randomNum;
    
    // Random offset for scatter effect
    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = (Math.random() - 0.5) * 40;
    
    number.style.left = (x + offsetX) + 'px';
    number.style.top = (y + offsetY) + 'px';
    
    // Random color variations
    const colors = ['#ffffff', '#4a9eff', '#ff6b6b', '#51cf66', '#ffd43b'];
    number.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(number);
    
    // Remove element after animation
    setTimeout(() => {
        number.remove();
    }, 1000);
}

// Also create numbers on mouse move while scrolling
let lastMoveTime = 0;
document.addEventListener('mousemove', (e) => {
    if (isScrolling) {
        const now = Date.now();
        if (now - lastMoveTime > 50) { // Throttle to prevent too many numbers
            createNumberTrail(e.clientX, e.clientY);
            lastMoveTime = now;
        }
    }
});

// Cursor scale on click
document.addEventListener('mousedown', () => {
    if (cursor) {
        cursor.style.transform = 'scale(0.8)';
    }
});

document.addEventListener('mouseup', () => {
    if (cursor) {
        cursor.style.transform = 'scale(1)';
    }
});
