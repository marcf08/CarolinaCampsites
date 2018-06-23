/**
Contains front-end registration method and logic for handling the registration process
via AWS Cognito.
**/
let noMatch = "Passwords do not match.";
let badInput = "Input error.";
let success = "Success! Please verify your email.";
let unknown = "There was an unknown error. Please try again.";
let exists = "A user with that email already exists";
let validationError = "Vaidation error: ";

var data = {
  UserPoolId: 'us-east-1_evimZrQDn', // Insert your user pool id
  ClientId: '689in92k06pd12lu9um7tl4bmb' // Insert your app client id
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);

let register = function(username, registerUserRealName, registerUserLocale, password, confirmPassword) {
  if (username == "" || password == "" || confirmPassword == "") {
    //$('#registerModal').modal('hide');
    $('#errorModal').modal('show');
    $('#msgError').text(badInput);
    return;
  }
  if (password != confirmPassword) {
    console.log(password);
    console.log(confirmPassword);
    //$('#registerModal').modal('hide');
    $('#errorModal').modal('show');
    $('#msgError').text(noMatch);
    return;
  }
  if (password === confirmPassword) {
    $('#registerModal').modal('hide');

    let dataName = {
      Name: 'name',
      Value: registerUserRealName
    };
    let dataLocale = {
      Name: 'locale',
      Value: registerUserLocale
    };

    let attributeList = [];

    let attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
    let attributeLocale = new AmazonCognitoIdentity.CognitoUserAttribute(dataLocale);

    attributeList.push(attributeName);
    attributeList.push(attributeLocale);

    userPool.signUp(username, confirmPassword, attributeList, null, function(err, result) {
      if (err) {
        $('#msgError').text(validationError + " " + err);
        $('#errorModal').modal('show');
        console.log(err);
        return;
      }
      $('#msgConfirm').text(success);
      $('#confirmModal').modal('show');
      return;
    });
  }
}

let clearIt = function() {
  document.getElementById('registerUserEmail').value = '';
  document.getElementById('registerUserPassword').value = '';
  //document.getElementById('msg').innerHTML = '';
  document.getElementById('registerUserPasswordConfirm').value = "";
  document.getElementById('registerUserEmail').placeholder = 'example@example.com';
  document.getElementById('registerUserPassword').placeholder = 'Password';
  document.getElementById('registerUserPasswordConfirm').placeholder = 'Password';
}


$(document).on("click", "#registerNavButton", function() {
  $('#registerModal').modal('show');
});
