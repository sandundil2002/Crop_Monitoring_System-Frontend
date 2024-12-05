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

export function sendOtp(email) {
  return $.ajax({
    url: "http://localhost:8080/cms/api/v1/auth/send_otp",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(email),

    success: function (response) {
      return response;
    },

    error: function (error) {
      console.error("Otp send failed:", error);
    },
  });
}

export function verifyOtp(otpData) {
  return $.ajax({
    url: "http://localhost:8080/cms/api/v1/auth/validate_otp",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(otpData),

    success: function (response) {
      return response;
    },

    error: function (error) {
      console.error("Otp verification failed:", error);
    },
  });
}

export function updateUser(email, userData) {
  return $.ajax({
    url: "http://localhost:8080/cms/api/v1/user/" + email,
    method: "PATCH",
    contentType: "application/json",
    data: JSON.stringify(userData),
    headers: {
      Authorization: "Bearer " + token,
    },

    success: function () {
      swal("Confirmation!", "User Password Change Successfully!", "success");
    },

    error: function (xhr) {
      console.log(xhr);
      swal("Error!", "User Password change Failed", "error");
    },
  });
}

export function deleteUser(email) {
  return $.ajax({
    url: "http://localhost:8080/cms/api/v1/user/" + email,
    method: "DELETE",
    data: "data",
    dataType: "dataType",
    headers: {
      Authorization: "Bearer " + token,
    },

    success: function () {
      swal("Confirmation!", "User Delete Successfully!", "success");
    },

    error: function (xhr) {
      console.log(xhr);
      swal("Error!", "User Delete Failed", "error");
    },
  });
}
