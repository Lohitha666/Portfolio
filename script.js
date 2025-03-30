document.addEventListener("DOMContentLoaded", function () {
    detectSystemTheme();
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
        document.querySelectorAll("#nav-links a").forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent instant jump
                const targetId = this.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 50, // Adjust offset if needed
                        behavior: "smooth"
                    });
                }
                navLinks.classList.remove("active"); // Close menu after click
            });
        });
        
        document.addEventListener("click", function (event) {
            if (!menuBtn.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove("active");
            }
        });
    }
    setupScrollAnimation(".card");
    setupScrollAnimation(".education-box");
    setupTypedText();
    setupAboutSectionAnimation();
    setupProgressBarAnimation();
    setupStarRatingAnimation();
});
// Detect and Apply System Theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    localStorage.removeItem("theme"); // Reset saved theme to follow system preference
    detectSystemTheme();
});

function detectSystemTheme() {
    const body = document.body;
    const themeToggleBtn = document.querySelector(".theme-toggle");
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.removeItem("theme");
    if (isDark) {
        body.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = "☀️ ‎ ‎ ‎ ‎ ‎ ";
    } else {
        body.removeAttribute('data-theme');
        themeToggleBtn.textContent = "‎ ‎ ‎ ‎ ‎ 🌙";
    }
    setIconsBasedOnTheme(isDark);
}
// Toggle Theme Manually
function toggleTheme() {
    const body = document.body;
    const themeToggleBtn = document.querySelector(".theme-toggle");
    const isDark = !body.hasAttribute("data-theme");
    if (isDark) {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeToggleBtn.textContent = "☀️ ‎ ‎ ‎ ‎ ‎ ";
    } else {
        body.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        themeToggleBtn.textContent = "‎ ‎ ‎ ‎ ‎ 🌙";
    }
    setIconsBasedOnTheme(isDark);
}
// Change Icons Based on Theme
function setIconsBasedOnTheme(isDark) {
    const icons = ["home", "about", "education", "projects", "skills", "experiences", "certifications", "contact"];
    icons.forEach(icon => {
        document.getElementById(`icon-${icon}`).src = isDark
            ? `images/${icon}-dark.png`
            : `images/${icon}-light.png`;
    });
}
// Resume Download Function
function downloadFile(event) {
    event.preventDefault();
    
    fetch("images/Lohitha_Resume.pdf")
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Lohitha_Resume.pdf";  // Forces download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => console.error("Download failed:", error));
}

// Initialize Text Typing Animation
function setupTypedText() {
    new Typed('.multiple-text', {
        strings: ['Computer Science Engineer', 'AI/ML Enthusiast', 'Problem Solver'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}
// Scroll Animation for Sections
function setupScrollAnimation(selector) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        elements.forEach(element => observer.observe(element));
    }
}
// Scroll Animation for About Section
function setupAboutSectionAnimation() {
    const elements = document.querySelectorAll(".about p");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.3 });
    elements.forEach(element => observer.observe(element));
}

function setupProgressBarAnimation() {
    let progressBars = document.querySelectorAll(".progress");
    function animateProgressBar(bar) {
        let value = bar.getAttribute("data-progress");
        let currentWidth = 0;
        let speed = 20;
        bar.style.width = "0%"; // Reset before animation 
        let interval = setInterval(() => {
            if (currentWidth >= value) {
                clearInterval(interval);
            }
            bar.style.width = currentWidth + "%";
            currentWidth++;
        }, speed);
    }
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = "true";
                animateProgressBar(entry.target);
            }
        });
    }, { threshold: 1 });
    progressBars.forEach(bar => observer.observe(bar));
}
// Star Rating Animation (Triggers When in View)
function setupStarRatingAnimation() {
    let starElements = document.querySelectorAll(".stars");
    function animateStars(stars) {
        let starsText = stars.textContent.trim();
        let starCount = starsText.split("⭐").length - 1;
        stars.innerHTML = ""; // Clear existing stars 
        for (let i = 0; i < starCount; i++) {
            let span = document.createElement("span");
            span.textContent = "⭐";
            span.style.opacity = "0";
            span.style.transition = `opacity 0.5s ease-in-out ${i * 200+100}ms`;
            stars.appendChild(span);
            setTimeout(() => {
                span.style.opacity = "1"
                span.style.visibility = "visible";
            }, i * 200+100);
        }
    }
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = "true";
                animateStars(entry.target);
            }
        });
    }, { threshold: 0 });
    starElements.forEach(stars => observer.observe(stars));
}
function clearForm() {
    // Set a timeout to ensure the form submission occurs before clearing the fields
    setTimeout(function () {
        document.getElementById('contact-form').reset();
    }, 500);
}
// Accordion functionality with auto-close feature
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', (event) => {
        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');

        // Close all other accordion items
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.display = "none";
            }
        });

        // Toggle the clicked accordion
        item.classList.toggle('active');
        content.style.display = item.classList.contains('active') ? "grid" : "none";

        // Scroll to the clicked button smoothly
        setTimeout(() => {
            event.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200); // Timeout ensures it happens after the accordion opens
    });
});
