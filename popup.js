var showPassword = false;

var error = function(msg) {
    document.getElementById('error').innerHTML = msg;
}

var info = function(msg) {
    document.getElementById('info').innerHTML = msg;
}

var togglePassword = function() {
    showPassword = ! showPassword;
    document.getElementById('master_password').setAttribute('type', showPassword ? 'text' : 'password');
}

var savePassword = function() {
    error('');
    info('');
    var password = document.getElementById('master_password').value;
    if (password) {
        chrome.storage.local.set({'master_password': password}, function() {
            info('Master password saved');
        });
        chrome.storage.sync.set({'master_password': password});
    } else {
        error('Please specify a master password');
    }
}

window.onload = function() {
    chrome.storage.local.get('master_password', function(items) {
        if (items && items.master_password) {
            document.getElementById('master_password').value = items.master_password;
        } else {
            chrome.storage.sync.get('master_password', function(items) {
                if (items && items.master_password) {
                    document.getElementById('master_password').value = items.master_password;
                    chrome.storage.local.set({'master_password': items.master_password});
                }
            });
        }
    });
    document.getElementById('toggle_password').addEventListener('click', togglePassword);
    document.getElementById('save').addEventListener('click', savePassword);
};
