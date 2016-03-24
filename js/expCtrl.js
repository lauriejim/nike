var exp = {
	start : function (newStory) {
		console.log(newStory);
		this.story = newStory;
		this.consequence = false;
		video.init();
		diary.init();
		profil.init();
		video.load(this.story.video);
		$("footer ul li").removeClass('active');
		$("footer ul li:nth-child("+this.story.chapter+")").addClass('active');
		$("footer p.chapter"+this.story.chapter+" span:nth-child(3)").html(this.story.title);


		/* resize body */
		$("body").css("height",$(window).height()+"px");

		/* centering of diary */
 		var newLeft = ($(window).width()/2)-($("#diary").width()/2);
 		$("#diary").css("left", newLeft+"px");

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

		/* pagination chapters */
		$("footer ul li.active").mouseover(showChapter);
		function showChapter(){
		  var classLi = $(this).attr('class');
		  var classTab = classLi.split(" ");
		  var p = $("footer p."+classTab[0]);
		  p.addClass("active");
		  var leftP = $(this).position().left + $(this).parent().position().left + 10;
		  p.css("left",leftP+"px");
		  $("footer ul li").mouseout(hideChapter);
		}
		function hideChapter(){
		  var classLi = $(this).attr('class');
		  var classTab = classLi.split(" ");
		  var p = $("footer p."+classTab[0]);
		  p.removeClass("active");
		}

		/* centering of end chapter part */
		var hVid = $(window).height()-60;
		var hEndPart = $("#endChapter").height();
		var topMiddle = (hVid/2)-(hEndPart/2)-100;
		$("#endChapter").css("top",topMiddle+"px");
		var lVid = $(window).width();
		var lEndPart = $("#endChapter").width();
		var leftMiddle = (lVid/2)-(lEndPart/2);
		$("#endChapter").css("left",leftMiddle+"px");

	},
	stopVideo : function () {
		video.stop();
		clearInterval(video.timer);
		diary.render();
	},
	getNextStory : function (rep) {
		user.choice.push({choice: this.story.content, rep: rep});
		console.log(user.choice);
		var storyChoice = false;
		var solution = false;
		var negation = false;
		var indice = 0;
		var words = rep.split(' ');

		for ( var x = 1 ; x < this.story.solution.length ; x++ ) {

			for ( var y = 0 ; y < this.story.solution[x].word.length ; y++ ) {

				for ( var z = 0 ; z < words.length ; z++ ) {
					if (words[z] == 'pas') {
						negation = true;
					}
					var pourcentage = exp.compareStr(words[z], this.story.solution[x].word[y] );
					if (pourcentage >= 70) {
						exp.solution = this.story.solution[x];
						storyChoice =  this.story.solution[x].story;
						indice = x;
						console.log('answer existe');
					}
				}

			}

		}

		if ( storyChoice == false ) {
			storyChoice = this.story.solution[0].story;
			exp.solution = this.story.solution[0];
			console.log('default solution');
		}

		if (negation) {
			if (indice == 1) {
				storyChoice = this.story.solution[2].story;
				exp.solution = this.story.solution[2];
			}else{
				storyChoice = this.story.solution[1].story;
				exp.solution = this.story.solution[1];
			}
		}

		$("#endChapter .text").html(exp.solution.conclusion);
		$("#endChapter h2").html(exp.story.title);
		$("#endChapter .chapter").html('Chapitre '+exp.story.chapter);

		// execute les modif de la solution choisi // tableau de solution
		if (exp.solution.add != undefined) {
			console.log(exp.solution.add);
			for (var a = 0 ; a < exp.solution.add.length ; a++) {
				var info = exp.solution.add[a].split(':');
				if (info[0] == 'km') {
					user.addKm(info[1]);
				}
				if (info[0] == 'v') {
					user.addSpeed(info[1]);
				}
			}
			user.addTime();
		}

		console.log(storyChoice);
		console.log(story[storyChoice]);
		if (story[storyChoice].video == undefined) {
			if (story[storyChoice].end != undefined) {
				diary.lastChoice = false;
				this.story = story[storyChoice];
				diary.close();
				video.end();
				exp.nextStory();
			}else{
				diary.lastChoice = this.story.content+' '+rep+'. ';
				this.story = story[storyChoice];
				$("textarea").val('').focus();
				$("textarea").height(29+"px");
				diary.render();
			}
		}else if (exp.solution.consequence != undefined) {
			exp.consequence = true;
			diary.lastChoice = false;
			this.story = story[storyChoice];
			diary.close();
			video.end();
			setTimeout(function () {
				video.load(exp.solution.consequence);
			}, 2000);
		}else{
			diary.lastChoice = false;
			this.story = story[storyChoice];
			diary.close();
			video.end();
			exp.nextStory();
		}
	},
	nextStory: function () {
		if ($("#endChapter .text").html() != '') {
			$("#endChapter").addClass('rendered');
			$("#endChapter .buttonNext").on('click', function () {
				$("#endChapter").removeClass('rendered');
				if (exp.story.end == undefined) {
					setTimeout(function () {
						controller.nextStory(exp.story);
					}, 2000);
				}else{
					profil.close();
					setTimeout(function () {
						controller.endStory();
					}, 2000);
				}
			});
		}else{
			setTimeout(function () {
				controller.nextStory(exp.story);
			}, 2000);
		}
	},
	compareStr : function (userAnswer, goodAnswer){
        var result = 0;
        var plusGrandChaine = 0;

        // Passage de la réponse en minuscule
        // De même pour la bonne réponse
        userAnswer = userAnswer.toLowerCase();
        goodAnswer = goodAnswer.toLowerCase();

        if(userAnswer.length > goodAnswer.length)
            plusGrandChaine = userAnswer.length;
        else
            plusGrandChaine = goodAnswer.length;

        // On récupère le nombre de caractère d'écart entre la réponse et la bonne réponse
        result = exp.levenshteinDistance(userAnswer, goodAnswer);

        // On mets ça sous forme de pourcentage pour avoir le degré de ressemblance
        var pourcentage = (plusGrandChaine-result)*100/plusGrandChaine;

        return pourcentage;
    },
    levenshteinDistance : function (a, b){
      if(a.length == 0) return b.length; 
      if(b.length == 0) return a.length; 
     
      var matrix = [];
     
      // increment along the first column of each row
      var i;
      for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
      }
     
      // increment each column in the first row
      var j;
      for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
      }
     
      // Fill in the rest of the matrix
      for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
          if(b.charAt(i-1) == a.charAt(j-1)){
            matrix[i][j] = matrix[i-1][j-1];
          } else {
            matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                    Math.min(matrix[i][j-1] + 1, // insertion
                                             matrix[i-1][j] + 1)); // deletion
          }
        }
      }
     
      return matrix[b.length][a.length];
    }
}

var video = {
	init : function () {
		this.media = $("video")[0];
		video.consequence = false;
		$(this.media).on('canplaythrough', function () {
			video.play();
		});
		$(this.media).on('ended', function () {
			if (exp.consequence){
				video.end();
				exp.nextStory();
			}else{
				exp.stopVideo();	
			}
		});
	},
	load : function (media) {
		$("#button").removeClass('off').addClass('loading');
		console.log('video load', media);
		var mp4 = 'assets/'+media+'.mp4';
		var ogg = 'assets/'+media+'.ogv';
		$("video source:nth-child(1)").attr('src', mp4);
		$("video source:nth-child(2)").attr('src', ogg);
		this.media.load();
		this.media.muted = false;
		this.media.volume = 0.1;
	},
	play : function () {
		console.log('video play');
		$("#loader").removeClass('loading').addClass('off');
		$(this.media).addClass('play');
		this.media.play();
	},
	stop : function () {
		$(this.media).removeClass('play').addClass('stop');
		console.log('fade video');
	},
	end : function () {
		$(this.media).removeClass();
		console.log('end video');
	}
}

var diary = {
	init : function () {
		this.diary = $("#diary");
		this.para = $("#diaryContent");
		this.lastChoice = false;
		$("textarea").attr('onkeypress', 'diary.addRow(event)');
		$("form").on('submit', function( event ) {
		  event.preventDefault();
		  $("textarea").removeAttr('maxlength');
		  $("textarea").removeAttr('onkeypress');
		  exp.getNextStory($("textarea").val());
		});


	},
	render : function () {
		$("textarea").attr("placeholder", exp.story.placeholder);
		if (exp.story.rules != undefined) {
			console.log('rules find');
			diary.rules();
		}
		if (!this.lastChoice) {
			this.para.html(exp.story.content);
		}else{
			console.log('last Choice')
			this.para.html(this.lastChoice+exp.story.content);
		}
		this.diary.removeClass( 'closed' ).addClass( 'rendered' );
		setTimeout( function () {
			$("textarea").focus();
		}, 2000);
	},
	close : function () {
		$(this.diary).removeClass('rendered').addClass('closed');
		$("textarea").blur();
		setTimeout( function () {
			$("textarea").height(29+"px");
			$("textarea").val('');
		}, 2000);
	},
	rules : function () {
		$("textarea").attr('onkeypress', 'diary.addRow(event)');
		for (var j = 0 ; j < exp.story.rules.length ; j++) {
			if (exp.story.rules[j].type == 'limit') {
				$("textarea").attr('maxlength', exp.story.rules[j].param);
			}
			if (exp.story.rules[j].type == 'num') {
				$("textarea").attr('onkeypress', 'diary.onlyNum(event); diary.addRow(event)');
			}
			if (exp.story.rules[j].type == 'space') {
				$("textarea").attr('onkeypress', 'diary.oneWord(event); diary.addRow(event)');
			}
		}

	},
	onlyNum : function (evt) {
	 	var evt = evt || window.event;
		var key = evt.keyCode || evt.which;
		keyFcc = String.fromCharCode( key );
		var regex = /[0-9]|\./;
		if( !regex.test(keyFcc) && key != 13) {
			evt.returnValue = false;
			if(evt.preventDefault) evt.preventDefault();
		}
	},
	oneWord : function (evt) {
	 	var evt = evt || window.event;
		var key = evt.keyCode || evt.which;
		if(key == 32) {
			evt.returnValue = false;
			if(evt.preventDefault) evt.preventDefault();
		}
	},
	addRow : function (evt) {
		var evt = evt || window.event;
		var key = evt.keyCode || evt.which;
		if (key == 13) {
			evt.returnValue = false;
			if (evt.preventDefault) evt.preventDefault();
			if ($("textarea").val().length > 1) $("form").submit();
		}
		if ( ($("textarea").val().length+1)%92 == 0 ) {
			$("textarea").height($("textarea").height()+60+"px");
		}
	}
}

var profil = {
	init : function () {
		if (user.params.km > 500 && user.params.km <= 1000) {
			user.params.shoesPic = 'Nike-Free-50';
			user.params.shoesName = 'Nike Free 5.0+';
		}

		if (user.params.km > 1000) {
			user.params.shoesPic = 'Nike-Tailwind-6';
			user.params.shoesName = 'Nike Tailwind 6';
		}

		$("#miniBar .miniPicture")[0].src = user.params.picture;
		$(".leftBloc  .profilPicture")[0].src = user.params.picture;
		$("#miniBar p").html(user.params.firstname+' '+user.params.lastname);
		$("#profilDescription ul li:nth-child(1)").html(user.params.firstname+' '+user.params.lastname);
		$("#profilDescription ul li:nth-child(2)").html(user.params.birthday+' ANS');
		$("#profilDescription ul li:nth-child(3)").html(user.params.country);
		$("#profilStats .profilKm").html(user.params.km);
		$("#profilStats .profilCalories").html(user.params.cal);
		$("#profilStats .profilAverage").html(user.params.speed);
		$("#profilStats .profilHours").html(user.params.time);
		$("#profilShoes a img").attr('src', 'assets/'+user.params.shoesPic+'.png');
		$("#profilShoes p:nth-child(2)").html(user.params.shoesName);

		console.log('profil load');
	},
	close : function () {
		$(".miniBar").addClass('closed');
	}
}