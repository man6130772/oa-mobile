define(['vue', 'css!iconfont', 'css!commoncss', 'css!leftdetailsCSS', 'css!applyvacationCSS', 'vue.template'], function(Vue) {
    function page() {
        var that = this;

        this.init = function(pageId) {
            // 绑定header的回退事件
            that.handleBackClick();

            var flowForm = that.render('flowForm');
            that.ajaxData('../../resources/json/flowForm.json', flowForm);

            that.handleSubmit(pageId);

            var flowState = that.render('flowState');
            that.ajaxData('../../resources/json/flowState.json', flowState);
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

        this.handleSubmit = function(pageId) {
            $('#' + pageId + ' .app-submit').off('click').on('click', function() {
                var uploader = $('#' + pageId + ' .imguploader').data('uploader');
                if (uploader) uploader.upload();
            });
        };
    }
    return new page();
});