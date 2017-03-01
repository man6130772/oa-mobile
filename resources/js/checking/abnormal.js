define(['vue','css!iconfont', 'css!commoncss', 'css!checkingAbnormalCSS', 'vue.template'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            this.initDate();

            var abnormalInfo = that.render('abnormalInfo');
            that.ajaxData('../../resources/json/abnormalInfo.json', abnormalInfo);
        };

        this.initDate = function() {
            that.showYear = this.getQueryString('year') || new Date().getFullYear();
            that.showMonth = this.getQueryString('month') || (new Date().getMonth() + 1);
            // console.log(that)
            
            $('#abnormalDate').html(that.showYear + '年' + that.showMonth + '月');
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
            $.getJSON(url, function(data) {
                vm.data = data;
            });
        };

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };

        this.getQueryString = function(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        };
    }
    return new page();
});