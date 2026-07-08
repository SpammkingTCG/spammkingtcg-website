# Changelog

All notable changes to the SpammKing TCG website will be documented here.

This project follows semantic versioning where practical.

---

# v0.8.1

Site-wide SEO, Routing and Launch Readiness

## Added

- Added `sitemap.xml` for crawlable public pages
- Added `robots.txt` pointing search engines to the sitemap
- Added a branded `404.html` page
- Added Organization, WebSite, BreadcrumbList and safe Product JSON-LD support
- Added Open Graph and Twitter card metadata to utility and set pages

## Improved

- Rebuilt placeholder About and Contact pages with proper metadata, navigation and accessible structure
- Improved script loading so pages only fetch the data files they need
- Audited internal routes, sitemap coverage and static-friendly set paths
- Kept `styleguide.html` marked as noindex for internal use

---

# v0.8.0

Release Calendar and Latest Releases Hub

## Added

- Added `data/releases.json` for shared release data across all games
- Rebuilt `latest-releases.html` as a premium release hub
- Added featured upcoming releases, release calendar, available now, coming soon and recently released sections
- Added release filtering by game, product type, status and month
- Added a grouped month-by-month release timeline
- Added release cards powered by JSON data

## Improved

- Updated the homepage Latest Releases section to render from shared release data
- Added a Pokemon-specific release watch section powered by the same release data
- Added reusable release hub styling and responsive mobile layouts

---

# v0.7.0

Collection and Set System

## Added

- Added `data/collections.json` for reusable game and set metadata
- Extended product data with product type, status, collection slug, set slug and product slug fields
- Added a Pokemon sets landing page at `/pokemon/sets/`
- Added static-friendly set routes for Journey Together, Prismatic Evolutions, Surging Sparks, Destined Rivals, Black Bolt and White Flare
- Added dynamic set hero rendering, product counts, related sets and set product grids powered by JSON data
- Added collection and set card styles using the existing premium dark/gold design system

## Improved

- Updated Pokemon product filtering to use product type and status fields
- Added a Pokemon page link into the new sets library
- Made product card and game/set links work from nested static routes

---

# v0.6.2

Design System Styleguide

## Added

- Added a hidden `styleguide.html` page for reusable design system components
- Documented live examples for colours, typography, buttons, tags, product cards, forms, pagination, empty states and accordions
- Added styleguide-specific responsive layout styles

## Improved

- Created a clearer internal reference point before building dynamic collection and set pages
- Kept the styleguide hidden from main navigation while making it directly accessible for development

---

# v0.6.1

Ecommerce QA and Polish

## Added

- Expanded the product catalogue to 12 realistic Pokemon placeholder products across sealed products, singles, graded cards and accessories
- Added clear placeholder image paths for future product photography
- Added product detail gallery placeholders
- Added shipping, returns and authenticity information blocks to product detail pages
- Added premium empty states for wishlist, recently viewed, related products and filtered product results

## Improved

- Tightened product JSON consistency across all current products
- Improved product card information hierarchy with price, game, category, rarity, availability and status
- Improved wishlist removal behaviour so saved items can be removed cleanly
- Polished ecommerce controls, card hover states, focus states and mobile stacking
- Removed stray copied separator characters from dynamic product rendering

---

# v0.6.0

Core Ecommerce Foundation

## Added

- Added a reusable JSON product catalogue for future dynamic products
- Added a shared product rendering system for product cards, search, filtering, sorting and pagination
- Added wishlist support using local browser storage
- Added recently viewed product support
- Added a reusable product detail page powered by product data
- Added related product rendering for product detail pages
- Added breadcrumb navigation for product and category journeys
- Added a wishlist page for saved products

## Improved

- Updated the Pokemon page so its product grid and coming soon section are generated from product data instead of hardcoded cards
- Added ecommerce component styling that matches the existing premium design system

---

# v0.5.0

Pokemon Category Page

## Added

- Created a premium Pokemon TCG landing page using the existing black and gold design language
- Added Pokemon product-type cards for Booster Boxes, Elite Trainer Boxes, Premium Collections, Booster Bundles, Mini Tins, Sleeved Boosters, Accessories, Singles and Graded Cards
- Added latest release and coming soon placeholder sections for future inventory
- Added a Pokemon-specific trust section focused on sealed stock, authenticity and UK dispatch
- Added an accessible FAQ accordion for sealed products, UK shipping, returns, authenticity and pre-orders
- Reused the homepage newsletter and footer patterns for consistency

## Improved

- Added reusable category page, product card, coming soon and FAQ styles for future game pages
- Linked the homepage Pokemon category and footer links to the new Pokemon page

---

# v0.4.1

Homepage QA and Production Polish

## Improved

- Refined homepage SEO metadata, canonical URL, Open Graph tags and Twitter card tags
- Improved keyboard focus visibility for links, buttons and form controls
- Tightened navigation behaviour across desktop, tablet and mobile layouts
- Replaced placeholder `#` links with current working pages or sections
- Improved newsletter form semantics and email autocomplete support
- Added safer accessibility attributes to decorative inline SVG artwork
- Wrapped scroll reveal animations in feature support checks for better browser compatibility
- Polished footer link consistency and responsive wrapping

---

# v0.4.0

Homepage Polish

## Added

- Premium SVG-style illustrations for hero, category and release cards
- Realistic latest release placeholder data
- Stronger trust messaging for authentic products, UK shipping and collector ownership
- Footer social links and payment method placeholders
- Subtle section reveal and hover animations

## Improved

- Homepage spacing and section rhythm
- Card hover states and gold glow effects
- Release card presentation
- Footer information architecture
- Responsive grid behaviour for desktop, tablet and mobile
- Accessibility focus states and semantic section structure

---

# v0.3.0

Current Development

## Added

- Premium homepage layout
- Sticky navigation
- Hero section
- Call-to-action buttons
- Trust badges
- Dark luxury design language

## Improved

- Responsive layout
- Typography
- Colour palette
- Website structure
- Branding

## Documentation

Added:

- README.md
- PROJECT_CONTEXT.md
- AGENTS.md
- ROADMAP.md
- CHANGELOG.md
- DESIGN_SYSTEM.md

---

# Future Releases

## v0.4.0

Complete

- Featured Categories
- Homepage cards
- Better animations
- Improved responsiveness

---

## v0.5.0

Planned

- Product pages
- About page improvements
- Contact improvements
- SEO enhancements

---

Future versions will continue to be documented here.
