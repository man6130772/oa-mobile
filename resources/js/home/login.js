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

                            //safari设置不了cookie，做特殊处理，跳转到后台页面去设置cookie
                            // var explorer = navigator.userAgent;
                            // if(explorer.indexOf("Safari") >= 0){
                            //     var indexUrl = '//' + location.hostname + '/pages/login/index.html';
                            //     console.log('#?uername=' + username + '&password=' + password + '&url=' + indexUrl);
                            //     location.href = '#?uername=' + username + '&password=' + password + '&indexUrl=' + indexUrl;
                            //     return;
                            // }

                            location.href = './index.html';
                        }else {
                            $('#errTip').html(data.msg);
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