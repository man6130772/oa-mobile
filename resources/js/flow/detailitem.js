define(['vue', 'css!commoncss', 'vue.template'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            var flowDetailItem = that.render('flowDetailItem');
            that.ajaxData('../../resources/json/flowDetailItem.json', flowDetailItem);
        };

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
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
    }
    return new page();
});