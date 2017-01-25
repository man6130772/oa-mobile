define(['vue'], function(Vue) {

    // 我的待办 - 消息列表
    Vue.component('mystandbymessage', {
        props: ['details'],
        template: '\
            <a class="card-link" :href="details.url">\
                <div class="card no-margin no-radius no-shadow">\
                    <div class="card-header">\
                        <span>{{details.time}}</span>\
                        <span @click.stop.prevent="handleFavor" :class="[details.favor ? \'icon-xingxingshixin color-gold\' : \'icon-xingxingkongxin\']" class="iconfont p-l-xxs p-r-xxs"></span>\
                    </div>\
                    <div class="card-content">\
                        <div class="card-content-inner">{{details.content}}</div>\
                    </div>\
                </div>\
            </a>\
        ',
        methods: {
            handleFavor: function(event) {
                if (this.details) this.details.favor = !this.details.favor;
            }
        }
    });

    // 审批中、我的申请 - 消息列表
    Vue.component('simplemessage', {
        props: ['item'],
        template: '\
            <a class="card-link" :href="item.url">\
                <div class="card no-margin no-radius no-shadow">\
                    <div class="card-content">\
                        <div class="card-content-inner">{{item.content}}</div>\
                    </div>\
                    <div class="card-footer">\
                        <div class="color-lightgray"><span class="iconfont icon-dingwei p-r-xs"></span><span>当前节点 {{item.person}}</span></div>\
                        <div><span class="iconfont icon-shizhong color-lightgray p-r-xs"></span><span>{{item.time}}</span></div>\
                    </div>\
                </div>\
            </a>\
        '
    });

    // 已归档 -消息列表
    Vue.component('archivedmessage', {
        props: ['item'],
        template: '\
            <a class="card-link" :href="item.url">\
                <div class="card no-margin no-radius no-shadow">\
                    <div class="card-header">\
                        <span>{{item.time}}</span>\
                    </div>\
                    <div class="card-content">\
                        <div class="card-content-inner">{{item.content}}</div>\
                    </div>\
                </div>\
            </a>\
        '
    });

    // 我的待办 - 流程表单
    Vue.component('flowform', {
        props: ['tableSource'],
        template: '\
            <div class="app-flow-form">\
                <table class="app-plain-table m-t-xxs">\
                    <leftcommonrow v-for="item in rowList" :item="item"></leftcommonrow>\
                </table>\
                <lefttype v-for="item in tableSource.leftType" :type-source="item"></lefttype>\
            </div>\
        ',
        computed: {
            rowList: function() {
                var data = this.tableSource;

                return [{
                    title: '标题',
                    text: data.title
                }, {
                    title: '编号',
                    text: data.formId
                }, {
                    title: '申请日期',
                    text: data.applicationTime
                }, {
                    title: '申请人',
                    text: data.applicant
                }, {
                    title: '合计请假天数',
                    text: data.totalLeft,
                    focus: true
                }, {
                    title: '请假时长汇总',
                    text: data.leftSummary,
                    focus: true
                }]
            }
        }
    });

    // 我的待办 - 请假表格公共项
    Vue.component('leftcommonrow', {
        props: ['item'],
        template: '\
            <tr>\
                <td>{{item.title}}</td>\
                <td :class="[item.focus ? \'color-red\' : \'\']">{{item.text}}</td>\
            </tr>\
        ',
    });

    // 我的待办 - 请假类型
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

    // 我的待办 - 请假详情
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

    // 流程 - 通用 - 流程状态
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

    // 创建流程 - 假期申请 - 流程表单
    Vue.component('flowform-vacation', {
        props: ['tableSource'],
        template: '\
            <div class="app-flow-form">\
                <table class="app-plain-table m-t-xxs">\
                    <leftcommonrow v-for="item in rowList" :item="item"></leftcommonrow>\
                    <tr>\
                        <td>附件</td>\
                        <td></td>\
                    </tr>\
                </table>\
            </div>\
        ',
        computed: {
            rowList: function() {
                var data = this.tableSource;

                return [{
                    title: '标题',
                    text: data.title
                }, {
                    title: '编号',
                    text: data.formId
                }, {
                    title: '申请日期',
                    text: data.applicationTime
                }, {
                    title: '申请人',
                    text: data.applicant
                }, {
                    title: '合计请假天数',
                    text: data.totalLeft,
                    focus: true
                }, {
                    title: '请假时长汇总',
                    text: data.leftSummary,
                    focus: true
                }];
            }
        }
    });
});