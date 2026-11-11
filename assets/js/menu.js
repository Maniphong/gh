/* menu.html - catalog, category filter, quick "+" add, bottom cart bar */
(function () {
  'use strict';
  var esc = VRUI.esc;
  var state = { cat: 'all' };
  var tabs = document.getElementById('catTabs');
  var bestList = document.getElementById('bestList');
  var grid = document.getElementById('catalogGrid');

  var TAB_ON = 'snap-start shrink-0 flex items-center gap-1.5 px-space-sm py-2 rounded-full bg-gradient-to-r from-primary-container to-burgundy-deep text-on-primary-container font-label-md text-label-md font-semibold shadow-[0_4px_16px_rgba(220,38,38,0.35)] transition-all';
  var TAB_OFF = 'snap-start shrink-0 flex items-center gap-1.5 px-space-sm py-2 rounded-full bg-card-elevated hover:bg-card-highlight text-text-muted hover:text-text-primary font-label-md text-label-md transition-colors';

  function needsOptions(p) { return !!(p.styles || p.sizes || p.sweet); }
  function link(p) { return 'customize.html?id=' + encodeURIComponent(p.id); }

  function addBtn(p, cls, icon) {
    return '<button aria-label="Add ' + esc(p.en) + '" data-add="' + p.id + '" class="' + cls + '" type="button">' +
      '<span class="material-symbols-outlined text-[' + icon + 'px]">add</span></button>';
  }

  function renderTabs() {
    tabs.innerHTML = VR.categories.map(function (c) {
      return '<button type="button" data-cat="' + c.key + '" class="' + (c.key === state.cat ? TAB_ON : TAB_OFF) + '">' +
        '<span class="material-symbols-outlined text-[16px]">' + c.icon + '</span><span>' + esc(c.label) + '</span>' +
        '<span class="font-label-sm text-label-sm opacity-70">(' + esc(c.en) + ')</span></button>';
    }).join('');
  }

  function renderBest() {
    var items = VR.products.filter(function (p) { return p.bestseller; });
    document.getElementById('bestSection').style.display = (state.cat === 'all' && items.length) ? '' : 'none';
    bestList.innerHTML = items.map(function (p) {
      return '<div class="snap-start shrink-0 w-[240px] rounded-xl bg-card-elevated p-space-xs flex flex-col justify-between shadow-md">' +
        '<a href="' + link(p) + '" class="block"><div class="relative w-full h-32 rounded-lg overflow-hidden mb-space-xs">' +
        '<img alt="' + esc(p.en) + '" class="w-full h-full object-cover" loading="lazy" src="' + p.image + '"/>' +
        '<div class="absolute top-2 left-2 px-space-xs py-0.5 rounded-full bg-primary-container/90 backdrop-blur-md text-on-primary-container font-label-sm text-label-sm font-bold flex items-center gap-1">' +
        '<span class="material-symbols-outlined text-[12px]">star</span><span>' + esc(p.bestseller) + '</span></div></div>' +
        '<h3 class="font-headline-sm text-headline-sm text-text-primary leading-tight truncate">' + esc(p.name) + '</h3>' +
        '<p class="font-body-sm text-body-sm text-text-muted">' + esc(p.en) + '</p></a>' +
        '<div class="flex items-center justify-between mt-space-xs pt-space-xs"><div class="flex flex-col">' +
        '<span class="font-label-sm text-label-sm text-text-dim">' + (p.styles ? 'ເລີ່ມຕົ້ນ' : 'ລາຄາ') + '</span>' +
        '<span class="font-price-display text-price-display text-primary">' + VR.formatKip(VR.startPrice(p)) + '</span></div>' +
        addBtn(p, 'w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-[0_4px_12px_rgba(220,38,38,0.35)] active:scale-95 transition-transform', 20) +
        '</div></div>';
    }).join('');
  }

  function renderGrid() {
    var items = VR.products.filter(function (p) { return state.cat === 'all' || p.cat === state.cat; });
    document.getElementById('catalogCount').textContent = items.length + ' ລາຍການ';
    grid.innerHTML = items.map(function (p) {
      var tags = (p.tags || []).map(function (t) {
        return '<span class="px-1.5 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-text-dim">' + esc(t) + '</span>';
      }).join('');
      return '<div class="rounded-xl bg-card-elevated p-space-xs flex flex-col justify-between shadow-md">' +
        '<a href="' + link(p) + '" class="block"><div class="relative w-full aspect-square rounded-lg overflow-hidden mb-space-2xs">' +
        '<img alt="' + esc(p.en) + '" class="w-full h-full object-cover" loading="lazy" src="' + p.image + '"/>' +
        (p.badge ? '<span class="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-surface-container-lowest/85 backdrop-blur-sm text-amber-soft font-label-sm text-label-sm font-semibold">' + esc(p.badge) + '</span>' : '') +
        '</div>' +
        '<h3 class="font-headline-sm text-headline-sm text-text-primary leading-tight line-clamp-1">' + esc(p.name) + '</h3>' +
        '<p class="font-body-sm text-body-sm text-text-muted line-clamp-1 mt-0.5">' + esc(p.serve || p.en) + '</p>' +
        '<div class="flex items-center gap-1 mt-1 flex-wrap">' + tags + '</div></a>' +
        '<div class="flex items-center justify-between mt-space-sm pt-1"><div class="flex flex-col">' +
        '<span class="font-label-sm text-label-sm text-text-dim">' + (p.styles ? 'ເລີ່ມຕົ້ນ' : 'ລາຄາ') + '</span>' +
        '<span class="font-price-display text-price-display text-primary whitespace-nowrap">' + VR.startPrice(p).toLocaleString('en-US') + ' ₭</span></div>' +
        addBtn(p, 'w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-md active:scale-90 transition-transform', 18) +
        '</div></div>';
    }).join('');
  }

  function renderBar() {
    var n = VR.cartCount();
    document.getElementById('barCount').textContent = n;
    document.getElementById('barLabel').textContent = n ? n + ' ລາຍການໃນກະຕ່າ' : 'ກະຕ່າຫວ່າງ';
    document.getElementById('barTotal').textContent = VR.formatKip(VR.cartTotal());
  }

  tabs.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]');
    if (!b) return;
    state.cat = b.getAttribute('data-cat');
    renderTabs(); renderBest(); renderGrid();
  });

  // "+" : drinks with options open the customizer, simple items go straight into the cart
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]');
    if (!b) return;
    var p = VR.getProduct(b.getAttribute('data-add'));
    if (!p) return;
    if (needsOptions(p)) { location.href = link(p); return; }
    VR.addToCart(VR.buildDefaultLine(p, 1));
    VRUI.toast('ເພີ່ມ ' + p.name + ' ໃສ່ກະຕ່າແລ້ວ');
  });

  window.addEventListener('vr:cart', renderBar);
  window.addEventListener('pageshow', renderBar);
  renderTabs(); renderBest(); renderGrid(); renderBar();
})();
