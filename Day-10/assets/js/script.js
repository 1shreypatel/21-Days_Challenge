const products = [
    {
        name: "iPhone 15",
        category: "electronics",
        price: "₹79,999",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },
    {
        name: "Nike Sneakers",
        category: "shoes",
        price: "₹4,999",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        name: "Men T-Shirt",
        category: "fashion",
        price: "₹799",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        name: "Laptop Pro",
        category: "electronics",
        price: "₹55,000",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
    },
    {
        name: "Running Shoes",
        category: "shoes",
        price: "₹3,499",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
    },
    {
        name: "Women Jacket",
        category: "fashion",
        price: "₹1,999",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500"
    }
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function displayProducts(items) {
    productList.innerHTML = "";

    if (items.length === 0) {
        productList.innerHTML = `<div class="no-result">No products found 😢</div>`;
        return;
    }

    items.forEach(product => {
        productList.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">${product.price}</div>
        <div class="category">${product.category}</div>
      </div>
    `;
    });
}

function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchText);
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

displayProducts(products);