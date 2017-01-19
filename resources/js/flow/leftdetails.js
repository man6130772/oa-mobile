define(['vue', 'css!iconfont', 'css!commoncss', 'css!leftdetailsCSS'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();
        };

        this.handleBackClick = function() {
            $('.app-btn-back').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});