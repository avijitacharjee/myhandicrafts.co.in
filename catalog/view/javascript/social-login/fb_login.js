 window.fbAsyncInit = function() {
  FB.init({
    appId      : '238654656758938',//Replace this App ID with Yours
    cookie     : true,  // enable cookies to allow the server to access 
    status     : true,                    // the session
    xfbml      : true,  // parse social plugins on this page
    oauth      : true,
    version    : 'v2.3' // use version 2.2
  });

  function updateButton(response) {
                button       =   document.getElementById('fb-auth');
                userInfo     =   document.getElementById('user-info');
                if (response.authResponse) {
                    button.onclick = function() {
                        FB.logout(function(response) {
                            FB.login(function(response) {
                                if (response.authResponse) {
                                    FB.api('/me', function(info) {
                                        login(response, info);
                                    });
                                } else {
                                    //user cancelled login or did not grant authorization
                              //      showLoader(false);
                                }
                            }, {
                                scope:'email,user_birthday,user_about_me'
                            });
                        });
                    };
                } else {
                    //user is not connected to your app or logged out
                    button.innerHTML = '';
                    button.onclick = function() {
                        //showLoader(true);
                        FB.login(function(response) {
                            if (response.authResponse) {
                                FB.api('/me', function(info) {
                                    login(response, info);
                                });
                            } else {
                                //user cancelled login or did not grant authorization
                          //      showLoader(false);
                            }
                        }, {
                            scope:'email,user_birthday,user_about_me'
                        });
                    }
                }
            }

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.
 // run once with current status and whenever the status changes
            FB.getLoginStatus(updateButton);
            FB.Event.subscribe('auth.statusChange', updateButton);
  };
 (function() {
    var e = document.createElement('script');
    e.async = true;
    e.src = document.location.protocol+'//connect.facebook.net/en_US/all.js';
    document.getElementById('fb-root').appendChild(e);
}()); 
function showLoader(status){
    if (status){
        $('#loading-image').show();
    }
    else
        $('#loading-image').hide();
}
 function login(response, info){
    if (response.authResponse) {
        showLoader(false);
            fqlQuery();
    }
}
function fqlQuery(){
    FB.api('/me', {fields: "id,email,first_name,last_name,middle_name,name"}, function(response) {
        $.ajax({
            url: 'index.php?route=account/login/fblogin',
            data : 'email_address='+response.email+'&fname='+response.first_name+'&lname='+response.last_name+'&dob='+response.birthday+'&login_via=facebook',
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
    });
}