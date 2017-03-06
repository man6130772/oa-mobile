define(['vue', 'common', 'css!iconfont', 'css!commoncss', 'css!detailformCSS'], function(Vue) {
    function page() {
        var that = this,
            eventType;

        this.init = function(e, pageId, $page) {
            // 判断事件加载形式
            eventType = e.type;

            // 绑定header的回退事件
            that.handleBackClick();

            // set header title
            $('#' + pageId + ' h1.title').text('明细' + getQueryString('detail'));

            // 挂载操作表
            that.handleControler(pageId);

            // 初始化时间
            that.handleClock(pageId);

            // 提交
            that.handleSubmit(pageId);
        };

        this.render = function(id, data) {
            return new Vue({
                el: '#' + id,
                data: {
                    data: data || {}
                }
            });
        };

        this.ajaxData = function(url, vm, cb) {
            $.getJSON(url, function(data) {
                vm.data = data;
                if (cb) cb(vm, data);
            });
        };

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };

        this.handleControler = function(pageId) {
            function ajaxValidDate(name) {
                $.ajax({
                    url: '../../resources/json/validDate.json',
                    type: 'POST',
                    success: function(data) {
                        var $date = $('#' + pageId + ' .app-leave-valid-date'),
                            $remainDate = $('#' + pageId + ' .app-leave-remain'),
                            $dateText = $date.find('.item-after');
                        if (name === '调休' || name === '年假') {
                            if (name === '调休') $dateText.text(data.hours + '小时');
                            if (name === '年假') $dateText.text(data.days + '天');
                            $date.show();
                            $remainDate.show();
                        } else {
                            $date.hide();
                            $remainDate.hide();
                        }
                    }
                });
            }
            $(document).on('click', '#' + pageId + ' .app-leave-type', function() {
                var buttons1 = [{
                        text: '请选择',
                        label: true
                    },
                    {
                        text: '调休',
                        bold: true,
                        color: 'default',
                        onClick: function() {
                            $('#' + pageId + ' .app-leave-type .item-after').text(this.text);
                            ajaxValidDate('调休');
                        }
                    },
                    {
                        text: '年假',
                        bold: true,
                        color: 'default',
                        onClick: function() {
                            $('#' + pageId + ' .app-leave-type .item-after').text(this.text);
                            ajaxValidDate('年假');
                        }
                    },
                    {
                        text: '事假',
                        bold: true,
                        color: 'default',
                        onClick: function() {
                            $('#' + pageId + ' .app-leave-type .item-after').text(this.text);
                            ajaxValidDate('事假');
                        }
                    },
                    {
                        text: '病假',
                        bold: true,
                        color: 'default',
                        onClick: function() {
                            $('#' + pageId + ' .app-leave-type .item-after').text(this.text);
                            ajaxValidDate('病假');
                        }
                    }
                ];
                var buttons2 = [{
                    text: '取消',
                    bg: 'primary'
                }];
                var groups = [buttons1, buttons2];
                $.actions(groups);
            });
            // 默认加载“调休”
            ajaxValidDate('调休');
        };

        this.handleClock = function(pageId) {
            var getDays = function(max) {
                var days = [];
                for (var i = 1; i <= (max || 31); i++) {
                    days.push(i < 10 ? "0" + i : i);
                }
                return days;
            };

            var getDaysByMonthAndYear = function(month, year) {
                var int_d = new Date(year, parseInt(month) + 1 - 1, 1);
                var d = new Date(int_d - 1);
                return getDays(d.getDate());
            };

            var preventOverMax = function(picker, values, displayValues) {
                var days = getDaysByMonthAndYear(picker.cols[1].value, picker.cols[0].value);
                var currentValue = picker.cols[2].value;
                if (currentValue > days.length) currentValue = days.length;
                picker.cols[2].setValue(currentValue);
            };

            var ajaxLeaveLength = function() {
                $.ajax({
                    url: '../../resources/json/leaveLength.json',
                    type: 'POST',
                    data: {
                        type: $('#' + pageId + ' .app-leave-type .item-after').text(),
                        startTime: $startTime.val(),
                        endTime: $endTime.val()
                    },
                    success: function(data) {
                        $('#' + pageId + ' .app-leave-length .item-after').text(data.length + '小时');
                        $('#' + pageId + ' .app-leave-remain .item-after').text(data.remain + '小时');
                    }
                });
            };

            var $startTime = $('#' + pageId + ' .app-leave-start-time input'),
                $endTime = $('#' + pageId + ' .app-leave-end-time input');

            var today = new Date(),
                year = today.getFullYear(),
                month = today.getMonth() + 1,
                day = today.getDate();
            month = month > 10 ? month : '0' + month;
            day = day > 10 ? day : '0' + day;

            var toolbarTemplate = '<header class="bar bar-nav">\
                                        <button class="button button-link pull-right close-picker">确定</button>\
                                        <h3 class="title text-left p-l-md">请选择时间：</h3>\
                                    </header>';

            $startTime.val(year + '-' + month + '-' + day + ' ' + '09:00');
            $endTime.val(year + '-' + month + '-' + day + ' ' + '18:00');
            ajaxLeaveLength();
            $startTime.datetimePicker({
                toolbarTemplate: toolbarTemplate,
                onChange: function(picker, values, displayValues) {
                    // 阻止月份超过最大值
                    preventOverMax(picker, values, displayValues);
                    // 阻止开始时间超过结束时间
                    var oldCols = [].concat($startTime.val().split(" ")[0].split("-"), $startTime.val().split(" ")[1].split(":")),
                        newCols = values,
                        endCols = [].concat($endTime.val().split(" ")[0].split("-"), $endTime.val().split(" ")[1].split(":"));
                    if (newCols[0] == endCols[0]) {
                        if (newCols[1] == endCols[1]) {
                            if (newCols[2] == endCols[2]) {
                                if (newCols[3] == endCols[3]) {
                                    if (newCols[4] > endCols[4]) picker.cols[6].setValue(endCols[4]);
                                } else if (newCols[3] > endCols[3]) {
                                    picker.cols[4].setValue(endCols[3]);
                                }
                            } else if (newCols[2] > endCols[2]) {
                                picker.cols[2].setValue(endCols[2]);
                            }
                        } else if (newCols[1] > endCols[1]) {
                            picker.cols[1].setValue(endCols[1]);
                        }
                    } else if (newCols[0] > endCols[0]) {
                        picker.cols[0].setValue(endCols[0]);
                    }
                },
                onOpen: function(picker) {
                    $startTime.timer = setInterval(ajaxLeaveLength, 1000);
                },
                onClose: function(picker) {
                    clearInterval($startTime.timer);
                }
            });
            $endTime.datetimePicker({
                toolbarTemplate: toolbarTemplate,
                onChange: function(picker, values, displayValues) {
                    // 阻止月份超过最大值
                    preventOverMax(picker, values, displayValues);
                    // 阻止开始时间超过结束时间
                    var oldCols = [].concat($endTime.val().split(" ")[0].split("-"), $endTime.val().split(" ")[1].split(":")),
                        newCols = values,
                        startCols = [].concat($startTime.val().split(" ")[0].split("-"), $startTime.val().split(" ")[1].split(":"));
                    if (newCols[0] == startCols[0]) {
                        if (newCols[1] == startCols[1]) {
                            if (newCols[2] == startCols[2]) {
                                if (newCols[3] == startCols[3]) {
                                    if (newCols[4] < startCols[4]) picker.cols[6].setValue(startCols[4]);
                                } else if (newCols[3] < startCols[3]) {
                                    picker.cols[4].setValue(startCols[3]);
                                }
                            } else if (newCols[2] < startCols[2]) {
                                picker.cols[2].setValue(startCols[2]);
                            }
                        } else if (newCols[1] < startCols[1]) {
                            picker.cols[1].setValue(startCols[1]);
                        }
                    } else if (newCols[0] < startCols[0]) {
                        picker.cols[0].setValue(startCols[0]);
                    }
                },
                onOpen: function(picker) {
                    $endTime.timer = setInterval(ajaxLeaveLength, 1000);
                },
                onClose: function(picker) {
                    clearInterval($endTime.timer);
                }
            });
        };

        this.handleSubmit = function(pageId) {
            $('#' + pageId + ' .app-submit a').on('click', function(e) {
                $.ajax({
                    url: '../../resources/json/detailSubmit.json',
                    type: 'POST',
                    data: {
                        type: $('#' + pageId + ' .app-leave-type .item-after').text(),
                        startTime: $('#' + pageId + ' .app-leave-start-time input').val(),
                        endTime: $('#' + pageId + ' .app-leave-end-time input').val(),
                        reason: $('#' + pageId + ' .app-leave-reason input').val()
                    },
                    success: function(data) {
                        if (data.status == 1) history.back();
                    }
                });
            });
        };
    }
    return new page();
});