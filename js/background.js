var ruleSet;
chrome.storage.sync.get('ruleSet', function(_ruleSet) {
  ruleSet = _ruleSet;
});

chrome.webRequest.onCompleted.addListener(
  function(details) {
    console.log(details);
    console.log('ip: ' + details.ip);

    if (details.ip === '192.168.33.10' || details.ip === '192.168.0.201') {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var tabId = tabs[0].id;
        var wait = 100;

        var intervalId = setInterval(function(){
          chrome.tabs.get(tabId, function(tab){
            console.log(tab.status);
            if (tab.status === 'complete') {
              chrome.tabs.sendMessage(tabId, {matchPatten: details.ip});
              clearInterval(intervalId);
            }
          });
        }, wait);
      });
    }
  },
  {
    urls: ["<all_urls>"],
    types: ["main_frame"]
  }
);
