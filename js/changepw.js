let changePw = function(oldPw, newPw) {
  cognitoUser.changePassword(oldPw, newPw, function(err, result) {
    if (err) {
      return err;
    }
    return result;
  });
}

let forgotPwGetVerification = function(username) {
  let authenticationData = {
    Username: username,
  };
  let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  let userData = {
    Username: username,
    Pool: userPool
  };

  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.forgotPassword({
    onSuccess: function(result) {
      console.log('call result: ' + result);
    },
    onFailure: function(err) {
      alert(err);
    },
    inputVerificationCode() {
      let verificationCode = prompt('Please input verification code ', '');
      let newPassword = prompt('Enter new password ', '');
      cognitoUser.confirmPassword(verificationCode, newPassword, this);
    }
  });
}
