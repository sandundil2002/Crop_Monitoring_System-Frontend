import {gelAllFields, getAllStaff, saveField ,searchField} from "../model/fieldModel.js";

let selectedFields = [];

$("#selectedFieldsList").on("click", ".remove-btn", function () {
  const $listItem = $(this).closest("li");
  const valueToRemove = $listItem.data("value");
  $listItem.remove();
  selectedFields = selectedFields.filter(value => value !== valueToRemove);
  $(`#staffId option[value="${valueToRemove}"]`).prop("selected", false);
  console.log("Current selected fields:", selectedFields);
});

$("#updatedFieldsList").on("click", ".remove-btn", function() {
    const $listItem = $(this).closest("li");
    const valueToRemove = $listItem.data("value");
    $listItem.remove();
    selectedFields = selectedFields.filter(value => value !== valueToRemove);
    $(`#editFieldId option[value="${valueToRemove}"]`).prop("selected", false);
    console.log("Current selected fields:", selectedFields);
});

$(".staffId").change(function () {
  const selectedOption = $(this).find("option:selected");
  const value = selectedOption.val();
  const text = selectedOption.text();

  if (value && !selectedFields.includes(value)) {
    selectedFields.push(value);

    $("#selectedFieldsList").append(`
      <li data-value="${value}">
        ${text}
        <button type="button" class="remove-btn btn btn-danger btn-sm mt-1 ms-2">
          <span aria-hidden="true">&times;</span>
        </button>
      </li>
    `);

    $("#updatedFieldsList").append(`
            <li data-value="${value}">
                ${text}
                <button type="button" class="remove-btn btn btn-danger btn-sm mt-1 ms-2">
                    <span aria-hidden="true">&times;</span>
                </button>
            </li>
    `);
  }
});

$(document).ready(function () {
  $(".dropdown-item").click(function () {
    var selectedValue = $(this).data("value");
    $("#dropdownMenuButton").text(selectedValue);
  });

  $("#btnSave").click(() => {
    const fieldName = $("#fieldName").val();
    const fieldLocation = $("#fieldLocation").val();
    const fieldSize = $("#fieldSize").val();
    const fieldStaff = selectedFields;
    const fieldImg1 = $("#fieldImg1").prop("files")[0];
    const fieldImg2 = $("#fieldImg2").prop("files")[0];

    const fieldData = {
      fieldName: fieldName,
      location: fieldLocation,
      size: fieldSize,
      staffs: fieldStaff,
      fieldImg1: fieldImg1,
      fieldImg2: fieldImg2,
    };

    saveField(fieldData).then(() => {
        loadFieldTable().then(() => {
          $("addCropModal").modal("hide");
        });
    }).catch((error) => {
        console.log("Error:", error);
    })
  })
  
  $("#btnSearch").click(async function () {
    try {
      const fieldId = $("#dropdownMenuButton").text().trim();
      if (!fieldId) {
        swal("Warning!", "Please select a field id", "info");
        return;
      }
      
      $("#btnSearch").html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Searching...`);
        const fieldDetails = await searchField(fieldId);
        let fieldArray = [];
        if (fieldDetails){
          if (Array.isArray(fieldDetails)){
            fieldArray = fieldDetails;
          } else if(typeof fieldDetails === "object"){
            fieldArray = [fieldDetails];
          }
        }
        
        $("#fieldTable").empty();
        if (fieldArray.length === 0){
          swal("Warning!", "No field found with the given id", "info");
          return;
        }

        fieldArray.forEach((field) => {
          const image1Src = field.fieldImg1
              ? `data:image/png;base64,${field.fieldImg1}`
              : "images/placeholder.png";
          const image2Src = field.fieldImg2
              ? `data:image/png;base64,${field.fieldImg2}`
              : "images/placeholder.png";
          const location = field.location
              ? `${field.location.x}, ${field.location.y}`
              : "N/A";
          $("#fieldTable").append(`
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
    } finally {
        $("#btnSearch").html('<i class="bi bi-search"></i>').prop("disabled", false);
    }
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
  } finally {
    loadStaffIds();
    loadFieldIds();
  }
}

async function loadFieldIds() {
  try {
    const fieldList = await gelAllFields();
    const fieldSelect = $("#fieldList");
    fieldSelect.empty();

    fieldList.forEach((field) => {
      const fieldId = field.fieldId;
      const listItem = `
      <li>
        <a class="dropdown-item" href="#" data-value="${fieldId}">${fieldId}</a>
       </li>`;
        fieldSelect.append(listItem);
    });
    
    $("#fieldList").on("click", ".dropdown-item", function (event) {
        event.preventDefault();
        const selectedValue = $(this).data("value");
        $("#dropdownMenuButton").text(selectedValue);
        $("#dropdownMenuButton").data("selected-id", selectedValue);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function loadStaffIds() {
  const staffList = await getAllStaff();
    const staffSelect = $(".staffId");
    staffSelect.empty();
    staffSelect.append(`<option value="" disabled selected>Select Staff Ids</option>`);

    staffList.forEach((staff) => {
        staffSelect.append(`<option value="${staff.staffId}">${staff.staffId}</option>`);
    });
}