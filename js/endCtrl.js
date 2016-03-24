var end = {
	start : function () {
		console.log('endStory');
		//profil.init();
		$("#loader").removeClass('loading').addClass('off');

		/* resize body */
		$("body").css("height",$(window).height()+"px");
		$("#endStory").css("height",$(window).height()+"px");

		/* user info animation */
		$("#miniBar").mouseenter(changeClass);
		function changeClass(){
		  $("#miniBar").css("transition-delay","0s");
		  $("#miniBar").removeClass("visible");
		  $("#profilBar").css("transition-delay",".2s");
		  $("#profilBar").addClass("visible");
		}
		$("#profilBar").mouseleave(changeClassInverse);
		function changeClassInverse(){
		  $("#profilBar").css("transition-delay","0s");
		  $("#profilBar").removeClass("visible");
		  $("#miniBar").css("transition-delay",".2s");
		  $("#miniBar").addClass("visible");
		}

		/* centering of end chapter part */
		var hVid = $(window).height()-60;
		var hEndPart = $("#endChapter").height();
		var topMiddle = (hVid/2)-(hEndPart/2);
		$("#endChapter").css("top",topMiddle+"px");
		var lVid = $(window).width();
		var lEndPart = $("#endChapter").width();
		var leftMiddle = (lVid/2)-(lEndPart/2);
		$("#endChapter").css("left",leftMiddle+"px");

		setTimeout(function (){
			$("#endStory").removeClass("off");
		}, 250)

		$("button.restart").on('click', function () {
			window.location.href = "http://jimlaurie.me/nike";
		});

		$("button.athlete").on('click', function () {
			end.show();
		});
	}, 

	show : function () {
		$("#athletePage").addClass("rendered");
		$("#endStory").addClass("off");
		$("body").css("height",$("#athletePage").height()+"px");
		setTimeout(function () {
			$("#endStory").remove();
		}, 2000);
	}
}

/*var profil = {
	init : function () {
		$("#miniBar .miniPicture")[0].src = user.params.picture;
		$(".leftBloc  .profilPicture")[0].src = user.params.picture;
		$("#miniBar p").html(user.params.firstname+' '+user.params.lastname);
		$("#profilDescription ul li:nth-child(1)").html(user.params.firstname+' '+user.params.lastname);
		$("#profilDescription ul li:nth-child(2)").html(user.params.birthday+' ANS');
		$("#profilStats .profilKm").html(user.params.km);
		$("#profilStats .profilCalories").html(user.params.cal);
		$("#profilStats .profilAverage").html(user.params.speed);
		$("#profilStats .profilHours").html(user.params.time);
		console.log('profil load');
	},
	close : function () {
		$(".miniBar").addClass('closed');
	}
}*/


















