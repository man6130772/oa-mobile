define(['vue', 'css!iconfont', 'css!commoncss', 'css!contactsDetailCSS', 'common', 'vue.template'], function(Vue) {
    function page() {
        var that = this;
        var id = getQueryString('id');

        this.init = function() {
            this.handleBackClick();

            // var contactsDetail = that.render('contactsDetail');
            // that.ajaxData('../../resources/json/contactsDetail.json', contactsDetail);
        };

        this.render = function(id, data) {
            return new Vue({
                el: '#' + id,
                data: {
                    data: data || {}
                }
            });
        };

        this.ajaxData = function(url, vm) {
            ajaxData('GET', url, function(data) {
                vm.data = data;
            });
        };

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});