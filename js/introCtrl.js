var intro = {
	start : function () {
		this.story = story.intro;
		video.init();
		video.load(this.story.video);

		var year = new Date().getFullYear();
		for (var i=0 ; i <= 100 ; i++) {
			var oneOption = document.createElement('option');
			oneOption.text = year - i;
			oneOption.value = year - i;

			document.getElementById('dateA').options[i] = oneOption;
		}

		var day = 1;
		for (var i=0 ; i <= 30 ; i++) {
			var twoOption = document.createElement('option');
			var d = day + i;
			if(i>=0 && i<9){
				twoOption.text = "0"+d;
			}else{
				twoOption.text = d;
			}
			twoOption.value = day + i;

			document.getElementById('dateJ').options[i] = twoOption;
		}
		
		/* resize body */
		$("body").css("height",$(window).height()+"px");
	},
	playVideo : function () {
		video.play();
	},
	endVideo : function () {
		video.end();
	},
	getStart : function () {
		$("#start").addClass('rendered');
		$("#getStart").on('click', function () {
			$( "#start" ).removeClass( 'rendered' );
			$( "#creatUser" ).addClass( 'rendered' );
			setTimeout(function () {
				$( "#start" ).remove();
			}, 2000)
			intro.creatUser();
		});
	},
	creatUser : function () {
		$( "#creat" ).on('click', function () {
			controller.fbconnect();
		});
		$("form").submit(function( event ) {
		  event.preventDefault();
		  console.log('user creat form');
		  user.params.firstname = $("#firstname").val().toUpperCase();
		  user.params.lastname = $("#lastname").val().toUpperCase();
		  user.params.picture = "assets/profile-picture.jpg";
          user.params.country = $("#country").val().toUpperCase();
          var actualYear = new Date().getFullYear();
          user.params.birthday = actualYear-$("#dateA").val();
		  controller.experience();
		});
	}
}

var video = {
	init : function () {
		this.media = $("video")[0];
		$(this.media).on('canplaythrough', function () {
			intro.playVideo();
		});
		$(this.media).on('ended', function () {
			intro.endVideo('end');
		});
		$("#skip").on('click', function () {
			video.skip();
		});
	},
	load : function (media) {
		console.log('intro load');
		var mp4 = 'assets/'+media+'.mp4';
		var ogg = 'assets/'+media+'.ogv';
		$("video source:nth-child(1)").attr('src', mp4);
		$("video source:nth-child(2)").attr('src', ogg);
		this.media.load();
		this.media.muted = false;
		this.media.volume = 0.1;
		

	},
	play : function () {
		console.log('intro play');
		$("#loader").removeClass('loading').addClass('off');
		$("#skip").addClass('rendered');
		$(this.media).addClass('play');
		this.media.play();
	},
	end : function (type) {
		if (type == 'end') {
			$("#skip").removeClass('rendered');
			$(this.media).removeClass('play');
			console.log('end video');
			setTimeout(function () {
				$("#skip").remove();
				clearInterval(video.timer);
				intro.getStart();
			}, 2000);
		}else{
			$("#skip").remove();
			clearInterval(video.timer);
			intro.getStart();
		}
	},
	skip : function () {
		console.log('skip');
		$("#skip").removeClass('rendered');
		$(this.media).removeClass('play');
		video.timer = setInterval(function () {
			if (video.media.volume > 0.02) {
				video.media.volume = video.media.volume-0.02
			}else{
				video.media.volume = 0;
				video.media.pause();
				video.end('skip');
			}
		}, 250);
	}
}