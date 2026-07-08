Upload these files to your GitHub repository. Cloudflare Pages will deploy automatically.

## Product Data

Product listings are stored in `data/products.json` and rendered by `script.js`.

Each product should use this schema:

- `id`: unique URL-safe product identifier
- `name`: customer-facing product name
- `category`: product type, such as Booster Box, Singles, Graded Cards or Accessories
- `productType`: product type used by filters and collection pages
- `game`: trading card game, such as Pokemon
- `set`: product set or range
- `collectionSlug`: game-level slug, such as `pokemon`
- `setSlug`: set-level slug, such as `prismatic-evolutions`
- `productSlug`: product-level slug for future clean product URLs
- `status`: customer-facing product status, such as Available or Coming Soon
- `rarity`: sealed, single rarity, graded or accessory type
- `condition`: product condition, such as New / Sealed, Near Mint or Graded 10
- `price`: normal price as a number
- `salePrice`: sale price as a number, or `null`
- `stock`: current stock count as a number
- `images`: array of future product image paths
- `description`: product description
- `releaseDate`: ISO date in `YYYY-MM-DD` format
- `tags`: searchable tags
- `featured`: `true` or `false`
- `comingSoon`: `true` or `false`

Use clear placeholder image paths until real photography is available, for example:

`assets/images/products/pokemon/product-name-front.jpg`

## Collections and Sets

Set metadata is stored in `data/collections.json`.

Each set should include:

- `game`: trading card game, such as Pokemon
- `setName`: customer-facing set name
- `slug`: URL-safe set slug
- `description`: short set description
- `releaseDate`: ISO date in `YYYY-MM-DD` format
- `productCount`: fallback product count
- `status`: set status, such as Available or Coming Soon
- `banner`: future banner or illustration placeholder path
- `relatedSets`: array of related set slugs

Pokemon set pages currently use static-friendly folders such as:

- `pokemon/sets/`
- `pokemon/sets/journey-together/`
- `pokemon/sets/prismatic-evolutions/`

The page content is rendered from `collections.json` and `products.json`, so future games can reuse the same structure.
