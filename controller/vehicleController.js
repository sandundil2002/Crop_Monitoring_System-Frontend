$(document).ready(function () {
  $("#btn-edit-vehicle").on("click", function () {
    const row = $(this).closest("tr");
    const vehicleId = row.find("td:eq(0)").text();
    const category = row.find("td:eq(1)").text();
    const driver = row.find("td:eq(2)").text();
    const assistant = row.find("td:eq(3)").text();
    const numberPlate = row.find("td:eq(4)").text();
    const fuel = row.find("td:eq(5)").text();
    const status = row.find("td:eq(6)").text();
    const remarks = row.find("td:eq(7)").text();

    $("#editVehicleId").val(vehicleId);
    $("#editLicensePlate").val(numberPlate);
    $("#editCategory").val(category);
    $("#editFuelType").val(fuel);
    $("#editStatus").val(status);
    $("#editDriver").val(driver);
    $("#editAssistant").val(assistant);
    $("#editRemarks").val(remarks);

    $("#editVehicleModal").modal("show");
  });

  $("#editVehicleForm").on("submit", function (event) {
    event.preventDefault();
    $("#editVehicleModal").modal("hide");
  });
});
