define(['css!iconfont', 'css!commoncss', 'css!checkingIndexCSS', 'common'], function() {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();
            that.jumpClick();

            that.ajaxData();
        };

        this.initCalendar = function(data) {
            that.showYear = new Date().getFullYear();
            that.showMonth = new Date().getMonth() + 1;
            $("#calendar").calendar({
                toolbar: true,
                value: data.data,
                maxDate: (new Date()).Format("yyyy-MM-dd"),  // 限制可选择的最大日期
                minDate: data.beginTime,    // 限制了选择的最小日期
                firstShow: false, // （改源码新增）控制初始化日历时显示的是当前日期还是value值里的第一个日期，true为默认值，是value的第一个值的日期，false为当前日期
                dayNamesShort: ['周六', '周日', '周一', '周二', '周三', '周四', '周五'],
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                onMonthAdd: function () {
                    var showDate = $('.picker-calendar-month-current');
                    that.showYear = showDate.attr('data-year');
                    var month = +showDate.attr('data-month') + 1;
                    var monthLen = (month + '').length;
                    that.showMonth = monthLen === 2 ? month : '0' + month;
                    // console.log(that);
                }
            });

            // 屏蔽掉对日期点击的选择
            $('.picker-calendar-months-wrapper').off('click');
        }

        this.jumpClick = function() {
            $('#checkingWaterIndex').click(function() {
                $.router.loadPage('./detail.html?year=' + that.showYear + '&month=' + that.showMonth);
            });

            $('#checkingAbnormalIndex').click(function() {
                $.router.loadPage('./abnormal.html?year=' + that.showYear + '&month=' + that.showMonth);
            });
        }

        this.ajaxData = function() {
            ajaxData('GET', ajaxUrl.abnormalDate, function(data) {
                that.initCalendar(data);
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