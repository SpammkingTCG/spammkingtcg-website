const PRODUCT_DATA_URL = "data/products.json";
const WISHLIST_KEY = "spammking-wishlist";
const RECENTLY_VIEWED_KEY = "spammking-recently-viewed";

let products = [];
const gridStates = new WeakMap();

document.addEventListener("DOMContentLoaded", async () => {
    products = await loadProducts();

    setupProductGrids();
    setupComingSoon();
    setupProductDetail();
    setupWishlistPage();
    setupRecentlyViewed();
});

async function loadProducts(){
    try{
        const response = await fetch(PRODUCT_DATA_URL);

        if(!response.ok){
            throw new Error("Product data unavailable");
        }

        return await response.json();
    }catch(error){
        console.warn(error.message);
        return [];
    }
}

function setupProductGrids(){
    document.querySelectorAll("[data-product-grid]").forEach((grid) => {
        const game = grid.dataset.game || "";
        const controls = document.querySelector(`[data-product-controls][data-game="${game}"]`);
        const count = document.querySelector("[data-product-count]");
        const pagination = document.querySelector("[data-pagination]");
        const pageSize = Number(grid.dataset.pageSize || 6);
        const catalogue = products.filter((product) => !game || product.game === game);

        const state = {
            catalogue,
            controls,
            count,
            currentPage:1,
            pageSize,
            pagination,
            search:"",
            filters:{
                availability:"",
                category:"",
                set:""
            },
            sort:"featured"
        };

        gridStates.set(grid,state);
        populateFilters(state);
        bindControls(grid,state);
        renderProductGrid(grid,state);
    });
}

function populateFilters(state){
    if(!state.controls){
        return;
    }

    populateSelect(state.controls.querySelector('[data-filter="set"]'), uniqueValues(state.catalogue,"set"));
    populateSelect(state.controls.querySelector('[data-filter="category"]'), uniqueValues(state.catalogue,"category"));
}

function populateSelect(select,values){
    if(!select){
        return;
    }

    values.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });
}

function uniqueValues(items,key){
    return [...new Set(items.map((item) => item[key]).filter(Boolean))].sort((a,b) => a.localeCompare(b));
}

function bindControls(grid,state){
    if(!state.controls){
        return;
    }

    const search = state.controls.querySelector("[data-product-search]");
    const sort = state.controls.querySelector("[data-product-sort]");
    const filters = state.controls.querySelectorAll("[data-filter]");

    search?.addEventListener("input", () => {
        state.search = search.value.trim().toLowerCase();
        state.currentPage = 1;
        renderProductGrid(grid,state);
    });

    sort?.addEventListener("change", () => {
        state.sort = sort.value;
        state.currentPage = 1;
        renderProductGrid(grid,state);
    });

    filters.forEach((filter) => {
        filter.addEventListener("change", () => {
            state.filters[filter.dataset.filter] = filter.value;
            state.currentPage = 1;
            renderProductGrid(grid,state);
        });
    });
}

function renderProductGrid(grid,state){
    const filtered = sortProducts(filterProducts(state.catalogue,state),state.sort);
    const pageCount = Math.max(1,Math.ceil(filtered.length / state.pageSize));
    state.currentPage = Math.min(state.currentPage,pageCount);

    const start = (state.currentPage - 1) * state.pageSize;
    const pageProducts = filtered.slice(start,start + state.pageSize);

    grid.innerHTML = pageProducts.length
        ? pageProducts.map(productCard).join("")
        : emptyState("No products match those filters yet.");

    if(state.count){
        state.count.textContent = `${filtered.length} Pokemon product${filtered.length === 1 ? "" : "s"} found`;
    }

    renderPagination(state,pageCount,() => renderProductGrid(grid,state));
    bindWishlistButtons(grid);
}

function filterProducts(items,state){
    return items.filter((product) => {
        const matchesSearch = !state.search || [
            product.name,
            product.category,
            product.game,
            product.set,
            product.rarity,
            product.condition,
            product.description,
            ...(product.tags || [])
        ].join(" ").toLowerCase().includes(state.search);

        const matchesSet = !state.filters.set || product.set === state.filters.set;
        const matchesCategory = !state.filters.category || product.category === state.filters.category;
        const matchesAvailability = !state.filters.availability || getAvailability(product) === state.filters.availability;

        return matchesSearch && matchesSet && matchesCategory && matchesAvailability;
    });
}

function sortProducts(items,sort){
    return [...items].sort((a,b) => {
        if(sort === "newest"){
            return new Date(b.releaseDate) - new Date(a.releaseDate);
        }

        if(sort === "name"){
            return a.name.localeCompare(b.name);
        }

        if(sort === "price-low"){
            return getDisplayPrice(a) - getDisplayPrice(b);
        }

        if(sort === "price-high"){
            return getDisplayPrice(b) - getDisplayPrice(a);
        }

        return Number(b.featured) - Number(a.featured) || new Date(b.releaseDate) - new Date(a.releaseDate);
    });
}

function renderPagination(state,pageCount,onChange){
    if(!state.pagination){
        return;
    }

    if(pageCount <= 1){
        state.pagination.innerHTML = "";
        return;
    }

    state.pagination.innerHTML = `
        <button type="button" data-page-action="previous" ${state.currentPage === 1 ? "disabled" : ""}>Previous</button>
        <span>Page ${state.currentPage} of ${pageCount}</span>
        <button type="button" data-page-action="next" ${state.currentPage === pageCount ? "disabled" : ""}>Next</button>
    `;

    state.pagination.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            state.currentPage += button.dataset.pageAction === "next" ? 1 : -1;
            onChange();
        });
    });
}

function setupComingSoon(){
    document.querySelectorAll("[data-coming-soon]").forEach((list) => {
        const game = list.dataset.game || "";
        const comingSoon = products
            .filter((product) => product.comingSoon && (!game || product.game === game))
            .sort((a,b) => new Date(a.releaseDate) - new Date(b.releaseDate))
            .slice(0,3);

        list.innerHTML = comingSoon.length
            ? comingSoon.map((product) => `
                <article class="coming-soon-card">
                    <span>${formatDate(product.releaseDate)}</span>
                    <h3>${escapeHtml(product.name)}</h3>
                    <p>${escapeHtml(product.set)} · ${escapeHtml(product.category)}</p>
                </article>
            `).join("")
            : emptyState("No coming soon products are listed yet.");
    });
}

function setupProductDetail(){
    const target = document.querySelector("[data-product-detail]");

    if(!target){
        return;
    }

    const id = new URLSearchParams(window.location.search).get("id");
    const product = products.find((item) => item.id === id);

    if(!product){
        target.innerHTML = emptyState("Product not found.");
        return;
    }

    addRecentlyViewed(product.id);

    document.title = `${product.name} | SpammKing TCG`;
    target.innerHTML = `
        <nav class="breadcrumb-nav product-breadcrumb" aria-label="Breadcrumb">
            <ol>
                <li><a href="index.html">Home</a></li>
                <li><a href="${gamePageUrl(product.game)}">${escapeHtml(product.game)}</a></li>
                <li aria-current="page">${escapeHtml(product.name)}</li>
            </ol>
        </nav>
        <section class="product-detail-section" aria-labelledby="product-title">
            <div class="product-detail-media">
                <div class="shop-product-image product-detail-image" aria-hidden="true">
                    <span>${productInitials(product)}</span>
                </div>
            </div>
            <div class="product-detail-content">
                <p class="section-kicker">${escapeHtml(product.game)} · ${escapeHtml(product.category)}</p>
                <h1 id="product-title">${escapeHtml(product.name)}</h1>
                <p>${escapeHtml(product.description)}</p>
                <div class="product-price-row">
                    ${priceMarkup(product)}
                    <span class="product-status">${statusLabel(product)}</span>
                </div>
                <dl class="product-spec-list">
                    <div><dt>Set</dt><dd>${escapeHtml(product.set)}</dd></div>
                    <div><dt>Condition</dt><dd>${escapeHtml(product.condition)}</dd></div>
                    <div><dt>Rarity</dt><dd>${escapeHtml(product.rarity)}</dd></div>
                    <div><dt>Release</dt><dd>${formatDate(product.releaseDate)}</dd></div>
                </dl>
                <div class="product-action-row">
                    <a href="contact.html" class="primary-button">Enquire</a>
                    <button class="wishlist-button" type="button" data-wishlist-id="${product.id}" aria-pressed="${isWishlisted(product.id)}">
                        ${isWishlisted(product.id) ? "Saved" : "Save"}
                    </button>
                </div>
            </div>
        </section>
    `;

    bindWishlistButtons(target);
    renderRelatedProducts(product);
}

function renderRelatedProducts(product){
    document.querySelectorAll("[data-related-products]").forEach((grid) => {
        const related = products
            .filter((item) => item.id !== product.id && item.game === product.game)
            .filter((item) => item.category === product.category || item.set === product.set || item.featured)
            .slice(0,3);

        grid.innerHTML = related.length ? related.map(productCard).join("") : emptyState("Related products will appear here.");
        bindWishlistButtons(grid);
    });
}

function setupWishlistPage(){
    document.querySelectorAll("[data-wishlist-grid]").forEach((grid) => {
        const wishlist = getWishlist();
        const savedProducts = products.filter((product) => wishlist.includes(product.id));

        grid.innerHTML = savedProducts.length
            ? savedProducts.map(productCard).join("")
            : emptyState("Your wishlist is empty for now.");

        bindWishlistButtons(grid);
    });
}

function setupRecentlyViewed(){
    document.querySelectorAll("[data-recently-viewed]").forEach((grid) => {
        const game = grid.dataset.game || "";
        const recentIds = getRecentlyViewed();
        const recentProducts = recentIds
            .map((id) => products.find((product) => product.id === id))
            .filter((product) => product && (!game || product.game === game))
            .slice(0,3);

        grid.innerHTML = recentProducts.length
            ? recentProducts.map(productCard).join("")
            : emptyState("Products you view will appear here.");

        bindWishlistButtons(grid);
    });
}

function productCard(product){
    return `
        <article class="shop-product-card">
            <a href="product.html?id=${encodeURIComponent(product.id)}" class="product-card-link" aria-label="View ${escapeHtml(product.name)}">
                <div class="shop-product-image" aria-hidden="true">
                    <span>${productInitials(product)}</span>
                </div>
                <p class="release-category">${escapeHtml(product.game)} · ${escapeHtml(product.category)}</p>
                <h3>${escapeHtml(product.name)}</h3>
                <p>${escapeHtml(product.set)} · ${escapeHtml(product.condition)}</p>
            </a>
            <div class="product-card-footer">
                <div>
                    ${priceMarkup(product)}
                    <span>${statusLabel(product)}</span>
                </div>
                <button class="wishlist-button" type="button" data-wishlist-id="${product.id}" aria-pressed="${isWishlisted(product.id)}">
                    ${isWishlisted(product.id) ? "Saved" : "Save"}
                </button>
            </div>
        </article>
    `;
}

function bindWishlistButtons(scope){
    scope.querySelectorAll("[data-wishlist-id]").forEach((button) => {
        button.addEventListener("click", () => {
            const saved = toggleWishlist(button.dataset.wishlistId);
            updateWishlistButtons(button.dataset.wishlistId,saved);
        });
    });
}

function updateWishlistButtons(id,saved){
    document.querySelectorAll(`[data-wishlist-id="${CSS.escape(id)}"]`).forEach((button) => {
        button.textContent = saved ? "Saved" : "Save";
        button.setAttribute("aria-pressed",String(saved));
    });
}

function getWishlist(){
    return readStorageList(WISHLIST_KEY);
}

function toggleWishlist(id){
    const wishlist = getWishlist();
    const saved = wishlist.includes(id);
    const nextWishlist = saved ? wishlist.filter((item) => item !== id) : [id,...wishlist];

    localStorage.setItem(WISHLIST_KEY,JSON.stringify(nextWishlist));
    return !saved;
}

function isWishlisted(id){
    return getWishlist().includes(id);
}

function addRecentlyViewed(id){
    const recent = getRecentlyViewed().filter((item) => item !== id);
    localStorage.setItem(RECENTLY_VIEWED_KEY,JSON.stringify([id,...recent].slice(0,8)));
}

function getRecentlyViewed(){
    return readStorageList(RECENTLY_VIEWED_KEY);
}

function readStorageList(key){
    try{
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(value) ? value : [];
    }catch(error){
        return [];
    }
}

function getAvailability(product){
    if(product.comingSoon){
        return "coming-soon";
    }

    return product.stock > 0 ? "in-stock" : "out-of-stock";
}

function statusLabel(product){
    if(product.comingSoon){
        return "Coming Soon";
    }

    return product.stock > 0 ? "In Stock" : "Out of Stock";
}

function getDisplayPrice(product){
    return product.salePrice || product.price || 0;
}

function priceMarkup(product){
    if(!product.price && !product.salePrice){
        return `<p class="product-price">Price TBC</p>`;
    }

    if(product.salePrice){
        return `<p class="product-price"><span class="sale-price">${formatPrice(product.salePrice)}</span> <s>${formatPrice(product.price)}</s></p>`;
    }

    return `<p class="product-price">${formatPrice(product.price)}</p>`;
}

function formatPrice(value){
    return new Intl.NumberFormat("en-GB",{
        style:"currency",
        currency:"GBP"
    }).format(value);
}

function formatDate(value){
    return new Intl.DateTimeFormat("en-GB",{
        day:"numeric",
        month:"short",
        year:"numeric"
    }).format(new Date(value));
}

function productInitials(product){
    return product.category
        .split(/\s+/)
        .map((word) => word.charAt(0))
        .join("")
        .slice(0,3)
        .toUpperCase();
}

function gamePageUrl(game){
    return game === "Pokemon" ? "pokemon.html" : "latest-releases.html";
}

function emptyState(message){
    return `<div class="empty-state"><p>${escapeHtml(message)}</p></div>`;
}

function escapeHtml(value){
    return String(value ?? "")
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}
