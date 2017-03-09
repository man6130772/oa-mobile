/**
 * Email chen.cheng@wonhigh.cn
 * Date 2017/01/09
 */

function __CreateJSPath(js) {
    var scripts = document.getElementsByTagName("script");
    var path = "",
        ss;
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") !== 0) {
        path = href + "/" + path;
    }
    return path;
}

/**
 *  环境变量
 ********* start *********
 */
var v = '0.1.0', // 版本信息
    basePath = __CreateJSPath("boot.js"), // oa-mobile资源目录
    protocol = basePath.indexOf("https:") == -1 ? 'http://' : 'https://', //网络协议
    isDev = true, // true开发环境、false生产环境
    staticUrl = isDev ? protocol + location.host + '/' : 'http://devstatic.qxclub.cn/', // 公共静态资源路径
    min = isDev ? '' : '.min', //是否使用压缩版
    lg7Version = isDev ? 'lg7/dist/' : 'lg7/1.0.1/'; // lg7版本
/**
 ********* end *********
 */

document.addEventListener("DOMContentLoaded", function() {
    var script = document.createElement('script'),
        appSrc = '../../resources/common/app.js',
        reqSrc = staticUrl + lg7Version + 'js/libs/require' + min + '.js';
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('data-main', appSrc);
    script.setAttribute('src', reqSrc);
    document.getElementsByTagName('head')[0].appendChild(script);
}, false);


// 登录检测
function checkLogined() {
    var loginState = 0;
    if (typeof localStorage.getItem('loginState')) {
        loginState = +localStorage.getItem('loginState');
    }

    if (window.location.href.indexOf('login.') > 0) {
        if (loginState) window.location.href = '../login/index.html';
    } else {
        if (!loginState) window.location.href = '../login/login.html';
    }
}

// 判断系统类型
function getTerminalSystem() {
    var u = navigator.userAgent;
    // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isIOS) return true; 
}

// 对ios系统加高状态栏
function setHeaderHeight() {
    var isIOS = getTerminalSystem();

    if(isIOS && $('header.bar')[0]) {
        $('html').css('background-color', '#0894ec');
        $('body').css('top', '1rem');
    }
}