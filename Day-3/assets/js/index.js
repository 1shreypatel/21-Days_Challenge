
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.onclick = () => {
    navMenu.classList.toggle("active");
};

const dropdownBtns = document.querySelectorAll(".dropdown-btn");

dropdownBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();

        const parent = btn.parentElement;

        document.querySelectorAll(".dropdown").forEach(d => {
            if (d !== parent) d.classList.remove("open");
        });

        parent.classList.toggle("open");
    });
});

document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown").forEach(d => {
        d.classList.remove("open");
    });
});
