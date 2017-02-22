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
        'iconfont': './fonts/iconfont' + min,
        'router': './common/router' + min,
        'vue': './common/vue' + min,
        'vue.template': './common/vue.template' + min,
        'commoncss': './common/common' + min,
        'webuploader': './common/webuploader.html5only' + min,
        'webuploadercss': './common/webuploader' + min,


        // 注册js
        'login': './js/login/login' + min,
        'logined': './js/login/logined' + min,
        'flowIndex': './js/flow/index' + min,
        'mystandby': './js/flow/mystandby' + min,
        'leftdetails': './js/flow/leftdetails' + min,
        'detailitem': './js/flow/detailitem' + min,
        'inprogress': './js/flow/inprogress' + min,
        'myapplication': './js/flow/myapplication' + min,
        'archived': './js/flow/archived' + min,
        'createflow': './js/flow/createflow' + min,
        'applyvacation': './js/flow/applyvacation' + min,

        // 注册css
        'loginCSS': './css/login/login' + min,
        'loginedCSS': './css/login/logined' + min,
        'flowIndexCSS': './css/flow/index' + min,
        'mystandbyCSS': './css/flow/mystandby' + min,
        'leftdetailsCSS': './css/flow/leftdetails' + min,
        'inprogressCSS': './css/flow/inprogress' + min,
        'createflowCSS': './css/flow/createflow' + min,
        'applyvacationCSS': './css/flow/applyvacation' + min
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
        });
        require(['router'], function(config) {
            /* 默认绑定 */
            function handleDocument(name, evt, evtConf) {
                var pageId = '#' + name;
                $(document).off(evt, pageId).on(evt, pageId, function(e, pageId, $page) {
                    require([name], function($page) {
                        if (evtConf && evtConf.beforeInit) evtConf.beforeInit();
                        $page.init(pageId);
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