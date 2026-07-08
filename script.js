const PRODUCT_DATA_URL = "/data/products.json";
const COLLECTION_DATA_URL = "/data/collections.json";
const RELEASE_DATA_URL = "/data/releases.json";
const WISHLIST_KEY = "spammking-wishlist";
const RECENTLY_VIEWED_KEY = "spammking-recently-viewed";

let products = [];
let collections = [];
let releases = [];

document.addEventListener("DOMContentLoaded", async () => {
    const needsProducts = Boolean(document.querySelector("[data-product-grid], [data-product-detail], [data-wishlist-grid], [data-recently-viewed], [data-coming-soon], [data-set-detail], [data-related-products]"));
    const needsCollections = Boolean(document.querySelector("[data-sets-grid], [data-set-detail], [data-related-sets]"));
    const needsReleases = Boolean(document.querySelector("[data-release-hub], [data-release-grid], [data-release-calendar]"));

    [products,collections,releases] = await Promise.all([
        needsProducts ? loadProducts() : Promise.resolve([]),
        needsCollections ? loadCollections() : Promise.resolve([]),
        needsReleases ? loadReleases() : Promise.resolve([])
    ]);

    setupProductGrids();
    setupSetLanding();
    setupSetDetail();
    setupReleaseHub();
    setupReleaseSections();
    setupComingSoon();
    setupProductDetail();
    setupWishlistPage();
    setupRecentlyViewed();
    setupStaticStructuredData();
});

async function loadProducts(){
    try{
        const response = await fetch(PRODUCT_DATA_URL);

        if(!response.ok){
            throw new Error("Product data unavailable");
        }

        const data = await response.json();
        return data.map(normalizeProduct);
    }catch(error){
        console.warn(error.message);
        return [];
    }
}

async function loadReleases(){
    try{
        const response = await fetch(RELEASE_DATA_URL);

        if(!response.ok){
            throw new Error("Release data unavailable");
        }

        const data = await response.json();
        return data.map(normalizeRelease);
    }catch(error){
        console.warn(error.message);
        return [];
    }
}

async function loadCollections(){
    try{
        const response = await fetch(COLLECTION_DATA_URL);

        if(!response.ok){
            throw new Error("Collection data unavailable");
        }

        const data = await response.json();
        return data.map(normalizeCollection);
    }catch(error){
        console.warn(error.message);
        return [];
    }
}

function normalizeProduct(product){
    return {
        id:"",
        name:"",
        category:"",
        productType:product.category || "",
        game:"",
        set:"",
        collectionSlug:"",
        setSlug:"",
        productSlug:"",
        status:"",
        rarity:"",
        condition:"",
        price:0,
        salePrice:null,
        stock:0,
        images:[],
        description:"",
        releaseDate:"",
        tags:[],
        featured:false,
        comingSoon:false,
        ...product
    };
}

function normalizeCollection(collection){
    return {
        game:"",
        setName:"",
        slug:"",
        description:"",
        releaseDate:"",
        productCount:0,
        status:"",
        banner:"",
        relatedSets:[],
        ...collection
    };
}

function normalizeRelease(release){
    return {
        title:"",
        game:"",
        set:"",
        productType:"",
        releaseDate:"",
        preorderDate:"",
        status:"",
        shortDescription:"",
        image:"",
        relatedProducts:[],
        slug:"",
        priority:3,
        featured:false,
        comingSoon:false,
        availableNow:false,
        releaseWindow:"",
        displayOrder:99,
        ...release
    };
}

function setupProductGrids(){
    document.querySelectorAll("[data-product-grid]").forEach((grid) => {
        const game = grid.dataset.game || "";
        const controls = document.querySelector(`[data-product-controls][data-game="${game}"]`);
        const count = document.querySelector("[data-product-count]");
        const pagination = document.querySelector("[data-pagination]");
        const pageSize = Number(grid.dataset.pageSize || 6);
        const setSlug = grid.dataset.setSlug || "";
        const catalogue = products.filter((product) => {
            const matchesGame = !game || product.game === game;
            const matchesSet = !setSlug || product.setSlug === setSlug;
            return matchesGame && matchesSet;
        });

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
                productType:"",
                set:"",
                status:""
            },
            sort:"featured"
        };

        populateFilters(state);
        bindControls(grid,state);
        renderProductGrid(grid,state);
    });
}

function populateFilters(state){
    if(!state.controls){
        return;
    }

    populateSelect(state.controls.querySelector('[data-filter="set"]'),uniqueValues(state.catalogue,"set"));
    populateSelect(state.controls.querySelector('[data-filter="category"]'),uniqueValues(state.catalogue,"category"));
    populateSelect(state.controls.querySelector('[data-filter="productType"]'),uniqueValues(state.catalogue,"productType"));
    populateSelect(state.controls.querySelector('[data-filter="status"]'),uniqueValues(state.catalogue,"status"));
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

    search?.addEventListener("input",() => {
        state.search = search.value.trim().toLowerCase();
        state.currentPage = 1;
        renderProductGrid(grid,state);
    });

    sort?.addEventListener("change",() => {
        state.sort = sort.value;
        state.currentPage = 1;
        renderProductGrid(grid,state);
    });

    filters.forEach((filter) => {
        filter.addEventListener("change",() => {
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
        : emptyState("Try a different search term, product type or availability filter.","No Products Found");

    if(state.count){
        const productLabel = state.catalogue[0]?.game || "Product";
        state.count.textContent = `${filtered.length} ${productLabel} product${filtered.length === 1 ? "" : "s"} found`;
    }

    renderPagination(state,pageCount,() => renderProductGrid(grid,state));
    bindWishlistButtons(grid);
}

function filterProducts(items,state){
    return items.filter((product) => {
        const searchable = [
            product.name,
            product.category,
            product.productType,
            product.game,
            product.set,
            product.status,
            product.rarity,
            product.condition,
            product.description,
            ...(product.tags || [])
        ].join(" ").toLowerCase();

        const matchesSearch = !state.search || searchable.includes(state.search);
        const matchesSet = !state.filters.set || product.set === state.filters.set;
        const matchesCategory = !state.filters.category || product.category === state.filters.category;
        const matchesProductType = !state.filters.productType || product.productType === state.filters.productType;
        const matchesStatus = !state.filters.status || product.status === state.filters.status;
        const matchesAvailability = !state.filters.availability || getAvailability(product) === state.filters.availability;

        return matchesSearch && matchesSet && matchesCategory && matchesProductType && matchesStatus && matchesAvailability;
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
        button.addEventListener("click",() => {
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
                    <p>${escapeHtml(product.set)} | ${escapeHtml(product.category)}</p>
                </article>
            `).join("")
            : emptyState("No coming soon products are listed yet.","Coming Soon");
    });
}

function setupSetLanding(){
    document.querySelectorAll("[data-sets-grid]").forEach((grid) => {
        const game = grid.dataset.game || "";
        const setItems = collections
            .filter((collection) => !game || collection.game === game)
            .sort((a,b) => new Date(b.releaseDate) - new Date(a.releaseDate));

        grid.innerHTML = setItems.length
            ? setItems.map(setCard).join("")
            : emptyState("Sets will appear here as collection data is added.","No Sets Found");
    });
}

function setupSetDetail(){
    const target = document.querySelector("[data-set-detail]");

    if(!target){
        return;
    }

    const slug = target.dataset.setSlug || "";
    const collection = collections.find((item) => item.slug === slug);

    if(!collection){
        target.innerHTML = emptyState("This set could not be found.","Set Not Found");
        return;
    }

    const setProducts = products.filter((product) => product.game === collection.game && product.setSlug === collection.slug);
    const collectionSlug = collectionSlugFromGame(collection.game);
    document.title = `${collection.setName} | ${collection.game} Sets | SpammKing TCG`;
    updateMetaDescription(`${collection.setName} ${collection.game} products, release information and collector stock from SpammKing TCG.`);
    injectJsonLd(breadcrumbSchema([
        ["Home","https://spammkingtcg.co.uk/"],
        [collection.game,`https://spammkingtcg.co.uk/${collectionSlug}.html`],
        ["Sets",`https://spammkingtcg.co.uk/${collectionSlug}/sets/`],
        [collection.setName,`https://spammkingtcg.co.uk/${collectionSlug}/sets/${collection.slug}/`]
    ]));

    target.innerHTML = `
        <nav class="breadcrumb-nav product-breadcrumb" aria-label="Breadcrumb">
            <ol>
                <li><a href="/">Home</a></li>
                <li><a href="/${collectionSlug}.html">${escapeHtml(collection.game)}</a></li>
                <li><a href="/${collectionSlug}/sets/">Sets</a></li>
                <li aria-current="page">${escapeHtml(collection.setName)}</li>
            </ol>
        </nav>
        <section class="set-hero" aria-labelledby="set-title">
            <div class="set-hero-content">
                <p class="section-kicker">${escapeHtml(collection.game)} Set</p>
                <h1 id="set-title">${escapeHtml(collection.setName)}</h1>
                <p>${escapeHtml(collection.description)}</p>
                <div class="set-stat-row" aria-label="Set details">
                    <span>${formatDate(collection.releaseDate)}</span>
                    <span>${setProducts.length} product${setProducts.length === 1 ? "" : "s"}</span>
                    <span>${escapeHtml(collection.status)}</span>
                </div>
            </div>
            <div class="set-hero-art" aria-hidden="true">
                <span>${setInitials(collection.setName)}</span>
            </div>
        </section>
    `;

    document.querySelectorAll("[data-set-product-count]").forEach((node) => {
        node.textContent = `${setProducts.length} product${setProducts.length === 1 ? "" : "s"} in this set`;
    });

    document.querySelectorAll("[data-related-sets]").forEach((grid) => {
        const related = collection.relatedSets
            .map((relatedSlug) => collections.find((item) => item.slug === relatedSlug))
            .filter(Boolean)
            .slice(0,3);

        grid.innerHTML = related.length
            ? related.map(setCard).join("")
            : emptyState("Related sets will appear here.","Related Sets");
    });
}

function setupReleaseHub(){
    const hub = document.querySelector("[data-release-hub]");

    if(!hub){
        return;
    }

    const state = {
        controls:document.querySelector("[data-release-controls]"),
        game:"",
        month:"",
        productType:"",
        status:""
    };

    populateReleaseFilters(state);
    bindReleaseFilters(state);
    renderReleaseHub(state);
}

function populateReleaseFilters(state){
    if(!state.controls){
        return;
    }

    populateSelect(state.controls.querySelector('[data-release-filter="game"]'),uniqueReleaseValues("game"));
    populateSelect(state.controls.querySelector('[data-release-filter="productType"]'),uniqueReleaseValues("productType"));
    populateSelect(state.controls.querySelector('[data-release-filter="status"]'),uniqueReleaseValues("status"));
    populateSelect(state.controls.querySelector('[data-release-filter="month"]'),uniqueReleaseValues("releaseWindow"));
}

function uniqueReleaseValues(key){
    return [...new Set(releases.map((release) => release[key]).filter(Boolean))].sort((a,b) => {
        if(key === "releaseWindow"){
            return new Date(`1 ${a}`) - new Date(`1 ${b}`);
        }

        return a.localeCompare(b);
    });
}

function bindReleaseFilters(state){
    if(!state.controls){
        return;
    }

    state.controls.querySelectorAll("[data-release-filter]").forEach((filter) => {
        filter.addEventListener("change",() => {
            state[filter.dataset.releaseFilter] = filter.value;
            renderReleaseHub(state);
        });
    });
}

function renderReleaseHub(state){
    const filtered = filterReleases(releases,state);

    renderReleaseList("[data-featured-releases]",filtered.filter((release) => release.featured).slice(0,3),"No featured releases match those filters.");
    renderReleaseList("[data-available-releases]",filtered.filter((release) => release.availableNow).slice(0,4),"No available releases match those filters.");
    renderReleaseList("[data-coming-releases]",filtered.filter((release) => release.comingSoon).slice(0,4),"No coming soon releases match those filters.");
    renderReleaseList("[data-recent-releases]",filtered.filter((release) => release.status === "Recently Released").slice(0,4),"No recent releases match those filters.");
    renderReleaseCalendar(filtered);
}

function setupReleaseSections(){
    document.querySelectorAll("[data-release-grid]").forEach((grid) => {
        const game = grid.dataset.game || "";
        const limit = Number(grid.dataset.limit || 4);
        const mode = grid.dataset.releaseMode || "featured";
        let items = releases.filter((release) => !game || release.game === game);

        if(mode === "coming"){
            items = items.filter((release) => release.comingSoon);
        }else if(mode === "available"){
            items = items.filter((release) => release.availableNow);
        }else{
            items = items.filter((release) => release.featured);
        }

        items = sortReleases(items).slice(0,limit);
        grid.innerHTML = items.length ? items.map(releaseCard).join("") : emptyState("Release data will appear here.","No Releases Found");
    });
}

function filterReleases(items,state){
    return sortReleases(items.filter((release) => {
        const matchesGame = !state.game || release.game === state.game;
        const matchesType = !state.productType || release.productType === state.productType;
        const matchesStatus = !state.status || release.status === state.status;
        const matchesMonth = !state.month || release.releaseWindow === state.month;

        return matchesGame && matchesType && matchesStatus && matchesMonth;
    }));
}

function sortReleases(items){
    return [...items].sort((a,b) => a.displayOrder - b.displayOrder || new Date(a.releaseDate) - new Date(b.releaseDate));
}

function renderReleaseList(selector,items,emptyMessage){
    document.querySelectorAll(selector).forEach((grid) => {
        grid.innerHTML = items.length ? items.map(releaseCard).join("") : emptyState(emptyMessage,"No Releases Found");
    });
}

function renderReleaseCalendar(items){
    document.querySelectorAll("[data-release-calendar]").forEach((calendar) => {
        if(!items.length){
            calendar.innerHTML = emptyState("Try a different game, product type, status or month.","No Calendar Results");
            return;
        }

        const groups = items.reduce((months,release) => {
            const key = release.releaseWindow || formatMonth(release.releaseDate);
            months[key] = months[key] || [];
            months[key].push(release);
            return months;
        },{});

        calendar.innerHTML = Object.entries(groups).map(([month,monthReleases]) => `
            <article class="release-month">
                <h3>${escapeHtml(month)}</h3>
                <div class="release-timeline-list">
                    ${sortReleases(monthReleases).map((release) => `
                        <a href="${releaseCtaUrl(release)}" class="release-timeline-item">
                            <span>${formatDate(release.releaseDate)}</span>
                            <strong>${escapeHtml(release.title)}</strong>
                            <em>${escapeHtml(release.game)} | ${escapeHtml(release.status)}</em>
                        </a>
                    `).join("")}
                </div>
            </article>
        `).join("");
    });
}

function releaseCard(release){
    return `
        <article class="release-hub-card">
            <a href="${releaseCtaUrl(release)}" aria-label="View ${escapeHtml(release.title)}">
                <div class="release-card-art" aria-hidden="true">
                    <span>${setInitials(release.game)}</span>
                </div>
                <div class="release-card-body">
                    <p class="release-category">${escapeHtml(release.game)} | ${escapeHtml(release.productType)}</p>
                    <h3>${escapeHtml(release.title)}</h3>
                    <p>${escapeHtml(release.shortDescription)}</p>
                    <div class="set-card-meta">
                        <span>${escapeHtml(release.set)}</span>
                        <span>${formatDate(release.releaseDate)}</span>
                        <span>${escapeHtml(release.status)}</span>
                    </div>
                    <span class="category-link">View Release</span>
                </div>
            </a>
        </article>
    `;
}

function releaseCtaUrl(release){
    const firstProduct = release.relatedProducts?.[0];
    return firstProduct ? `/product.html?id=${encodeURIComponent(firstProduct)}` : "/latest-releases.html";
}

function formatMonth(value){
    return new Intl.DateTimeFormat("en-GB",{
        month:"long",
        year:"numeric"
    }).format(new Date(value));
}

function setCard(collection){
    const productCount = products.filter((product) => product.game === collection.game && product.setSlug === collection.slug).length || collection.productCount;

    return `
        <article class="set-card">
            <a href="${setUrl(collection)}" aria-label="View ${escapeHtml(collection.setName)} set">
                <div class="set-card-art" aria-hidden="true">
                    <span>${setInitials(collection.setName)}</span>
                </div>
                <p class="release-category">${escapeHtml(collection.game)} Set</p>
                <h3>${escapeHtml(collection.setName)}</h3>
                <p>${escapeHtml(collection.description)}</p>
                <div class="set-card-meta">
                    <span>${formatDate(collection.releaseDate)}</span>
                    <span>${productCount} product${productCount === 1 ? "" : "s"}</span>
                    <span>${escapeHtml(collection.status)}</span>
                </div>
                <span class="category-link">View Set</span>
            </a>
        </article>
    `;
}

function setupProductDetail(){
    const target = document.querySelector("[data-product-detail]");

    if(!target){
        return;
    }

    const id = new URLSearchParams(window.location.search).get("id");
    const product = products.find((item) => item.id === id);

    if(!product){
        target.innerHTML = emptyState("This product could not be found.","Product Not Found");
        return;
    }

    addRecentlyViewed(product.id);
    document.title = `${product.name} | SpammKing TCG`;
    injectJsonLd(breadcrumbSchema([
        ["Home","https://spammkingtcg.co.uk/"],
        [product.game,`https://spammkingtcg.co.uk/${product.collectionSlug || product.game.toLowerCase()}.html`],
        [product.name,`https://spammkingtcg.co.uk/product.html?id=${encodeURIComponent(product.id)}`]
    ]));
    injectJsonLd(productSchema(product));

    target.innerHTML = `
        <nav class="breadcrumb-nav product-breadcrumb" aria-label="Breadcrumb">
            <ol>
                <li><a href="/">Home</a></li>
                <li><a href="${gamePageUrl(product.game)}">${escapeHtml(product.game)}</a></li>
                <li aria-current="page">${escapeHtml(product.name)}</li>
            </ol>
        </nav>
        <section class="product-detail-section" aria-labelledby="product-title">
            <div class="product-detail-media">
                <div class="shop-product-image product-detail-image" aria-hidden="true">
                    <span>${productInitials(product)}</span>
                </div>
                <div class="product-gallery" aria-label="Product image gallery placeholders">
                    ${galleryButtons(product)}
                </div>
            </div>
            <div class="product-detail-content">
                <p class="section-kicker">${escapeHtml(product.game)} | ${escapeHtml(product.category)}</p>
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
                    <a href="/contact.html" class="primary-button">Enquire</a>
                    <button class="wishlist-button" type="button" data-wishlist-id="${product.id}" aria-label="Save ${escapeHtml(product.name)} to wishlist" aria-pressed="${isWishlisted(product.id)}">
                        ${isWishlisted(product.id) ? "Saved" : "Save"}
                    </button>
                </div>
                <div class="product-service-grid" aria-label="Product service information">
                    <article>
                        <h2>Shipping</h2>
                        <p>UK-based dispatch standards with collector-focused packaging. <a href="/shipping.html">Read shipping guidance</a>.</p>
                    </article>
                    <article>
                        <h2>Returns</h2>
                        <p>Draft returns guidance is available for review before checkout launches. <a href="/returns.html">Read returns guidance</a>.</p>
                    </article>
                    <article>
                        <h2>Authenticity</h2>
                        <p>Products are listed with genuine stock and buyer confidence in mind. <a href="/authenticity.html">Read authenticity standards</a>.</p>
                    </article>
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

        grid.innerHTML = related.length
            ? related.map(productCard).join("")
            : emptyState("Related products will appear here.","Related Products");

        bindWishlistButtons(grid);
    });
}

function setupWishlistPage(){
    document.querySelectorAll("[data-wishlist-grid]").forEach(renderWishlistGrid);
}

function renderWishlistGrid(grid){
    const wishlist = getWishlist();
    const savedProducts = products.filter((product) => wishlist.includes(product.id));

    grid.innerHTML = savedProducts.length
        ? savedProducts.map(productCard).join("")
        : emptyState("Save products while browsing and they will appear here on this device.","Your Wishlist Is Empty");

    bindWishlistButtons(grid);
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
            : emptyState("Products you view will appear here.","Recently Viewed");

        bindWishlistButtons(grid);
    });
}

function productCard(product){
    return `
        <article class="shop-product-card">
            <a href="/product.html?id=${encodeURIComponent(product.id)}" class="product-card-link" aria-label="View ${escapeHtml(product.name)}">
                <div class="shop-product-image" aria-hidden="true">
                    <span>${productInitials(product)}</span>
                </div>
                <p class="release-category">${escapeHtml(product.game)} | ${escapeHtml(product.category)}</p>
                <h3>${escapeHtml(product.name)}</h3>
                <p>${escapeHtml(product.set)} | ${escapeHtml(product.condition)}</p>
                <ul class="product-card-meta" aria-label="Product details">
                    <li>${escapeHtml(product.rarity)}</li>
                    <li>${product.stock > 0 ? `${product.stock} available` : statusLabel(product)}</li>
                </ul>
            </a>
            <div class="product-card-footer">
                <div>
                    ${priceMarkup(product)}
                    <span>${statusLabel(product)}</span>
                </div>
                <button class="wishlist-button" type="button" data-wishlist-id="${product.id}" aria-label="Save ${escapeHtml(product.name)} to wishlist" aria-pressed="${isWishlisted(product.id)}">
                    ${isWishlisted(product.id) ? "Saved" : "Save"}
                </button>
            </div>
        </article>
    `;
}

function bindWishlistButtons(scope){
    scope.querySelectorAll("[data-wishlist-id]").forEach((button) => {
        button.addEventListener("click",() => {
            const saved = toggleWishlist(button.dataset.wishlistId);
            updateWishlistButtons(button.dataset.wishlistId,saved);
            document.querySelectorAll("[data-wishlist-grid]").forEach(renderWishlistGrid);
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

function galleryButtons(product){
    const images = product.images.length ? product.images : [`assets/images/products/${product.id}-front.jpg`];

    return images.map((image,index) => `
        <button type="button" class="gallery-thumb" aria-label="Product image placeholder ${index + 1}: ${escapeHtml(image)}">
            ${index + 1}
        </button>
    `).join("");
}

function gamePageUrl(game){
    const slug = collectionSlugFromGame(game);
    return slug ? `/${slug}.html` : "/latest-releases.html";
}

function setUrl(collection){
    const collectionSlug = collectionSlugFromGame(collection.game);
    return `/${collectionSlug}/sets/${collection.slug}/`;
}

function collectionSlugFromGame(game){
    const slugs = {
        "Pokemon":"pokemon",
        "One Piece":"one-piece",
        "Disney Lorcana":"lorcana",
        "Yu-Gi-Oh!":"yu-gi-oh",
        "Magic: The Gathering":"magic"
    };

    return slugs[game] || game.toLowerCase().replaceAll(":","").replaceAll("!","").replaceAll(" ","-");
}

function setInitials(value){
    return value
        .split(/\s+/)
        .map((word) => word.charAt(0))
        .join("")
        .slice(0,3)
        .toUpperCase();
}

function updateMetaDescription(content){
    const meta = document.querySelector('meta[name="description"]');

    if(meta){
        meta.setAttribute("content",content);
    }
}

function setupStaticStructuredData(){
    if(document.body.dataset.schema === "home"){
        injectJsonLd({
            "@context":"https://schema.org",
            "@type":"Organization",
            "name":"SpammKing TCG",
            "url":"https://spammkingtcg.co.uk/",
            "sameAs":["https://www.ebay.co.uk/usr/spammkingtcg"]
        });
        injectJsonLd({
            "@context":"https://schema.org",
            "@type":"WebSite",
            "name":"SpammKing TCG",
            "url":"https://spammkingtcg.co.uk/"
        });
    }
}

function breadcrumbSchema(items){
    return {
        "@context":"https://schema.org",
        "@type":"BreadcrumbList",
        "itemListElement":items.map(([name,item],index) => ({
            "@type":"ListItem",
            "position":index + 1,
            "name":name,
            "item":item
        }))
    };
}

function productSchema(product){
    return {
        "@context":"https://schema.org",
        "@type":"Product",
        "name":product.name,
        "description":product.description,
        "category":`${product.game} ${product.productType || product.category}`,
        "brand":{
            "@type":"Brand",
            "name":product.game
        }
    };
}

function injectJsonLd(data){
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
}

function emptyState(message,title = "Nothing Found"){
    return `
        <div class="empty-state">
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(message)}</p>
        </div>
    `;
}

function escapeHtml(value){
    return String(value ?? "")
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}
