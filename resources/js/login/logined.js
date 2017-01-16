define(['css!loginedCSS', 'swiper'], function() {
    function page() {
        this.init = function() {
            $(".swiper-container").swiper();
        }
    }
    return new page();
});