$(document).ready(function () {
  $(".dash-btn a").on("click", function (event) {
    event.preventDefault();
    const page = $(this).attr("href"); 
    $("#mainContentFrame").attr("src", page); 
  });
});

$(".btn-signout").click(function () {
  swal({
    title: "Are you sure?",
    text: "Do you want to signout this system!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willOut) => {
    if (willOut) {
      window.location.href = "../index.html";
    }
  });
});
