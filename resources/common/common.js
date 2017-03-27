var DEBUG = 1; // 0是测试数据，1是真实数据
var rootUrl = isDev ? 'http://172.17.194.42:8088' : 'http://172.20.37.29:8081';
// var rootUrl = '/_server';  //webpack代理跨域

// ajax路径配置，这里配置了所有的ajax数据路径
var ajaxUrl = {
    // 登陆
    loginCheck: ['../../resources/json/login.json', rootUrl + '/BelleOA_Moblie_0.1/VerifyLogin.do'][DEBUG],
    // 首页
    portal: ['../../resources/json/logined.json', rootUrl + '/BelleOA_Moblie_0.1/First.do'][DEBUG],
    // 设置 - 个人信息 通讯 - 详情页
    personInfo: ['../../resources/json/personalInfo.json', rootUrl + '/BelleOA_Moblie_0.1/Persondata.do'][DEBUG],
    // 设置 - 用户切换
    userChange: ['../../resources/json/userChange.json', rootUrl + '/BelleOA_Moblie_0.1/Changeuser.do'][DEBUG],
    // 设置 - 密码修改
    pwdChange: ['../../resources/json/pwdChange.json', rootUrl + '/BelleOA_Moblie_0.1/Updatepwd.do'][DEBUG],
    infoChange: ['../../resources/json/infoChange.json', rootUrl + '/BelleOA_Moblie_0.1/saveContactInfo.do'][DEBUG],
    imgUpload: ['../../resources/json/imgUpload.json', rootUrl + '/BelleOA_Moblie_0.1/uploadImage.do'][DEBUG],
    
    // 通讯录 - 列表
    contactsList: ['../../resources/json/contactsList.json', rootUrl + '/BelleOA_Moblie_0.1/Tongxunlu.do'][DEBUG],
    contactsListVersion: ['../../resources/json/contactsListVersion.json', rootUrl + '/BelleOA_Moblie_0.1/lastVersionTime.do'][DEBUG],

    // 资讯
    infoIndex: ['../../resources/json/infoIndex.json', rootUrl + '/BelleOA_Moblie_0.1/Zhixun.do'][DEBUG],
    infoList: ['../../resources/json/infoCommonList.json', rootUrl + '/BelleOA_Moblie_0.1/ZhixunList.do'][DEBUG],
    infoDetail: ['../../resources/json/infoDetail.json', rootUrl + '/BelleOA_Moblie_0.1/ZhiXunDetail.do'][DEBUG],

    // 考勤
    // 考勤 - 首页
    abnormalDate: ['../../resources/json/abnormalDate.json', rootUrl + '/BelleOA_Moblie_0.1/myKaoQin.do'][DEBUG],
    // 考勤 - 考勤汇总
    abnormalInfo: ['../../resources/json/abnormalInfo.json', rootUrl + '/BelleOA_Moblie_0.1/abnormalInfo.do'][DEBUG],
    // 考勤 - 考勤流水
    punchWater: ['../../resources/json/punchWater.json', '../../resources/json/punchWater.json'][DEBUG],

    // 流程
    flowIndex: ['../../resources/json/flowIndex.json', '../../resources/json/flowIndex.json'][DEBUG],
    myStandby: ['../../resources/json/myStandby.json', '../../resources/json/myStandby.json'][DEBUG],
    myStandbyStar: ['../../resources/json/myStandbyStar.json', '../../resources/json/myStandbyStar.json'][DEBUG],

    // 会议
    meetingIndexArea: ['../../resources/json/meetingIndexArea.json', '../../resources/json/meetingIndexArea.json'][DEBUG],
    roomState: ['../../resources/json/roomState.json', '../../resources/json/roomState.json'][DEBUG],
    roomSelect: ['../../resources/json/roomSelect.json', '../../resources/json/roomSelect.json'][DEBUG],
    
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

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
