define(['css!commoncss', 'css!pwdChangeCSS', 'common'], function() {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            this.pwdChangeClick();
        };

        this.pwdChangeClick = function() {
            $('#pwdBtn').on('click', function() {
                that.sendPwdChange();
            })
        }

        this.sendPwdChange = function() {
            var password = $('#oldPwd').val();
            var newPwd = $('#newPwd').val();
            var surePwd = $('#surePwd').val();
            if(password && newPwd && surePwd) {
                if(newPwd.length > 16) {
                    $('#errTip').html('密码长度不能大于16位！');
                    return;
                }
                if(newPwd === password) {
                    $('#errTip').html('旧密码不能与新密码相同');
                    return;
                }
                if(newPwd !== surePwd) {
                    $('#errTip').html('两次输入密码不一致！');
                    return;
                }

                ajaxData('POST', ajaxUrl.pwdChange, function(data) {
                    console.log(data)
                    var resCode = +data.resCode;
                    if(resCode === 0) {
                        $.toast("密码修改成功");
                        $('#errTip').html('密码修改成功！');
                        $('#oldPwd').val('');
                        $('#newPwd').val('');
                        $('#surePwd').val('');
                    }else {
                        $('#errTip').html(data.msg);
                    }
                }, {
                    password: password,
                    newPwd: newPwd
                });
            }else {
                $('#errTip').html('密码不能留空！');
            }
        }

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});