/* track.html - show the last order that was placed from the cart page */
(function () {
  'use strict';
  var esc = VRUI.esc;
  var $ = function (id) { return document.getElementById(id); };
  var o = VR.getLastOrder();

  if (!o) {
    var none = $('noOrder'); none.classList.remove('hidden'); none.classList.add('flex');
    return;
  }
  $('orderView').style.display = '';

  var d = new Date(o.createdAt);
  var p2 = function (n) { return String(n).padStart(2, '0'); };
  var time = p2(d.getHours()) + ':' + p2(d.getMinutes());
  var date = p2(d.getDate()) + '/' + p2(d.getMonth() + 1) + '/' + d.getFullYear();

  document.title = 'ສະຖານະອໍເດີ #' + o.id + ' | Velvet & Roast Cafe';
  $('orderId').textContent = '#' + o.id;
  $('stepTime').textContent = time;
  $('orderTime').textContent = time;
  $('orderDate').textContent = date;
  $('custName').textContent = o.customer.name;
  $('custPhone').textContent = o.customer.phone;
  $('orderTotal').textContent = o.total.toLocaleString('en-US');

  var dineIn = o.dining !== 'takeaway';
  $('diningBadge').textContent = dineIn ? (o.table ? 'ໂຕະ ' + o.table + ' ' : '') + '(ກິນໃນຮ້ານ)' : 'ເອົາກັບບ້ານ';
  if (!dineIn) {
    $('noticeTitle').textContent = 'ຮັບເຄື່ອງທີ່ເຄົາເຕີ';
    $('noticeText').textContent = 'ກະລຸນາລໍຖ້າຮັບເຄື່ອງທີ່ເຄົາເຕີ.';
  }

  $('itemsList').innerHTML = o.items.map(function (l) {
    var opts = [l.styleLabel, l.size && ('ຂະໜາດ ' + l.size), l.sweetness].filter(Boolean).join(', ');
    return '<div class="flex items-center justify-between gap-space-xs"><div class="flex items-center gap-space-xs min-w-0">' +
      '<img alt="' + esc(l.name) + '" class="w-12 h-12 rounded-lg object-cover bg-surface-container-highest shrink-0" src="' + esc(l.image) + '"/>' +
      '<div class="flex flex-col min-w-0"><span class="font-label-lg text-label-lg text-text-primary truncate">' + esc(l.name) + '</span>' +
      '<span class="font-body-sm text-body-sm text-text-muted">' + l.qty + 'x' + (opts ? ' · ' + esc(opts) : '') + '</span>' +
      (l.note ? '<span class="font-body-sm text-body-sm text-text-dim italic">“' + esc(l.note) + '”</span>' : '') + '</div></div>' +
      '<div class="flex flex-col items-end shrink-0"><span class="font-price-display text-price-display text-text-primary">' + (l.unitPrice * l.qty).toLocaleString('en-US') + '</span>' +
      '<span class="font-label-sm text-label-sm text-text-dim">ກີບ</span></div></div>';
  }).join('');

  $('cashBtn').addEventListener('click', function () {
    VRUI.toast('ກະລຸນາແຈ້ງໝາຍເລກອໍເດີ #' + o.id + ' ທີ່ເຄົາເຕີ');
  });
})();
