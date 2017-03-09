var DEBUG = 1; // 0是测试数据，1是真实数据

// ajax路径配置，这里配置了所有的ajax数据路径
var ajaxUrl = {
    // 登陆
    loginCheck: ['../../resources/json/login.json', 'http://172.17.194.42:8088/zwBelleOA_Moblie_0.1/VerifyLogin.do'][DEBUG],
    // 首页
    portal: ['../../resources/json/logined.json', 'http://172.17.194.42:8088/zwBelleOA_Moblie_0.1/First.do'][DEBUG],
    // 设置 - 个人信息 通讯 - 详情页
    personInfo: ['../../resources/json/personalInfo.json', 'http://172.17.194.42:8088/zwBelleOA_Moblie_0.1/Persondata.do'][DEBUG],
    // 设置 - 用户切换
    userChange: ['../../resources/json/userChange.json', 'http://172.17.194.42:8088/zwBelleOA_Moblie_0.1/Changeuser.do'][DEBUG],
    // 设置 - 密码修改
    pwdChange: ['../../resources/json/pwdChange.json', 'http://172.17.194.42:8088/zwBelleOA_Moblie_0.1/Updatepwd.do'][DEBUG],
    
    contactsList: ['../../resources/json/contactsList.json', 'http://172.17.194.42:8088/zwBelleOA_Moblie_0.1/Tongxunlu.do'][DEBUG],

    // 资讯
    infoIndex: ['../../resources/json/infoIndex.json', '../../resources/json/infoIndex.json'][DEBUG],
    infoList: ['../../resources/json/infoCommonList.json', '../../resources/json/infoCommonList.json'][DEBUG],
    infoDetail: ['../../resources/json/infoDetail.json', '../../resources/json/infoDetail.json'][DEBUG],

    // 流程
    flowIndex: ['../../resources/json/flowIndex.json', '../../resources/json/flowIndex.json'][DEBUG],
    myStandby: ['../../resources/json/msgListTest.json', '../../resources/json/msgListTest.json'][DEBUG],
    myStandbyStar: ['../../resources/json/myStandbyStar.json', '../../resources/json/myStandbyStar.json'][DEBUG],
    
}

function loginOut() {
    localStorage.removeItem('loginState');
    checkLogined();
}

// 跨域获取数据
function ajaxData(type, url, callback, params) {
    params = params || {};
    $.ajax({
        type: type,
        url: url,
        xhrFields: {
            withCredentials: true
        },   // 这个是跨域cors，上传cookie的参数
        data: params,
        dataType: 'json',
        success: callback
    });
}

// 截取url
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
