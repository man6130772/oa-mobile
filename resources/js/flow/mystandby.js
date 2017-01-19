define(['vue', 'css!iconfont', 'css!commoncss', 'css!mystandbyCSS'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();

            this.createComponent();

            var all = this.renderTab('all');
            this.reqMsgListData('../../resources/json/msgListTest.json', all);

            var nosee = this.renderTab('nosee');
            this.reqMsgListData('../../resources/json/msgListTest1.json', nosee);
        };

        this.reqMsgListData = function(url, vm) {
            $.getJSON(url, function(data) {
                vm.msgList = data;
            });
        };

        this.renderTab = function(tabName) {
            return new Vue({
                el: '#' + tabName,
                data: {
                    msgList: []
                }
            });
        };

        this.createComponent = function() {
            Vue.component('message', {
                props: ['details'],
                template: '\
                    <a class="card-link" :href="details.url">\
                        <div class="card no-margin no-radius no-shadow">\
                            <div class="card-header">\
                                <span>{{details.time}}</span>\
                                <span @click.stop.prevent="handleFavor" :class="[details.favor ? \'icon-xingxingshixin color-gold\' : \'icon-xingxingkongxin\']" class="iconfont p-l-xxs p-r-xxs"></span>\
                            </div>\
                            <div class="card-content">\
                                <div class="card-content-inner">{{details.content}}</div>\
                            </div>\
                        </div>\
                    </a>\
                ',
                methods: {
                    handleFavor: function(event) {
                        if (this.details) this.details.favor = !this.details.favor;
                    }
                }
            });
        };

        this.handleBackClick = function() {
            $('.app-btn-back').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});