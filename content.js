chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "openFirstLink") {
    const firstLink = document.querySelector("#search .g a");
    if (firstLink) {
      window.location.href = firstLink.href;
    }
  }
});
