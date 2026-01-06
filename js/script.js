// Page enter animation
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-enter");

    requestAnimationFrame(() => {
        document.body.classList.remove("page-enter");
    });
});

// Page exit animation for links
document.querySelectorAll("a").forEach(link => {
    const url = link.getAttribute("href");

    if (!url || url.startsWith("#") || url.startsWith("http")) return;

    link.addEventListener("click", e => {
        e.preventDefault();
        document.body.classList.add("page-exit");

        setTimeout(() => {
            window.location.href = url;
        }, 350);
    });
});

// ================= CARD SCROLL REVEAL =================
const cardObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("card-show");
                entry.target.classList.remove("card-hidden");
                cardObserver.unobserve(entry.target); // animate once
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".card").forEach(card => {
    card.classList.add("card-hidden"); // prepare animation
    cardObserver.observe(card);
});

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // run once
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
});

// ================= PAGE LOADING BAR =================

const loadingBar = document.getElementById("loading-bar");

let progress = 0;

// Fake loading progress (smooth UX)
const loadingInterval = setInterval(() => {
    if (progress < 90) {
        progress += Math.random() * 8;
        loadingBar.style.width = progress + "%";
    }
}, 200);

// When page fully loads
window.addEventListener("load", () => {
    clearInterval(loadingInterval);
    loadingBar.style.width = "100%";

    setTimeout(() => {
        loadingBar.style.opacity = "0";
    }, 300);

    setTimeout(() => {
        loadingBar.style.display = "none";
    }, 700);
});

// ================= BACK TO TOP =================

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTopBtn.style.display = "flex";
        backToTopBtn.style.opacity = "1";
    } else {
        backToTopBtn.style.opacity = "0";
        setTimeout(() => {
            backToTopBtn.style.display = "none";
        }, 200);
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ================= DARK MODE TOGGLE =================

const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}

// Toggle on click
toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const para = document.getElementById("typing-para");
    if (!para) return;

    const parts = [
        { text: "I build real-world projects using " },
        {
            text: "Python, Streamlit, .NET, Visual Basic, and HTML",
            strong: true
        },
        { text: ".\nI love turning ideas into working apps 🚀" } // 👈 ONE \n
    ];

    let partIndex = 0;
    let charIndex = 0;
    let currentNode = null;
    const speed = 35;

    function type() {
        if (partIndex >= parts.length) return;

        const part = parts[partIndex];

        if (!currentNode) {
            currentNode = part.strong
                ? document.createElement("strong")
                : document.createTextNode("");
            para.appendChild(currentNode);
        }

        if (charIndex < part.text.length) {
            const ch = part.text[charIndex];

            if (ch === "\n") {
                para.appendChild(document.createElement("br"));
                currentNode = null; // 🔥 IMPORTANT: reset node
            } else {
                currentNode.textContent += ch;
            }

            charIndex++;
            setTimeout(type, speed);
        } else {
            partIndex++;
            charIndex = 0;
            currentNode = null;
            setTimeout(type, speed);
        }
    }

    type();
});
