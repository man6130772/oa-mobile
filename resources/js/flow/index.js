define(['css!iconfont', 'css!commoncss', 'css!flowIndexCSS'], function() {
    function page() {
        var that = this;

        this.init = function() {
            that.handleClick();
        };

        this.handleClick = function() {
            $('.app-btn-back').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});