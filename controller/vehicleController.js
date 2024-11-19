import {
  getAllVehicles,
  validateVehicle,
  saveVehicle,
  updateVehicle,
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

  $("#btnEdit").click(function () {
    const vehicleId = $("#editVehicleId").val();
    const category = $("#editCategory").val();
    const numberPlate = $("#editLicensePlate").val();
    const fuelType = $("#editFuelType").val();
    const status = $("#editStatus").val();
    const remarks = $("#editRemarks").val();

    const vehicleData = {
      category: category,
      numberPlate: numberPlate,
      fuelType: fuelType,
      status: status,
      remarks: remarks,
    };

    console.log(vehicleData);
    

    swal({
      title: "Are you sure?",
      text: "Do you want to update this vehicle!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willUpdate) => {
      if (willUpdate) {
        if (validateVehicle(vehicleData)) {
          const promise = updateVehicle(vehicleId, vehicleData);
          promise.then(() => {
            loadVehicleTable();
          });
        }
      }
    });
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

$(document).on("click", ".btn-edit-vehicle", function () {
  const row = $(this).closest("tr");
  const vehicleId = row.find("td:eq(0)").text();
  const category = row.find("td:eq(1)").text();
  const numberPlate = row.find("td:eq(2)").text();
  const fuelType = row.find("td:eq(3)").text();
  const status = row.find("td:eq(4)").text();
  const remarks = row.find("td:eq(5)").text();

  $("#editVehicleId").val(vehicleId);
  $("#editCategory").val(category);
  $("#editLicensePlate").val(numberPlate);
  $("#editFuelType").val(fuelType);
  $("#editStatus").val(status);
  $("#editRemarks").val(remarks);
});
