define(['vue', 'css!commoncss'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            that.createComponent();

            var flowDetailItem = that.render('flowDetailItem');
            that.ajaxData('../../resources/json/flowDetailItem.json', flowDetailItem);
        };

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };

        this.render = function(id, data) {
            return new Vue({
                el: '#' + id,
                data: {
                    data: data || {}
                }
            });
        };

        this.ajaxData = function(url, vm) {
            $.getJSON(url, function(data) {
                vm.data = data;
            });
        };

        this.createComponent = function() {
            Vue.component('detailform', {
                props: ['tableSource'],
                template: '\
                    <div class="app-flow-form">\
                        <table class="app-plain-table m-t-xxs">\
                            <tr>\
                                <td>请假类型</td>\
                                <td>{{tableSource.type}}</td>\
                            </tr>\
                            <tr>\
                                <td>开始时间</td>\
                                <td>{{tableSource.startTime}}</td>\
                            </tr>\
                            <tr>\
                                <td>结束时间</td>\
                                <td>{{tableSource.endTime}}</td>\
                            </tr>\
                            <tr>\
                                <td>有效假期</td>\
                                <td>{{tableSource.effectiveDate}}</td>\
                            </tr>\
                            <tr>\
                                <td>已休假期</td>\
                                <td>{{tableSource.restedDate}}</td>\
                            </tr>\
                            <tr>\
                                <td>剩余假期</td>\
                                <td class="color-red">{{tableSource.remainingDate}}</td>\
                            </tr>\
                            <tr>\
                                <td>请假时长</td>\
                                <td class="color-red">{{tableSource.lastDate}}</td>\
                            </tr>\
                        </table>\
                        <lefttype v-for="item in tableSource.leftType" :type-source="item"></lefttype>\
                    </div>\
                '
            });
        };
    }
    return new page();
});