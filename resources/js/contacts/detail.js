define(['vue', 'css!iconfont', 'css!commoncss', 'css!contactsDetailCSS', 'common', 'vue.template'], function(Vue) {
    function page() {
        var that = this,
            id = getQueryString('id'),
            contactDetail,
            eventType;

        this.init = function(e) {
            this.handleBackClick();
            id = getQueryString('id')
            // 判断初始化事件type
            eventType = e.type;
            contactDetail = (eventType == 'pageReinit' ? contactDetail : that.render('contactDetail'));
            that.ajaxData(ajaxUrl.personInfo, contactDetail, { id: id });
        };

        this.render = function(id, data) {
            return new Vue({
                el: '#' + id,
                data: {
                    data: data || {}
                }
            });
        };

        this.ajaxData = function(url, vm, params) {
            ajaxData('GET', url, function(data) {
                vm.data = data;
                // console.log(data)
            }, params);
        };

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});