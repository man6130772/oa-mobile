/**
 * Email chen.cheng@wonhigh.cn
 * Date 2017/01/09
 */

require.config({
    baseUrl: basePath,
    paths: {
        // 基础依赖
        'require-css': staticUrl + lg7Version + 'js/libs/css' + min,
        'jquery': staticUrl + lg7Version + 'js/libs/jquery' + min,
        'ui': staticUrl + lg7Version + 'js/ui' + min,
        'uicss': staticUrl + lg7Version + 'css/ui' + min,
        'swiper': staticUrl + lg7Version + 'js/ui.swiper' + min,
        'swipeout': staticUrl + lg7Version + 'js/ui.swipeout' + min,
        'iconfont': './fonts/iconfont' + min,
        'router': './common/router' + min,
        'vue': './common/vue' + min,
        'vue.template': './common/vue.template' + min,
        'common': './common/common' + min,
        'commoncss': './common/common' + min,
        'webuploader': './common/webuploader.html5only' + min,
        'webuploadercss': './common/webuploader' + min,


        /**** 注册js ****/
        // 登陆
        'login': './js/home/login' + min,
        'index': './js/home/index' + min,
        // 流程
        'flowIndex': './js/flow/index' + min,
        'mystandby': './js/flow/mystandby' + min,
        'leftdetails': './js/flow/leftdetails' + min,
        'detailitem': './js/flow/detailitem' + min,
        'inprogress': './js/flow/inprogress' + min,
        'myapplication': './js/flow/myapplication' + min,
        'archived': './js/flow/archived' + min,
        'createflow': './js/flow/createflow' + min,
        'applyvacation': './js/flow/applyvacation' + min,
        'detailform': './js/flow/detailform' + min,

        // 考勤s
        'checkingIndex': './js/checking/index' + min,
        'checkingDetail': './js/checking/detail' + min,
        'checkingAbnormal': './js/checking/abnormal' + min,
        // 考勤e
        // 设置s
        'settingIndex': './js/setting/index' + min,
        'msgSetting': './js/setting/msgSetting' + min,
        'personalInfo': './js/setting/personalInfo' + min,
        'pwdChange': './js/setting/pwdChange' + min,
        'userChange': './js/setting/userChange' + min,
        'infoChange': './js/setting/infoChange' + min,
        // 设置e
        // 通讯录s
        'contactsIndex': './js/contacts/index' + min,
        'contactsDetail': './js/contacts/detail' + min,
        'pinyin': './js/contacts/pinyin-first' + min,
        // 通讯录e
        // 资讯s
        'infoIndex': './js/info/index' + min,
        'infoPublish': './js/info/infoPublish' + min,
        'news': './js/info/news' + min,
        'noticePublish': './js/info/noticePublish' + min,
        'infoDetail': './js/info/detail' + min,
        // 资讯e
        // 会议s
        'meetingIndex': './js/meeting/index' + min,
        'roomSelect': './js/meeting/roomSelect' + min,
        'roomBook': './js/meeting/roomBook' + min,
        'myMeeting': './js/meeting/myMeeting' + min,
        // 会议e

        /**** 注册css ****/
        // 登陆
        'loginCSS': './css/home/login' + min,
        'indexCSS': './css/home/index' + min,
        // 流程
        'flowIndexCSS': './css/flow/index' + min,
        'mystandbyCSS': './css/flow/mystandby' + min,
        'leftdetailsCSS': './css/flow/leftdetails' + min,
        'inprogressCSS': './css/flow/inprogress' + min,
        'createflowCSS': './css/flow/createflow' + min,
        'applyvacationCSS': './css/flow/applyvacation' + min,
        'detailformCSS': './css/flow/detailform' + min,

        // 考勤s
        'checkingIndexCSS': './css/checking/index' + min,
        'checkingDetailCSS': './css/checking/detail' + min,
        'checkingAbnormalCSS': './css/checking/abnormal' + min,
        // 考勤e
        // 设置s
        'settingIndexCSS': './css/setting/index' + min,
        'msgSettingCSS': './css/setting/msgSetting' + min,
        'personalInfoCSS': './css/setting/personalInfo' + min,
        'pwdChangeCSS': './css/setting/pwdChange' + min,
        'userChangeCSS': './css/setting/userChange' + min,
        'infoChangeCSS': './css/setting/infoChange' + min,
        // 设置e
        // 通讯录s
        'contactsIndexCSS': './css/contacts/index' + min,
        'contactsDetailCSS': './css/contacts/detail' + min,
        // 通讯录e
        // 资讯s
        // 'infoIndexCSS': './cssinfo/index' + min,
        'infoCommonListCSS': './css/info/infoCommonList' + min,
        'infoDetailCSS': './css/info/detail' + min,
        // 资讯e
        // 会议s
        'meetingIndexCSS': './css/meeting/index' + min,
        'roomSelectCSS': './css/meeting/roomSelect' + min,
        'roomBookCSS': './css/meeting/roomBook' + min,
        'myMeetingCSS': './css/meeting/myMeeting' + min,
        // 会议e
    },
    shim: {
        'ui': {
            deps: ['css!uicss', 'jquery'],
            exports: 'ui'
        }
    },
    map: {
        '*': {
            'css': 'require-css'
        }
    }
});

require([
    'jquery'
], function($) {
    $.config = {
        autoInit: false
    };
    require(['ui'], function() {
        $(document).off('pageInit').on('pageInit', function(e, pageId, $page) {
            $(document.body).show();
            checkLogined();
            // setHeaderHeight();
        });
        require(['router'], function(config) {
            /* 默认绑定 */
            function handleDocument(name, evt, evtConf) {
                var pageId = '#' + name;
                $(document).off(evt, pageId).on(evt, pageId, function(e, pageId, $page) {
                    require([name], function($page) {
                        if (evtConf && evtConf.beforeInit) evtConf.beforeInit();
                        $page.init(e, pageId, $page);
                        if (evtConf && evtConf.afterInit) evtConf.afterInit();
                    });
                });
            }

            for (var key in config) {
                if ($.isArray(config[key])) {
                    $.each(config[key], function(i, evt) {
                        handleDocument(key, evt);
                    });
                }
                if ($.isPlainObject(config[key])) {
                    for (var evt in config[key]) {
                        handleDocument(key, evt, config[key][evt]);
                    }
                }
            }

            $.init();
        });
    });
});