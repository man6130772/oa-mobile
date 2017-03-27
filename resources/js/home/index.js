define(['vue', 'css!iconfont', 'css!commoncss', 'css!indexCSS', 'common', 'swiper', 'vue.template'], function(Vue) {
    function page() {
        var that = this;
        this.init = function() {
            // eruda.init();
            // $.showIndicator();
            var portalShow = that.render('portalShow');
            that.ajaxData(ajaxUrl.portal, portalShow);
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
                // $.hideIndicator();
                vm.$nextTick(function(){   //for渲染完成的回调
                    that.initSwiper();
                });
            })
        };

        this.initSwiper = function() {
            $(".swiper-container").swiper({
                spaceBetween: 0,
                pagination: '.swiper-pagination',
                autoplay: 2000
            });
        }
    }
    return new page();
});