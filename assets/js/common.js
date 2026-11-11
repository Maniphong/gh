/* Velvet & Roast Cafe - shared UI helpers (toast, header/nav sync). Requires store.js */
(function (w) {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var toastTimer;
  function toast(msg) {
    var el = document.getElementById('vr-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'vr-toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }

  function refresh() {
    var n = VR.cartCount();
    document.querySelectorAll('[data-cart-badge]').forEach(function (el) {
      el.textContent = n > 99 ? '99+' : String(n);
      el.style.display = n > 0 ? '' : 'none';
    });
    var ctx = VR.getCtx();
    var branch = VR.getBranch(ctx.branch);
    var table = ctx.table ? 'ໂຕະ ' + ctx.table : '';
    document.querySelectorAll('[data-ctx="branch"]').forEach(function (el) { el.textContent = branch.name; });
    document.querySelectorAll('[data-ctx="branch-en"]').forEach(function (el) { el.textContent = branch.name + ' (' + branch.en + ')'; });
    document.querySelectorAll('[data-ctx="table"]').forEach(function (el) { el.textContent = table || 'ບໍ່ລະບຸໂຕະ'; });
    document.querySelectorAll('[data-ctx="branch-table"]').forEach(function (el) {
      el.textContent = branch.name + (table ? ' - ' + table : '');
    });
  }

  w.VRUI = { esc: esc, toast: toast, refresh: refresh };
  w.addEventListener('vr:cart', refresh);
  w.addEventListener('storage', refresh);
  w.addEventListener('pageshow', refresh); // back/forward cache
  document.addEventListener('DOMContentLoaded', refresh);
})(window);
