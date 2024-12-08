document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  const eanInput = document.getElementById("eanInput");
  const statusDiv = document.getElementById("status");

  eanInput.addEventListener("input", function () {
    const isValid = /^\d{8,13}$/.test(this.value.trim());
    searchButton.disabled = !isValid;
    statusDiv.textContent = isValid
      ? ""
      : "Please enter a valid EAN code (8-13 digits)";
    statusDiv.className = isValid ? "" : "error";
  });

  searchButton.addEventListener("click", function () {
    const eanCode = eanInput.value.trim();
    if (eanCode) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        eanCode
      )}`;
      chrome.tabs.create({ url: searchUrl }, function (tab) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === tab.id && info.status === "complete") {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.tabs.sendMessage(tabId, { action: "openFirstLink" });
          }
        });
      });
    }
  });
});
