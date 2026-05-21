document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Fermer le menu lors du clic sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Animations GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Timeline pour l'animation initiale de la page d'accueil
    const tl = gsap.timeline();

    tl.from('.header', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.intro', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    }, "-=0.5") // Commence légèrement avant la fin de l'animation précédente
    .from('.profile-image', {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
    }, "-=0.7");

    // Animation des autres sections au scroll
    gsap.utils.toArray('.section:not(#accueil)').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top center+=100',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Toggle Dark Mode
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    toggleSwitch.addEventListener('change', switchTheme);

    // Ajouter dans votre addEventListener('DOMContentLoaded')
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });



    // Gestion du formulaire de contact
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = this;
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon i');
        
        // Animation du bouton pendant l'envoi
        submitBtn.disabled = true;
        btnText.textContent = 'Envoi en cours...';
        btnIcon.className = 'fas fa-spinner fa-spin';
        
        // Récupération des données du formulaire
        const formData = new FormData(form);
        
        // Envoi des données via fetch
        fetch('contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                // Animation de succès
                btnText.textContent = 'Message envoyé !';
                btnIcon.className = 'fas fa-check';
                form.reset();
                
                // Réinitialisation après 3 secondes
                setTimeout(() => {
                    btnText.textContent = 'Envoyer';
                    btnIcon.className = 'fas fa-paper-plane';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        })
        .catch(error => {
            // Animation d'erreur
            btnText.textContent = 'Erreur d\'envoi';
            btnIcon.className = 'fas fa-times';
            
            // Réinitialisation après 3 secondes
            setTimeout(() => {
                btnText.textContent = 'Envoyer';
                btnIcon.className = 'fas fa-paper-plane';
                submitBtn.disabled = false;
            }, 3000);
        });
    });

    // Animation GSAP pour le formulaire
    gsap.from('.contact-container', {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        }
    });

    // Animation des champs du formulaire
    gsap.utils.toArray('.form-group').forEach((group, i) => {
        gsap.from(group, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: '.contact-container',
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animation du profil
    createUniqueScrollAnimation([document.querySelector('.profile-text')], {
        opacity: 0,
        y: 30,
        duration: 1
    });

    // Animation des paragraphes de description
    gsap.utils.toArray('.profile-description').forEach((desc, index) => {
        gsap.set(desc, { opacity: 0, y: 20 }); // Définir l'état initial
        createUniqueScrollAnimation([desc], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2
        });
    });

    // Animation du CTA
    gsap.set('.profile-cta', { opacity: 0, y: 20 }); // Définir l'état initial
    createUniqueScrollAnimation([document.querySelector('.profile-cta')], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6
    });

    // Animation des cartes de documents
    gsap.utils.toArray('.document-card').forEach((card, index) => {
        createUniqueScrollAnimation([card], {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.8 + (index * 0.2)
        });
    });

    // Animation de la section veille technologique
    gsap.from('.veille-description', {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
            trigger: '.veille-description',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.veille-sources li', {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.veille-sources',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.veille-topic', {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
            trigger: '.veille-topic',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.utils.toArray('.article-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=50',
                toggleActions: 'play none none reverse'
            }
        });
    });
});

// Fonction pour les animations initiales du site (pour les visites suivantes)
function initSiteAnimations() {
    const tl = gsap.timeline();

    tl.from('.header', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.intro', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    }, "-=0.5")
    .from('.profile-image', {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
    }, "-=0.7");
} 