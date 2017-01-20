define(['vue', 'css!iconfont', 'css!commoncss', 'css!leftdetailsCSS'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            // 绑定tab点击事件
            that.handleTabClick();

            that.createComponent();

            var flowForm = that.renderFlowForm('flowForm');
            this.reqFlowFormData('../../resources/json/flowForm.json', flowForm);

            var flowState = that.renderFlowState('flowState');
            this.reqFlowStateData('../../resources/json/flowState.json', flowState);
        };

        this.reqFlowFormData = function(url, vm) {
            $.getJSON(url, function(data) {
                vm.tableSource = data;
            });
        };

        this.reqFlowStateData = function(url, vm) {
            $.getJSON(url, function(data) {
                vm.stateList = data;
            });
        };

        this.renderFlowForm = function(id) {
            return new Vue({
                el: '#' + id,
                data: {
                    tableSource: {}
                }
            });
        };

        this.renderFlowState = function(id) {
            return new Vue({
                el: '#' + id,
                data: {
                    stateList: []
                }
            });
        };

        this.createComponent = function() {
            Vue.component('flowform', {
                props: ['tableSource'],
                template: '\
                    <div class="app-flow-form">\
                        <table class="app-plain-table m-t-xxs">\
                            <tr>\
                                <td>标题</td>\
                                <td>{{tableSource.title}}</td>\
                            </tr>\
                            <tr>\
                                <td>编号</td>\
                                <td>{{tableSource.formId}}</td>\
                            </tr>\
                            <tr>\
                                <td>申请日期</td>\
                                <td>{{tableSource.applicationTime}}</td>\
                            </tr>\
                            <tr>\
                                <td>申请人</td>\
                                <td>{{tableSource.applicant}}</td>\
                            </tr>\
                            <tr>\
                                <td>合计请假天数</td>\
                                <td class="color-red">{{tableSource.totalLeft}}</td>\
                            </tr>\
                            <tr>\
                                <td>请假时长汇总</td>\
                                <td class="color-red">{{tableSource.leftSummary}}</td>\
                            </tr>\
                        </table>\
                        <lefttype v-for="item in tableSource.leftType" :type-source="item"></lefttype>\
                    </div>\
                '
            });

            Vue.component('lefttype', {
                props: ['typeSource'],
                template: '\
                    <table class="app-plain-table m-t-md">\
                        <tr>\
                            <td>请假类型</td>\
                            <td class="list-block">\
                                <a class="item-content item-link p-l-none" href="">\
                                    <div class="item-inner p-t-none p-b-none b-b-none">\
                                        <div class="item-title">{{typeSource.type}}</div>\
                                    </div>\
                                </a>\
                            </td>\
                        </tr>\
                        <tr>\
                            <td>开始时间</td>\
                            <td>{{typeSource.startTime}}</td>\
                        </tr>\
                        <tr>\
                            <td>结束时间</td>\
                            <td>{{typeSource.endTime}}</td>\
                        </tr>\
                        <tr>\
                            <td>时长</td>\
                            <td class="color-red">{{typeSource.timeLength}}</td>\
                        </tr>\
                        <tr>\
                            <td>原因</td>\
                            <td>{{typeSource.reason}}</td>\
                        </tr>\
                    </table>\
                '
            });

            Vue.component('flowstateitem', {
                props: ['item'],
                template: '\
                    <div class="app-flow-state-item">\
                        <span class="p-l-sm p-r-sm">{{item.time}}</span>\
                        <div class="app-flow-state-content bg-lightgray m-t-xs">\
                            <div class="app-flow-state-title text-ellipsis">{{item.title}}</div>\
                            <div class="app-flow-state-text text-ellipsis">{{item.text}}</div>\
                        </div>\
                    </div>\
                '
            });
        };

        this.handleTabClick = function() {
            $(document).on("click.cb", ".tab-link", function(e) {
                if (e.target.href.indexOf('flowForm') > -1) {
                    $('#leftdetails .content').addClass('content-nav-bottom');
                    $('#leftdetails nav.bar').css({
                        display: 'flex'
                    });
                } else {
                    $('#leftdetails .content').removeClass('content-nav-bottom');
                    $('#leftdetails nav.bar').hide();
                }
            });
        };

        this.handleBackClick = function() {
            $('.app-btn-back').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});