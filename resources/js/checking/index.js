define(['css!iconfont', 'css!commoncss', 'css!checkingIndexCSS'], function() {
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
            that.jumpClick();

            that.showYear = new Date().getFullYear();
            that.showMonth = new Date().getMonth() + 1;

            that.ajaxData('../../resources/json/abnormalDate.json', this.initCalendar);
        };

        this.initCalendar = function(data) {
            $("#calendar").calendar({
                toolbar: true,
                // value: ['2017-02-18', '2017-02-06', '2017-02-02', '2017-01-06'],
                value: data,
                dayNamesShort: ['周六', '周日', '周一', '周二', '周三', '周四', '周五'],
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                // toolbarTemplate: '<div>666</div>',
                onMonthAdd: function () {
                    var showDate = $('.picker-calendar-month-current');
                    that.showYear = showDate.attr('data-year');
                    that.showMonth = +showDate.attr('data-month') + 1;
                    // console.log(that);
                }
            });
        }

        this.jumpClick = function() {
            $('#checkingWaterIndex').click(function() {
                $.router.loadPage('./detail.html?year=' + that.showYear + '&month=' + that.showMonth);
            });

            $('#checkingAbnormalIndex').click(function() {
                $.router.loadPage('./abnormal.html?year=' + that.showYear + '&month=' + that.showMonth);
            });
        }

        this.ajaxData = function(url, callback) {
            $.getJSON(url, function(data) {
                callback(data);
            });
        };
    }
    return new page();
});