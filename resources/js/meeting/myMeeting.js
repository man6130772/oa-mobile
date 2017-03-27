define(['css!iconfont', 'css!commoncss', 'css!myMeetingCSS'], function() {
    function page() {
        var that = this;

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };

        this.init = function() {
            
            // 绑定header的回退事件
            that.handleBackClick();
            
        };

        this.ajaxData = function(url, callback) {
            $.getJSON(url, function(data) {
                callback(data);
            });
        };

    }
    return new page();
});