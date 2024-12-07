import { userSignIn, userSignUp, sendOtp, verifyOtp } from "../model/userModel.js";

$(document).ready(function () {
  $("#signup-form").hide();
  $("#otp-verification-form").hide();

  $("#login-form a").click(function (e) {
    e.preventDefault();
    $("#login-form").fadeOut(300, function () {
      $("#signup-form").fadeIn(300);
    });
  });

  $("#signup-form a").click(function (e) {
    e.preventDefault();
    $("#signup-form").fadeOut(300, function () {
      $("#login-form").fadeIn(300);
    });
  });

  $(".togglePassword").on("click", function () {
    const passwordField = $(".password");
    const eyeIcon = $(".eyeIcon");

    if (passwordField.attr("type") === "password") {
      passwordField.attr("type", "text");
      eyeIcon.removeClass("bi-eye-slash").addClass("bi-eye");
    } else {
      passwordField.attr("type", "password");
      eyeIcon.removeClass("bi-eye").addClass("bi-eye-slash");
    }
  });

  $("#userLogIn").click(function () {
    const userName = $("#username").val();
    const password = $("#loginPassword").val();

    if (!userName || !password) {
      swal("Warning!", "Please fill in both username and password!", "info");
      return;
    }

    const userData = {
      email: userName,
      password: password,
    };

    const promise = userSignIn(userData);

    promise
      .then((response) => {
        if (response && response.token) {
          localStorage.setItem("authToken", response.token);
          localStorage.setItem("username", userData.email);
          window.location.href = "../pages/dashboard.html";
        }
      })
      .catch((error) => {
        $("#username").val("");
        $("#loginPassword").val("");
        swal("Login failed!", "Invalid credentials! Please try again", "error");
      });
  });

  $("#userSignUp").click(function () {
    const email = $("#email").val();
    const password = $("#signPassword").val();

    if (!email || !password) {
      swal("Warning!", "Please fill in both email and password!", "info");
      return;
    }

    const otpData = { email: email };
    const promise = sendOtp(otpData);

    promise
      .then(() => {
        swal(
          "OTP Sent!",
          "An OTP has been sent to your email. Please verify it.",
          "info"
        );
           $("#otp-verification-form").show();
           $("#signup-form").hide();
      })
      .catch(() => {
        swal("Error!", "Failed to send OTP. Please try again.", "error");
      });
  });

  $("#sendOtp").click(function () {
    const email = $("#email").val();

    if (!email) {
      swal("Warning!", "Please enter your email address!", "info");
      return;
    }

    const otpData = { email: email };

    const promise = sendOtp(otpData);

    promise
      .then(() => {
        swal(
          "OTP Sent!",
          "An OTP has been sent to your email. Please verify it.",
          "info"
        );
      })
      .catch(() => {
        swal("Error!", "Failed to send OTP. Please try again.", "error");
      });
  });

  $("#verifyOtp").click(function () {
    const email = $("#email").val();
    const otp = $("#otp").val();

    if (!otp) {
      swal("Warning!", "Please enter the OTP!", "info");
      return;
    }

    const otpData = { email: email, otp: otp };

    const promise = verifyOtp(otpData);

    promise
      .then(() => {
        swal(
          "OTP Verified!",
          "Proceed to complete your registration.",
          "success"
        );
        signup();
      })
      .catch(() => {
        swal("Error!", "Invalid OTP. Please try again.", "error");
      });
  });
});

function signup() {
  const email = $("#email").val();
  const password = $("#signPassword").val();

  if (!email || !password) {
    swal("Warning!", "Please fill in both email and password!", "info");
    return;
  }

  const userData = { email: email, password: password };

  const promise = userSignUp(userData);

  promise
    .then((response) => {
      if (response && response.token) {
        swal(
          "Success!",
          "User Registration Successfully Completed!",
          "success"
        );
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("username", email);
        window.location.href = "../pages/dashboard.html";
      }
    })
    .catch(() => {
      swal("Error!", "This email has no access to signup", "error");
    });
}