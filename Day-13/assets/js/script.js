const products = [
    "iPhone 15 Pro",
    "Samsung Galaxy S24",
    "OnePlus 12",
    "MacBook Air M3",
    "HP Pavilion",
    "Dell XPS Laptop",
    "Sony Headphones",
    "Boat Earbuds",
    "Nike Shoes",
    "Adidas Sneakers",
    "Gaming Mouse",
    "Mechanical Keyboard",
    "Smart Watch",
    "Bluetooth Speaker",
    "Canon Camera"
];

const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const loader = document.getElementById("loader");

function showResults(items) {
    results.innerHTML = "";

    if (items.length === 0) {
        results.innerHTML = `<div class="empty">No Results Found</div>`;
        return;
    }

    items.forEach(item => {
        results.innerHTML += `
      <div class="card">
        ${item}
        <br>
        <span class="tag">Available</span>
      </div>
    `;
    });
}

function searchData(value) {
    loader.style.display = "block";

    setTimeout(() => {
        const filtered = products.filter(product =>
            product.toLowerCase().includes(value.toLowerCase())
        );

        loader.style.display = "none";
        showResults(filtered);
    }, 500);
}

function debounce(func, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}

const debouncedSearch = debounce((e) => {
    const value = e.target.value.trim();

    if (value === "") {
        results.innerHTML = "";
        loader.style.display = "none";
        return;
    }

    searchData(value);
}, 700);

searchInput.addEventListener("input", debouncedSearch);