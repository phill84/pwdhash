chrome.extension.onMessage.addListener(function(url, sender, sendResponse) {
    var domain = (new SPH_DomainExtractor()).extractDomain(url);
    console.log(domain);
    chrome.storage.local.get("master_password", function(items) {
        if (items && items.master_password) {
            sendResponse((new SPH_HashedPassword(items.master_password, domain)).toString());
        } else {
            chrome.storage.sync.get("master_password", function(items) {
                if (items && items.master_password) {
                    sendResponse((new SPH_HashedPassword(items.master_password, domain)).toString());
                    chrome.storage.local.set({"master_password": items.master_password});
                }
            });
        }
    });
    return true;
});