define(['css!loginCSS', 'css!iconfont', 'common', 'vue'], function() {
    function page() {
        var that = this;

        this.init = function() {
            checkLogined();
            that.login();
        };

        this.login = function() {
            $('#loginBtn').click('on', function() {
                var username = $('#username').val();
                var password = $('#password').val();

                if(username && password) {
                    ajaxData('POST', ajaxUrl.loginCheck, function(data) {
                        var logined = +data.logined;
                        if(logined === 0) {
                            localStorage.setItem('loginState', 1);
                            // localStorage.setItem('username', username);
                            // localStorage.setItem('id', data.id);
                            // localStorage.setItem('subId', data.subId);
                            location.href = './logined.html';
                        }else {
                            $('#errTip').html(data.msg)
                        }
                        
                    }, {
                        username: username,
                        password: password
                    });
                }else {
                    $('#errTip').html('用户名或密码不能为空！')
                }
            });
        }
    }
    return new page();
});