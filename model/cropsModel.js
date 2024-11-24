const token = localStorage.getItem("authToken");
const baseUrl = "http://localhost:8080/cms/api/v1/crop";

export function getAllCrops() {
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

export function saveCrop(cropData) {
    const formData = new FormData();
    formData.append('commonName', cropData.commonName);
    formData.append('scientificName', cropData.scientificName);
    formData.append('category', cropData.category);
    formData.append('season', cropData.season);
    formData.append('cropImg', cropData.cropImg);
    formData.append('fields', JSON.stringify(cropData.fields));

    console.log(formData.get('commonName'));
    console.log(formData.get('scientificName'));
    console.log(formData.get('category'));
    console.log(formData.get('season'));
    console.log(formData.get('cropImg'));
    console.log(formData.get('fields'));

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
            swal("Confirmation!", "Crop Saved Successfully!", "success");
        },
        error: function (error) {
            console.log("Error:", error.toString());
            swal("Error!", "Crop Save Failed", "error");
        }
    });
}

export function getAllFields() {
    return $.ajax({
        url:  "http://localhost:8080/cms/api/v1/field",
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