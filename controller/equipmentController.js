import {
    getAllEquipments,
    getAllFields,
    getAllStaff,
    saveEquipment,
    updateEquipment
} from "../model/equipmentModel.js";

$(document).ready(function () {
    $("#btnSave").on("click", function () {
        const category = $("#category").val();
        const type = $("#type").val();
        const staff = $("#assignStaff").val();
        const field = $("#assignField").val();
        const status = $("#status").val();

        const equipmentData = {
            category: category,
            type: type,
            eqStaff: staff,
            eqField: field,
            status: status,
        };

        const promise = saveEquipment(equipmentData);
        promise.then(() => {
            loadEquipmentTable().then(r => {
                $("#addEquipmentModal").modal("hide");
            });
        });
    });

    $("#btnEdit").on("click", function () {
        const equipmentId = $("#editEquipmentId").val();
        const category = $("#editCategory").val();
        const type = $("#editType").val();
        const staff = $("#editAssignStaff").val();
        const field = $("#editAssignField").val();
        const status = $("#editStatus").val();

        const equipmentData = {
            equipmentId: equipmentId,
            category: category,
            type: type,
            eqStaff: staff,
            eqField: field,
            status: status,
        };

        swal({
            title: "Are you sure?",
            text: "Do you want to update this equipment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                const promise = updateEquipment(equipmentId, equipmentData);
                promise.then(() => {
                    loadEquipmentTable().then(r => {
                        $("#editEquipmentModal").modal("hide");
                    });
                });
            }
        });
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

$(document).on("click", ".btn-edit-equipment", function () {
    const row = $(this).closest("tr");
    const equipmentId = row.find("td:eq(0)").text();
    const category = row.find("td:eq(1)").text();
    const type = row.find("td:eq(2)").text();
    const staff = row.find("td:eq(3)").text();
    const field = row.find("td:eq(4)").text();
    const status = row.find("td:eq(5)").text();

    $("#editEquipmentId").val(equipmentId);
    $("#editCategory").val(category);
    $("#editType").val(type);
    $("#editStatus").val(status);
    $("#editAssignStaff").val(staff);
    $("#editAssignField").val(field);

    $("#editEquipmentModal").modal("show");
});

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