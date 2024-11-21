const token = localStorage.getItem("authToken");
const baseUrl = "http://localhost:8080/cms/api/v1/vehicle";

export function getAllVehicles() {
  return $.ajax({
    url: baseUrl,
    method: "GET",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + token,
    },

    error: function (error) {
      console.log("Error: " + error);
    },
  });
}

export function saveVehicle(vehicle) {
  return $.ajax({
    url: baseUrl,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(vehicle),
    headers: {
      Authorization: `Bearer ` + token,
    },

    success: function () {
      swal("Confirmation!", "Vehicle Saved Successfully!", "success");
    },

    error: function (error) {
      console.log("Error" + error);
      swal("Error!", "Vehicle Saved Failed", "error");
    },
  });
}

export function updateVehicle(vehicleId, vehicleData) {
  return $.ajax({
    url: baseUrl + "/" + vehicleId,
    method: "PATCH",
    contentType: "application/json",
    data: JSON.stringify(vehicleData),
    headers: {
      Authorization: `Bearer ` + token,
    },

    success: function () {
      swal("Confirmation!", "Vehicle Update Successfully!", "success");
    },

    error: function (error) {
      console.log(error);
    },
  });
}

export async function searchVehicle(vehicleId) {
  return $.ajax({
    url: baseUrl + "/" + vehicleId,
    method: "GET",
    dataType: "json",

    error: function (error) {
      swal("Warning!", "Vehicle not found!", "info");
    },
  });
}

export function deleteVehicle(vehicleId) {
  return $.ajax({
    url: baseUrl + "/" + vehicleId,
    method: "DELETE",
    data: "data",
    dataType: "dataType",

    success: function (response) {
      swal("Confirmation!", "Vehicle Delete Successfully!", "success");
    },
  });
}

export function validateVehicle(vehicle) {
  const numberPlatePattern = /^[A-Za-z]{2,3} \d{4}$/;

  if (!numberPlatePattern.test(vehicle.numberPlate)) {
    swal({
      title: "Warning!",
      text: "Invalid Vehicle Number Plate!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }
  return true;
}
