(function () {
    'use strict';
    Lampa.Platform.tv();

   window.lampa_settings.torrents_use = true;
   window.lampa_settings.demo = false;
   window.lampa_settings.read_only = false;
   window.lampa_settings.plugins_use = false;
   window.lampa_settings.account_use = true;

    var timer = setInterval(function(){
        if(typeof Lampa !== 'undefined'){
            clearInterval(timer);

            if(!Lampa.Storage.get('set','false')) start_set();
		 
        }
    },200);
	
    function start_set(){
             Lampa.Storage.set('set','true');
             Lampa.Storage.set('source', 'cub');
	     Lampa.Storage.set('screensaver', 'true');
	     Lampa.Storage.set('jack','true');
	     Lampa.Storage.set('lampac_initiale','true');
             Lampa.Storage.set('source','cub');
             Lampa.Storage.set('parser_use','true');
             Lampa.Storage.set('jackett_url','http://45.67.35.16:9118');
             Lampa.Storage.set('jackett_key','1');
             Lampa.Storage.set('parser_torrent_type','jackett');
	        location.reload()
    } 
	
    Lampa.Utils.putScriptAsync([
	    'https://sb1969vb.github.io/proba/cub_off.js',
            'https://sb1969vb.github.io/proba/addon.js',
	    'https://45.67.38.16:9118/ts.js',
	    'https://cub.red/plugin/collections'
    ], function () {});
      var initMarker = 0;

      function hideIT(){

                document.addEventListener('DOMSubtreeModified', function removeAD(event){
		  var cardElements = document.getElementsByClassName('card');
		  if(cardElements.length > 0){
			if (initMarker == 0) {
			  initMarker = 1 // Флаг
			  setTimeout(function(){
 				  $('.selectbox-item__lock').parent().css('display', 'none');
				  $('.settings-param-title').last().css('display', 'none');
			  }, 50)
			  setTimeout(function(){
				  initMarker = 0 // Снимаем флаг
			  }, 500)
			}
		  }
		}, false);
		
		var myCardInterval = setInterval(function(){
			if (document.querySelector('.card') !== null) {
				$('.card').on('hover:long', function () {
						setTimeout(function(){	
							$('.selectbox-item__lock').parent().css('display', 'none');
							$('.settings-param-title').last().css('display', 'none');
						},50)
				})
				clearInterval(myCardInterval);
			 }
		}, 100);
		var myTextBoxInterval = setInterval(function(){
			if (document.querySelector('.card__textbox') !== null) {
				$('.card__textbox').parent().parent().remove();
				clearInterval(myTextBoxInterval);
			}
		}, 100);
	}
	
    function cub_off() {

	 setTimeout(function(){
              $('.open--feed').remove();
              $('.open--premium').remove();
	      $('.open--notice').remove();
          }, 1000);

	  Lampa.Settings.listener.follow('open', function (e) {
             /*if (e.name == 'account') {
	        setTimeout(function(){
		    $('.settings--account-premium').remove()
		    $('div > span:contains("CUB Premium")').remove()
		},0);
             }*/
	     if (e.name == 'main') {
                setTimeout(function() {
                  $('div[data-component="tmdb"]').remove();
                }, 0)
	     }
          });
	
	  Lampa.Listener.follow('full', function(e) {
                if (e.type == 'complite') {
		  $('.button--book').on('hover:enter', function(){
		    setTimeout(function(){	
			$('.selectbox-item__lock').parent().css('display', 'none');
			$('.settings-param-title').last().css('display', 'none');
		    },0)
		  });	  
                   setTimeout(function(){
			$('.button--subscribe').remove();
			$(".view--online", Lampa.Activity.active().activity.render()).empty().append('<svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg>Онлайн');
		   },0);
                }
          })   
  
          Lampa.Storage.listener.follow('change', function (event) {
               if (event.name == 'activity') {
	              if (Lampa.Activity.active().component === 'bookmarks') {
					$('.register:nth-child(4)').hide();
					$('.register:nth-child(5)').hide();
					$('.register:nth-child(6)').hide();
					$('.register:nth-child(7)').hide();
					$('.register:nth-child(8)').hide();
		       }
		       setTimeout(function(){
			hideIT();
		       }, 200)
                }
          });

}	
if(window.appready) cub_off();
	else {
		Lampa.Listener.follow('app', function(e) {
			if(e.type == 'ready') {
				cub_off(); hideIT();
				$("[data-action=feed]").eq(0).remove();
                                $("[data-action=subscribes]").eq(0).remove();
				$("[data-action=anime]").eq(0).remove();
                                $("[data-action=mytorrents]").eq(0).remove();
                                $("[data-action=about]").eq(0).remove();
                                $("[data-action=console]").eq(0).remove();
			}
		});
	}
})();
