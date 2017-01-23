define(['vue', 'css!iconfont', 'css!commoncss', 'css!inprogressCSS'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            that.createComponent();

            var archivedMsgs = that.render('archivedMsgs');
            that.ajaxData('../../resources/json/archivedMsgs.json', archivedMsgs);
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

        this.createComponent = function() {
            Vue.component('archivedmessage', {
                props: ['item'],
                template: '\
                    <a class="card-link" :href="item.url">\
                        <div class="card no-margin no-radius no-shadow">\
                            <div class="card-header">\
                                <span>{{item.time}}</span>\
                            </div>\
                            <div class="card-content">\
                                <div class="card-content-inner">{{item.content}}</div>\
                            </div>\
                        </div>\
                    </a>\
                '
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