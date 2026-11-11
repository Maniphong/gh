/* customize.html - build the option form for ?id=<product>, then add the line to the shared cart */
(function () {
  'use strict';
  var esc = VRUI.esc;
  var p = VR.getProduct(new URLSearchParams(location.search).get('id'));
  if (!p) { location.replace('menu.html'); return; }

  document.title = p.name + ' | ປັບແຕ່ງເມນູ | Velvet & Roast Cafe';
  document.getElementById('heroImg').src = p.image;
  document.getElementById('heroImg').alt = p.en;
  document.getElementById('heroName').textContent = p.name;
  document.getElementById('heroEn').textContent = p.en;
  document.getElementById('heroDesc').textContent = p.desc || VR.categoryLabel(p.cat);
  document.getElementById('heroTag').textContent = p.bestseller ? p.bestseller + ' • Signature' : 'Velvet & Roast';
  document.getElementById('qtyHint').textContent = p.cat === 'coffee' || p.cat === 'tea' ? 'ລະບຸຈຳນວນຈອກ' : 'ລະບຸຈຳນວນ';

  var SWEET = [
    { pct: 0,   label: 'ບໍ່ຫວານ (0%)' },
    { pct: 25,  label: 'ຫວານໜ້ອຍ (25%)' },
    { pct: 50,  label: 'ປົກກະຕິ (50%)' },
    { pct: 100, label: 'ຫວານ (100%)' }
  ];

  var st = {
    style: p.styles ? p.styles[0] : null,
    size: p.sizes ? p.sizes[0] : null,
    sweet: p.sweet ? SWEET[2] : null,
    qty: 1
  };

  var $ = function (id) { return document.getElementById(id); };
  function unit() { return (st.style ? st.style.price : p.price) + (st.size ? st.size.add : 0); }
  function sectionHead(icon, label, right) {
    return '<div class="flex items-center justify-between"><label class="font-label-lg text-label-lg text-text-primary flex items-center gap-1.5">' +
      '<span class="material-symbols-outlined text-[18px] text-primary">' + icon + '</span>' + label + '</label>' + right + '</div>';
  }

  function renderStyle() {
    var sec = $('styleSection');
    if (!p.styles) { sec.style.display = 'none'; return; }
    sec.style.display = '';
    sec.innerHTML = sectionHead('local_cafe', 'ຮູບແບບ (Style)', '<span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider bg-surface-container-high px-2 py-0.5 rounded">ຈຳເປັນຕ້ອງເລືອກ</span>') +
      '<div class="grid grid-cols-3 gap-space-xs">' + p.styles.map(function (s) {
        var on = s === st.style;
        return '<button type="button" data-style="' + s.key + '" class="flex flex-col items-center justify-center py-3 px-2 rounded-xl shadow-sm text-center transition-all cursor-pointer ' + (on ? 'bg-card-highlight' : 'bg-card-elevated opacity-80 hover:opacity-100') + '">' +
          '<span class="material-symbols-outlined text-[22px] mb-1 ' + (on ? 'text-primary' : 'text-text-dim') + '">' + s.icon + '</span>' +
          '<span class="font-headline-sm text-headline-sm ' + (on ? 'text-text-primary' : 'text-text-muted') + '">' + esc(s.label) + '</span>' +
          '<span class="font-label-sm text-label-sm mt-0.5 ' + (on ? 'text-secondary-fixed' : 'text-text-dim') + '">' + s.price.toLocaleString('en-US') + ' ₭</span></button>';
      }).join('') + '</div>';
  }

  function renderSize() {
    var sec = $('sizeSection');
    if (!p.sizes) { sec.style.display = 'none'; return; }
    sec.style.display = '';
    sec.innerHTML = sectionHead('coffee', 'ຂະໜາດ (Size)', '<span class="font-label-sm text-label-sm text-text-muted">ເລືອກ 1 ຢ່າງ</span>') +
      '<div class="flex flex-col gap-space-2xs">' + p.sizes.map(function (s) {
        var on = s === st.size;
        return '<button type="button" data-size="' + s.key + '" class="flex items-center justify-between p-3 rounded-xl shadow-sm transition-all text-left ' + (on ? 'bg-card-highlight' : 'bg-card-elevated opacity-80 hover:opacity-100') + '">' +
          '<div class="flex items-center gap-space-sm"><div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center ' + (on ? 'text-primary' : 'text-text-dim') + '"><span class="font-label-md text-label-md font-bold">' + s.key + '</span></div>' +
          '<div class="flex flex-col"><span class="font-headline-sm text-headline-sm ' + (on ? 'text-text-primary' : 'text-text-muted') + '">' + esc(s.label) + '</span>' +
          '<span class="font-body-sm text-body-sm text-text-dim">' + esc(s.hint) + '</span></div></div>' +
          '<div class="flex items-center gap-2"><span class="font-label-md text-label-md ' + (s.add ? 'text-secondary-fixed' : 'text-text-muted') + '">' + (s.add ? '+' + s.add.toLocaleString('en-US') + ' ₭' : 'ລາຄາປົກກະຕິ') + '</span>' +
          '<span class="material-symbols-outlined text-[20px] ' + (on ? 'text-primary' : 'text-text-dim') + '">' + (on ? 'check_circle' : 'radio_button_unchecked') + '</span></div></button>';
      }).join('') + '</div>';
  }

  function renderSweet() {
    var sec = $('sweetSection');
    if (!p.sweet) { sec.style.display = 'none'; return; }
    sec.style.display = '';
    sec.innerHTML = sectionHead('opacity', 'ລະດັບຄວາມຫວານ (Sweetness)', '<span class="font-label-md text-label-md text-secondary font-semibold">' + esc(st.sweet.label) + '</span>') +
      '<div class="grid grid-cols-4 gap-space-2xs bg-surface-container-lowest p-1 rounded-xl shadow-inner">' + SWEET.map(function (s) {
        var on = s === st.sweet;
        return '<button type="button" data-sweet="' + s.pct + '" class="py-2.5 rounded-lg text-center font-label-md text-label-md transition-all ' + (on ? 'bg-wine-dark text-primary shadow-sm font-semibold' : 'text-text-dim') + '">' + s.pct + '%</button>';
      }).join('') + '</div>';
  }

  function renderPrice() {
    $('btn-total-display').textContent = VR.formatKip(unit() * st.qty);
    $('qty-display').textContent = st.qty;
    $('qty-minus').disabled = st.qty <= 1;
  }
  function renderAll() { renderStyle(); renderSize(); renderSweet(); renderPrice(); }

  $('styleSection').addEventListener('click', function (e) {
    var b = e.target.closest('[data-style]'); if (!b) return;
    st.style = p.styles.filter(function (s) { return s.key === b.dataset.style; })[0]; renderAll();
  });
  $('sizeSection').addEventListener('click', function (e) {
    var b = e.target.closest('[data-size]'); if (!b) return;
    st.size = p.sizes.filter(function (s) { return s.key === b.dataset.size; })[0]; renderAll();
  });
  $('sweetSection').addEventListener('click', function (e) {
    var b = e.target.closest('[data-sweet]'); if (!b) return;
    st.sweet = SWEET.filter(function (s) { return String(s.pct) === b.dataset.sweet; })[0]; renderAll();
  });
  $('qty-minus').addEventListener('click', function () { if (st.qty > 1) { st.qty--; renderPrice(); } });
  $('qty-plus').addEventListener('click', function () { if (st.qty < 99) { st.qty++; renderPrice(); } });

  var isFav = false;
  $('favorite-btn').addEventListener('click', function () {
    isFav = !isFav;
    var icon = $('fav-icon');
    icon.style.color = isFav ? '#EF4444' : 'currentColor';
    icon.style.fontVariationSettings = isFav ? "'FILL' 1" : "'FILL' 0";
  });

  var adding = false;
  $('add-to-cart-btn').addEventListener('click', function () {
    if (adding) return;
    adding = true;
    VR.addToCart({
      productId: p.id, name: p.name, image: p.image, cat: p.cat,
      style: st.style ? st.style.key : '', styleLabel: st.style ? st.style.label : '',
      size: st.size ? st.size.key : '', sizeLabel: st.size ? st.size.label : '',
      sweetness: st.sweet ? st.sweet.label : '',
      note: $('order-note').value.trim(),
      unitPrice: unit(), qty: st.qty
    });
    this.innerHTML = '<span class="material-symbols-outlined text-[20px] text-status-ready">check_circle</span><span>ເພີ່ມສຳເລັດແລ້ວ!</span>';
    setTimeout(function () { location.href = 'menu.html'; }, 700);
  });

  window.addEventListener('pageshow', function () { adding = false; });
  renderAll();
})();
