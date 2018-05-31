let noMatch = "Passwords do not match.";
let badInput = "Input error.";
let success = "Success!";

var data = {
  UserPoolId: '', // Insert your user pool id
  ClientId: '' // Insert your app client id
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);

let register = function(username, registerUserRealName, registerUserLocale, password, confirmPassword) {
  if (username == "" || password == "" || confirmPassword == "") {
    $('#registerModal').modal('hide');
    $('#errorModal').modal('show');
    $('#msgError').text(badInput);
    return;
  }
  if (password != confirmPassword) {
    console.log(password);
    console.log(confirmPassword);
    $('#registerModal').modal('hide');
    $('#errorModal').modal('show');
    $('#msgError').text(noMatch);

    return;
  }
  if (password === confirmPassword) {
    $('#registerModal').modal('hide');
    $('#confirmModal').modal('show');

    var dataName = {
      Name : 'name',
      Value : registerUserRealName
    };
    var dataLocale = {
      Name: 'locale',
      Value: registerUserLocale
    };

    var attributeList = [];

    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
    var attributeLocale = new AmazonCognitoIdentity.CognitoUserAttribute(dataLocale);

    attributeList.push(attributeName);
    attributeList.push(attributeLocale);

    userPool.signUp(username, confirmPassword, attributeList, null, function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
  }
}

let clearIt = function() {
  document.getElementById('registerUserEmail').value = '';
  document.getElementById('registerUserPassword').value = '';
  document.getElementById('msg').innerHTML = '';
  document.getElementById('registerUserPasswordConfirm').value = "";
  document.getElementById('registerUserEmail').placeholder = 'example@example.com';
  document.getElementById('registerUserPassword').placeholder = 'Password';
  document.getElementById('registerUserPasswordConfirm').placeholder = 'Password';
}
