if (window) {
    window.addEventListener('keypress', function(e) {
        if (e.ctrlKey && e.keyCode == 28) {
            chrome.extension.sendMessage(window.location.href, function(pwd) {
                var pwdInputs = document.querySelectorAll("input[type='password']");
                if (pwdInputs) {
                    var length = pwdInputs.length;
                    for(var i = 0; i < length; i ++) {
                        var input = pwdInputs[i];
                        if (!input.value) {
                            input.value = pwd;
                            if (!input.getAttribute('touched_by_pwdhash')) {
                                input.setAttribute('touched_by_pwdhash', true);
                                input.addEventListener('dblclick', function(e) {
                                    this.setAttribute('type', 'text');
                                });
                                input.addEventListener('blur', function(e) {
                                    this.setAttribute('type', 'password');
                                });
                            }
                        }
                    }
                }
            });
        }
    });
} else {
    console.error('window object not found, end of world!');
}
