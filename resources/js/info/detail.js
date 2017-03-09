define(['vue', 'css!commoncss', 'css!infoDetailCSS', 'common', 'vue.template'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();
            var id = getQueryString('id');

            var infoDetailCon = that.render('infoDetailCon');
            that.ajaxData(ajaxUrl.infoDetail, infoDetailCon, { id: id });
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

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});