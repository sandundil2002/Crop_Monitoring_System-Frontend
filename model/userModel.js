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

export function userSignUp(user) {
  return $.ajax({
    url: "http://localhost:8080/cms/api/v1/auth/signup",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(user),

    success: function (response) {
      return response;
    },

    error: function (error) {
      console.error("Registration failed:", error);
    },
  });
}

export function sendOtp(email) {
  return $.ajax({
    url: "http://localhost:8080/cms/api/v1/auth/send_otp",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(email),

    success: function (response) {
      return response;
    },

    error: function (error) {
      console.error("Otp send failed:", error);
    },
  });
}

export function verifyOtp(otpData) {
  return $.ajax({
    url: "http://localhost:8080/cms/api/v1/auth/validate_otp",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(otpData),

    success: function (response) {
      return response;
    },

    error: function (error) {
      console.error("Otp verification failed:", error);
    },
  });
}
