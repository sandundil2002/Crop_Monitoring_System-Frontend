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

});
