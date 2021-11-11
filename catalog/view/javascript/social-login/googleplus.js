var auth2 = {};
/**
 * jQuery initialization
 */
/* $(document).ready(function() {
  //$('#disconnect').click(helper.disconnect);
  //$('#loaderror').hide();
  if ($('meta')[0].content == '1080475642314-pbi4ohnl87mnduaofvtr62fjtb36597q.apps.googleusercontent.com') {
    alert('This sample requires your OAuth credentials (client ID) ' +
        'from the Google APIs console:\n' +
        '    https://code.google.com/apis/console/#:access\n\n' +
        'Find and replace YOUR_CLIENT_ID with your client ID.'
    );
  } 
}); */

/**
 * Handler for when the sign-in state changes.
 *
 * @param {boolean} isSignedIn The new signed in state.
 */
/* var updateSignIn = function() {
  console.log('update sign in state');
  if (auth2.isSignedIn.get()) {
      
    console.log('signed in');
    //gapi.auth2.getAuthInstance();
      
      gapi.client.plus.people.get({
        'userId': 'me'
      }).then(function(res) {
          
        var profile = res.result;    
        //console.log(profile);    
        var firstname = profile.name.givenName; 
        var Lastname  = profile.name.familyName;
        var email     = profile.emails[0].value;
          
      //console.log("email = "+email);
      //console.log("lastname = "+Lastname);
      //console.log("firstname = "+firstname);          
       $.ajax({
            url: 'index.php?route=account/login/googlePlusLogin',
            data : 'email_address='+email+'&fname='+firstname+'&lname='+Lastname+'&login_via=googleplus',
            type : 'post',
            success: function(result) {
                if(result == 'success'){
                    window.location.reload();
                } else if(result == 'registered'){
                    window.location.reload();
                } else{
                    $('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i>Error: Please try again later or login with password</div>').insertBefore($('div.account-login'));
                }
            }
        });
          
      }, function(err) {
        var error = err.result;
        $('#profile').empty();
        $('#profile').append(error.message);
      });
  
  }else{
    console.log('signed out');
    //helper.onSignInCallback(gapi.auth2.getAuthInstance());
  }
} */

/**
 * This method sets up the sign-in listener after the client library loads.
 */
/* function startApp() {
  gapi.load('auth2', function() {
    gapi.client.load('plus','v1').then(function() {
      gapi.signin2.render('signin-button', {
          scope: 'https://www.googleapis.com/auth/plus.login',
          fetch_basic_profile: false });
        
      gapi.auth2.init({fetch_basic_profile: false,
          scope:'https://www.googleapis.com/auth/plus.login'}).then(
            function (){
              console.log('init');
              auth2 = gapi.auth2.getAuthInstance();
              auth2.isSignedIn.listen(updateSignIn);
              auth2.then(updateSignIn);
            });
    });
  });
} */

// for google plus
// function startApp() {
//   gapi.load('auth2', function() {
//     gapi.client.load('plus','v1').then(function() {
//       gapi.signin2.render('signin-button', {
//           'scope': 'profile email',
//           //scope: 'https://www.googleapis.com/auth/plus.login',
//            'onsuccess': onSuccess,
//           fetch_basic_profile: true });
//     });
//   });
// }


// for google plus
// function onSuccess(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     gapi.client.load('plus', 'v1', function () {
//         var request = gapi.client.plus.people.get({
//             'userId': 'me'
//         });
//         //Display the user details
//         request.execute(function (res) {
         
//           var profile = res.result;    
//         //console.log(profile);    
//         var firstname = profile.name.givenName; 
//         var Lastname  = profile.name.familyName;
//         var email     = profile.emails[0].value;
                 
//        $.ajax({
//             url: 'index.php?route=account/login/googlePlusLogin',
//             data : 'email_address='+email+'&fname='+firstname+'&lname='+Lastname+'&login_via=googleplus',
//             type : 'post',
//             success: function(result) {
//                 if(result == 'success'){
//                     window.location.reload();
//                 } else if(result == 'registered'){
//                     window.location.reload();
//                 } else{
//                     $('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i>Error: Please try again later or login with password</div>').insertBefore($('div.account-login'));
//                 }


//                 // Load Google Auth2 lib, and log the user out
//                 gapi.load('auth2', function() {
//                     var auth2 = gapi.auth2.getAuthInstance();
//                     auth2.signOut();
//                     //console.log('Logged out.');
//                 });


//             }
//         });

//         });
//     });
// }


// for google
function onSuccess(googleUser) {
  var profile = googleUser.getBasicProfile();
  
  var firstname = profile.getGivenName(); 
  var Lastname  = profile.getFamilyName();
  var email     = profile.getEmail();
  // console.log(firstname);
  // console.log(Lastname);
  // console.log(email);
 $.ajax({
      url: 'index.php?route=account/login/googlePlusLogin',
      data : 'email_address='+email+'&fname='+firstname+'&lname='+Lastname+'&login_via=google',
      type : 'post',
      success: function(result) {
          if(result == 'success'){
              window.location.reload();
          } else if(result == 'registered'){
              window.location.reload();
          } else{
              $('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i>Error: Please try again later or login with password</div>').insertBefore($('div.account-login'));
          }


          // Load Google Auth2 lib, and log the user out
          gapi.load('auth2', function() {
              var auth2 = gapi.auth2.getAuthInstance();
              auth2.signOut();
              //console.log('Logged out.');
          });
      }
  });
}


// for google
function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    // 'onfailure': onFailure
  });
}

