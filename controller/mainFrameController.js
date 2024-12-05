import {
  getAllCrops,
  getAllFields,
  getAllStaff,
  sendOtp,
  verifyOtp,
  updateUser,
  deleteUser,
} from "../model/mainFrameModel.js";

$(document).ready(async function () {
  const user = localStorage.getItem("username");
  const fields = await getAllFields();
  const crops = await getAllCrops();
  const staff = await getAllStaff();

  $("#cropCount").text(crops.length);
  $("#fieldCount").text(fields.length);
  $("#staffCount").text(staff.length);

  const staffMember = staff.find((staff) => staff.email === user);
  console.log(staffMember);

  if (staffMember) {
    const username = staffMember.firstName + " " + staffMember.lastName;
    const userRole = staffMember.role;
    $(".userName").text(username);
    $(".role").text(userRole);
  } else {
    console.log("User not found in the staff list.");
  }

  const fieldLabels = fields.map((field) => field.fieldName);

  const categories = ["Cereal", "Legume", "Vegetable"];
  const datasets = categories.map((category) => {
    return {
      label: category,
      data: fields.map((field) => {
        const cropCount = crops.filter(
          (crop) =>
            crop.category === category && crop.fields.includes(field.fieldId)
        ).length;
        return cropCount;
      }),
      backgroundColor: getCategoryColor(category),
      borderColor: getCategoryBorderColor(category),
      borderWidth: 1,
    };
  });

  const data = {
    labels: fieldLabels,
    datasets: datasets,
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          enabled: true,
        },
      },

      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Crop Count",
          },
        },
        x: {
          title: {
            display: true,
            text: "Fields",
          },
        },
      },
    },
  };

  const ctx = $("#rainfallChart")[0].getContext("2d");
  new Chart(ctx, config);
});

function getCategoryColor(category) {
  switch (category) {
    case "Cereal":
      return "rgba(54, 162, 235, 0.8)";
    case "Legume":
      return "rgba(255, 99, 132, 0.8)";
    case "Vegetable":
      return "rgba(75, 192, 192, 0.8)";
    default:
      return "rgba(201, 203, 207, 0.8)";
  }
}

function getCategoryBorderColor(category) {
  switch (category) {
    case "Cereal":
      return "rgba(54, 162, 235, 1)";
    case "Legume":
      return "rgba(255, 99, 132, 1)";
    case "Vegetable":
      return "rgba(75, 192, 192, 1)";
    default:
      return "rgba(201, 203, 207, 1)";
  }
}

$("#otpGet").click(function () {
  const email = localStorage.getItem("username");

  const otpData = { email: email };
  const promise = sendOtp(otpData);

  promise
    .then(() => {
      swal(
        "OTP Sent!",
        "An OTP has been sent to your email. Please verify it.",
        "info"
      );
    })
    .catch(() => {
      swal("Error!", "Failed to send OTP. Please try again.", "error");
    });
});

$("#updateUser").click(function () {
  const otp = $("#otpCode").val();

  if (!otp) {
    swal("Warning!", "Please enter the OTP!", "info");
    return;
  }

  const email = localStorage.getItem("username");
  const newPassword = $("#confirmPassword").val();

  const otpData = { email: email, otp: otp };
  const userData = { email: email, password: newPassword };

  const promise = verifyOtp(otpData);
  promise
    .then(() => {
      updateUser(email, userData);
    })
    .catch(() => {
      swal("Error!", "Invalid OTP. Please try again.", "error");
    });
});

$("#deleteAccountBtn").click(function () {
  const email = localStorage.getItem("username");
  const otp = $("#otpCode").val();
  const otpData = { email: email, otp: otp };
  const promise = verifyOtp(otpData);
  promise
    .then(() => {
      swal({
        title: "Are you sure?",
        text: `Do you want to delete this user account`,
        icon: "warning",
        buttons: {
          cancel: "Cancel",
          confirm: {
            text: "Delete",
            visible: true,
            className: "btn-danger",
          },
        },
      }).then((willDelete) => {
        if (willDelete) {
          const promise = deleteUser(email);
          promise.then(() => {
            window.location = "./index.html";
          });
        }
      });
    })
    .catch(() => {
      swal("Error!", "Invalid OTP. Please try again.", "error");
    });
});
