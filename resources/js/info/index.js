define(['css!iconfont', 'css!commoncss', 'common'], function() {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            this.ajaxData(ajaxUrl.infoIndex);
        };

        this.ajaxData = function(url) {
            ajaxData('GET', url, function(data) {
                var listName = ['infoPublish', 'news', 'noticePublish'];
                var numList = $('#infoIndex').find('.item-after');
                for (var i = 0; i < numList.length; i++) {
                    var item = numList.eq(i);
                    item.html(data[listName[i]].number);

                    if(data[listName[i]].state == '1') {
                        item.addClass('color-red');
                        item.prev().addClass('badge-dot');
                    }    
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