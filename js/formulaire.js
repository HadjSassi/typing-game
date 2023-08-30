document.addEventListener("DOMContentLoaded", function() {
  var registrationForm = document.getElementById("registration-form");

  registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var engineeringField = document.getElementById("engineering-field").value;

    // Create a FormData object to store the form data
    var formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("engineering-field", engineeringField);

    // Create an HTTP request to send the form data to the PHP script
    var request = new XMLHttpRequest();
    request.open("POST", "../submit_form.php", true);
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          // Request successful, you can update the UI or do other actions here
          console.log("Form submitted successfully.");
          Submitlogin(firstName);
        } else {
          // Request failed, handle errors here
          console.error("Error submitting form.");
        }
      }
    };

    // Send the FormData object as the request body
    request.send(formData);
  });

  function Submitlogin(firstName) {
    var loginName = document.getElementById("login-name");
    loginName.innerHTML = firstName;

    var formulaire = document.getElementById("formulaire");
    formulaire.remove();

    const game = document.getElementById("container-game");
    game.style.display = "block";
  }
});
