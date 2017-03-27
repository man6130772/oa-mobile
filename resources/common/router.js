define(function() {
    /* 绑定配置 */
    var config = {
        // 登陆
        login: ['pageInit'],
        index: ['pageInit'],
        // 流程
        flowIndex: ['pageInit', 'pageReinit'],
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
        personalInfo: ['pageInit', 'pageReinit'],
        pwdChange: ['pageInit'],
        userChange: ['pageInit'],
        infoChange: ['pageInit'],
        // 设置e
        // 通讯录s
        contactsIndex: ['pageInit', 'pageReinit'],
        contactsDetail: ['pageInit', 'pageReinit'],
        // 通讯录e
        // 资讯s
        infoIndex: ['pageInit', 'pageReinit'],
        infoPublish: ['pageInit'],
        news: ['pageInit'],
        noticePublish: ['pageInit'],
        infoDetail: ['pageInit'],
        // 资讯e
        // 会议s
        meetingIndex: ['pageInit'],
        roomSelect: ['pageInit'],
        roomBook: ['pageInit'],
        myMeeting: ['pageInit'],
        // 会议e
    };

    return config;
});