$("#btn-signout").click(function (e) {
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