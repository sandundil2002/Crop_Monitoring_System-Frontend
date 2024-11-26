const token = localStorage.getItem("authToken");
const baseUrl = "http://localhost:8080/cms/api/v1/log";

export function getAllLogs() {
    return $.ajax({
        url: baseUrl,
        method: "GET",
        contentType: "application/json",
        headers: {
            Authorization: "Bearer " + token,
        },

        error: function (error) {
            console.log("Error: " + error);
        }
    });
}

export function saveLog(logData) {
    const formData = new FormData();
    formData.append("fieldId", logData.fieldId);
    formData.append("cropId", logData.cropId);
    formData.append("temperature", logData.temperature);
    formData.append("details", logData.details);
    formData.append("observedImg", logData.observedImg);

    return $.ajax({
        url: baseUrl,
        method: "POST",
        processData: false,
        contentType: false,
        data: formData,
        headers: {
            Authorization: "Bearer " + token,
        },

        success: function () {
            swal("Confirmation!", "Log Saved Successfully!", "success");
        },
        error: function (error) {
            console.log("Error:", error.toString());
            swal("Error!", "Log Save Failed", "error");
        }
    });
}

export function updateLog(logId, logData) {
    const formData = new FormData();
    formData.append("fieldId", logData.fieldId);
    formData.append("cropId", logData.cropId);
    formData.append("temperature", logData.temperature);
    formData.append("details", logData.details);
    formData.append("observedImg", logData.observedImg);

    return $.ajax({
        url: baseUrl + "/" + logId,
        method: "PATCH",
        processData: false,
        contentType: false,
        data: formData,
        headers: {
            Authorization: "Bearer " + token,
        },

        success: function () {
            swal("Confirmation!", "Log Updated Successfully!", "success");
        },
        error: function (error) {
            console.log("Error:", error.toString());
            swal("Error!", "Log Update Failed", "error");
        }
    });
}

export function searchLog(logId) {
    return $.ajax({
        url: baseUrl + "/" + logId,
        method: "GET",
        contentType: "application/json",
        headers: {
            Authorization: "Bearer " + token,
        },

        error: function (error) {
            console.log("Error: " + error);
        }
    });
}

export function deleteLog(logId) {
    return $.ajax({
        url: baseUrl + "/" + logId,
        method: "DELETE",
        contentType: "application/json",
        headers: {
            Authorization: "Bearer " + token,
        },

        success: function () {
            swal("Confirmation!", "Log Deleted Successfully!", "success");
        },
        error: function (error) {
            console.log("Error:", error.toString());
            swal("Error!", "Log Delete Failed", "error");
        }
    });
}

export function getAllFields() {
    return $.ajax({
        url: "http://localhost:8080/cms/api/v1/field",
        method: "GET",
        contentType: "application/json",
        headers: {
            Authorization: "Bearer " + token,
        },

        error: function (error) {
            console.log("Error: " + error);
        }
    });
}

export function getAllCrops() {
    return $.ajax({
        url: "http://localhost:8080/cms/api/v1/crop",
        method: "GET",
        contentType: "application/json",
        headers: {
            Authorization: "Bearer " + token,
        },

        error: function (error) {
            console.log("Error: " + error);
        }
    });
}