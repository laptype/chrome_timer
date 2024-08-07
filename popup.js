document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['domain'], result => {
    const domain = result.domain || 'bilibili.com';
    chrome.storage.local.get(['bilibiliTotalTime'], data => {
      const timeSpent = data.bilibiliTotalTime || 0;
      document.getElementById('time').innerText = `You have spent ${Math.floor(timeSpent)} seconds on ${domain}`;
    });
  });

  document.getElementById('settings').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
});
