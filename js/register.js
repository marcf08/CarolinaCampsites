let noMatch = "Passwords do not match.";
let badInput = "Input error.";
let success = "Success!";
let uri = "https://qktvnkadoj.execute-api.us-east-1.amazonaws.com/staging/dbadduser";

let register = function(username, password, confirmPassword) {
  if (username == "" || password == "" || confirmPassword == "") {
        $('#registerModal').modal('hide');
        $('#errorModal').modal('show');
        $('#msgError').text(badInput);
        return;
  }
  if (password != confirmPassword) {
        $('#registerModal').modal('hide');
        $('#errorModal').modal('show');
        $('#msgError').text(noMatch);
        return;
  }
  if (password === confirmPassword) {
    $('#registerModal').modal('hide');
    $('#confirmModal').modal('show');
    $.ajax({
      type: "POST",
      url: uri,
      headers: {
        "x-api-key": api_key
      },
      data: {
        "username": username,
        "password": confirmPassword
      }
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
