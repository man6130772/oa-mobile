define(['css!iconfont', 'css!commoncss', 'css!roomBookCSS', 'swiper'], function() {
    function page() {
        var that = this;
        var timeArr = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };

        this.init = function() {
            
            // 绑定header的回退事件
            that.handleBackClick();
            that.initDateArr();
            that.sureBookClick()
        };

        this.ajaxData = function(url, callback) {
            $.getJSON(url, function(data) {
                callback(data);
            });
        };

        this.initDatePicker = function(dateArr) {
            // $("#timePickerStart").picker("setValue", [dateArr[0], timeArr[0]]);
            // $("#timePickerStart").val(dateArr[0] + ' ' + timeArr[0]);
            $("#timePickerStart").picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                                      <button class="button button-link pull-right close-picker">确定</button>\
                                      <h1 class="title">请选择预定时间</h1>\
                                  </header>',
                // value: [dateArr[0], timeArr[0]],
                cols: [
                    {   
                        textAlign: 'center',
                        values: dateArr
                    },
                    {   
                        textAlign: 'center',
                        values: timeArr
                    }
                ],
            });

            // $("#timePickerStart").picker("setValue", [dateArr[0], timeArr[0]]);
        };

        this.initDateArr = function() {
            var dateArr = [];
            var GetDateStr = function(AddDayCount) {
                var weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
                var dd = new Date();
                dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
                var y = dd.getFullYear();
                var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0 
                var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
                var w = weekList[dd.getDay()];
                return y + '-' + m + "-" + d + ' ' + w;
            };

            for (var i = 0; i < 7; i++) {
                dateArr.push(GetDateStr(i));
            }

            this.initDatePicker(dateArr);
        };

        // this.initTimeArr = function() {
        //     var timeArr = [];
        //     for (var i = 9; i < 19; i++) {
        //         var iStr = ((i + '').length < 2 ? '0' + i : i);
        //         timeArr.push(iStr + ':00');
        //         timeArr.push(iStr + ':30');
        //     }

        //     console.log(timeArr)
        // }
        
        this.sureBookClick = function() {
            $('#roomBook').on('click', '#bookBtn', function() {
                $.modal({
                    text: ' <h3 class="no-margin text-center icon-dui iconfont text-xl padder-v">预订成功</h3>\
                            <div class="text-left book-tip-list">\
                                <div class="text-ellipsis">会议室: **会议室**会议室**会议室</div>\
                                <div>日　期: 6666666</div>\
                                <div>时　间: 6666666</div>\
                                <div>召集人: 6666666</div>\
                            </div>\
                            <div>2s后跳到会议主题界面</div>\
                            <span class="iconfont icon-cha"></span>\
                            ',
                    verticalButtons: true
                });

                var timer = null;
                timer = setTimeout(function() {
                    clearTimeout(timer);
                    $.closeModal();
                }, 2000);

                $('.icon-cha').on('click', function() {
                    clearTimeout(timer);
                    $.closeModal();
                })

            })
        };
    }
    return new page();
});