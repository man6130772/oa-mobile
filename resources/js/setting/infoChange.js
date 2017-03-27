define(['css!commoncss', 'css!infoChangeCSS', 'common'], function(Vue) {
    function page() {
        var that = this;
        var changeName;
        var allChangeInfo = {
            'telephone': {
                name: '座机',
                maxlength: 13,
                errTip: '请输入正确的座机号码',
                check: function (str) {
                    if(!str) return false;
                    var reg=/([0-9]{3,4}-)?[0-9]{7,8}/;
                    return reg.test(str);
                }
            },
            'mobile': {
                name: '手机号码',
                maxlength: 11,
                errTip: '请输入正确的手机号码',
                check: function(str) {
                    if(!str) return false;
                    var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
                    return reg.test(str);
                }
            },
            'email': {
                name: '邮箱',
                maxlength: '',
                errTip: '请输入正确的邮箱',
                check: function(str) {
                    if(!str) return false;
                    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                    return reg.test(str);
                }
            }
        };

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            changeName = getQueryString('name');
            that.initShowInfo();
            that.submitChange();
        };

        this.initShowInfo = function() {
            var changeInfo = allChangeInfo[changeName].name;
            var maxlength = allChangeInfo[changeName].maxlength;
            var newInfo = $('#newInfo')
            if(changeInfo) {
                newInfo.attr('placeholder', '请输入新的' + changeInfo);
                newInfo.attr('maxlength', maxlength);
            }
        };

        this.submitChange = function() {
            $('#infoChange').off('click').on('click', '.button', that.sureChange);

            $(document).off('keydown').on('keydown', function(event) {
                if(event.keyCode === 13) {
                    that.sureChange();
                    return false;
                };
            });
        }

        this.sureChange = function() {
            var check = allChangeInfo[changeName].check;
            var value = $('#newInfo').val();
            var infoCheck = check(value);
            var param = {};
            param[changeName] = value;
            if(infoCheck) {
                that.ajaxData(ajaxUrl.infoChange, param);
            }else {
                $('#errTipInfoChange').html(allChangeInfo[changeName].errTip);
            }
        }

        this.ajaxData = function(url, params) {
            ajaxData('GET', url, function(data) {
                console.log(data)
                if(!data.resCode) {
                    history.back();
                }else {
                    $('#errTipInfoChange').val(data.msg);
                }
            }, params);
        };

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});