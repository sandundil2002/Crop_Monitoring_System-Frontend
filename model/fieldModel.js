const token = localStorage.getItem("authToken");
const baseUrl = "http://localhost:8080/cms/api/v1/field";

export function gelAllFields() {
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

export function saveField(fieldData) {
    const formData = new FormData();
    formData.append("fieldName", fieldData.fieldName);
    formData.append("location", fieldData.location);
    formData.append("size", fieldData.size);
    formData.append("staffs", JSON.stringify(fieldData.staffs));
    formData.append("fieldImg1", fieldData.fieldImg1);
    formData.append("fieldImg2", fieldData.fieldImg2);
    console.log("Field Data:", fieldData);

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
            swal("Confirmation!", "Field Saved Successfully!", "success");
        },

        error: function (error) {
            console.log("Error:", error.toString());
            swal("Error!", "Field Save Failed", "error");
        }
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