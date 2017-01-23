define(['css!iconfont', 'css!commoncss', 'css!flowIndexCSS'], function() {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();
        };

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});