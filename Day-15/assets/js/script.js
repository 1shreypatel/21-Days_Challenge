const products = [
    { id: 1, name: "Onda Vase", category: "ceramics", price: 89, rating: 4.8, reviews: 42, badge: "Best Seller", image: "maison-vase-onda", desc: "Hand-thrown ceramic vase with organic wave texture. Each piece is unique due to the natural glazing process." },
    { id: 2, name: "Linen Throw Blanket", category: "textiles", price: 145, rating: 4.9, reviews: 67, badge: null, image: "maison-linen-throw", desc: "Stonewashed Belgian linen in a warm oat tone. Generously sized at 170×240cm for versatile use." },
    { id: 3, name: "Arc Floor Lamp", category: "lighting", price: 320, rating: 4.7, reviews: 28, badge: "New", image: "maison-arc-lamp", desc: "Minimalist brass arc lamp with linen shade. Adjustable height and warm ambient glow." },
    { id: 4, name: "Walnut Side Table", category: "furniture", price: 275, rating: 4.6, reviews: 19, badge: null, image: "maison-walnut-table", desc: "Solid walnut top with blackened steel legs. Japanese-inspired joinery, no screws visible." },
    { id: 5, name: "Ceramic Bowl Set", category: "ceramics", price: 65, rating: 4.5, reviews: 53, badge: null, image: "maison-bowl-set", desc: "Set of 3 nesting bowls in matte cream glaze. Microwave and dishwasher safe." },
    { id: 6, name: "Wool Cushion Cover", category: "textiles", price: 55, rating: 4.4, reviews: 31, badge: null, image: "maison-wool-cushion", desc: "Hand-woven New Zealand wool with subtle herringbone pattern. Fits standard 50×50cm insert." },
    { id: 7, name: "Pendant Light — Sphere", category: "lighting", price: 195, rating: 4.8, reviews: 36, badge: "Popular", image: "maison-pendant-sphere", desc: "Mouth-blown glass sphere pendant in smoke grey. Creates beautiful light patterns on surrounding surfaces." },
    { id: 8, name: "Oak Shelf Unit", category: "furniture", price: 490, rating: 4.9, reviews: 14, badge: null, image: "maison-oak-shelf", desc: "White oak open shelving system with blackened brass brackets. Modular design, expands as needed." },
    { id: 9, name: "Leather Journal", category: "accessories", price: 42, rating: 4.3, reviews: 88, badge: null, image: "maison-leather-journal", desc: "Vegetable-tanned leather cover with 160 pages of acid-free cotton paper. Ages beautifully." },
    { id: 10, name: "Terracotta Planter", category: "ceramics", price: 38, rating: 4.2, reviews: 45, badge: null, image: "maison-terracotta-pot", desc: "Hand-formed terracotta with drainage hole and saucer. Perfect for medium-sized houseplants." },
    { id: 11, name: "Brass Candle Holder", category: "accessories", price: 68, rating: 4.7, reviews: 22, badge: "New", image: "maison-brass-candle", desc: "Solid brass with living finish that develops a rich patina over time. Holds standard taper candles." },
    { id: 12, name: "Cotton Table Runner", category: "textiles", price: 48, rating: 4.5, reviews: 39, badge: null, image: "maison-table-runner", desc: "Heavyweight organic cotton with hand-finished edges. 40×180cm in natural ecru." },
];

let cart = [];
let activeFilter = 'all';
let activeSort = 'featured';
let sortOpen = false;
let mobileMenuOpen = false;

function getFilteredSorted() {
    let filtered = activeFilter === 'all' ? [...products] : products.filter(p => p.category === activeFilter);

    switch (activeSort) {
        case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
        case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
        case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
        default: break;
    }
    return filtered;
}

function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += i <= Math.round(rating)
            ? '<i data-lucide="star" class="w-3 h-3 star-filled fill-current"></i>'
            : '<i data-lucide="star" class="w-3 h-3 star-empty"></i>';
    }
    return html;
}

function renderProducts() {
    const grid = document.getElementById('productGrid');
    const emptyState = document.getElementById('emptyState');
    const filtered = getFilteredSorted();

    document.getElementById('productCount').textContent = filtered.length;

    if (filtered.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        lucide.createIcons();
        return;
    }

    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');

    grid.innerHTML = filtered.map(p => `
    <div class="product-card group cursor-pointer" data-id="${p.id}">
      <div class="relative overflow-hidden rounded-sm mb-4 bg-[#E8E4DA] aspect-[4/5]">
        <div class="img-skeleton absolute inset-0"></div>
        <img
          src="https://picsum.photos/seed/${p.image}/600/750.jpg"
          alt="${p.name}"
          class="product-img w-full h-full object-cover relative z-[1] loading="lazy"
          onload="this.previousElementSibling.style.display='none'"
        >
        ${p.badge ? `<span class="absolute top-3 left-3 z-[2] text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-sm" style="background: var(--text); color: var(--bg);">${p.badge}</span>` : ''}
        <button class="add-btn absolute bottom-3 left-3 right-3 z-[2] flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-[0.1em] rounded-sm transition-colors" style="background: var(--bg); color: var(--text); border: 1px solid rgba(45,36,32,0.1);"
          onclick="event.stopPropagation(); addToCart(${p.id})">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i>
          Add to Cart
        </button>
        <button class="absolute top-3 right-3 z-[2] w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style="background: rgba(247,245,240,0.8); backdrop-filter: blur(4px);"
          onclick="event.stopPropagation(); openQuickView(${p.id})">
          <i data-lucide="eye" class="w-3.5 h-3.5"></i>
        </button>
      </div>
      <div onclick="openQuickView(${p.id})">
        <div class="flex items-center gap-1 mb-1.5">
          ${renderStars(p.rating)}
          <span class="text-[11px] ml-1" style="color: var(--text-muted);">(${p.reviews})</span>
        </div>
        <h4 class="text-sm font-semibold tracking-tight mb-1">${p.name}</h4>
        <p class="text-xs uppercase tracking-wider" style="color: var(--text-muted);">${p.category}</p>
        <p class="text-base font-semibold mt-2" style="font-family:'Syne',sans-serif;">$${p.price}</p>
      </div>
    </div>
  `).join('');

    lucide.createIcons();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    showToast(`${product.name} added to cart`);
    animateBadge();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(productId);
        return;
    }
    updateCartUI();
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
    const badge = document.getElementById('cartBadge');
    const count = getCartCount();

    if (count > 0) {
        badge.classList.remove('hidden');
        badge.textContent = count;
    } else {
        badge.classList.add('hidden');
    }

    renderCartItems();
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');

    if (cart.length === 0) {
        container.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full text-center">
        <i data-lucide="shopping-bag" class="w-12 h-12 mb-4" style="color: var(--text-muted); opacity:0.2;"></i>
        <p class="text-sm font-medium" style="color: var(--text-muted);">Your cart is empty</p>
        <p class="text-xs mt-1" style="color: var(--text-muted); opacity:0.6;">Add some beautiful objects</p>
      </div>
    `;
        footer.innerHTML = '';
        lucide.createIcons();
        return;
    }

    container.innerHTML = cart.map(item => `
    <div class="flex gap-4 py-4 border-b" style="border-color: rgba(45,36,32,0.08);">
      <div class="w-20 h-24 rounded-sm overflow-hidden flex-shrink-0 bg-[#E8E4DA]">
        <img src="https://picsum.photos/seed/${item.image}/200/250.jpg" alt="${item.name}" class="w-full h-full object-cover">
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start">
          <h4 class="text-sm font-semibold tracking-tight pr-2">${item.name}</h4>
          <button onclick="removeFromCart(${item.id})" class="flex-shrink-0 p-0.5 hover:opacity-60 transition-opacity" style="color: var(--text-muted);">
            <i data-lucide="x" class="w-3.5 h-3.5"></i>
          </button>
        </div>
        <p class="text-[11px] uppercase tracking-wider mt-0.5" style="color: var(--text-muted);">${item.category}</p>
        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center gap-2">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
            <span class="text-sm font-medium w-6 text-center">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          </div>
          <span class="text-sm font-semibold" style="font-family:'Syne',sans-serif;">$${item.price * item.qty}</span>
        </div>
      </div>
    </div>
  `).join('');

    const total = getCartTotal();
    const shipping = total >= 150 ? 0 : 12;
    footer.innerHTML = `
    <div class="flex justify-between text-sm mb-2">
      <span style="color: var(--text-muted);">Subtotal</span>
      <span>$${total}</span>
    </div>
    <div class="flex justify-between text-sm mb-4">
      <span style="color: var(--text-muted);">Shipping</span>
      <span>${shipping === 0 ? '<span style="color: var(--accent);">Free</span>' : '$' + shipping}</span>
    </div>
    ${shipping > 0 ? `<p class="text-[11px] mb-4" style="color: var(--text-muted);">Add $${150 - total} more for free shipping</p>` : ''}
    <div class="flex justify-between text-base font-semibold mb-6 pt-3 border-t" style="border-color: rgba(45,36,32,0.1); font-family:'Syne',sans-serif;">
      <span>Total</span>
      <span>$${total + shipping}</span>
    </div>
    <button class="w-full py-4 text-xs font-semibold uppercase tracking-[0.15em] rounded-sm transition-colors" style="background: var(--text); color: var(--bg);" onmouseover="this.style.background='var(--accent)'; this.style.color='var(--text)'" onmouseout="this.style.background='var(--text)'; this.style.color='var(--bg)'">
      Checkout — $${total + shipping}
    </button>
    <button onclick="toggleCart()" class="w-full py-3 text-xs font-medium uppercase tracking-[0.1em] mt-2 hover:opacity-60 transition-opacity" style="color: var(--text-muted);">
      Continue Shopping
    </button>
  `;

    lucide.createIcons();
}

function animateBadge() {
    const badge = document.getElementById('cartBadge');
    badge.classList.remove('badge-pop');
    void badge.offsetWidth;
    badge.classList.add('badge-pop');
}

function toggleCart() {
    document.getElementById('cartOverlay').classList.toggle('active');
    document.getElementById('cartDrawer').classList.toggle('active');
    document.body.style.overflow = document.getElementById('cartDrawer').classList.contains('active') ? 'hidden' : '';
}

function openQuickView(productId) {
    const p = products.find(pr => pr.id === productId);
    if (!p) return;

    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');

    content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="aspect-square bg-[#E8E4DA]">
        <img src="https://picsum.photos/seed/${p.image}/800/800.jpg" alt="${p.name}" class="w-full h-full object-cover">
      </div>
      <div class="p-8 md:p-10 flex flex-col justify-center">
        <p class="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style="color: var(--accent);">${p.category}</p>
        <h2 class="text-2xl md:text-3xl font-medium tracking-tighter mb-2" style="font-family:'Syne',sans-serif;">${p.name}</h2>
        <div class="flex items-center gap-2 mb-4">
          ${renderStars(p.rating)}
          <span class="text-xs" style="color: var(--text-muted);">${p.rating} (${p.reviews} reviews)</span>
        </div>
        <p class="text-3xl font-medium mb-6" style="font-family:'Syne',sans-serif;">$${p.price}</p>
        <p class="text-sm leading-relaxed mb-8" style="color: var(--text-muted);">${p.desc}</p>
        <div class="flex gap-3">
          <button onclick="addToCart(${p.id}); closeQuickViewDirect();" class="flex-1 py-4 text-xs font-semibold uppercase tracking-[0.15em] rounded-sm transition-colors flex items-center justify-center gap-2" style="background: var(--text); color: var(--bg);" onmouseover="this.style.background='var(--accent)'; this.style.color='var(--text)'" onmouseout="this.style.background='var(--text)'; this.style.color='var(--bg)'">
            <i data-lucide="shopping-bag" class="w-4 h-4"></i>
            Add to Cart
          </button>
          <button class="w-14 h-14 flex items-center justify-center border rounded-sm transition-colors" style="border-color: rgba(45,36,32,0.15);" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='rgba(45,36,32,0.15)'">
            <i data-lucide="heart" class="w-4 h-4"></i>
          </button>
        </div>
        <div class="mt-8 pt-6 border-t grid grid-cols-3 gap-4 text-center" style="border-color: rgba(45,36,32,0.1);">
          <div>
            <i data-lucide="truck" class="w-4 h-4 mx-auto mb-1.5" style="color: var(--accent);"></i>
            <p class="text-[10px] uppercase tracking-wider" style="color: var(--text-muted);">Free Ship<br>Over $150</p>
          </div>
          <div>
            <i data-lucide="refresh-cw" class="w-4 h-4 mx-auto mb-1.5" style="color: var(--accent);"></i>
            <p class="text-[10px] uppercase tracking-wider" style="color: var(--text-muted);">30-Day<br>Returns</p>
          </div>
          <div>
            <i data-lucide="shield-check" class="w-4 h-4 mx-auto mb-1.5" style="color: var(--accent);"></i>
            <p class="text-[10px] uppercase tracking-wider" style="color: var(--text-muted);">2-Year<br>Warranty</p>
          </div>
        </div>
      </div>
    </div>
  `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
}

function closeQuickView(e) {
    if (e.target === document.getElementById('quickViewModal')) {
        closeQuickViewDirect();
    }
}

function closeQuickViewDirect() {
    document.getElementById('quickViewModal').classList.remove('active');
    if (!document.getElementById('cartDrawer').classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

function filterProducts(category) {
    activeFilter = category;
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.toggle('active', chip.textContent.trim().toLowerCase() === category || (category === 'all' && chip.textContent.trim().toLowerCase() === 'all'));
    });
    renderProducts();
}

function toggleSort() {
    sortOpen = !sortOpen;
    document.getElementById('sortDropdown').classList.toggle('open', sortOpen);
}

function sortProducts(method) {
    activeSort = method;
    const labels = {
        'featured': 'Featured',
        'price-asc': 'Price: Low to High',
        'price-desc': 'Price: High to Low',
        'name': 'Name: A–Z',
        'rating': 'Top Rated'
    };
    document.getElementById('sortLabel').textContent = `Sort by: ${labels[method]}`;
    sortOpen = false;
    document.getElementById('sortDropdown').classList.remove('open');
    renderProducts();
}

document.addEventListener('click', (e) => {
    if (!document.getElementById('sortWrapper').contains(e.target)) {
        sortOpen = false;
        document.getElementById('sortDropdown').classList.remove('open');
    }
});

function showToast(message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4" style="color: var(--accent);"></i> ${message}`;
    container.appendChild(toast);
    lucide.createIcons();

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    const menu = document.getElementById('mobileMenu');
    menu.style.clipPath = mobileMenuOpen
        ? 'circle(150% at calc(100% - 2.5rem) 2rem)'
        : 'circle(0% at calc(100% - 2.5rem) 2rem)';
}

renderProducts();
renderCartItems();
lucide.createIcons();