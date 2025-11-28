const toggleButton = document.getElementById("theme-toggle");
const body = document.body;
const icon = toggleButton.querySelector("i");

// Load saved theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
    body.classList.add("dark-mode");
    icon.classList.replace("fa-moon", "fa-sun");
}

// Toggle
toggleButton.addEventListener("click", () => {
    const dark = body.classList.toggle("dark-mode");

    icon.classList.replace(
        dark ? "fa-moon" : "fa-sun",
        dark ? "fa-sun" : "fa-moon"
    );

    localStorage.setItem("theme", dark ? "dark" : "light");
});
