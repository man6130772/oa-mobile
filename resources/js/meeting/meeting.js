define(['css!meetingCSS'], function () {
  function page() {
    this.init = function () {
      console.log(2);
    }
  }
  return new page();
});
