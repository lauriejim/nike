var controller = {
	init : function () {
		if (typeof window.location.search != '' && window.location.search != ''){
		    var get = window.location.search.split('=');
		    console.log(get);
		    if(get[0] == '?code'){
		    	function whenFbLoaded (callback) {
				  if (typeof FB === 'undefined') {
				    setTimeout (function () {
				       whenFbLoaded (callback);
				    }, 100);
				  } else { callback (); }
				}
				whenFbLoaded (function () {
				    controller.fbconnect();
				});
		    }else{
		    	$("#content").load( 'template/intro.html' , function () {
					intro.start();
				});
		    }
		}else{
		    $("#content").load( 'template/intro.html' , function () {
		    	console.log('init start');
				intro.start();
			});
		}
	},
	experience : function () {
		$("#loader").removeClass('off').addClass('loading');
		$("#content").load( 'template/experience.html' , function () {
			console.log('experience load');
			exp.start(story.gift);
		});
	},
	nextStory : function (rep) {
		$("#loader").removeClass('off').addClass('loading');
		$("#content").load( 'template/experience.html' , function () {
			console.log('experience load');
			exp.start(rep);
		});
	},
	endStory : function () {
		$("#content").load( 'template/end.html' , function () {
			console.log('end load');
			end.start();
		});
	},
	fbconnect : function (){
        FB.init({
          appId      : '204080709778846', // App ID
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
        });
	    // Get url parameters
        FB.getLoginStatus(function(response)
        {
          if(response.status === 'connected'){
          // connected
          FB.api('/me', function(userInfo) {
              // Get all user informations
              console.log(userInfo);
              user.params.email = userInfo.email;
              user.params.firstname = userInfo.first_name.toUpperCase();
              user.params.lastname = userInfo.last_name.toUpperCase();
              if (userInfo.locale == "fr_FR") {
              	user.params.country = "FRANCE";
              }else{
              	user.params.country = "INTERNATIONAL";
              }
              user.params.picture = "http://graph.facebook.com/"+userInfo.username+"/picture?width=720&height=720";
              var actualYear = new Date().getFullYear();
              var userBirthday = userInfo.birthday.split('/');
              user.params.birthday = actualYear-userBirthday[2];
              
              console.log('user info creat');
              console.log(user);
              $( "#creatUser" ).removeClass('rendered');
			  setTimeout(function () {
			  	controller.experience();
			  }, 2000);
              // If the user isn't subscribed, we subscribe him else we connect him
            });
          }else if(response.status === 'not_authorized'){
          // not_authorized
          login();
          }else{
          // not_logged_in
          login();
          }
        });
      function login(_self) {
        var urlRedirect = document.URL;
        window.location = "https://facebook.com/dialog/oauth?client_id=204080709778846&response_type=code&redirect_uri=" + urlRedirect + "&scope=email,user_birthday";
      }
	  console.log("FB Connect");
	}  
}
controller.init();