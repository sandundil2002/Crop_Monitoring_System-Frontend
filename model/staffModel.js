const token = localStorage.getItem("authToken");
const baseUrl = "http://localhost:8080/cms/api/v1/staff";

export function getAllStaff() {
  return $.ajax({
    url: baseUrl,
    method: "GET",
    dataType: "json",
    headers: {
      Authorization: `Bearer ` + token,
    },

    error: function (error) {
      console.log("Error: " + error);
    },
  });
}

export function getAllVehicles() {
  return $.ajax({
    url: "http://localhost:8080/cms/api/v1/vehicle",
    method: "GET",
    dataType: "json",
    headers: {
      Authorization: `Bearer ` + token,
    },

    error: function (error) {
      console.log("Error: " + error);
    },
  });
}