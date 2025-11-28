// --- Dark Mode Toggle (Existing Code) ---
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleButton.querySelector('i');

// Check for saved user preference on load
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

toggleButton.addEventListener('click', function() {
    body.classList.toggle('dark-mode');

    // Update Icon and Save Preference
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});


// --- Scroll Animation (New Code) ---

// Setup the options for the observer (when to trigger)
const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Adjust triggering point slightly upwards
};

// The function that runs when elements are observed
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
            // Add the 'show' class to trigger the CSS animation
            entry.target.classList.add('show');
            // Stop observing this element after it has animated once
            observer.unobserve(entry.target);
        }
    });
};

// Create the observer instance
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Select all elements with the 'animate-block' class and start observing them
document.querySelectorAll('.animate-block').forEach(element => {
    observer.observe(element);
});
