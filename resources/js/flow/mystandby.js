define(['vue', 'css!iconfont', 'css!commoncss', 'css!mystandbyCSS', 'vue.template'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            var all = that.renderTab('all');
            this.reqMsgListData('../../resources/json/msgListTest.json', all);

            var nosee = that.renderTab('nosee');
            this.reqMsgListData('../../resources/json/msgListTest1.json', nosee);
        };

        this.reqMsgListData = function(url, vm) {
            $.getJSON(url, function(data) {
                vm.msgList = data;
            });
        };

        this.renderTab = function(tabName) {
            return new Vue({
                el: '#' + tabName,
                data: {
                    msgList: []
                }
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