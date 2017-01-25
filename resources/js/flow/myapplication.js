define(['vue', 'css!iconfont', 'css!commoncss', 'css!inprogressCSS', 'vue.template'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            var applicationMsgs = that.render('applicationMsgs');
            that.ajaxData('../../resources/json/progressMsgs.json', applicationMsgs);
        };

        this.render = function(id, data) {
            return new Vue({
                el: '#' + id,
                data: {
                    data: data || {}
                }
            });
        };

        this.ajaxData = function(url, vm) {
            $.getJSON(url, function(data) {
                vm.data = data;
            });
        };

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});