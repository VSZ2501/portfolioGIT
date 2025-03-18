document.addEventListener('DOMContentLoaded', function() {
    const expandBtns = document.querySelectorAll('.expand-btn');
    
    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.closest('.experience-card').querySelector('.experience-content');
            if (content.style.display === 'block') {
                content.style.display = 'none';
                btn.textContent = 'En savoir plus';
            } else {
                content.style.display = 'block';
                btn.textContent = 'Voir moins';
            }
        });
    });
}); 