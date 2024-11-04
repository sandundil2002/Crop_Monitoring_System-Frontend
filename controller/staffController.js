$(document).ready(function () {
  $("#field").change(function () {
    $("#field option:selected").each(function () {
      const value = $(this).val();
      if (
        $("#selectedFieldsList li").filter(function () {
          return $(this).text() === value;
        }).length === 0
      ) {
        $("#selectedFieldsList").append("<li>" + value + "</li>");
      }
    });
  });
});
