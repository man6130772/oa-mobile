define(['vue', 'css!iconfont', 'css!commoncss', 'css!meetingIndexCSS', 'common', 'swiper', 'vue.template'], function(Vue) {
    function page() {
        var that = this;
        var currDate = (new Date()).Format("yyyy-MM-dd");
        var currArea = '总部';
        var areaList = [];
        var meetingIndexCon;

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };

        this.init = function() {
            
            // 绑定header的回退事件
            that.handleBackClick();
            that.initDateArr();
            
            that.closeTipClick();

            meetingIndexCon = that.render('meetingIndexCon');
            that.getAreaList(ajaxUrl.meetingIndexArea, meetingIndexCon);
            that.getRoomState();
        };

        this.getAreaList = function(url, vm) {
            ajaxData('GET', url, function(data) {
                vm.areaList = data;
                areaList = data;

                vm.$nextTick(function(){   //for渲染完成的回调
                    that.initSlide();
                });
            });
        };

        this.getRoomState = function() {
            ajaxData('GET', ajaxUrl.roomState, function(data) {
                meetingIndexCon.rooms = data;
            }, { area: currArea, date: currDate });
        };        

        this.render = function(id) {
            return new Vue({
                el: '#' + id,
                data: {
                    areaList: [],
                    rooms: []
                }
            });
        };

        this.initDatePicker = function(dateArr) {
            $("#mTopPicker").val(dateArr[0]);
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
                ],
                onClose: function(picker) {
                    currDate = picker.value[0].split(' ')[0];
                    that.getRoomState();
                }
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
            that.initDatePicker(dateArr)
        };

        this.initSlide = function() {
            $('.swiper-slide').eq(0).addClass('slide-active');

            $(".swiper-container").swiper({
                slidesPerView: 5.6
            });

            that.areaClickHandle();
        };

        this.areaClickHandle = function() {
            $('#meetingIndex').off('click').on('click', '.swiper-slide', function() {
                $(this).addClass('slide-active').siblings().removeClass('slide-active');
                var index = $(this).index();
                if(currArea === areaList[index]) return;
                currArea = areaList[index];
                console.log(index, currArea)
                that.getRoomState();
            });
        }

        this.closeTipClick = function() {
            var timer = -1;
            timer = setTimeout(function() {
                $('.meeting-explain').css('visibility', 'hidden');
                clearTimeout(timer);
            }, 10000);

            $('#meetingIndex').on('click', '.icon-cha', function() {
                $('.meeting-explain').css('visibility', 'hidden');
            })
        }
    }
    return new page();
});