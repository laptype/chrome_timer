let activeTabId = null;
let startTime = null;
let bilibiliInterval = null;
let notificationInterval = null;
let bilibiliTotalTime = 0;
let initialTimeExceeded = false;

chrome.tabs.onActivated.addListener(activeInfo => {
  if (activeTabId) {
    updateTimeSpent(activeTabId);
  }
  activeTabId = activeInfo.tabId;
  startTime = new Date();
  checkBilibili(activeTabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    if (tabId === activeTabId) {
      startTime = new Date();
    } else {
      updateTimeSpent(activeTabId);
      activeTabId = tabId;
      startTime = new Date();
    }
    checkBilibili(tabId);
  }
});

chrome.tabs.onRemoved.addListener(tabId => {
  if (tabId === activeTabId) {
    updateTimeSpent(tabId);
    activeTabId = null;
    startTime = null;
  }
  clearAllIntervals();
});

function updateTimeSpent(tabId) {
  const endTime = new Date();
  const timeSpent = (endTime - startTime) / 1000; // time in seconds

  if (tabId !== null) {
    chrome.tabs.get(tabId, tab => {
      if (chrome.runtime.lastError || !tab || !tab.url || !isValidUrl(tab.url)) {
        console.error('Error getting tab or invalid URL:', chrome.runtime.lastError);
        return;
      }

      chrome.storage.sync.get(['domain'], result => {
        const domain = result.domain || 'bilibili.com';
        const url = new URL(tab.url);
        const currentDomain = url.hostname;

        if (currentDomain.includes(domain)) {
          bilibiliTotalTime += timeSpent;
          chrome.storage.local.set({ bilibiliTotalTime });
        }
      });
    });
  }
}

function checkBilibili(tabId) {
  if (tabId !== null) {
    chrome.tabs.get(tabId, tab => {
      if (chrome.runtime.lastError || !tab || !tab.url || !isValidUrl(tab.url)) {
        console.error('Error getting tab or invalid URL:', chrome.runtime.lastError);
        return;
      }

      chrome.storage.sync.get(['domain', 'timeThreshold'], result => {
        const domain = result.domain || 'bilibili.com';
        const timeThreshold = result.timeThreshold || 30;
        const url = new URL(tab.url);
        const currentDomain = url.hostname;

        if (currentDomain.includes(domain)) {
          clearAllIntervals();
          bilibiliTotalTime = 0;  // Reset the total time when starting a new session
          initialTimeExceeded = false;
          bilibiliInterval = setInterval(() => {
            const currentTime = new Date();
            const timeSpent = (currentTime - startTime) / 1000; // time in seconds
            bilibiliTotalTime += timeSpent;
            startTime = new Date(); // Reset start time for the next interval

            if (bilibiliTotalTime > timeThreshold && !initialTimeExceeded) {
              initialTimeExceeded = true;
              notificationInterval = setInterval(() => {
                chrome.notifications.create({
                  type: 'basic',
                  iconUrl: 'icon.png',
                  title: 'Time Alert',
                  message: `You have spent more than ${Math.floor(bilibiliTotalTime)} seconds on ${domain}!`
                });
              }, 5000);
            }
            chrome.storage.local.set({ bilibiliTotalTime });
          }, 1000);
        } else {
          clearAllIntervals();
        }
      });
    });
  }
}

function clearAllIntervals() {
  if (bilibiliInterval) {
    clearInterval(bilibiliInterval);
    bilibiliInterval = null;
  }
  if (notificationInterval) {
    clearInterval(notificationInterval);
    notificationInterval = null;
  }
  initialTimeExceeded = false;
}

function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
}

chrome.tabs.onActivated.addListener(activeInfo => {
  if (activeTabId) {
    updateTimeSpent(activeTabId);
  }
  activeTabId = activeInfo.tabId;
  startTime = new Date();
  checkBilibili(activeTabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    if (tabId === activeTabId) {
      startTime = new Date();
    } else {
      updateTimeSpent(activeTabId);
      activeTabId = tabId;
      startTime = new Date();
    }
    checkBilibili(tabId);
  }
});

chrome.tabs.onRemoved.addListener(tabId => {
  if (tabId === activeTabId) {
    updateTimeSpent(tabId);
    activeTabId = null;
    startTime = null;
  }
  clearAllIntervals();
});

