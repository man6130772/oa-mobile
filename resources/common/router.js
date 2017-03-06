define(function() {
    /* 绑定配置 */
    var config = {
        // 登陆
        login: ['pageInit'],
        logined: ['pageInit'],
        // 流程
        flowIndex: ['pageInit'],
        mystandby: ['pageInit'],
        leftdetails: ['pageInit'],
        detailitem: ['pageInit'],
        inprogress: ['pageInit'],
        myapplication: ['pageInit'],
        archived: ['pageInit'],
        createflow: ['pageInit'],
        applyvacation: ['pageInit', 'pageReinit'],
        detailform: ['pageInit'],
        // 考勤s
        checkingIndex: ['pageInit'],
        checkingDetail: ['pageInit'],
        checkingAbnormal: ['pageInit'],
        // 考勤e
        // 设置s
        settingIndex: ['pageInit', 'pageReinit'],
        msgSetting: ['pageInit'],
        personalInfo: ['pageInit'],
        pwdChange: ['pageInit'],
        userChange: ['pageInit'],
        // 设置e
        // 通讯录s
        contactsIndex: ['pageInit'],
        contactsDetail: ['pageInit'],
        // 通讯录e
    };

    return config;
});