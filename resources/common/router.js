define(function () {
  $(document).off('pageInit', '#login').on('pageInit', '#login', function (e, pageId, $page) {
    require(['login'], function ($page) {
      $page.init();
    });
  });
  $(document).off('pageInit', '#logined').on('pageInit', '#logined', function (e, pageId, $page) {
    require(['logined'], function ($page) {
      $page.init();
    });
  });
  $(document).off('pageInit', '#meeting').on('pageInit', '#meeting', function (e, pageId, $page) {
    require(['meeting'], function ($page) {
      $page.init();
    });
  });
});
