// Theme toggle function (if you add theme buttons later)
function toggleTheme(theme) {
    const body = document.body;
    const essaysTitle = document.querySelector('.essays-section h2');
    const mywhysTitle = document.querySelector('.mywhys-section h2');
    const projectsTitle = document.querySelector('.projects-section h2');
    const items = document.querySelectorAll('.essay-item, .mywhys-item, .projects-item');
    
    if (theme === 'light') {
        body.style.backgroundColor = '#f5f5f5';
        body.style.color = '#333';
        if (essaysTitle) essaysTitle.style.color = '#666';
        if (mywhysTitle) mywhysTitle.style.color = '#666';
        if (projectsTitle) projectsTitle.style.color = '#666';
        items.forEach(item => {
            item.style.color = '#666';
        });
    } else {
        body.style.backgroundColor = '#275448';
        body.style.color = '#c1d6d0';
        if (essaysTitle) essaysTitle.style.color = '#c1d6d0';
        if (mywhysTitle) mywhysTitle.style.color = '#c1d6d0';
        if (projectsTitle) projectsTitle.style.color = '#c1d6d0';
        items.forEach(item => {
            item.style.color = '#c1d6d0';
        });
    }
}

// Welcome screen and music functionality
document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const welcomeMusic = document.getElementById('welcomeMusic');
    const skipBtn = document.querySelector('.skip-btn');

    // Function to start music
    function startMusic() {
        if (welcomeMusic) {
            welcomeMusic.play().catch(error => {
                console.log("Autoplay blocked by browser. Music will play on user interaction.");
            });
        }
    }

    // Function to skip/close welcome screen
    window.skipWelcome = function() {
        if (welcomeMusic) {
            welcomeMusic.pause();
            welcomeMusic.currentTime = 0; // Reset to beginning
        }
        
        if (welcomeScreen) {
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
            }, 500);
        }
    };

    // Try to autoplay music when page loads
    if (welcomeMusic && welcomeScreen) {
        window.addEventListener('load', () => {
            startMusic();
        });

        // Click anywhere on welcome screen to enter
        welcomeScreen.addEventListener('click', function(e) {
            // Don't trigger if clicking the skip button
            if (!e.target.classList.contains('skip-btn')) {
                startMusic(); // Ensure music plays
                setTimeout(window.skipWelcome, 1000); // Wait 1 second then skip
            }
        });
    }

    // Skip button specific handler
    if (skipBtn) {
        skipBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent welcome screen click event
            window.skipWelcome();
        });
    }
});
