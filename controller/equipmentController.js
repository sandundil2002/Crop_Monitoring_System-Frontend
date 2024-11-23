import {
    getAllEquipments,
    getAllFields,
    getAllStaff}
    from "../model/equipmentModel.js";

$(document).ready(function () {
  $("#btn-edit-equipment").on("click", function () {
    const row = $(this).closest("tr");
    const equipmentId = row.find("td:eq(0)").text();
    const equipmentName = row.find("td:eq(1)").text();
    const type = row.find("td:eq(2)").text();
    const staff = row.find("td:eq(3)").text();
    const field = row.find("td:eq(4)").text();
    const status = row.find("td:eq(5)").text();

    $("#editEquipmentId").val(equipmentId);
    $("#editEquipmentName").val(equipmentName);
    $("#editEquipmentType").val(type);
    $("#editStatus").val(status);
    $("#editAssignStaff").val(staff);
    $("#editAssignField").val(field);

    $("#editEquipmentModal").modal("show");
  });

  loadEquipmentTable();
});

async function loadEquipmentTable() {
    try {
        const equipmentList = await getAllEquipments();
        const equipmentTable = $("#equipmentTable");
        equipmentTable.empty();

        equipmentList.forEach((equipment) => {
          $(".table").append(
              "<tr> " +
              "<td>" +
              equipment.equipmentId +
              "</td>" +
              "<td>" +
              equipment.category +
              "</td>" +
              "<td>" +
              equipment.type +
              "</td>" +
              "<td>" +
              equipment.eqStaff +
              "</td>" +
              "<td>" +
              equipment.eqField +
              "</td>" +
              "<td>" +
              equipment.status +
              "</td>" +
              "<td>" +
              "<button class='btn btn-outline-primary btn-sm mb-1 btn-edit-equipment mx-1' data-equipment-id='" +
              equipment.equipmentId +
              "' data-bs-toggle='modal' data-bs-target='#editEquipmentModal'>" +
              "<i class='bi bi-pencil'></i>" +
              "</button>" +
              "<button class='btn btn-outline-danger btn-sm mb-1 btn-delete-equipment' data-equipment-id='" +
              equipment.equipmentId +
              "'>" +
              "<i class='bi bi-trash'></i>" +
              "</button>" +
              "</td>" +
              "</tr>"
          );
        });
    } catch (error) {
        console.error("Error loading equipment table:", error);
    } finally {
        loadStaffIds();
        loadFieldIds();
    }
}

async function loadStaffIds() {
    const staffList = await getAllStaff();
    const staffDropdown = $(".staffId");
    staffDropdown.empty();

    staffDropdown.append(
        "<option value='' disabled selected>Select Allocated Staff Member</option>"
    );

    staffList.forEach((staff) => {
        staffDropdown.append(
            "<option value='" + staff.staffId + "'>" + staff.staffId + "</option>"
        );
    });
}

async function loadFieldIds() {
    const fieldList = await getAllFields();
    const fieldDropdown = $(".fieldId");
    fieldDropdown.empty();

    fieldDropdown.append(
        "<option value='' disabled selected>Select Allocated Field</option>"
    );

    fieldList.forEach((field) => {
        fieldDropdown.append(
            "<option value='" + field.fieldId + "'>" + field.fieldId + "</option>"
        );
    });
}