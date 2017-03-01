define(['css!commoncss', 'css!pwdChangeCSS'], function() {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            $('#pwd-btn').on('click', function(event) {
                $('#pwd-form').submit();
                // event.preventDefault();
                // return false;
            })
        };

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});