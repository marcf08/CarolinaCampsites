/**
Used to sign in a user and establish a session with Cognito.
**/

let user;

var credKeys = [
  'accessKeyId',
  'secretAccessKey',
  'sessionToken'
];

let signon = function(username, password) {
  let authenticationData = {
    Username: username,
    Password: password,
  };

  //May change this to aws cognito identity service provider
  let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  let poolData = {
    UserPoolId: 'us-east-1_evimZrQDn',
    ClientId: '689in92k06pd12lu9um7tl4bmb'
  };

  let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  let userData = {
    Username: username,
    Pool: userPool
  };

  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      user = cognitoUser;
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      /*Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
      console.log('idToken + ' + result.idToken.jwtToken);
      cognitoUser.getSession(function(err, session) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('session validity: ' + session.isValid());

            // NOTE: getSession must be called to authenticate user before calling getUserAttributes
            cognitoUser.getUserAttributes(function(err, attributes) {
                if (err) {
                    // Handle error
                } else {
                    // Do something with attributes
                }
            });

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : '...', // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : session.getIdToken().getJwtToken()
                }
            });

            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();

        });
      console.log(result);
      cognitoUser.getUserAttributes(function(err, result) {
        if (err) {
          alert(err);
          return;
        }
        for (i = 0; i < result.length; i++) {
          console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
        }
      });
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

let logout = function() {
  //console.log(AWS.config.credentials.get());
  location.reload();
}
