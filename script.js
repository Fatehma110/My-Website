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
