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
    'iconfont': './fonts/iconfont' + min,
    'router': './common/router' + min,
    'vue': './common/vue' + min,


    // 注册js
    'login': './js/login/login' + min,
    'logined': './js/login/logined' + min,
    'meeting': './js/meeting/meeting' + min,

    // 注册css
    'loginCSS': './css/login/login' + min,
    'loginedCSS': './css/login/logined' + min,
    'meetingCSS': './css/meeting/meeting' + min,
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
], function ($) {
  $.config = {
    autoInit: false
  }
  require(['ui'], function () {
    $(document).off('pageInit').on('pageInit', function (e, pageId, $page) {
      $(document.body).show();
    });
    require(['router'], function () {
      $.init();
    })
  });
});
