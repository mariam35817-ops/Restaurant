// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Menu filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        // Get filter value
        const filterValue = button.getAttribute('data-filter');

        // Filter menu items
        menuItems.forEach(item => {
            // Remove show class
            item.classList.remove('show');

            // Show matching items
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.classList.add('show');
            }
        });
    });
});

// Show all items on page load
window.addEventListener('load', () => {
    menuItems.forEach(item => {
        item.classList.add('show');
    });
});

// Reservation form submission
const reservationForm = document.getElementById('reservationForm');
const reservationMessage = document.getElementById('reservationMessage');

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;

    // Simple validation
    if (name && email && phone && date && time && guests) {
        // Show success message
        reservationMessage.classList.remove('hidden', 'error');
        reservationMessage.classList.add('success');
        reservationMessage.innerHTML = `
            <h3>Reservation Confirmed! ✓</h3>
            <p>Thank you, ${name}! Your reservation for ${guests} guest(s) on ${date} at ${time} has been confirmed.</p>
            <p>We'll send a confirmation email to ${email}</p>
        `;

        // Reset form
        reservationForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            reservationMessage.classList.add('hidden');
        }, 5000);
    } else {
        // Show error message
        reservationMessage.classList.remove('hidden', 'success');
        reservationMessage.classList.add('error');
        reservationMessage.innerHTML = '<p>Please fill in all fields!</p>';

        // Hide message after 3 seconds
        setTimeout(() => {
            reservationMessage.classList.add('hidden');
        }, 3000);
    }
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu items
menuItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add click feedback to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone format
function isValidPhone(phone) {
    const phoneRegex = /^\d{10,}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Real-time form validation
document.getElementById('email').addEventListener('blur', function() {
    if (this.value && !isValidEmail(this.value)) {
        this.style.borderColor = 'red';
    } else {
        this.style.borderColor = '';
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    if (this.value && !isValidPhone(this.value)) {
        this.style.borderColor = 'red';
    } else {
        this.style.borderColor = '';
    }
});

// Set minimum date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Log page interactions (for analytics)
console.log('Restaurant website loaded successfully!');
document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});
