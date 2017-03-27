define(['vue'], function(Vue) {

    // 我的待办 - 消息列表
    Vue.component('mystandbymessage', {
        props: ['details'],
        template: '\
            <a class="card-link" :href="\'leftdetails.html?id=\' + details.id">\
                <div class="card no-margin no-radius no-shadow">\
                    <div class="card-header">\
                        <span>{{details.time}}</span>\
                        <span :data-id="details.id" :class="[details.favor ? \'icon-xingxingshixin color-gold\' : \'icon-xingxingkongxin\']" class="iconfont p-l-xxs p-r-xxs"></span>\
                    </div>\
                    <div class="card-content">\
                        <div class="card-content-inner">{{details.content}}</div>\
                    </div>\
                </div>\
            </a>\
        '
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

    // 创建流程 - 假期申请 - 明细
    Vue.component('flowform-vacation-detail-item', {
        props: ['item', 'index'],
        template: '\
            <li class="swipeout" :index="[index]">\
                <div class="swipeout-content">\
                    <a class="item-content item-link p-l-xxs" :href="[item.url]">\
                        <div class="item-inner">\
                            <div class="item-title">{{item.title}}</div>\
                            <div class="item-subtitle color-lightgray">{{item.text}}</div>\
                        </div>\
                    </a>\
                </div>\
                <div class="swipeout-actions-right">\
                    <a class="bg-danger swipeout-delete" href="javascript:;">删除</a>\
                </div>\
            </li>\
        '
    });

    // 创建流程 - 假期申请 - 流程表单 + 明细
    Vue.component('flowform-vacation-detail', {
        props: ['dataSource'],
        template: '\
            <div class="app-flow-vacation">\
                <flowform-vacation :table-source="dataSource"></flowform-vacation>\
                <div class="list-block media-list m-t-sm m-b-none">\
                    <ul class="b-t-none b-b-none">\
                        <flowform-vacation-detail-item v-for="(item, index) in detailList" :item="item" :index="index"></flowform-vacation-detail-item>\
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
                var num = this.dataSource.leftDetails.length + 1;
                this.dataSource.leftDetails.push({
                    title: '明细' + num,
                    url: 'detailform.html?detail=' + num
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
    // 0 正常； 1全天未打卡； 2 上午未打卡； 3 下午未打卡
    Vue.component('punchwater-item', {
        props: ['item'],
        template: '\
            <tr v-bind:class="{ \'abnormal-list\': item.state }">\
                <td>{{item.data}}</td>\
                <td v-if="!item.state">正常</td>\
                <td v-else>全天未打卡</td>\
                <td v-if="item.state">\
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
                <img class="user-header" :src="headerImg"></img>\
                <div class="user-name text-center text-xxl m-t-xs">{{userData.name}}</div>\
                <div class="user-position text-center text-m">{{userData.section}} - {{userData.jobPosition}}</div>\
            </div>\
        ',
        computed: {
            headerImg: function() {
                var userData = this.userData;
                return userData.headerImg ? userData.headerImg : '../../resources/images/avatar.png';
            }
        }
    });

    // 设置 - 个人资料 - 整页
    Vue.component('user-info', {
        props: ['tableSource'],
        template: '\
            <div>\
                <div class="list-block no-margin">\
                    <ul>\
                        <li class="item-content item-link header-list bg-white p-l-none">\
                            <div id="uploader" class="item-inner padder-h">\
                                <div class="item-title">头像</div>\
                                <div id="headImg"><img class="item-after user-header" :src="headerImg"></div>\
                            </div>\
                        </li>\
                        <li class="item-content item-link bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">座机</div>\
                                <a href="./infoChange.html?name=telephone" class="item-after">{{tableSource.telephone}}</a>\
                            </div>\
                        </li>\
                        <li class="item-content item-link bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">手机</div>\
                                <a href="./infoChange.html?name=mobile"  class="item-after">{{tableSource.mobile}}</a>\
                            </div>\
                        </li>\
                        <li class="item-content item-link bg-white p-l-none">\
                            <div class="item-inner padder-h">\
                                <div class="item-title">邮箱</div>\
                                <a href="./infoChange.html?name=email" class="item-after">{{tableSource.email}}</a>\
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
        ',
        computed: {
            headerImg: function() {
                var tableSource = this.tableSource;
                return tableSource.headerImg ? tableSource.headerImg : '../../resources/images/avatar.png';
            }
        }
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

    //index - 首页
    Vue.component('portal-show', {
        props: ['dataSource'],
        template: '\
            <div>\
                <div class="app-list-panel m-t-sm" :class="{hidden: !dataLen.imgShowLen}">\
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
                <div class="app-list-panel m-t-sm" :class="{hidden: !dataLen.standbyLen}">\
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
                <div class="app-list-panel m-t-sm" :class="{hidden: !dataLen.noticeLen}">\
                    <a href="../info/noticePublish.html" class="app-subtitle list-block m-t-none m-b-none">\
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
                    </a>\
                    <div class="list-block sortable-opened m-t-none m-b-none">\
                        <ul class="b-t-none b-b-none">\
                            <li v-for="item in dataSource.notice"  class="item-content item-link p-l-xxs">\
                                <a :href="\'../info/detail.html?id=\' + item.id" class="item-inner p-r-xxs color-default">\
                                    <div class="item-title" :class="{dot: item.state == 0}">{{item.title}}</div>\
                                    <div class="item-after color-gray">{{item.date}}</div>\
                                </a>\
                            </li>\
                        </ul>\
                    </div>\
                </div>\
            </div>\
        ',
        computed: {
            dataLen: function() {
                var data = this.dataSource;
                return {
                    imgShowLen: data.imgShow ? data.imgShow.length : 0,
                    standbyLen: data.standby ? data.standby.length : 0,
                    noticeLen: data.notice ? data.notice.length : 0
                };
            }
        }
    });

    // 通讯录 - 列表页 - 整页
    Vue.component('contacts-list', {
        props: ['dataSource'],
        template: '\
            <div v-if="dataFlag" class="list-block contacts-block no-margin">\
                <contact-list v-for="(list, key) in dataSource" :list="list" :key-data="key"></contact-list>\
            </div>\
            <div v-else class="list-block contacts-block no-margin">\
                <div class="list-group">\
                    <ul class="no-border">\
                        <li class="contact-list" v-for="item in dataSource">\
                            <a :href="\'./detail.html?id=\' + item.id">\
                                <div class="list-name text-black">{{item.name}}</div>\
                                <div class="list-info">{{item.section}} {{item.department}} {{item.jobPosition}}</div>\
                            </a>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
        ',
        computed: {
            dataFlag: function() {
                var data = this.dataSource;
                return (data instanceof Array) ? 0 : 1;
            }
        }
    });

    // 通讯录 - 列表页 - 列表块
    Vue.component('contact-list', {
        props: ['keyData', 'list'],
        template: '\
            <div class="list-group">\
                <ul class="no-border">\
                    <li v-if="list.length > 0" class="color-default" :class="{\'common-list-group-title\': titleData.isCommon, \'list-group-title\': !titleData.isCommon}">{{ titleData.title }}</li>\
                    <li class="contact-list" v-for="item in list">\
                        <a :href="\'./detail.html?id=\' + item.id">\
                            <div class="list-name text-black">{{item.name}}</div>\
                            <div class="list-info">{{item.section}} {{item.department}} {{item.jobPosition}}</div>\
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

    // 通讯录 - 详情页 - 整页
    Vue.component('contact-detail', {
        props: ['userData'],
        template: '\
            <div>\
                <person-info :user-data="userData"></person-info>\
                <div class="contacts-Info flex-box flex-justify-space">\
                    <a :href="\'tel:\' + phone.mobile" class="contact-Info block external">\
                       <span class="iconfont icon-dianhua block full-width text-center"></span>\
                       <div class="full-width text-center">电话</div>\
                    </a>\
                    <a :href="\'sms:\' + phone.mobile" class="contact-Info block external">\
                       <span class="iconfont icon-duanxin block full-width text-center"></span>\
                       <div class="full-width text-center">短信</div>\
                    </a>\
                    <a :href="\'tel:\' + phone.telephone" class="contact-Info block external">\
                       <span class="iconfont icon-dianhua1 block full-width text-center"></span>\
                       <div class="full-width text-center">座机</div>\
                    </a>\
                    <a :href="\'mailto:\' + userData.email" class="contact-Info block external">\
                       <span class="iconfont icon-youjian block full-width text-center"></span>\
                       <div class="full-width text-center">邮件</div>\
                    </a>\
                </div>\
                <div class="list-block no-margin m-t-sm">\
                    <ul>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h flex-justify-start p-l-lg">\
                                <div class="item-title">岗位：</div>\
                                <div class="item-after p-l-sm">{{userData.jobPosition}}</div>\
                            </div>\
                        </li>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h flex-justify-start p-l-lg"">\
                                <div class="item-title">分部：</div>\
                                <div class="item-after p-l-sm">{{userData.section}}</div>\
                            </div>\
                        </li>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h flex-justify-start p-l-lg"">\
                                <div class="item-title">部门：</div>\
                                <div class="item-after p-l-sm">{{userData.department}}</div>\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
                <div class="list-block no-margin m-t-sm">\
                    <ul>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h flex-justify-start p-l-lg"">\
                                <div class="item-title">上级：</div>\
                                <div class="item-after p-l-sm">{{userData.leader}}</div>\
                            </div>\
                        </li>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h flex-justify-start p-l-lg"">\
                                <div class="item-title">状态：</div>\
                                <div class="item-after p-l-sm">{{userData.state}}</div>\
                            </div>\
                        </li>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h flex-justify-start p-l-lg"">\
                                <div class="item-title">办公：</div>\
                                <div class="item-after p-l-sm">{{userData.place}}</div>\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
                <div class="list-block no-margin m-t-sm">\
                    <ul>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h flex-justify-start p-l-lg"">\
                                <div class="item-title">座机：</div>\
                                <a :href="\'tel:\' + phone.telephone" class="item-after p-l-sm external">{{phone.telephone}}</a>\
                            </div>\
                        </li>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h flex-justify-start p-l-lg"">\
                                <div class="item-title">手机：</div>\
                                <a :href="\'tel:\' + phone.mobile" class="item-after p-l-sm external">{{phone.mobile}}</a>\
                            </div>\
                        </li>\
                        <li class="item-content bg-white p-l-none">\
                            <div class="item-inner padder-h flex-justify-start p-l-lg"">\
                                <div class="item-title">邮箱：</div>\
                                <a :href="\'mailto:\' + userData.email" class="item-after p-l-sm external">{{userData.email}}</a>\
                            </div>\
                        </li>\
                    </ul>\
                </div>    \
            </div>\
        ',
        computed: {
            phone: function() {
                var userData = this.userData;
                return {
                    telephone: userData.telephone == 'null' ? '' : userData.telephone,
                    mobile: userData.mobile == 'null' ? '' : userData.mobile
                }
            }
        }
    });

    
    // 资讯 - 列表页 - 单条
    Vue.component('info-common-list', {
        props: ['data'],
        template: '\
            <div class="app-list-panel">\
                <div v-if="!data.length" class="text-center no-data-tip">暂无相关数据</div>\
                <a v-else v-for="item in data" :item="item" class="card-link" :href="\'./detail.html?id=\' + item.id">\
                    <div class="card no-margin no-radius no-shadow">\
                        <div class="card-header">\
                            <span>{{item.time}}</span>\
                            <span>{{item.author}}</span>\
                        </div>\
                        <div class="card-content">\
                            <div class="card-content-inner">{{item.content}}</div>\
                        </div>\
                    </div>\
                </a>\
            </div>\
        '
    });

    // 资讯 - 详情页
    Vue.component('info-detail', {
        props: ['dataSource'],
        template: '\
            <div>\
                <h2 class="no-margin">{{dataSource.title}}</h2>\
                <div class="p-t-sm p-b b-b-1">\
                    <span class="color-gray">{{dataSource.author}}</span>\
                    <span class="m-l color-gray">{{dataSource.time}}</span>\
                </div>\
                <div class="padder-v" v-html="dataSource.content"></div>\
            </div>\
        '
    });

    // 会议 - 首页 - 区域
    Vue.component('area-select', {
        props: ['areaList'],
        template: '\
            <div class="swiper-wrapper bg-white">\
                <div v-for="area in areaList" class="swiper-slide text-center bg-white">{{area}}</div>\
            </div>\
        '
    });
    
    // 会议 - 首页 - 列表
    Vue.component('room-state', {
        props: ['rooms'],
        template: '\
            <div>\
                <div v-for="room in rooms" class="bg-white meeting-wrapper">\
                    <a :href="\'./roomSelect.html?id=\' + room.id + \'&date=\' + room.date" class="meeting-room-title color-default">\
                        {{room.name}}\
                        <i v-if="room.video" class="iconfont icon-shexiangtou color-limegreen"></i>\
                    </a>\
                    <div class="meeting-grid-wrapper flex-box flex-justify-space">\
                        <a v-for="singleState in room.state" href="#" class="meeting-grid" :class="{active: singleState}"></a>\
                    </div>\
                </div>\
            </div>\
        '
    });

    // 会议 - 选择时间 - 时间方格
    Vue.component('select-time', {
        props: ['roomData'],
        template: '\
            <table>\
                <caption>\
                    {{roomData.name}}\
                    <i v-if="roomData.video" class=" iconfont icon-shexiangtou color-limegreen"></i>\
                </caption>\
                <tbody>\
                    <tr>\
                        <td :class="{ \'active\' : stateList[0], \'open-popover\' : !stateList[0] }">08:00</td>\
                        <td :class="{ \'active\' : stateList[1], \'open-popover\' : !stateList[1] }">09:00</td>\
                        <td :class="{ \'active\' : stateList[2], \'open-popover\' : !stateList[2] }">10:00</td>\
                        <td :class="{ \'active\' : stateList[3], \'open-popover\' : !stateList[3] }">11:00</td>\
                    </tr>\
                    <tr>\
                        <td :class="{ \'active\' : stateList[4], \'open-popover\' : !stateList[4] }">12:00</td>\
                        <td :class="{ \'active\' : stateList[5], \'open-popover\' : !stateList[5] }">13:00</td>\
                        <td :class="{ \'active\' : stateList[6], \'open-popover\' : !stateList[6] }">14:00</td>\
                        <td :class="{ \'active\' : stateList[7], \'open-popover\' : !stateList[7] }">15:00</td>\
                    </tr>\
                    <tr>\
                        <td :class="{ \'active\' : stateList[8], \'open-popover\' : !stateList[8] }">16:00</td>\
                        <td :class="{ \'active\' : stateList[9], \'open-popover\' : !stateList[9] }">17:00</td>\
                        <td :class="{ \'active\' : stateList[10], \'open-popover\' : !stateList[10] }">18:00</td>\
                        <td :class="{ \'active\' : stateList[11], \'open-popover\' : !stateList[11] }">19:00</td>\
                    </tr>\
                </tbody>\
            </table>\
        ',
        computed: {
            stateList: function() {
                var roomData = this.roomData;
                var stateList = roomData.stateList;
                return stateList || [];
            }
        }
    });

    // 会议 - 选择时间 - 使用列表
    Vue.component('room-use-list', {
        props: ['detailList'],
        template: '\
            <div class="list-block no-margin">\
                <ul v-for="item in detailList" class="bg-transparent">\
                    <li class="item-content bg-white">\
                        <div class="item-inner no-border">\
                            <div class="item-title">\
                                <div class="text-ellipsis">{{item.time}}</div>\
                                <div class="text-ellipsis">{{item.topic}}</div>\
                            </div>\
                            <div v-if="item.convener" class="item-after">{{item.convener.name}}</div>\
                            <a href="#" class="conPhone iconfont icon-dianhua"></a>\
                        </div>\
                    </li>\
                </ul>\
            </div>\
        '
    });

    // 会议 - 选择时间 - popover
    Vue.component('meeting-popover', {
        props: ['popoverData'],
        template: '\
            <div class="popover" >\
                <div class="popover-angle"></div>\
                <div class="popover-inner padder-h padder-v">\
                    <h3 class="text-ellipsis text-center">{{popoverData.topic}}</h3>\
                    <div class="p-t-s padder-sm">\
                        <div v-if="popoverData.convener">召集人：{{popoverData.convener.name}}</div>\
                        <div>日期：{{popoverData.date}}</div>\
                        <div>时间：{{popoverData.time}}</div>\
                    </div>\
                </div>\
            </div>\
        '
    });
});