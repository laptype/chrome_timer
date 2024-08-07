document.getElementById('save').addEventListener('click', () => {
    const domain = document.getElementById('domain').value;
    const timeThreshold = document.getElementById('timeThreshold').value || 30;
  
    chrome.storage.sync.set({ domain, timeThreshold }, () => {
      alert('Settings saved!');
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['domain', 'timeThreshold'], result => {
      if (result.domain) {
        document.getElementById('domain').value = result.domain;
      }
      if (result.timeThreshold) {
        document.getElementById('timeThreshold').value = result.timeThreshold;
      } else {
        document.getElementById('timeThreshold').value = 30;
      }
    });
  });
  