define(['vue','css!commoncss', 'css!checkingDetailCSS', 'common', 'vue.template'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            that.initDate();

            var punchWater = that.render('punchWater');
            that.ajaxData('../../resources/json/punchWater.json', punchWater, { 'time': that.showYear + '-' + that.showMonth });
        };

        this.initDate = function() {
            that.showYear = getQueryString('year') || new Date().getFullYear();
            that.showMonth = getQueryString('month') || (new Date().getMonth() + 1);
            // console.log(that)
            
            $('#waterDate').html(that.showYear + '年' + that.showMonth + '月');
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