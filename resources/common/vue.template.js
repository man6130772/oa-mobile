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
                }];
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
                            <div class="item-inner padder-h p-t-none p-b-none b-b-none">\
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
                        <td>\
                            <div class="imguploader">\
                            </div>\
                        </td>\
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

    // 创建流程 - 假期申请 - 流程表单 + 明细
    Vue.component('flowform-vacation-detail', {
        props: ['dataSource'],
        template: '\
            <div class="app-flow-vacation">\
                <flowform-vacation :table-source="dataSource"></flowform-vacation>\
                <div class="list-block media-list m-t-sm m-b-none">\
                    <ul class="b-t-none b-b-none">\
                        <li v-for="item in detailList">\
                            <a class="item-content item-link p-l-xxs" :href="[item.url]">\
                                <div class="item-inner">\
                                    <div class="item-title">{{item.title}}</div>\
                                    <div class="item-subtitle color-lightgray">{{item.text}}</div>\
                                </div>\
                            </a>\
                        </li>\
                        <li>\
                            <a @click="handleIncrease" class="item-content app-create-detail item-link p-l-xxs" href="javascript:;">\
                                <div class="item-inner">\
                                    <div class="item-title iconfont icon-jia app-item-icon p-r-xs">增加明细</div>\
                                </div>\
                            </a>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
        ',
        computed: {
            detailList: function() {
                return this.dataSource.leftDetails;
            }
        },
        methods: {
            handleIncrease: function(e) {
                var num = this.detailList.length + 1;
                this.detailList.push({
                    title: '明细' + num,
                    url: 'applydetail.html?detail=' + num
                });
            }
        }
    });

    // 考勤 - 异常考勤汇总
    Vue.component('abnormal-checking', {
        props: ['tableSource'],
        template: '\
            <div>\
                <table>\
                    <tr>\
                        <td class="first-col">正常打卡: </td>\
                        <td class="sencond-col">{{tableSource.normalPunch}}</td>\
                    </tr>\
                    <tr>\
                        <td>前天未打卡: </td>\
                        <td>{{tableSource.allNoPunch}}</td>\
                    </tr>\
                    <tr>\
                        <td>上班未打开: </td>\
                        <td>{{tableSource.morningNoPunch}}</td>\
                    </tr>\
                    <tr>\
                        <td>下班未打卡: </td>\
                        <td>{{tableSource.afternoonNoPunch}}</td>\
                    </tr>\
                    <tr>\
                        <td>早退: </td>\
                        <td>{{tableSource.backEarly}}</td>\
                    </tr>\
                    <tr>\
                        <td>迟到: </td>\
                        <td>{{tableSource.late}}</td>\
                    </tr>\
                </table>\
                <table class="m-t-md">\
                    <tr>\
                        <td class="first-col">本月加班合计: </td>\
                        <td class="sencond-col">{{tableSource.allLeave}}</td>\
                    </tr>\
                    <tr>\
                        <td>本月加班合计: </td>\
                        <td>{{tableSource.allOvertime}}</td>\
                    </tr>\
                </table>\
            </div>\
        '
    });

    // 考勤 - 考勤流水 - item
    // //0 正常； 1全天未打卡； 2 上午未打卡； 3 下午未打卡
    Vue.component('punchwater-item', {
        props: ['item'],
        template: '\
            <tr v-bind:class="{ \'abnormal-list\': item.state > 0 }">\
                <td>{{item.data}}</td>\
                <td v-if="item.state == 0">正常</td>\
                <td v-if="item.state == 1">全天未打卡</td>\
                <td v-if="item.state == 2">上午未打卡</td>\
                <td v-if="item.state == 3">下午未打卡</td>\
                <td v-if="item.state == 0 "></td>\
                <td v-else="item.state > 0 ">\
                    <a href="#">刷卡说明</a><a href="#">请假</a>\
                </td>\
            </tr>\
        '
    });

    // 考勤 - 考勤流水 - item
    Vue.component('punchwater-list', {
        props: ['tableSource'],
        template: '\
            <table>\
                <tr class="table-title">\
                    <td class="first-col">日期</td>\
                    <td class="sencond-col">打卡状态</td>\
                    <td class="third-col">其他</td>\
                </tr>\
                <punchwater-item v-for="item in tableSource" :item="item"></punchwater-item>\
            </table>\
        '
    });

    // 设置 - 个人主页 - 用户信息区域
    Vue.component('person-info', {
        props: ['userData'],
        template: '\
            <div>\
                <img class="user-header" :src="userData.headerImg"></img>\
                <div class="user-name text-white text-center text-xxl m-t-xs">{{userData.name}}</div>\
                <div class="user-position text-white text-center">{{userData.section}} {{userData.jobPosition}}</div>\
            </div>\
        '
    });

    // 设置 - 个人资料 - 整页
    Vue.component('user-info', {
        props: ['tableSource'],
        template: '\
            <div>\
                <div class="list-block no-margin">\
                    <ul>\
                        <li class="item-content item-link header-list bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">头像</div>\
                                <img class="item-after user-header" :src="tableSource.headerImg">\
                            </div>\
                        </li>\
                        <li class="item-content item-link bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">座机</div>\
                                <div class="item-after">{{tableSource.telephone}}</div>\
                            </div>\
                        </li>\
                        <li class="item-content item-link bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">手机</div>\
                                <div class="item-after">{{tableSource.mobile}}</div>\
                            </div>\
                        </li>\
                        <li class="item-content item-link bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">邮箱</div>\
                                <div class="item-after">{{tableSource.email}}</div>\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
                <div class="list-block no-margin m-t-md">\
                    <ul>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">姓名</div>\
                                <div class="item-after">{{tableSource.name}}</div>\
                            </div>\
                        </li>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">岗位</div>\
                                <div class="item-after">{{tableSource.jobPosition}}</div>\
                            </div>\
                        </li>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">分部</div>\
                                <div class="item-after">{{tableSource.section}}</div>\
                            </div>\
                        </li>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">部门</div>\
                                <div class="item-after">{{tableSource.department}}</div>\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
                <div class="list-block no-margin m-t-md">\
                    <ul>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">上级</div>\
                                <div class="item-after">{{tableSource.leader}}</div>\
                            </div>\
                        </li>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">状态</div>\
                                <div class="item-after">{{tableSource.state}}</div>\
                            </div>\
                        </li>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">办公</div>\
                                <div class="item-after">{{tableSource.place}}</div>\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
        '
    });

    // 设置 - 切换账号 - list
    Vue.component('user-change-list', {
        props: ['dataSource'],
        template: '\
            <ul class="user-change-list no-margin no-padder bg-white">\
                <li v-for="item in dataSource" :class="{ \'login-active\': +item.state === 0 }">\
                    <div>\
                        <span>{{item.name}}</span>\
                        <span class="is-logining bg-orange color-white">登录中</span>\
                    </div>\
                    <div>{{item.section}} {{item.department}}</div>\
                </li>\
            </ul>\
        '
    });

    //logined - 首页
    Vue.component('portal-show', {
        props: ['dataSource'],
        template: '\
            <div>\
                <div class="app-list-panel m-t-sm">\
                    <div class="app-subtitle list-block m-t-none m-b-none">\
                        <ul class="b-t-none b-b-none">\
                            <li class="item-content p-l-xxs no-border">\
                                <div class="item-media">\
                                    <div class="app-color-tips bg-blue"></div>\
                                </div>\
                                <div class="item-inner">\
                                    <div class="item-title">图展</div>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class="app-galary-swiper">\
                        <div class="swiper-container">\
                            <div class="swiper-wrapper">\
                                <div v-for="item in dataSource.imgShow" class="swiper-slide"><img :src="item" alt="ad"></div>\
                            </div>\
                            <div class="swiper-pagination"></div>\
                        </div>\
                    </div>\
                </div>\
                <div class="app-list-panel m-t-sm">\
                    <div class="app-subtitle list-block m-t-none m-b-none">\
                        <ul class="b-t-none b-b-none">\
                            <li class="item-content item-link p-l-xxs">\
                                <div class="item-media">\
                                    <div class="app-color-tips bg-deeppink"></div>\
                                </div>\
                                <div class="item-inner">\
                                    <div class="item-title">待办事宜</div>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class="list-block sortable-opened m-t-none m-b-none">\
                        <ul class="b-t-none b-b-none">\
                            <li v-for="item in dataSource.standby" class="item-content item-link p-l-xxs">\
                                <div class="item-inner">\
                                    <a :href="\'a.html?id=\' + item.id" class="item-title color-default" :class="{dot: item.state == 0}">{{item.title}}</a>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>\
                </div>\
                <div class="app-list-panel m-t-sm">\
                    <div class="app-subtitle list-block m-t-none m-b-none">\
                        <ul class="b-t-none b-b-none">\
                            <li class="item-content item-link p-l-xxs">\
                                <div class="item-media">\
                                    <div class="app-color-tips bg-springgreen"></div>\
                                </div>\
                                <div class="item-inner">\
                                    <div class="item-title">通知</div>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class="list-block sortable-opened m-t-none m-b-none">\
                        <ul class="b-t-none b-b-none">\
                            <li v-for="item in dataSource.notice"  class="item-content item-link p-l-xxs">\
                                <a :href="\'a.html?id=\' + item.id" class="item-inner p-r-xxs color-default">\
                                    <div class="item-title" :class="{dot: item.state == 0}">{{item.title}}</div>\
                                    <div class="item-after color-gray">{{item.date}}</div>\
                                </a>\
                            </li>\
                        </ul>\
                    </div>\
                </div>\
            </div>\
        '
    });

    // 通讯录 - 列表页 - 整页
    Vue.component('contacts-list', {
        props: ['dataSource'],
        template: '\
            <div class="list-block contacts-block no-margin">\
                <contact-list v-for="(list, key) in dataSource" :list="list" :key-data="key"></contact-list>\
            </div>\
        '
    });

    // 通讯录 - 列表页 - 列表块
    Vue.component('contact-list', {
        props: ['keyData', 'list'],
        template: '\
            <div class="list-group">\
                <ul class="no-border">\
                    <li class="color-default" :class="{\'common-list-group-title\': titleData.isCommon, \'list-group-title\': !titleData.isCommon}">{{ titleData.title }}</li>\
                    <li class="contact-list" v-for="item in list">\
                        <a :href="\'./detail.html?id=\' + item.id">\
                            <div class="list-name text-black">{{item.name}}</div>\
                            <div class="list-info">集团信息中心.CEO</div>\
                        </a>\
                    </li>\
                </ul>\
            </div>\
        ',
        computed: {
            titleData: function() {
                var key = this.keyData;
                var list = this.list;
                if (key === 'CYLXR') {
                    return {
                        isCommon: 1,
                        title: "常用联系人"
                    };
                } else {
                    return {
                        isCommon: 0,
                        title: key
                    };
                }
            }
        }
    });
});