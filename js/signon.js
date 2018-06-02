/**
Used to sign in a user and establish a session with Cognito.
**/

let signon = function (username, password){
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

  console.log("auth details " + authenticationDetails);
  console.log("auth details user name " + username)
  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      /*Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
      console.log('idToken + ' + result.idToken.jwtToken);
    },
    onFailure: function(err) {
      console.log("auth details " + authenticationDetails);
      console.log("auth details user name " + username)
      console.log(err);
      alert(err);
    },
  });
}
