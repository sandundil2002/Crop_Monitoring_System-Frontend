$(document).ready(function () {
  $("#btn-edit-log").on("click", function () {
    const row = $(this).closest("tr");
    const logId = row.find("td:eq(0)").text();
    const fieldId = row.find("td:eq(1)").text();
    const cropId = row.find("td:eq(2)").text();
    const userId = row.find("td:eq(3)").text();
    const condition = row.find("td:eq(4)").text();
    const observations = row.find("td:eq(5)").text();
    const observedImg = row.find("td:eq(6)").text();

    $("#editLogId").val(logId);
    $("#editFieldId").val(fieldId);
    $("#editCropType").val(cropId);
    $("#editUserId").val(userId);
    $("#editWeather").val(condition);
    $("#editObservations").val(observations);
    $("#editObservedimg").val(observedImg);

    $("#editLogModal").modal("show");
  });
});
