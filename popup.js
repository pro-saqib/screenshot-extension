document.getElementById('screenshot-btn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: captureScreenshot
    }, (results) => {
      if (chrome.runtime.lastError) {
        alert('Error capturing screenshot: ' + chrome.runtime.lastError.message);
      } else {
        alert('Screenshot capture initiated.');
      }
    });
  });
});

function captureScreenshot() {
  chrome.runtime.sendMessage({ action: "capture_screenshot" });
}
