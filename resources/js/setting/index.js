define(['vue', 'css!iconfont', 'css!commoncss', 'css!settingIndexCSS', 'common', 'vue.template'], function(Vue) {
    function page() {
        var that = this;
        var personInfo;

        this.init = function() {
            checkLogined();
            if(!personInfo) personInfo = that.render('personInfo');
            that.ajaxData(ajaxUrl.personInfo, personInfo);

            that.clearCacheClick();
            that.signout();
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
                console.log(data)
            });
        };

        this.clearCacheClick = function() {
            $('#clear-cache').on('click', function() {
                $(this).addClass('clearing');

                //清处缓存动作 回调里去去掉正在清理样式
            });
        };

        this.signout = function() {
            $('#indexSignout').on('click', function() {
                loginOut();
            });
        }
    }
    return new page();
});