export async function getAllStaff() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No authentication token found");
  }
  
  return $.ajax({
    url: "http://localhost:8080/cms/api/v1/staff",
    method: "GET",
    dataType: "json",
    // headers: {
    //   Authorization: "Bearer " + token,
    // },
    success: function (response) {
      console.log(response);
    },
    error: function (xhr, status, error) {
      console.log("Status: " + status);
      console.log("Error: " + error);
      console.log(xhr.responseText);
    },
  });
}