chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "capture_screenshot") {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
      if (chrome.runtime.lastError || !dataUrl) {
        alert('Failed to capture screenshot: ' + (chrome.runtime.lastError?.message || 'Unknown error.'));
      } else {
        downloadScreenshot(dataUrl);
      }
    });
  }
});

// Function to download the screenshot to the user's Downloads folder
function downloadScreenshot(dataUrl) {
  chrome.downloads.download({
    url: dataUrl,
    filename: 'screenshot.png',
    saveAs: false  // Automatically save to the Downloads folder without user prompt
  }, (downloadId) => {
    if (chrome.runtime.lastError) {
      alert('Error downloading screenshot: ' + chrome.runtime.lastError.message);
    } else {
      // Get the download path from the ID
      chrome.downloads.search({ id: downloadId }, (results) => {
        if (results && results.length > 0) {
          alert('Screenshot captured and saved to: ' + results[0].filename);
        } else {
          alert('Screenshot captured, but could not retrieve the download path.');
        }
      });
    }
  });
}
