export function userSignIn(user) {
  return $.ajax({
    url: "http://localhost:8080/cms/api/v1/auth/signin",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(user),

    success: function (response) {
        return response;
    },
    
    error: function (error) {
      console.error("Login failed:", error);
    },
  });
}
