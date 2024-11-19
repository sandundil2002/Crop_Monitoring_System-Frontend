import {
  getAllVehicles,
  validateVehicle,
  saveVehicle,
} from "../model/vehicleModel.js";

$(document).ready(function () {
  $("#btnSave").click(() => {
    const category = $("#category").val();
    const numberPlate = $("#licensePlate").val();
    const fuelType = $("#fuelType").val();
    const status = $("#status").val();
    const remarks = $("#remarks").val();

    const vehicleData = {
      category: category,
      numberPlate: numberPlate,
      fuelType: fuelType,
      status: status,
      remarks: remarks,
    };

    if (validateVehicle(vehicleData)) {
      const promise = saveVehicle(vehicleData);
      promise.then(() => {
        loadVehicleTable();
      });
    }
  });

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

  loadVehicleTable();
});

async function loadVehicleTable() {
  const vehicleList = await getAllVehicles();
  $("#vehicleTable").empty();
  vehicleList.forEach((vehicle) => {
    $(".table").append(
      "<tr> " +
        "<td>" +
        vehicle.vehicleId +
        "</td>" +
        "<td>" +
        vehicle.category +
        "</td>" +
        "<td class ='text-uppercase'>" +
        vehicle.numberPlate +
        "</td>" +
        "<td>" +
        vehicle.fuelType +
        "</td>" +
        "<td>" +
        vehicle.status +
        "</td>" +
        "<td>" +
        vehicle.remarks +
        "</td>" +
        "<td>" +
        "<button class='btn btn-outline-primary btn-sm mb-1 btn-edit-vehicle mx-1' data-staff-id='" +
        vehicle.vehicleId +
        "' data-bs-toggle='modal' data-bs-target='#editVehicleModal'>" +
        "<i class='bi bi-pencil'></i>" +
        "</button>" +
        "<button class='btn btn-outline-danger btn-sm mb-1 btn-delete-vehicle' data-staff-id='" +
        vehicle.vehicleId +
        "'>" +
        "<i class='bi bi-trash'></i>" +
        "</button>" +
        "</td>" +
        "</tr>"
    );
  });
}
