/**
Used to sign in a user and establish a session with Cognito.
**/
let notConfirmed = "Please confirm your email before adding any campsites.";

var cognitoUser;
var poolData = {
  UserPoolId: 'us-east-1_evimZrQDn',
  ClientId: '689in92k06pd12lu9um7tl4bmb'
}
var loginInTooltip;

window.onload = function() {
  //NOTE THAT THIS WAS CHANGED FROM VAR TO LET
  let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
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
          console.log(err);
          return;
        }
        cognitoUser.getUserAttributes(function(err, result) {
          if (err) {
            console.log(err);
          } else {
            for (i = 0; i < result.length; i++) {
              if (result[i].getName() === 'email') {
                localStorage.setItem('email', result[i].getValue());
                console.log('success');
              }
              //console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
            }
          }
        });
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: '689in92k06pd12lu9um7tl4bmb',
          Logins: {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_evimZrQDn': session.getIdToken().getJwtToken()
          }
        });
      });
      $('#loginModal').modal('hide');
      $('#loginLogout').text('Logout');
      $('#loginLogout').attr("data-toggle", "");
      $('#loginLogout').attr("data-target", "");
      $('#loginLogout').attr("onclick", "logout()");
      loginInTooltip.classList.remove('visible');
      //loginInTooltip.style.display = 'none';
      return;
    },
    onFailure: function(err) {
      console.log(err);
      $('#msgError').text(validationError + " " + err);
      $('#errorModal').modal('show');
      return;
    },
  });
}

var getUserEmail = function() {
  let email = localStorage.getItem('email').replace(/^"(.*)"$/, '$1');
  return email;
}

var logout = function() {
  cognitoUser.signOut();
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  //loginInTooltip.style.display = '';
  //console.log('show tooltip');
  location.reload();
}

var isLoggedIn = function() {
  loginInTooltip.style.display = 'none';
  //console.log('hide tooltip');
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
  return false;
}

/*$(document).on("click", "#loginLogout", function() {
  if (cognitoUser == null || cognitoUser == undefined) {
    $('#loginModal').modal('show');
}
});*/

// Once the page is loaded add an onclick function to loginlogout div
$(document).ready(function() {
  loginInTooltip = document.getElementById('signInTooltip');

  //If user is NOT logged in
  if (cognitoUser == null || cognitoUser == undefined) {
    $('#loginLogout').attr("onclick", "login()");
    //Show tooltip
    console.log('THIS MEANS USER IS NOT LOGGED IN');
    loginInTooltip.classList.add('visible');
  }
});

// funtion that shows login modal
function login() {
  $('#loginModal').modal('show');
}
