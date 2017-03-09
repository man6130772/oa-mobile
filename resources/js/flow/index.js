define(['css!iconfont', 'css!commoncss', 'css!flowIndexCSS', 'common'], function() {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            this.ajaxData(ajaxUrl.flowIndex);
        };

        this.ajaxData = function(url) {
            ajaxData('GET', url, function(data) {
                var listName = ['mystandby', 'inprogress', 'myapplication', 'archived'];
                var numList = $('#flowIndex').find('.item-after');
                for (var i = 0; i < numList.length; i++) {
                    var domItem = numList.eq(i);
                    var dataItem = data[listName[i]];
                    domItem.html(dataItem.number);

                    if(dataItem.state == '1') {
                        domItem.addClass('color-red');
                        domItem.prev().addClass('badge-dot');
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