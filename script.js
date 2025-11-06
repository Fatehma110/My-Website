document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const welcomeMusic = document.getElementById('welcomeMusic');
    const skipBtn = document.querySelector('.skip-btn');

    // Function to start music
    function startMusic() {
        if (welcomeMusic) {
            welcomeMusic.play().catch(error => {
                console.log("Autoplay blocked:", error);
            });
        }
    }

    // Function to skip welcome screen
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

    // Auto-play on load
    window.addEventListener('load', startMusic);

    // Click anywhere to enter (REMOVED setTimeout!)
    if (welcomeScreen) {
        welcomeScreen.addEventListener('click', function(e) {
            if (!e.target.classList.contains('skip-btn')) {
                startMusic(); // Ensure music plays
                window.skipWelcome(); // Skip immediately when clicked
            }
        });
    }

    // Skip button
    if (skipBtn) {
        skipBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            window.skipWelcome();
        });
    }
});
