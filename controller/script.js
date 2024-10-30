$(document).ready(function () {
  $("#signup-form").hide();

  $("#login-form a").click(function (e) {
    e.preventDefault();
    $("#login-form").fadeOut(300, function () {
      $("#signup-form").fadeIn(300);
    });
  });

  $("#signup-form a").click(function (e) {
    e.preventDefault();
    $("#signup-form").fadeOut(300, function () {
      $("#login-form").fadeIn(300);
    });
  });
});
