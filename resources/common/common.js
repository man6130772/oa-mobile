var DEBUG = 1; //0是测试数据，1是真实数据

//ajax路径配置，这里配置了所有的ajax数据路径
var ajaxUrl = {
    loginCheck: ['../../resources/json/login.json', 'http://172.17.194.42:8088/zwBelleOA_Moblie_0.1/VerifyLogin.do'][DEBUG],
    portal: ['../../resources/json/logined.json', 'http://172.17.194.42:8088/zwBelleOA_Moblie_0.1/First.do'][DEBUG],
    personInfo: ['../../resources/json/personInfo.json', 'http://172.17.194.42:8088/zwBelleOA_Moblie_0.1/Persondata.do'][DEBUG],
    userChange: ['../../resources/json/userChange.json', 'http://172.17.194.42:8088/zwBelleOA_Moblie_0.1/Changeuser.do'][DEBUG],
    pwdChange: ['../../resources/json/pwdChange.json', 'http://172.17.194.42:8088/zwBelleOA_Moblie_0.1/Updatepwd.do'][DEBUG],
}

function checkLogined() {
    var loginState = 0;
    if (typeof localStorage.getItem('loginState')) {
        loginState = +localStorage.getItem('loginState');
    }

    if (window.location.href.indexOf('login.') > 0) {
        if (loginState) window.location.href = '../login/logined.html';
    } else {
        if (!loginState) window.location.href = '../login/login.html';
    }
}

function loginOut() {
    localStorage.removeItem('loginState');
    // localStorage.removeItem('username');
    // localStorage.removeItem('id');
    // localStorage.removeItem('subId');
    checkLogined();
}

function ajaxData(type, url, callback, params) {
    params = params || {};
    $.ajax({
        type: type,
        url: url,
        xhrFields: {
            withCredentials: true
        },
        data: params,
        dataType: 'json',
        success: callback
    });
}

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};