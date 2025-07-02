const products = [
    { name: 'Sony Playstation 5', url: 'images/playstation_5.png', type: 'games', price: 499.99 },
    { name: 'Samsung Galaxy', url: 'images/samsung_galaxy.png', type: 'smartphones', price: 399.99 },
    { name: 'Cannon EOS Camera', url: 'images/cannon_eos_camera.png', type: 'cameras', price: 749.99 },
    { name: 'Sony A7 Camera', url: 'images/sony_a7_camera.png', type: 'cameras', price: 1999.99 },
    { name: 'LG TV', url: 'images/lg_tv.png', type: 'televisions', price: 799.99 },
    { name: 'Nintendo Switch', url: 'images/nintendo_switch.png', type: 'games', price: 299.99 },
    { name: 'Xbox Series X', url: 'images/xbox_series_x.png', type: 'games', price: 499.99 },
    { name: 'Samsung TV', url: 'images/samsung_tv.png', type: 'televisions', price: 1099.99 },
    { name: 'Google Pixel', url: 'images/google_pixel.png', type: 'smartphones', price: 499.99 },
    { name: 'Sony ZV1F Camera', url: 'images/sony_zv1f_camera.png', type: 'cameras', price: 799.99 },
    { name: 'Toshiba TV', url: 'images/toshiba_tv.png', type: 'televisions', price: 499.99 },
    { name: 'iPhone 14', url: 'images/iphone_14.png', type: 'smartphones', price: 999.99 },
];

const productsWrapperEl = document.getElementById('products-wrapper');
const checkEls = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartCount = document.getElementById('cartCount');
const noResultsEl = document.getElementById('noResults');

let cartItemCount = parseInt(localStorage.getItem('cartCount')) || 0;
cartCount.innerText = cartItemCount;

const productsEls = [];

products.forEach((product) => {
    const productEl = createProductElement(product);
    productsEls.push(productEl);
    productsWrapperEl.appendChild(productEl);
});

filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

function createProductElement(product) {
    const productEl = document.createElement('div');
    productEl.className = 'item space-y-2';

    productEl.innerHTML = `
    <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border">
      <img
        src="${product.url}"
        alt="${product.name}"
        onerror="this.src='images/placeholder.png'"
        class="w-full h-full object-cover"
      />
      <span class="status bg-gray-800 text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">
        Add To Cart
      </span>
    </div>
    <p class="text-xl">${product.name}</p>
    <strong>$${product.price.toLocaleString()}</strong>
  `;

    productEl.querySelector('.status').addEventListener('click', addToCart);

    return productEl;
}

function addToCart(e) {
    const statusEl = e.target;

    if (statusEl.classList.contains('added')) {
        statusEl.classList.remove('added', 'bg-red-600');
        statusEl.classList.add('bg-gray-800');
        statusEl.innerText = 'Add To Cart';
        cartItemCount--;
    } else {
        statusEl.classList.add('added', 'bg-red-600');
        statusEl.classList.remove('bg-gray-800');
        statusEl.innerText = 'Remove From Cart';
        cartItemCount++;
    }

    cartCount.innerText = cartItemCount;
    localStorage.setItem('cartCount', cartItemCount);
}

function filterProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const checkedCategories = Array.from(checkEls)
        .filter((check) => check.checked)
        .map((check) => check.id);

    let anyVisible = false;

    productsEls.forEach((productEl, index) => {
        const product = products[index];
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const inCategory = checkedCategories.length === 0 || checkedCategories.includes(product.type);

        const shouldShow = matchesSearch && inCategory;
        productEl.classList.toggle('hidden', !shouldShow);

        if (shouldShow) anyVisible = true;
    });

    noResultsEl.classList.toggle('hidden', anyVisible);
}