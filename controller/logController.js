import { getAllLogs } from "../model/logModel.js";

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

  loadLogTable()
});

async function loadLogTable() {
  try {
    const logList = await getAllLogs();
    const logTable = $("#logTable");
    logTable.empty();

    logList.forEach((log) => {
      const imageSrc = log.observedImg
        ? `data:image/jpeg;base64,${log.observedImg}`
        : "assets/img/no-image.png";

        logTable.append(
            `<tr>
            <td>${log.logId}</td>
            <td>${log.fieldId}</td>
            <td>${log.cropId}</td>
            <td>${log.staff}</td>
            <td>${log.temperature}</td>
            <td>${log.details}</td>
            <td><img src="${imageSrc}" width="50" height="50"></td>
            <td>${log.date}</td>
            <td>
            <button class="btn btn-outline-primary btn-sm mb-1 btn-edit-log mx-1" data-log-id="${log.logId}" data-bs-toggle="modal" data-bs-target="#editLogModal">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm mb-1 btn-delete-log" data-log-id="${log.logId}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>`
        );
    });
  } catch (error) {
    console.log("Error:", error);
  } finally {

  }
  
}