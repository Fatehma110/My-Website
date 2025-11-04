// Theme toggle function
function toggleTheme(theme) {
    const body = document.body;
    const essaysTitle = document.querySelector('.essays-section h3');
    const essayItems = document.querySelectorAll('.essay-item');
    
    if (theme === 'light') {
        body.style.backgroundColor = '#f5f5f5';
        body.style.color = '#333';
        essaysTitle.style.color = '#666';
        essayItems.forEach(item => {
            item.style.color = '#666';
        });
    } else {
        body.style.backgroundColor = '#1a1a1a';
        body.style.color = '#a0a0a0';
        essaysTitle.style.color = '#888';
        essayItems.forEach(item => {
            item.style.color = '#a0a0a0';
        });
    }
}

// Collapsible About section
document.addEventListener('DOMContentLoaded', function() {
    const aboutHeading = document.querySelector('.about-section h2');
    const aboutContent = document.querySelector('.about-content');
    
    aboutHeading.addEventListener('click', function() {
        if (aboutContent.style.display === 'none') {
            aboutContent.style.display = 'block';
            this.textContent = '▼ About';
        } else {
            aboutContent.style.display = 'none';
            this.textContent = '▶ About';
        }
    });
});
