const token = localStorage.getItem("authToken");
const baseUrl = "http://localhost:8080/cms/api/v1/equipment";

export function getAllEquipments() {
    return $.ajax({
        url: baseUrl,
        method: "GET",
        contentType: "application/json",
        headers: {
        Authorization: "Bearer " + token,
        },

        error: function (error) {
        console.log("Error: " + error);
        },
    });
}

export function saveEquipment(equipment) {
    return $.ajax({
        url: baseUrl,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(equipment),
        headers: {
        Authorization: "Bearer " + token,
        },

        success: function () {
        swal("Confirmation!", "Equipment Saved Successfully!", "success");
        },

        error: function (error) {
        console.log("Error" + error);
        swal("Error!", "Equipment Saved Failed", "error");
        },
    });
}

export function updateEquipment(equipmentId, equipmentData) {
    return $.ajax({
        url: baseUrl + "/" + equipmentId,
        method: "PATCH",
        contentType: "application/json",
        data: JSON.stringify(equipmentData),
        headers: {
        Authorization: "Bearer " + token,
        },

        success: function () {
        swal("Confirmation!", "Equipment Update Successfully!", "success");
        },

        error: function (error) {
        console.log(error);
        },
    });
}

export function getAllStaff() {
    return $.ajax({
        url: "http://localhost:8080/cms/api/v1/staff",
        method: "GET",
        contentType: "application/json",
        headers: {
        Authorization: "Bearer " + token,
        },

        error: function (error) {
        console.log("Error: " + error);
        },
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
        },
    });
}