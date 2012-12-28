var copyPwd = function(pwd) { 
    var input = document.getElementById('pwd');
    input.value = pwd;
    input.select();
    if (!document.execCommand('Copy')) {
        console.error('failed to copy hashed password into clipboard');
    }
};

chrome.extension.onMessage.addListener(function(url, sender, sendResponse) {
    var domain = (new SPH_DomainExtractor()).extractDomain(url);
    chrome.storage.local.get('master_password', function(items) {
        if (items && items.master_password) {
            var pwd = (new SPH_HashedPassword(items.master_password, domain)).toString();
            copyPwd(pwd);
            sendResponse(pwd);
        } else {
            chrome.storage.sync.get('master_password', function(items) {
                if (items && items.master_password) {
                    var pwd = (new SPH_HashedPassword(items.master_password, domain)).toString();
                    copyPwd(pwd);
                    sendResponse(pwd);
                    chrome.storage.local.set({'master_password': items.master_password});
                } else {
                    console.error('master password is not set');
                }
            });
        }
    });
    return true;
});
