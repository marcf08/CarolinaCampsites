/**
Used to sign in a user and establish a session with Cognito.
**/
var cognitoUser;
var poolData = {
  UserPoolId: 'us-east-1_evimZrQDn',
  ClientId: '689in92k06pd12lu9um7tl4bmb'
}

window.onload = function() {
  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != undefined || cognitoUser != null) {
    $('#loginLogout').text('Logout');
    $('#loginLogout').attr("data-toggle", "");
    $('#loginLogout').attr("data-target", "");
    $('#loginLogout').attr("onclick", "logout()");
  }
}

var signon = function(username, password) {
  let authenticationData = {
    Username: username,
    Password: password,
  };
  let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  let userData = {
    Username: username,
    Pool: userPool
  };
  cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      user = cognitoUser;
      //console.log('access token + ' + result.getAccessToken().getJwtToken());
      //console.log('idToken + ' + result.idToken.jwtToken);
      localStorage.setItem('token', result.idToken.jwtToken);

      cognitoUser.getSession(function(err, session) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        //console.log('session validity: ' + session.isValid());
        cognitoUser.getUserAttributes(function(err, attributes) {
          if (err) {
            // Handle error
          } else {
            console.log(attributes);
          }
        });
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: '689in92k06pd12lu9um7tl4bmb',
          Logins: {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_evimZrQDn': session.getIdToken().getJwtToken()
          }
        });
      });
      //console.log(result);
      $('#loginModal').modal('hide');
      $('#loginLogout').text('Logout');
      $('#loginLogout').attr("data-toggle", "");
      $('#loginLogout').attr("data-target", "");
      $('#loginLogout').attr("onclick", "logout()");
    },
    onFailure: function(err) {
      console.log("auth details " + authenticationDetails);
      console.log("auth details user name " + username)
      console.log(err);
      alert(err);
    },
  });
}

var logout = function() {
  cognitoUser.signOut();
  localStorage.removeItem('token');
  location.reload();
}

var isLoggedIn = function() {
  let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != undefined) {
    return true;
  }
  if (cognitoUser != null) {
    cognitoUser.getSession(function(err, session) {
      if (err) {
        alert(err);
        return false;
      }
      return true;
      //console.log('session validity: ' + session.isValid());
    });
  }
}

$(document).on("click", "#loginLogout", function() {
  $('#loginModal').modal('show');
});
