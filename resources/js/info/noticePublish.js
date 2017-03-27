define(['vue', 'css!iconfont', 'css!commoncss', 'css!infoCommonListCSS', 'common', 'vue.template'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            var unread = that.render('unread');
            that.ajaxData(ajaxUrl.infoList, unread, { name: 'noticePublish', tab: 'unread' });

            var read = that.render('read');
            that.ajaxData(ajaxUrl.infoList, read, { name: 'noticePublish', tab: 'read' });
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
                $('.no-data-tip').show();
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