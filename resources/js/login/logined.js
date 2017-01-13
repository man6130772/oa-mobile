define(['css!loginedCSS'], function () {
  function page() {
    this.init = function () {
      console.log(3);
    }
  }
  return new page();
});
