define(['css!commoncss', 'css!msgSettingCSS'], function() {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            that.newMsgClick();
            that.soundClick();
            that.vibrationClick();
        };

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };

        //新消息按钮设置操作
        this.newMsgClick = function() {
            $('#new-msg').on('click', function() {
                console.log('new-msg', this.checked);
            });
            
        }

        //声音按钮设置操作
        this.soundClick = function() {
            $('#sound').on('click', function() {
                console.log('sound', this.checked);
            });
        }

        // 振动按钮设置操作
        this.vibrationClick = function() {
            $('#vibration').on('click', function() {
                console.log('vibration', this.checked);
            });
        }

    }
    return new page();
});