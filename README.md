Upload these files to your GitHub repository. Cloudflare Pages will deploy automatically.

## Product Data

Product listings are stored in `data/products.json` and rendered by `script.js`.

Each product should use this schema:

- `id`: unique URL-safe product identifier
- `name`: customer-facing product name
- `category`: product type, such as Booster Box, Singles, Graded Cards or Accessories
- `game`: trading card game, such as Pokemon
- `set`: product set or range
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
