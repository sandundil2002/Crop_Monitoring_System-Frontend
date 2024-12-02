const token = localStorage.getItem("authToken");

export function getCropsBySeason(season) {
  return $.ajax({
    url: 'http://localhost:8080/cms/api/v1/crop/season/' + season,
    method: "GET",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + token,
    },

    error: function (error) {
      console.log(error);
    },
  });
}