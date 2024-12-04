const token = localStorage.getItem("authToken");

export function getAllFields() {
  return $.ajax({
    url: "http://localhost:8080/cms/api/v1/field",
    method: "GET",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + token,
    },

    error: function (error) {
      console.log(error);
    },
  });
}

export function getAllCrops() {
  return $.ajax({
    url: "http://localhost:8080/cms/api/v1/crop",
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

export function getAllStaff() {
  return $.ajax({
    url: "http://localhost:8080/cms/api/v1/staff",
    method: "GET",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + token,
    },

    error: function (error) {
      console.log(error);
    },
  });
}