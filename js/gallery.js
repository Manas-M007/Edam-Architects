// Portfolio Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const viewButtons = document.querySelectorAll('.view-btn');
    const projectModal = document.querySelector('.project-modal');
    const modalContent = document.querySelector('.modal-content .modal-body');
    const closeModal = document.querySelector('.close-modal');
    const projectDetails = document.querySelectorAll('.project-details');

    // Filter projects based on category
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                if (filterValue === 'all') {
                    // Show all projects
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, 50);
                } else if (item.classList.contains(filterValue)) {
                    // Show projects that match the filter
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, 50);
                } else {
                    // Hide projects that don't match
                    item.classList.remove('fade-in');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // View project details in modal
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectItem = this.closest('.project-item');
            const projectId = projectItem.id;
            const projectDetails = projectItem.querySelector('.project-details');
            
            // Clone the project details to avoid removing from original location
            const detailsClone = projectDetails.cloneNode(true);
            
            // Clear previous content and add new
            modalContent.innerHTML = '';
            modalContent.appendChild(detailsClone);
            
            // Add Instagram link button if available
            const instagramBtn = document.createElement('a');
            instagramBtn.href = 'https://www.instagram.com/edam.architects';
            instagramBtn.target = '_blank';
            instagramBtn.className = 'luxury-btn instagram-btn';
            instagramBtn.innerHTML = '<i class="fab fa-instagram"></i> View on Instagram';
            modalContent.appendChild(instagramBtn);
            
            // Show modal with animation
            projectModal.style.display = 'flex';
            setTimeout(() => {
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 10);
        });
    });

    // Close modal
    function closeProjectModal() {
        projectModal.classList.remove('active');
        setTimeout(() => {
            projectModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    closeModal.addEventListener('click', closeProjectModal);
    
    // Close modal when clicking outside content
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });

    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // Image lazy loading
    const lazyLoadImages = function() {
        const lazyImages = document.querySelectorAll('.project-item img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                img.src = img.getAttribute('data-src');
                img.classList.add('loaded');
            });
        }
    };

    // Initialize lightbox for project images
    const initLightbox = function() {
        const projectImages = document.querySelectorAll('.project-images img');
        
        projectImages.forEach(image => {
            image.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <img src="${this.src}" alt="${this.alt}">
                        <span class="close-lightbox">&times;</span>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Close lightbox
                const closeLightbox = lightbox.querySelector('.close-lightbox');
                closeLightbox.addEventListener('click', function() {
                    lightbox.remove();
                    document.body.style.overflow = '';
                });
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        lightbox.remove();
                        document.body.style.overflow = '';
                    }
                });
            });
        });
    };

    // Initialize gallery functions
    lazyLoadImages();
    
    // Reinitialize when projects are filtered
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                initLightbox();
            }
        });
    });

    // Observe changes in the gallery
    const gallery = document.querySelector('.portfolio-gallery');
    if (gallery) {
        observer.observe(gallery, {
            childList: true,
            subtree: true
        });
    }

    // Initialize lightbox for existing images
    initLightbox();
});

// Lightbox CSS (add this to your style.css)
/*
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.lightbox.active {
    opacity: 1;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 80vh;
    display: block;
    margin: 0 auto;
}

.close-lightbox {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 2rem;
    cursor: pointer;
}
*/