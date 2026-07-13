# Changelog

All notable changes to the SpammKing TCG website will be documented here.

This project follows semantic versioning where practical.

---

# v1.0.6

Business Email Integration Pass

## Improved

- Added dedicated general, customer support, orders and trade email routing across public contact touchpoints
- Updated the contact page with separated enquiry sections and clickable `mailto:` links
- Updated trade, shipping, returns, authenticity and product support references to use the correct business inboxes
- Added business email contact points to Organization structured data
- Documented the email routing rules in `README.md`

---

# v1.0.5

Release Calendar Polish

## Improved

- Fixed release timeline month ordering by sorting groups from actual release dates
- Added release countdown labels such as releases this month, recently released and releases in X days
- Added source type and confidence badges to release cards and timeline rows
- Added release image rendering support for safe official/publisher image URLs, with branded placeholders as the fallback
- Improved release card and timeline spacing for mobile layouts

---

# v1.0.4

Release Calendar Accuracy and Source Tracking

## Improved

- Rebuilt `data/releases.json` as release-watch/calendar data rather than confirmed stock data
- Removed outdated Pokemon release entries such as White Flare and Black Bolt from upcoming release watch
- Added release source tracking fields including source name, source URL, source type and confidence
- Added official-image tracking fields while keeping branded placeholders where safe official imagery is not available
- Added confidence and source-type filters to the release hub
- Updated release cards to show source confidence and source name
- Updated release documentation in `README.md` and `docs/data-model.md`

---

# v1.0.3

Content Accuracy and Bug Fix Pass

## Added

- Added lightweight public landing pages for Disney Lorcana, Yu-Gi-Oh! and Magic: The Gathering
- Added the new category pages to `sitemap.xml`
- Added a safe Yu-Gi-Oh! release-watch entry for calendar filtering

## Improved

- Fixed contact and filter dropdown styling so options remain readable on dark UI
- Reworded the contact form note to explain that enquiries should currently use email or eBay
- Reframed Latest Releases as a collector release calendar/release watch rather than a confirmed stock promise
- Updated homepage and footer category links to point to the new public category pages
- Updated release card CTA wording from `View Release` to `View Details`

---

# v1.0.2

Project Documentation and Operating Manual

## Added

- Added `/docs` with architecture, data model, deployment, coding standards, contributing and future feature documentation
- Added `SPAMMKING_TCG_OPERATING_MANUAL.md` to document business operations, stock rules, sales process, marketing, finance notes and growth milestones
- Added a documentation index to `README.md`

---

# v1.0.1

Trade Information Pack

## Added

- Added hidden `trade.html` supplier information page for distributor and trade conversations
- Included concise business overview, stocked/planned games, website readiness, current eBay sales route and trade contact CTA
- Kept the trade page out of public navigation and marked it `noindex` so it can be shared directly without becoming a customer-facing page

---

# v1.0.0-beta

Phase 1 Beta Code Quality Review

## Improved

- Refactored shared JSON loading in `script.js` to reduce repeated data-fetching logic
- Hardened wishlist and recently viewed storage writes so blocked localStorage does not break browsing
- Let set library pages load product data for live product counts where collection pages need it
- Updated project documentation to describe the current Phase 1 Beta state rather than the early homepage-only build

---

# v0.9.5

Mobile and Real Launch QA

## Improved

- Hardened mobile layouts for small phone widths, tablet widths and narrow product journeys
- Improved tap targets, wrapping and spacing for navigation, buttons, filters, product metadata and policy cards
- Tightened customer-facing wording around newsletter forms, returns guidance and future website checkout
- Added consistent social preview image metadata across public pages
- Rechecked internal links, sitemap coverage, JSON data consistency and template indexing

---

# v0.9.4

Public Launch Cleanup and Consistency Pass

## Added

- Added a branded social preview image for shared links

## Improved

- Removed unfinished public wording from policy, support, product and release content
- Standardised header and footer links across public pages, set pages and the 404 page
- Removed the generic product template from `sitemap.xml`
- Cleaned product, collection and release data consistency before public sharing
- Updated generic eBay store CTAs to use clearer `View eBay Store` wording
- Updated `README.md` and `ROADMAP.md` for launch cleanup status

---

# v0.9.3

Privacy, Cookies, Terms and Launch Compliance

## Added

- Added `privacy-policy.html` with privacy information
- Added `cookie-policy.html` covering localStorage, wishlist storage, analytics and third-party links
- Added `terms.html` with plain-English website terms
- Added visible privacy notices for newsletter forms

## Improved

- Updated footer policy links across public pages
- Prevented newsletter forms from pretending to submit while they are not connected
- Updated external eBay links to use `rel="noopener noreferrer"`
- Updated `sitemap.xml`, `README.md` and `ROADMAP.md` for launch compliance pages

---

# v0.9.2

eBay Buying Journey and Product CTA System

## Added

- Added optional product purchase fields including `ebayUrl`, `purchaseUrl`, `purchaseType`, `ctaLabel`, `availabilityMessage`, `preorderAvailable`, `registerInterest` and `externalCheckout`
- Added dynamic product card CTAs for eBay, coming soon, sold out, register interest and unavailable states
- Added a product detail purchase panel with price, status, availability messaging, main CTA, wishlist and support links
- Added `how-to-buy.html` explaining the current eBay-first buying journey

## Improved

- Updated available preview products to use an eBay-first purchase flow instead of implying direct checkout
- Added How to Buy links into support footers across public pages
- Added disabled CTA styling for products that cannot currently be purchased
- Updated `sitemap.xml`, `README.md` and `ROADMAP.md` for the buying journey milestone

---

# v0.9.1

Trust, Policy and Customer Confidence Pages

## Added

- Added `shipping.html` with UK shipping, dispatch, packaging and pre-order delivery guidance
- Added `returns.html` with customer-friendly returns and refunds wording
- Added `authenticity.html` for genuine product, sealed product, singles, graded card and packaging standards
- Added `faq.html` with customer FAQs covering products, authenticity, shipping, returns, pre-orders and contact
- Added reusable customer-confidence blocks to product and category journeys

## Improved

- Upgraded `contact.html` with business details, enquiry reasons, supplier-friendly wording and clearer email guidance
- Updated footer support links across key public pages
- Linked product detail Shipping, Returns and Authenticity service notes to the new support pages
- Updated `sitemap.xml` with the new customer confidence pages

---

# v0.9.0

One Piece TCG Expansion

## Added

- Added a One Piece TCG category page at `one-piece.html`
- Added a One Piece sets library at `/one-piece/sets/`
- Added static-friendly One Piece set routes for OP-09, OP-10, OP-11, OP-12 and EB-02
- Added One Piece collection metadata to `data/collections.json`
- Added 11 One Piece preview products across sealed products, singles, graded cards and accessories
- Added One Piece release entries to the shared release hub data
- Added One Piece pages to `sitemap.xml`

## Improved

- Updated shared set routing so non-Pokemon games can reuse the same collection templates
- Linked One Piece from the homepage category section and footer shop links
- Kept the new One Piece section aligned with the existing premium black/gold design system

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

- Rebuilt About and Contact pages with proper metadata, navigation and accessible structure
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

- Expanded the product catalogue to 12 realistic Pokemon preview products across sealed products, singles, graded cards and accessories
- Added clear preview image paths for future product photography
- Added product detail gallery previews
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
- Added latest release and coming soon sections for future inventory
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
- Replaced inactive `#` links with current working pages or sections
- Improved newsletter form semantics and email autocomplete support
- Added safer accessibility attributes to decorative inline SVG artwork
- Wrapped scroll reveal animations in feature support checks for better browser compatibility
- Polished footer link consistency and responsive wrapping

---

# v0.4.0

Homepage Polish

## Added

- Premium SVG-style illustrations for hero, category and release cards
- Realistic latest release preview data
- Stronger trust messaging for authentic products, UK shipping and collector ownership
- Footer social links and payment method previews
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
