document.addEventListener("DOMContentLoaded", function() {
    var registrationForm = document.getElementById("registration-form");
  
    registrationForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      var firstName = document.getElementById("firstName").value;
      var lastName = document.getElementById("lastName").value;
      var email = document.getElementById("email").value;
      var phoneNumber = document.getElementById("phoneNumber").value;
      var engineeringField = document.getElementById("engineering-field").value;
      var password = document.getElementById("psw").value;
  
      var firstNameError = document.getElementById("firstName-error");
      var lastNameError = document.getElementById("lastName-error");
      var emailError = document.getElementById("email-error");
      var phoneNumberError = document.getElementById("phoneNumber-error");
      var engineeringFieldError = document.getElementById("engineeringField-error");
      var passwordError = document.getElementById("psw-error");
  
      firstNameError.textContent = "";
      lastNameError.textContent = "";
      emailError.textContent = "";
      phoneNumberError.textContent = "";
      engineeringFieldError.textContent = "";
      passwordError.textContent = "";
  
      if (firstName.trim() === "") {
        firstNameError.textContent = "First Name is required";
        return;
      }
  
      if (lastName.trim() === "") {
        lastNameError.textContent = "Last Name is required";
        return;
      }
  
      if (email.trim() === "") {
        emailError.textContent = "Email is required";
        return;
      } else if (!isValidEmail(email)) {
        emailError.textContent = "Invalid email format";
        return;
      }
      if (phoneNumber.trim() === "") {
        phoneNumberError.textContent = "Phone Number is required";
        return;
      } else if (!isValidPhoneNumber(phoneNumber)) {
        phoneNumberError.textContent = "Invalid phone number format";
        return;
      }
  
      if (engineeringField === "") {
        engineeringFieldError.textContent = "Please select a valid Engineering Specialization";
        return;
      }
  
      if (password.trim() === "") {
        passwordError.textContent = "Password is required";
        return;
      }
      Submitlogin(firstName);
    });
    function isValidEmail(email) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    function isValidPhoneNumber(phoneNumber) {
      var phoneNumberRegex = /^[0-9]{8}$/; 
      return phoneNumberRegex.test(phoneNumber);
    }
  
    function Submitlogin(firstName) {
      var loginName = document.getElementById("login-name");
      loginName.innerHTML = firstName;
  
      var formulaire = document.getElementById("formulaire");
      formulaire.remove();
      const game = document.getElementById("container-game");
      game.style.display = "block";
    }
  });