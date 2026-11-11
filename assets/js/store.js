/* Velvet & Roast Cafe - shared data + state (cart, customer, order) for every page.
 * State lives in localStorage so it survives page navigation.
 * NOTE: there is no backend yet - orders are stored in this browser only. */
(function (w) {
  'use strict';

  var KEYS = {
    cart: 'vr_cart_v1',
    customer: 'vr_customer_v1',
    ctx: 'vr_ctx_v1',
    order: 'vr_order_v1',
    seq: 'vr_order_seq_v1'
  };

  /* ---------- catalog (edit prices / options here) ---------- */
  var SIZES = [
    { key: 'S', label: 'ນ້ອຍ (Small • 8oz)',   hint: 'ມາດຕະຖານໂຄງສ້າງ',        add: 0 },
    { key: 'M', label: 'ກາງ (Medium • 12oz)', hint: 'ເພີ່ມຊ໊ອດກາເຟເຂັ້ມຂຸ້ນ', add: 3000 },
    { key: 'L', label: 'ໃຫຍ່ (Large • 16oz)', hint: 'ຈຸໃຈຕະຫຼອດມື້',          add: 6000 }
  ];
  var STYLES_COFFEE = [
    { key: 'hot',    label: 'ຮ້ອນ', icon: 'local_fire_department', price: 22000 },
    { key: 'iced',   label: 'ເຢັນ', icon: 'ac_unit',               price: 25000 },
    { key: 'frappe', label: 'ປັ່ນ', icon: 'cyclone',               price: 28000 }
  ];

  var CATEGORIES = [
    { key: 'all',    label: 'ທັງໝົດ',               en: 'All',    icon: 'local_dining' },
    { key: 'coffee', label: 'ກາເຟ',                en: 'Coffee', icon: 'coffee' },
    { key: 'tea',    label: 'ຊາ & ເຄື່ອງດື່ມ',       en: 'Tea',    icon: 'emoji_food_beverage' },
    { key: 'bakery', label: 'ຂະໜົມປັງ & ຄົວຊອງ',    en: 'Bakery', icon: 'bakery_dining' },
    { key: 'cake',   label: 'ເຄັກ',                en: 'Cakes',  icon: 'cake' }
  ];
  var CATEGORY_LABEL = { coffee: 'ກາເຟ', tea: 'ຊາ', bakery: 'ເບເກີຣີ່', cake: 'ເຄັກ' };

  var PRODUCTS = [
    { id: 'latte', cat: 'coffee', name: 'ລາເຕ້ (Latte)', en: 'Artisan Velvet Latte',
      desc: 'ເມນູກາເຟຍອດນິຍົມ ຫອມມັນກົມກ່ອມ ດ້ວຍເມັດກາເຟຄົ້ວພິເສດ', image: 'assets/images/latte.jpg',
      tags: ['Espresso', 'Milk'], badge: '3 ແບບ', serve: 'ຮ້ອນ / ເຢັນ / ປັ່ນ',
      price: 22000, styles: STYLES_COFFEE, sizes: SIZES, sweet: true, bestseller: 'ແນະນຳ' },
    { id: 'matcha', cat: 'tea', name: 'ຊາຂຽວມັດຊະ', en: 'Matcha Green Tea',
      desc: '', image: 'assets/images/matcha.jpg',
      tags: ['ນົມສົດແທ້'], badge: 'Uji Matcha',
      price: 24000, sizes: SIZES, sweet: true },
    { id: 'macchiato', cat: 'coffee', name: 'ຄາຣາເມວ ມັກຄີອາໂຕ້', en: 'Caramel Macchiato',
      desc: '', image: 'assets/images/macchiato.jpg',
      tags: ['Caramel'],
      price: 26000, sizes: SIZES, sweet: true },
    { id: 'croissant', cat: 'bakery', name: 'ຄົວຊອງເນີຍສົດ', en: 'French Butter Croissant',
      desc: 'ອົບຮ້ອນພ້ອມເສີບ • ເນີຍແທ້ 100%', image: 'assets/images/croissant.jpg',
      tags: ['Pure Butter'], badge: 'ອົບສົດໃໝ່', price: 20000 },
    { id: 'redvelvet', cat: 'cake', name: 'ເຄັກເຣດເວວເວດ', en: 'Red Velvet Cake',
      desc: '', image: 'assets/images/redvelvet.jpg',
      tags: ['Cream Cheese'], price: 32000, bestseller: 'ຍອດນິຍົມ' },
    { id: 'mocha', cat: 'coffee', name: 'ມັອກຄ່າປັ່ນ', en: 'Dark Mocha Frappe',
      desc: '', image: 'assets/images/mocha.jpg',
      tags: ['Blended'], price: 28000, sizes: SIZES, sweet: true, bestseller: 'ມາແຮງ' }
  ];

  /* shop contact details - fill these in; empty values hide the button on contact.html */
  var SHOP = { phone: '', whatsapp: '' };

  var BRANCHES = [
    { key: 'center',  name: 'ສາຂາ ໃຈກາງເມືອງ', en: 'City Center Branch' },
    { key: 'dongdok', name: 'ສາຂາ ດົງໂດກ',    en: 'Dongdok Branch' }
  ];

  /* ---------- storage helpers (never throw) ---------- */
  function read(key, fallback) {
    try {
      var raw = w.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function write(key, val) {
    try { w.localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode etc. */ }
  }
  function remove(key) { try { w.localStorage.removeItem(key); } catch (e) {} }

  function formatKip(n) { return Number(n || 0).toLocaleString('en-US') + ' ກີບ'; }

  function getProduct(id) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }
  function startPrice(p) {
    if (p.styles) return Math.min.apply(null, p.styles.map(function (s) { return s.price; }));
    return p.price;
  }

  /* ---------- context: branch + table ---------- */
  function getCtx() {
    var c = read(KEYS.ctx, null) || {};
    return {
      branch: c.branch || 'dongdok',
      table: c.table === undefined ? '05' : c.table
    };
  }
  function setCtx(patch) {
    var c = getCtx();
    for (var k in patch) c[k] = patch[k];
    write(KEYS.ctx, c);
    return c;
  }
  function getBranch(key) {
    for (var i = 0; i < BRANCHES.length; i++) if (BRANCHES[i].key === key) return BRANCHES[i];
    return BRANCHES[0];
  }

  /* ---------- cart ---------- */
  function getCart() { return read(KEYS.cart, []); }
  function saveCart(c) { write(KEYS.cart, c); w.dispatchEvent(new Event('vr:cart')); }

  function lineKey(l) {
    return [l.productId, l.style || '', l.size || '', l.sweetness || '', l.note || ''].join('|');
  }
  function addToCart(line) {
    var cart = getCart();
    var key = lineKey(line);
    for (var i = 0; i < cart.length; i++) {
      if (lineKey(cart[i]) === key) {
        cart[i].qty += line.qty || 1;
        saveCart(cart);
        return cart[i];
      }
    }
    line.lineId = 'l' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    line.qty = line.qty || 1;
    cart.push(line);
    saveCart(cart);
    return line;
  }
  /* add a product with its default options (used by the quick "+" button) */
  function buildDefaultLine(p, qty) {
    var style = p.styles ? p.styles[0] : null;
    var size = p.sizes ? p.sizes[0] : null;
    return {
      productId: p.id,
      name: p.name, image: p.image, cat: p.cat,
      style: style ? style.key : '', styleLabel: style ? style.label : '',
      size: size ? size.key : '', sizeLabel: size ? size.label : '',
      sweetness: p.sweet ? 'ປົກກະຕິ (50%)' : '',
      note: '',
      unitPrice: (style ? style.price : p.price) + (size ? size.add : 0),
      qty: qty || 1
    };
  }
  function setQty(lineId, qty) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].lineId === lineId) {
        if (qty < 1) cart.splice(i, 1); else cart[i].qty = qty;
        break;
      }
    }
    saveCart(cart);
  }
  function removeLine(lineId) { setQty(lineId, 0); }
  function clearCart() { saveCart([]); }
  function cartCount() { return getCart().reduce(function (n, l) { return n + l.qty; }, 0); }
  function cartTotal() { return getCart().reduce(function (n, l) { return n + l.qty * l.unitPrice; }, 0); }

  /* ---------- customer (no registration - just name + phone) ---------- */
  function getCustomer() { return read(KEYS.customer, { name: '', phone: '', dining: 'dineIn', note: '' }); }
  function saveCustomer(patch) {
    var c = getCustomer();
    for (var k in patch) c[k] = patch[k];
    write(KEYS.customer, c);
    return c;
  }

  /* ---------- orders ---------- */
  function nextOrderId() {
    var n = read(KEYS.seq, 1000) + 1;
    write(KEYS.seq, n);
    return 'VR-' + n;
  }
  function placeOrder() {
    var cart = getCart();
    if (!cart.length) return null;
    var cust = getCustomer();
    var ctx = getCtx();
    var order = {
      id: nextOrderId(),
      createdAt: new Date().toISOString(),
      branch: ctx.branch,
      table: ctx.table,
      dining: cust.dining,
      customer: { name: cust.name, phone: cust.phone },
      note: cust.note || '',
      items: cart,
      total: cartTotal(),
      status: 'preparing'
    };
    write(KEYS.order, order);
    saveCart([]);
    return order;
  }
  function getLastOrder() { return read(KEYS.order, null); }

  w.VR = {
    products: PRODUCTS, categories: CATEGORIES, branches: BRANCHES, sizes: SIZES, shop: SHOP,
    categoryLabel: function (k) { return CATEGORY_LABEL[k] || ''; },
    getProduct: getProduct, startPrice: startPrice, formatKip: formatKip,
    getCtx: getCtx, setCtx: setCtx, getBranch: getBranch,
    getCart: getCart, addToCart: addToCart, buildDefaultLine: buildDefaultLine,
    setQty: setQty, removeLine: removeLine, clearCart: clearCart,
    cartCount: cartCount, cartTotal: cartTotal,
    getCustomer: getCustomer, saveCustomer: saveCustomer,
    placeOrder: placeOrder, getLastOrder: getLastOrder
  };
})(window);
