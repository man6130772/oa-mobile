define(['vue', 'css!iconfont', 'css!commoncss', 'css!roomSelectCSS', 'common', 'swiper', 'vue.template'], function(Vue) {
    function page() {
        var that = this;
        var currRoomId;
        var currDate;
        var roomSelectCon;
        var meetingPopover;
        var popoverIndex = 0;
        var detailList;

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };

        this.init = function() {
            currRoomId = getQueryString('id');
            currDate = getQueryString('date');

            roomSelectCon = that.render('roomSelectCon');
            meetingPopover = that.render('meetingPopover');
            
            // 绑定header的回退事件
            that.handleBackClick();
            that.initDateArr();
            that.phoneClick();

            that.ajaxData();
            that.popoverClick();
        };

        this.render = function(id) {
            return new Vue({
                el: '#' + id,
                data: {
                    data: {}
                }
            });
        };

        this.ajaxData = function() {
            ajaxData('GET', ajaxUrl.roomSelect, function(data) {
                roomSelectCon.data = data;
                detailList = data.detailList;
                meetingPopover.data = detailList[popoverIndex];
            }, { id: currRoomId, date: currDate });
        };

        this.initDatePicker = function(dateArr) {
            var initValue = dateArr[0];
            for (var i = 0; i < dateArr.length; i++) {
                if(dateArr[i].indexOf(currDate) > -1) {
                    initValue = dateArr[i];
                    break;
                }
            }
            $("#mTopPicker").val(initValue);
            $("#mTopPicker").picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                                      <button class="button button-link pull-right close-picker">确定</button>\
                                      <h1 class="title">请选择预定日期</h1>\
                                  </header>',
                cols: [
                    {   
                        textAlign: 'center',
                        values: dateArr
                    }
                ]
            });
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

            // console.log(dateArr)
            this.initDatePicker(dateArr);
        };

        this.phoneClick = function() {
            $('#roomSelect').off('click').on('click', '.conPhone', function() {
                $.modal({
                    text: ' <div class="username text-black text-xl m-t-s">张林</div>\
                            <div class="position text-m m-b-md">集团信息中心.实施工程师</div>\
                            <div class="flex-box text-m m-b">\
                                <span class="phone-number text-left">手机: \
                                    <span class="text-black">15522223333</span>\
                                </span>\
                                <a class="iconfont icon-dianhua text-center"></a>\
                                <a class="iconfont icon-duanxin text-right"></a>\
                            </div>\
                            <div class="flex-box text-m m-b">\
                                <span class="phone-number text-left">座机: \
                                    <span class="text-black">0755-22223333</span>\
                                </span>\
                                <a class="iconfont icon-dianhua text-center"></a>\
                                <a class="iconfont"></a>\
                            </div>\
                            ',
                    verticalButtons: true
                });
            })
        };

        this.popoverClick = function() {
            $('body').off('click').on('click', '.open-popover', function() {
                popoverIndex = $(this).index('.open-popover');
                console.log(popoverIndex, detailList)
                meetingPopover.data = detailList[popoverIndex];
            })
        }
    }
    return new page();
});