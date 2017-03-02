define(['css!commoncss', 'css!msgSettingCSS'], function() {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();
            this.initState();
            that.changeClick();
        };

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };

        this.initState = function() {
            var newMsg = localStorage.getItem('newMsg') ? !!parseInt(localStorage.getItem('newMsg')) : true;
            var sound = localStorage.getItem('sound') ? !!parseInt(localStorage.getItem('sound')) : true;
            var vibration = localStorage.getItem('vibration') ? !!parseInt(localStorage.getItem('vibration')) : true;
            $('#newMsg').attr('checked', newMsg);
            $('#sound').attr('checked', sound);
            $('#vibration').attr('checked', vibration);
        };

        this.changeClick = function() {
            //新消息按钮设置操作
            $('#newMsg').on('click', function() {
                console.log('newMsg', this.checked);
                localStorage.setItem('newMsg', this.checked ? 1 : 0);
            });

            //声音按钮设置操作
            $('#sound').on('click', function() {
                console.log('sound', this.checked);
                localStorage.setItem('sound', this.checked ? 1 : 0);
            });

            // 振动按钮设置操作
            $('#vibration').on('click', function() {
                console.log('vibration', this.checked);
                localStorage.setItem('vibration', this.checked ? 1 : 0);
            });
        }
    }
    return new page();
});