# Velvet & Roast Cafe (QR ordering)

Open `index.html` through any web server (e.g. `python3 -m http.server`) - pages share the cart via localStorage, so use http:// rather than file://.

Flow: `index.html` -> `menu.html` -> `customize.html?id=...` -> `cart.html` -> `track.html` (+ `contact.html`).

- `assets/js/store.js` - product catalog (edit prices/options), cart, customer, order storage
- `assets/images/` - local product photos. Run `python3 tools/download_images.py` once (needs internet) to replace the small placeholder crops with the originals
- `assets/images/payment-qr.svg` - SAMPLE QR; replace with the shop's real Lao QR
- `VR.shop` in `store.js` - set phone / WhatsApp for the contact page
- Orders are saved in the customer's browser only (no server yet)
