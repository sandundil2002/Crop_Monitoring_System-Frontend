import {
  getAllCrops,
  getAllFields,
  getAllStaff,
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
    $("#userName").text(username);
    $("#role").text(userRole);
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
