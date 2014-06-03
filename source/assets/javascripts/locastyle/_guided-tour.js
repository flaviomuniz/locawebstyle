var locastyle = locastyle || {};

locastyle.guidedTour = (function() {
  'use strict';

	var jsonTour;

	var config = {
		selectors : {
			init:  '.ls-btn-tour',
			close: '.btn-close',
			tour:  '.ls-alerts-list > a',
      feedback: '#feedbackr'
		}
	}

	function init(jsonSteps){
		checkTour(jsonSteps);
	}

	// Override default selectors if user provide
	function checkTour(jsonSteps){
		if(jsonSteps && jsonSteps.selectors && hopscotch){
			$.each( config.selectors, function(key,selector){
				jsonSteps.selectors[key] = jsonSteps.selectors[key] || config.selectors[key];
			});
			setTour(jsonSteps);
			setCookie();
		}
	}

	function setTour(tour){
		jsonTour = tour;
		// $(config.selectors.open).on({click: openWelcomeTour});
		$(config.selectors.init).on({click: initTour});
		$(config.selectors.close).on({click: closeWelcomeTour});
	}

	function openWelcomeTour(e){
    // $(config.selectors.tour).toggleClass('ls-active');
    $(config.selectors.feedback).trigger('click');
    $(config.selectors.init).focus().attr('tabindex', '-1');
		e ? e.preventDefault() : null;
	}

	function initTour(){
		hopscotch.endTour();
		hopscotch
		hopscotch.startTour(jsonTour, 0);
		keyCode();
		closeWelcomeTour();
	}

	function closeWelcomeTour(){
		// $(config.selectors.tour).removeClass('ls-active');
    $(config.selectors.feedback).trigger('click');
	}

	function keyCode(element){
		var left = 39;
		var right = 37;
		var esc = 27;
		var stepsSize = hopscotch.getCurrTour().steps.length;
		$('body').off('keyup').on('keyup', function(e){
			var key = e.keyCode
			if( hopscotch.getCurrStepNum() < stepsSize && hopscotch.getState() ){
				if( key === 39){ hopscotch.nextStep(); }
				if( key === 37){ hopscotch.prevStep(); }
			}
			if( key === 27  ){	hopscotch.endTour();  }
		});
	}

	function setCookie(){
		if($.cookie("cookie_tour") != "true"){
			$(config.selectors.tour).trigger('click');
      $(config.selectors.init).focus().attr('tabindex', '-1');
			$.cookie('cookie_tour', "true");
		}
	}

	function userAborted(xhr) {
		return !xhr.getAllResponseHeaders();
	}

	return {
		init: init,
		openWelcomeTour: openWelcomeTour,
		closeWelcomeTour: closeWelcomeTour
	};

}());