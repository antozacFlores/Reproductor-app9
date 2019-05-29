var audio;

//Hide Pause Initially
$('#pause').hide();

//Initializer-play firts Song
initAudio($('#playlist li:first-child'));
 
     function initAudio(element){
		 var song = element.attr('song');		 
		 var title = element.text();attr('song');
		 var cover = element.attr('cover');
		 var artist = element.attr('artist');
	
	 //create a new audio objet
	 audio = new Audio('media/'+song);
	 
	 if(!audio.currentTime){
		  $('#duration').html('0.00');
	 }
	 
	 $('#audio-player .title').text(title);
	 $('#audio-player .artist').text(artist);
	 
	 //Insertar Imagen
	 $('img.cover').attr('src','images/covers/' + cover);
	 
	 $('#playlist li').removeClass('active');
	 element.addClass('active');
	  }
	  
	  
	  //Boton Play
	  $('#play').click(function (){
		  audio.play ();
		  $('#play').hide()
		  $('#pause').show();
		  $('#duration').fadeIn(400);
		  showDuration();
		  });
		  
		   //Boton pause
	  $('#pause').click(function (){
		  audio.pause ();
		  $('#pause').hide()
		  $('#play').show();
		  });
		  
		   //Boton stop
	  $('#stop').click(function (){
		  audio.pause ();
		  audio.currentTime = 0;
		  $('#pause').hide()
		  $('#play').show();
		  $('#duration').fadeOut(400);
		  });
		  
		  //Next boton
	  $('#next').click(function (){
		  audio.pause ();
		 var next = $('#playlist li.active').next();
		 if(next.length ==0){
			 next = $('#playlist li: first-child');
			 }
			 initAudio (next);
			 audio.play();
			 showDuration();
		  });
		  
		  //Prev Boton
		  $('#prev').click(function (){
		  audio.pause ();
		 var prev = $('#playlist li.active').prev();
		 if(prev.length ==0){
			 prev = $('#playlist li: last-child');
			 }
			 initAudio (prev);
			 audio.play();
			 showDuration();
		  });
		  
		  		   //Playlist Song Click
	  $('#playlist li').click(function (){
		  audio.pause ();
		  initAudio($(this));
		  $('#play').hide()
		  $('#pause').show();
		  $('#duration').fadeIn(400);
		  audio.play();
		  showDuration();
		  });
		  
		  //Volumen
		  $('#volume').change(function (){
		  audio.volume = parseFloat(this.value / 10);
		  });
		  
		  //Tiempo de duracion
		  function showDuration(){
			  $(audio).bind('timeupdate', function(){
				  //Get Hours and minutes
				  var s = parseInt(audio.currentTime % 60);
				  var m = parseInt((audio.currentTime / 60)% 60);
				  //Add o if seconds less than 10
				  if(s < 10){
					  s = '0' + s;
				  }
				  $('#duration').html(m + '.' + s);
				  var value = 0;
				  if(audio.currentTime > 0){
					  value = Math.floor((100/audio.duration)*audio.currentTime);
				  }
				  $('#progress').css('width',value+'%');			  
				  });
				  }