/* cart.html - render the shared cart, edit quantities, validate contact info, place the order */
(function () {
  'use strict';
  var esc = VRUI.esc;
  var $ = function (id) { return document.getElementById(id); };
  var list = $('cartListContainer');
  var BTN_ON = 'flex items-center justify-center gap-2 py-2.5 px-space-xs rounded-lg bg-burgundy-deep text-on-primary-container shadow-md transition-all';
  var BTN_OFF = 'flex items-center justify-center gap-2 py-2.5 px-space-xs rounded-lg text-text-muted hover:text-text-primary transition-all';

  function optionLine(l) {
    var parts = [];
    if (l.styleLabel) parts.push('ຮູບແບບ: <span class="text-text-primary font-medium">' + esc(l.styleLabel) + '</span>');
    if (l.size) parts.push('ຂະໜາດ: <span class="text-text-primary font-medium">' + esc(l.size) + '</span>');
    if (l.sweetness) parts.push('ຫວານ: <span class="text-text-primary font-medium">' + esc(l.sweetness) + '</span>');
    var s = parts.join(' • ');
    if (l.note) s += (s ? '<br>' : '') + '<span class="italic">“' + esc(l.note) + '”</span>';
    return s;
  }

  function render() {
    var cart = VR.getCart();
    var n = VR.cartCount();
    var empty = cart.length === 0;
    $('cartEmpty').classList.toggle('hidden', !empty);
    $('cartEmpty').classList.toggle('flex', empty);
    $('checkoutArea').style.display = empty ? 'none' : '';
    $('clearCartBtn').style.display = empty ? 'none' : '';
    $('cartCountLabel').textContent = n + ' ລາຍການ';

    list.innerHTML = cart.map(function (l) {
      return '<div class="relative overflow-hidden rounded-xl bg-card-elevated p-space-sm shadow-md transition-all duration-300" data-line="' + esc(l.lineId) + '">' +
        '<div class="flex items-start gap-space-sm">' +
        '<div class="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-surface-container-low relative">' +
        '<img alt="' + esc(l.name) + '" class="w-full h-full object-cover" src="' + esc(l.image) + '"/>' +
        '<span class="absolute bottom-1 right-1 px-1 rounded bg-obsidian-base/80 text-secondary font-label-sm text-[9px] uppercase">' + esc(VR.categoryLabel(l.cat)) + '</span></div>' +
        '<div class="flex flex-col flex-1 min-w-0">' +
        '<div class="flex items-start justify-between gap-1"><h3 class="font-headline-sm text-headline-sm text-text-primary truncate">' + esc(l.name) + '</h3>' +
        '<button aria-label="Remove" class="text-text-dim hover:text-error transition-colors p-1 -mr-1" data-remove="' + esc(l.lineId) + '" type="button"><span class="material-symbols-outlined text-[18px]">close</span></button></div>' +
        '<p class="font-body-sm text-body-sm text-text-muted mt-0.5">' + optionLine(l) + '</p>' +
        '<div class="flex items-center justify-between mt-space-xs pt-1">' +
        '<span class="font-price-display text-price-display text-secondary whitespace-nowrap">' + VR.formatKip(l.unitPrice * l.qty) + '</span>' +
        '<div class="flex items-center bg-surface-container-lowest rounded-full p-0.5 shadow-inner">' +
        '<button aria-label="Decrease quantity" class="w-7 h-7 rounded-full bg-card-highlight flex items-center justify-center text-text-primary active:scale-95 transition-transform hover:bg-wine-dark" data-dec="' + esc(l.lineId) + '" type="button"><span class="material-symbols-outlined text-[16px]">remove</span></button>' +
        '<span class="w-8 text-center font-label-md text-label-md text-text-primary">' + l.qty + '</span>' +
        '<button aria-label="Increase quantity" class="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center active:scale-95 transition-transform shadow-[0_0_12px_rgba(220,38,38,0.4)]" data-inc="' + esc(l.lineId) + '" type="button"><span class="material-symbols-outlined text-[16px]">add</span></button>' +
        '</div></div></div></div></div>';
    }).join('');

    var total = VR.formatKip(VR.cartTotal());
    $('subtotalDisplay').textContent = total;
    $('totalDisplay').textContent = total;
    $('ctaPriceDisplay').textContent = total;
  }

  function find(id) { return VR.getCart().filter(function (l) { return l.lineId === id; })[0]; }
  list.addEventListener('click', function (e) {
    var b;
    if ((b = e.target.closest('[data-inc]'))) { var l = find(b.dataset.inc); if (l) VR.setQty(l.lineId, Math.min(99, l.qty + 1)); }
    else if ((b = e.target.closest('[data-dec]'))) { var l2 = find(b.dataset.dec); if (l2) VR.setQty(l2.lineId, l2.qty - 1); }
    else if ((b = e.target.closest('[data-remove]'))) { VR.removeLine(b.dataset.remove); }
  });
  $('clearCartBtn').addEventListener('click', function () {
    if (confirm('ລຶບລາຍການທັງໝົດໃນກະຕ່າ?')) VR.clearCart();
  });

  /* dining option */
  function showDining(mode) {
    $('dineInBtn').className = mode === 'dineIn' ? BTN_ON : BTN_OFF;
    $('takeawayBtn').className = mode === 'takeaway' ? BTN_ON : BTN_OFF;
  }
  $('dineInBtn').addEventListener('click', function () { VR.saveCustomer({ dining: 'dineIn' }); showDining('dineIn'); });
  $('takeawayBtn').addEventListener('click', function () { VR.saveCustomer({ dining: 'takeaway' }); showDining('takeaway'); });

  /* contact fields: restore + persist as the customer types */
  var cust = VR.getCustomer();
  $('custName').value = cust.name || '';
  $('custPhone').value = cust.phone || '';
  $('custNote').value = cust.note || '';
  if (cust.note) $('noteDetails').open = true;
  showDining(cust.dining === 'takeaway' ? 'takeaway' : 'dineIn');
  $('custName').addEventListener('input', function () { VR.saveCustomer({ name: this.value }); $('custNameErr').classList.add('hidden'); });
  $('custPhone').addEventListener('input', function () { VR.saveCustomer({ phone: this.value }); $('custPhoneErr').classList.add('hidden'); });
  $('custNote').addEventListener('input', function () { VR.saveCustomer({ note: this.value }); });

  /* place order */
  $('confirmOrderBtn').addEventListener('click', function () {
    var name = $('custName').value.trim();
    var phone = $('custPhone').value.trim();
    var okName = name.length > 0;
    var okPhone = phone.replace(/\D/g, '').length >= 8;
    $('custNameErr').classList.toggle('hidden', okName);
    $('custPhoneErr').classList.toggle('hidden', okPhone);
    if (!okName || !okPhone) { (okName ? $('custPhone') : $('custName')).focus(); return; }
    VR.saveCustomer({ name: name, phone: phone, note: $('custNote').value.trim() });
    var order = VR.placeOrder();
    if (!order) return;
    $('modalOrderId').textContent = '#' + order.id;
    var m = $('orderSuccessModal');
    m.classList.remove('hidden'); m.classList.add('flex');
  });

  window.addEventListener('vr:cart', render);
  window.addEventListener('pageshow', render);
  render();
})();
