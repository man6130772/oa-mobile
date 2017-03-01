define(['vue', 'css!commoncss', 'css!iconfont', 'css!userChangeCSS', 'common', 'vue.template'], function(Vue) {
    function page() {
        var that = this,
            userChangeList;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            userChangeList = that.render('userChangeList');
            that.changeUser(0);
            that.listChangeClick();
            this.signout();
        };

        this.render = function(id, data) {
            return new Vue({
                el: '#' + id,
                data: {
                    data: data || {}
                }
            });
        };

        this.ajaxData = function(url, vm, params) {
            ajaxData('GET', url, function(data) {
                vm.data = data;
            }, params);
        };

        this.changeUser = function(flag) {
            that.ajaxData(ajaxUrl.userChange, userChangeList, { flag: flag });
        };

        that.listChangeClick = function() {
            $('#userChangeList').on('click', 'li:not(".login-active")', function() {
                event.preventDefault();   //阻止点击选中
                that.changeUser(1);
            })
        }

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };

        this.signout = function() {
            $('#userChangeSignout').on('click', function() {
                loginOut();
            });
        }
    }
    return new page();
});