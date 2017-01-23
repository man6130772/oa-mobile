define(['vue', 'css!iconfont', 'css!commoncss', 'css!leftdetailsCSS'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            // 绑定tab点击事件
            that.handleTabClick();

            that.createComponent();

            var flowForm = that.render('flowForm');
            that.ajaxData('../../resources/json/flowForm.json', flowForm);

            var flowState = that.render('flowState');
            that.ajaxData('../../resources/json/flowState.json', flowState);

            that.handleCheckAllFlow();
            that.handleAllowClick();
            that.handleRefuseClick();
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
                                <a class="item-content item-link p-l-none" :href="typeSource.url">\
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
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };

        this.handleCheckAllFlow = function() {
            $('#checkAllFlow').click(function() {
                var itemTemplate = $.Template7.compile('\
                    {{#each allFlowList}}\
                    <li>\
                        <p>{{time}}</p>\
                        <p><span class="p-r-md">{{approver}}</span><span>{{response}}</span></p>\
                    </li>\
                    {{/each}}\
                ');

                $.getJSON('../../resources/json/allFlowList.json', function(data) {
                    var listHTML = itemTemplate({ allFlowList: data });
                    $.modal({
                        text: '<div class="text-left b-b-1 m-t-lg"><span>浏览所有意见</span></div>',
                        afterText: '\
                            <span class="app-flow-close iconfont icon-cha"></span>\
                            <div id="allFlowList" class="app-flow-all-list list-block m-t-none m-b-none">\
                                <ul class="m-t-xs b-t-none b-b-none color-gray">\
                                    ' + listHTML + '\
                                </ul>\
                            </div>\
                        '
                    });
                    $('.app-flow-close').click(function() {
                        $.closeModal();
                    });
                });
            });
        };

        this.handleAllowClick = function() {
            $('#flowAllow').on('click', function(e) {
                $.modal({
                    text: '<span class="iconfont icon-dui color-limegreen icon-big p-r-sm"></span>批准完成！',
                    afterText: '<p class="app-modal-remarks"><span id="backCount" class="color-red">2</span> 秒后跳转【我的待办】</p>'
                });
                var timer = setInterval(function() {
                    var count = $('#backCount').text();
                    if (count > 0) $('#backCount').text(--count);
                    if (count === 0) {
                        clearInterval(timer);
                        $.closeModal();
                        history.back();
                    }
                }, 1000);
            });
        };

        this.handleRefuseClick = function() {
            $('#flowRefuse').on('click', function(e) {
                $.modal({
                    text: '<div class="m-t-lg"><span class="color-red">驳回</span> 此请假申请！</div>',
                    afterText: '\
                        <span class="app-flow-close iconfont icon-cha"></span>\
                        <div class="app-flow-refuse list-block m-t-xs m-b-none">\
                            <ul class="b-t-none b-b-none">\
                                <li>\
                                    <div class="item-content">\
                                    <div class="item-inner">\
                                        <div class="item-input item-caret">\
                                            <select>\
                                                <option>申请人节点</option>\
                                                <option>部分负责人节点</option>\
                                                <option>直接上司节点</option>\
                                                <option>分管领导节点</option>\
                                            </select>\
                                        </div>\
                                    </div>\
                                    </div>\
                                </li>\
                                <li>\
                                    <div class="item-content">\
                                    <div class="item-inner">\
                                        <div class="item-input">\
                                            <input type="text" placeholder="写下你驳回的意见">\
                                        </div>\
                                    </div>\
                                    </div>\
                                </li>\
                            </ul>\
                        </div>\
                        <p><a id="refuseConfirm" href="javascript:;" class="button bg-blue color-white">确认</a></p>\
                    '
                });
                $('.app-flow-close').click(function() {
                    $.closeModal();
                });
                $('#refuseConfirm').click(function() {
                    $.modal({
                        text: '<span class="iconfont icon-dui color-limegreen icon-big p-r-sm"></span>已驳回！',
                        afterText: '<p class="app-modal-remarks"><span id="backCount" class="color-red">2</span> 秒后跳转【我的待办】</p>'
                    });
                    var timer = setInterval(function() {
                        var count = $('#backCount').text();
                        if (count > 0) $('#backCount').text(--count);
                        if (count === 0) {
                            clearInterval(timer);
                            $.closeModal();
                            history.back();
                        }
                    }, 1000);
                });
            });
        };
    }
    return new page();
});