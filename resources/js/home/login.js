define(['css!loginCSS', 'css!iconfont', 'common', 'vue'], function() {
    function page() {
        var that = this;
        var isSafari = function(){
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            return userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;
        }

        this.init = function() {
            checkLogined();
            that.initLogin();
        };

        this.login = function() {
            var username = $('#username').val();
            var password = $('#password').val();

            if(username && password) {
                ajaxData('POST', ajaxUrl.loginCheck, function(data) {
                    var logined = +data.logined;
                    if(logined === 0) {
                        localStorage.setItem('loginState', 1);

                        // safari跨域cors不能设置cookie，做特殊处理，跳转到后台页面去设置cookie
                        if(isSafari()){
                            // var indexUrl = '//' + location.hostname + '/pages/home/index.html';
                            var indexUrl = isDev ? '//' + location.hostname + '/pages/home/index.html' : '//' + location.hostname + '/e-ban/pages/home/index.html';
                            // console.log('http://172.17.194.42:8088/zwBelleOA_Moblie_0.1/VerufyLoginBySafari.jsp?username=' + username + '&password=' + password + '&indexUrl=' + indexUrl);
                            // window.location.href = 'http://172.17.194.42:8088/zwBelleOA_Moblie_0.1/VerufyLoginBySafari.jsp?username=' + username + '&password=' + password + '&indexUrl=' + indexUrl;

                            var formStr = '<form id="safariForm" style="display: none;" action="' + rootUrl + '/BelleOA_Moblie_0.1/VerufyLoginBySafari.do" method="post">\
                                                <input name="username" value=' + username + ' type="text">\
                                                <input name="password" value=' + password + ' type="password">\
                                                <input name="indexUrl" value=' + indexUrl + ' type="text">\
                                                <input type="submit" value="Save">\
                                            </form>';
                            $('body').append(formStr);
                            $('#safariForm').submit();
                            return;
                        }

                        location.href = '../home/index.html';
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
        }

        this.initLogin = function() {
            $('#loginBtn').off('click').on('click', function() {
                that.login();
            });

            $(document).off('keydown').on('keydown', function(event) {
                if(event.keyCode === 13) that.login();
            });
        }
    }
    return new page();
});