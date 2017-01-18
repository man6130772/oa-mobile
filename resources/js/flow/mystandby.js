define(['vue', 'css!iconfont', 'css!commoncss', 'css!mystandbyCSS'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            that.handleClick();

            Vue.component('message', {
                props: ['details'],
                template: '\
                    <div class="card no-radius no-shadow">\
                        <div class="card-header">\
                            <span>{{details.time}}</span>\
                            <span :class="[details.favor ? \'icon-xingxingshixin\' : \'icon-xingxingkongxin\']" class="iconfont p-l-xxs p-r-xxs"></span>\
                        </div>\
                        <div class="card-content">\
                            <div class="card-content-inner">{{details.content}}</div>\
                        </div>\
                    </div>\
                '
            });

            var all = new Vue({
                el: '#all',
                data: {
                    msgList: [{
                        favor: false,
                        time: '2016-10-16 15:00',
                        content: '合并升级包部署流程-胡丹婷-2016-11-15（所属地区百丽集团总部 集团信息中心 云贵大区 东北大区 华中大区 西北大区 体育总部 广州地区）'
                    }]
                }
            });
        };

        this.handleClick = function() {
            $('.app-btn-back').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});