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