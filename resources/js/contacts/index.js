define(['vue', 'css!iconfont', 'css!commoncss', 'css!contactsIndexCSS', 'common', 'vue.template'], function(Vue) {
    function page() {
        var that = this;

        this.init = function() {
            // alert(CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky"))
            
            var contactsList = that.render('contactsList');
            that.ajaxData('../../resources/json/contactsList.json', contactsList);
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
                
                vm.$nextTick(function(){   //for渲染完成的回调
                    $(".contacts-block").indexList();
                })
            });
        };
    }
    return new page();
});