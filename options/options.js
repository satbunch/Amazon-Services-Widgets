document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('widget-form');
  const status = document.getElementById('status');
  chrome.storage.sync.get({ widgetTypes: ['simple'] }, (data) => {
    data.widgetTypes.forEach(type => {
      const cb = form.querySelector(`input[value=\"${type}\"]`);
      if (cb) cb.checked = true;
    });
  });
  document.getElementById('save').addEventListener('click', () => {
    const checked = Array.from(form.querySelectorAll('input[type=\"checkbox\"]:checked')).map(cb => cb.value);
    chrome.storage.sync.set({ widgetTypes: checked }, () => {
      status.textContent = '保存しました！';
      setTimeout(() => status.textContent = '', 2000);
    });
  });
});
