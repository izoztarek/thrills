// Thrillz Menu Builder - Interactive UX Elements
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.menu-section');
    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.querySelector('.main-content');
    const cards = document.querySelectorAll('.option-card');

    // 1. Intersection Observer for Smooth Section Autofocus Alignment
    const observerOptions = {
        root: mainContent,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active classes from everywhere
                sections.forEach(s => s.classList.remove('active'));
                navItems.forEach(n => n.classList.remove('active'));

                // Set active target section
                entry.target.classList.add('active');
                
                // Active matching sidebar component
                const targetId = entry.target.getAttribute('id');
                const matchingNav = document.querySelector(`.nav-item[data-target="${targetId}"]`);
                if (matchingNav) matchingNav.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // 2. Sidebar Click Navigation Scrolling Implementation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // 3. Choice Selection Logic 
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Unselect sibling items within the same section context
            const parentSection = card.closest('.menu-section');
            parentSection.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            
            // Add custom state selection styling
            card.classList.add('selected');
        });

        // 4. Premium Mouse Move Spotlight Radial Gradient Interaction
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});
