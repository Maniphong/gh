/* index.html - landing: choose branch + table, then go to the menu */
(function () {
  'use strict';
  var params = new URLSearchParams(location.search);
  // QR codes can deep-link: index.html?branch=dongdok&table=05
  var patch = {};
  if (params.get('branch') && VR.branches.some(function (b) { return b.key === params.get('branch'); })) patch.branch = params.get('branch');
  if (params.get('table') !== null) patch.table = params.get('table').replace(/[^0-9A-Za-z-]/g, '').slice(0, 3);
  if (Object.keys(patch).length) VR.setCtx(patch);

  var list = document.getElementById('branchList');
  var table = document.getElementById('tableInput');
  table.value = VR.getCtx().table;

  function renderBranches() {
    var cur = VR.getCtx().branch;
    list.innerHTML = VR.branches.map(function (b) {
      var on = b.key === cur;
      return '<button type="button" data-branch="' + b.key + '" aria-pressed="' + on + '" class="flex items-center justify-between gap-2 p-space-sm rounded-xl text-left transition-all ' +
        (on ? 'bg-burgundy-deep text-on-primary-container shadow-md' : 'bg-card-elevated text-text-muted hover:bg-card-highlight') + '">' +
        '<span class="flex flex-col"><span class="font-headline-sm text-headline-sm">' + VRUI.esc(b.name) + '</span>' +
        '<span class="font-body-sm text-body-sm opacity-80">' + VRUI.esc(b.en) + '</span></span>' +
        '<span class="material-symbols-outlined text-[22px]">' + (on ? 'check_circle' : 'radio_button_unchecked') + '</span></button>';
    }).join('');
  }
  list.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-branch]');
    if (!btn) return;
    VR.setCtx({ branch: btn.getAttribute('data-branch') });
    renderBranches();
  });
  table.addEventListener('input', function () {
    table.value = table.value.replace(/[^0-9A-Za-z-]/g, '');
    VR.setCtx({ table: table.value });
  });
  renderBranches();
  if (location.hash === '#branch') document.getElementById('branch').scrollIntoView();
})();
