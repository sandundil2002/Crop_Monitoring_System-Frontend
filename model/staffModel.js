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

export function saveStaff(staff) {
  return $.ajax({
    url: baseUrl,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(staff),
    headers: {
      Authorization: `Bearer ` + token,
    },

    success: function () {
      swal("Confirmation!", "Staff Member Saved Successfully!", "success");
    },

    error: function (error) {
      console.log("Error" + error);
      swal("Error!", "Staff Saved Failed", "error");
    },
  });
}

export function validateUserData(user) {
  const namePattern = /^[A-Za-z\s]+$/; 
  const addressPattern = /^[A-Za-z0-9\s,.'-]+$/; 
  const mobilePattern = /^\d{10}$/; 
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!namePattern.test(user.firstName)) {
    swal({
      title: "Warning!",
      text: "Invalid First Name!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  if (!namePattern.test(user.lastName)) {
    swal({
      title: "Warning!",
      text: "Invalid Last Name!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  const combinedAddress = `${user.addressLine1} ${user.addressLine2} ${user.addressLine3} ${user.addressLine4} ${user.addressLine5}`;
  if (!addressPattern.test(combinedAddress.trim())) {
    swal({
      title: "Warning!",
      text: "Invalid Address!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  if (!mobilePattern.test(user.mobile)) {
    swal({
      title: "Warning!",
      text: "Invalid Mobile Number!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  if (!emailPattern.test(user.email)) {
    swal({
      title: "Warning!",
      text: "Invalid Email Address!",
      icon: "error",
      button: "Try Again!",
    });
    return false;
  }

  return true;
}
