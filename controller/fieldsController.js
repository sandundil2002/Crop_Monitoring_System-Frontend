$(document).ready(function () {
  $(".dropdown-item").click(function () {
    var selectedValue = $(this).data("value");
    $("#dropdownMenuButton").text(selectedValue);
  });

  $("#btn-edit-field").on("click", function () {
    const row = $(this).closest("tr");
    const fieldId = row.find("td:eq(0)").text();
    const fieldName = row.find("td:eq(1)").text();
    const fieldLocation = row.find("td:eq(2)").text();
    const cropType = row.find("td:eq(3)").text();
    const fieldSize = row.find("td:eq(4)").text();
    const fieldStaff = row.find("td:eq(5)").text();
    const fieldImg1 = row.find("td:eq(6)").text();
    const fieldImg2 = row.find("td:eq(7)").text();

    $("#editFieldId").val(fieldId);
    $("#editFieldName").val(fieldName);
    $("#editFieldLocation").val(fieldLocation);
    $("#editCropType").val(cropType);
    $("#editFieldSize").val(fieldSize);
    $("#editStaff").val(fieldStaff);
    $("#editFieldImg1").val(fieldImg1);
    $("#editFieldImg2").val(fieldImg2);

    $("#editFieldModal").modal("show");
  });

  $("#editFieldForm").on("submit", function (event) {
    event.preventDefault();
    $("#editFieldModal").modal("hide");
  });
});
