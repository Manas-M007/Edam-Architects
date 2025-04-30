// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="spinner"></div> Sending...';
            submitBtn.disabled = true;
            
            // Collect form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                console.log('Form data:', data);
                
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Show thank you message
                    const thankYouMessage = document.createElement('div');
                    thankYouMessage.className = 'form-success-message';
                    thankYouMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>We've received your message and will get back to you soon.</p>
                    `;
                    
                    contactForm.parentNode.insertBefore(thankYouMessage, contactForm.nextSibling);
                    contactForm.style.display = 'none';
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        thankYouMessage.remove();
                        contactForm.style.display = 'block';
                    }, 5000);
                }, 2000);
            }, 1500);
        });
    }
});