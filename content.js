document.getElementById('save').addEventListener('click', () => {
    const domain = document.getElementById('domain').value;
    chrome.storage.sync.set({ domain }, () => {
      alert('Domain saved!');
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['domain'], result => {
      if (result.domain) {
        document.getElementById('domain').value = result.domain;
      }
    });
  });
  