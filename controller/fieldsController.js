import {gelAllFields} from "../model/fieldModel.js";

$(document).ready(function () {
  $(".dropdown-item").click(function () {
    var selectedValue = $(this).data("value");
    $("#dropdownMenuButton").text(selectedValue);
  });

  $("#btn-edit-field").on("click", function () {
    const row = $(this).closest("tr");
    const fieldId = row.find("td:eq(0)").text();
    const fieldName = row.find("td:eq(1)").text();
    const fieldLocation = row.find("td:eq(2)").text();
    const cropType = row.find("td:eq(3)").text();
    const fieldSize = row.find("td:eq(4)").text();
    const fieldStaff = row.find("td:eq(5)").text();
    const fieldImg1 = row.find("td:eq(6)").text();
    const fieldImg2 = row.find("td:eq(7)").text();

    $("#editFieldId").val(fieldId);
    $("#editFieldName").val(fieldName);
    $("#editFieldLocation").val(fieldLocation);
    $("#editCropType").val(cropType);
    $("#editFieldSize").val(fieldSize);
    $("#editStaff").val(fieldStaff);
    $("#editFieldImg1").val(fieldImg1);
    $("#editFieldImg2").val(fieldImg2);

    $("#editFieldModal").modal("show");
  });

  $("#editFieldForm").on("submit", function (event) {
    event.preventDefault();
    $("#editFieldModal").modal("hide");
  });

  loadFieldTable()
});

async function loadFieldTable() {
  try {
    const fieldList = await gelAllFields();
    const fieldTable = $("#fieldTable");
    fieldTable.empty();

    fieldList.forEach((field) => {
      const image1Src = field.fieldImg1
          ? `data:image/png;base64,${field.fieldImg1}`
          : "images/placeholder.png";

      const image2Src = field.fieldImg2
          ? `data:image/png;base64,${field.fieldImg2}`
          : "images/placeholder.png";

      const location = field.location
          ? `${field.location.x}, ${field.location.y}`
          : "N/A";

      fieldTable.append(`
        <tr>
          <td>${field.fieldId}</td>
          <td>${field.fieldName}</td>
          <td>${location}</td>
          <td>${field.size}</td>
          <td>${field.staffs}</td>
          <td><img src="${image1Src}" width="50" height="50" alt="field image1"></td>
          <td><img src="${image2Src}" width="50" height="50" alt="field image2"></td>
          <td>
            <button class="btn btn-outline-primary btn-sm mb-1 btn-edit-field mx-1" data-field-id="${field.fieldId}" data-bs-toggle="modal" data-bs-target="#editFieldModal">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm mb-1 btn-delete-field" data-field-id="${field.fieldId}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      `);
    });
  } catch (error) {
    console.log("Error:", error);
  }
}
