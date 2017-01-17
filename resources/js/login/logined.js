define(['css!iconfont', 'css!commoncss', 'css!loginedCSS', 'swiper'], function() {
    function page() {
        this.init = function() {
            $(".swiper-container").swiper({
                spaceBetween: 0,
                pagination: '.swiper-pagination',
                autoplay: 2000
            });
        };
    }
    return new page();
});