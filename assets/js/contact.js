/* contact.html - branch list + optional call buttons (fill VR.shop in store.js) */
(function () {
  'use strict';
  var esc = VRUI.esc;
  var acts = document.getElementById('contactActions');
  var html = '';
  if (VR.shop.phone) {
    html += '<a class="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-lg" href="tel:' + esc(VR.shop.phone.replace(/\s+/g, '')) + '"><span class="material-symbols-outlined text-[18px]">call</span>' + esc(VR.shop.phone) + '</a>';
  }
  if (VR.shop.whatsapp) {
    html += '<a class="flex items-center justify-center gap-2 py-3 rounded-xl bg-card-highlight text-text-primary font-label-lg text-label-lg" href="https://wa.me/' + esc(VR.shop.whatsapp.replace(/\D/g, '')) + '" rel="noopener" target="_blank"><span class="material-symbols-outlined text-[18px]">chat</span>WhatsApp</a>';
  }
  acts.innerHTML = html;
  if (!html) acts.style.display = 'none';

  var cur = VR.getCtx().branch;
  document.getElementById('branchCards').innerHTML = VR.branches.map(function (b) {
    return '<div class="flex items-center gap-space-xs p-space-sm rounded-xl ' + (b.key === cur ? 'bg-surface-container-high' : 'bg-surface-container-low') + '">' +
      '<div class="w-10 h-10 rounded-full bg-crimson-dim text-crimson-glow flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[20px]">storefront</span></div>' +
      '<div class="flex flex-col min-w-0"><span class="font-headline-sm text-headline-sm text-text-primary">' + esc(b.name) + '</span>' +
      '<span class="font-body-sm text-body-sm text-text-muted">' + esc(b.en) + '</span></div></div>';
  }).join('');
})();
