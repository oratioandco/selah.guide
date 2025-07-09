// Accessibility enhancements for Selah website
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter consent handling
    const consentSection = document.getElementById('newsletter-consent-section');
    const consentBtn = document.getElementById('newsletter-consent-btn');
    const formContainer = document.getElementById('newsletter-form-container');
    const cancelBtn = document.getElementById('newsletter-cancel-btn');
    
    if (consentBtn && formContainer) {
        // Show form when consent button is clicked
        consentBtn.addEventListener('click', function() {
            consentSection.style.display = 'none';
            formContainer.style.display = 'block';
            
            // Focus on the email input for better accessibility
            const emailInput = document.getElementById('sendfox_form_email');
            if (emailInput) {
                emailInput.focus();
            }
            
            // Announce the change to screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.textContent = 'Newsletter signup form is now enabled. Please fill out your email address.';
            announcement.style.position = 'absolute';
            announcement.style.left = '-10000px';
            document.body.appendChild(announcement);
            
            // Remove announcement after it's read
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        });
        
        // Hide form when cancel button is clicked
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                formContainer.style.display = 'none';
                consentSection.style.display = 'block';
                
                // Focus back on the consent button
                consentBtn.focus();
                
                // Announce the change to screen readers
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'polite');
                announcement.textContent = 'Newsletter signup form has been hidden.';
                announcement.style.position = 'absolute';
                announcement.style.left = '-10000px';
                document.body.appendChild(announcement);
                
                // Remove announcement after it's read
                setTimeout(() => {
                    document.body.removeChild(announcement);
                }, 1000);
            });
        }
    }
    
    // Form validation and accessibility
    const form = document.getElementById('3zdn8e');
    if (form) {
        const emailInput = document.getElementById('sendfox_form_email');
        const gdprCheckbox = document.querySelector('input[name="gdpr"]');
        const submitButton = document.querySelector('.newsletter-submit');
        const emailError = document.getElementById('email-error');
        const gdprError = document.getElementById('gdpr-error');
        const submitStatus = document.getElementById('submit-status');

        // Email validation
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Show error message
        function showError(errorElement, message) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
            errorElement.setAttribute('aria-live', 'assertive');
        }

        // Hide error message
        function hideError(errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
            errorElement.setAttribute('aria-live', 'polite');
        }

        // Real-time email validation
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !validateEmail(email)) {
                this.classList.add('error');
                showError(emailError, 'Please enter a valid email address.');
            } else {
                this.classList.remove('error');
                hideError(emailError);
            }
        });

        // Clear error on input
        emailInput.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                hideError(emailError);
            }
        });

        // GDPR checkbox validation
        gdprCheckbox.addEventListener('change', function() {
            if (this.checked) {
                hideError(gdprError);
            }
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Validate email
            const email = emailInput.value.trim();
            if (!email) {
                emailInput.classList.add('error');
                showError(emailError, 'Email address is required.');
                isValid = false;
            } else if (!validateEmail(email)) {
                emailInput.classList.add('error');
                showError(emailError, 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate GDPR consent
            if (!gdprCheckbox.checked) {
                showError(gdprError, 'Please agree to receive email updates.');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
                // Focus on first error
                const firstError = document.querySelector('.form-group input.error');
                if (firstError) {
                    firstError.focus();
                }
                return false;
            }

            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Signing up...';
            submitStatus.textContent = 'Processing your request...';
            submitStatus.classList.add('show');
        });
    }

    // Enhance CTA button behavior
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Show coming soon message
            const availabilityNote = document.getElementById('availability-note');
            if (availabilityNote) {
                availabilityNote.focus();
                availabilityNote.setAttribute('aria-live', 'polite');
            }
        });
    }

    // Improve link context for screen readers
    const links = document.querySelectorAll('a[href="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // Enhance keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Skip link activation
        if (e.target.classList.contains('skip-link') && e.key === 'Enter') {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        }
    });

    // Announce page changes for screen readers
    function announcePageChange() {
        const pageTitle = document.querySelector('h1');
        if (pageTitle) {
            pageTitle.setAttribute('aria-live', 'polite');
        }
    }

    // Call on page load
    announcePageChange();
});