/**
 * Email chen.cheng@wonhigh.cn
 * Date 2017/01/09
 */

function __CreateJSPath(js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    return path;
}

/**
 *  环境变量
 ********* start *********
*/
var v = '0.1.0',                                                                             // 版本信息                                                              // lg7版本
    basePath = __CreateJSPath("boot.js"),                                                    // oa-mobile资源目录
    isDev = true,                                                                           // true开发环境、false生产环境
    staticUrl = isDev ? 'http://' + location.host + '/' : 'http://devstatic.qxclub.cn/',     // 公共静态资源路径
    min = isDev ? '' : '.min',
    lg7Version = isDev ? 'lg7-1.0.1/dist/' : 'lg7/1.0.1/';
/**
 ********* end *********
*/

document.addEventListener("DOMContentLoaded", function () {
    var script = document.createElement('script'),
        appSrc = '../../resources/common/app.js',
        reqSrc = staticUrl + lg7Version + 'js/libs/require' + min + '.js';
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('data-main', appSrc);
    script.setAttribute('src', reqSrc);
    document.getElementsByTagName('head')[0].appendChild(script);
}, false);
