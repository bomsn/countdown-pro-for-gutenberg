
  /**
   * WordPress dependencies
   */
  const { __ } = window.wp.i18n;
  const { select, subscribe } = window.wp.data;
  /**
   * Internal dependencies
   */
  import {getTimeRemaining, RadialProgress, daysOfTheYear} from './helpers';


  /**
   * Define Variables
   */
  var updateCounterInterval = [],
      progress = { days: [], hours: [], minutes: [], seconds: [] };

  /**
   * Define Main Functions
   */
  const updateCounter = function ( element, index, daysOfYear, refresh = false ) {
    // If countdown element doesn't exist, stop the timer and bail out.
    if( typeof(document.getElementsByClassName('cpfg-countdown')[index]) === 'undefined' ){
      if( typeof(updateCounterInterval[index]) !== 'undefined' ){
        stopCounter(index);
      }
      return;
    };

    // Bail out if datetime isn't defined
    if ( typeof element.dataset.datetime === 'undefined' ) {
      return;
    }

    // Get remaining time and update count
  	var timeRemaining,
  		  innerHTML,
  		  message,
  		  days,
        daysDigits,
        daysPercentage,
  		  hours,
  		  hoursDigits,
  		  hoursPercentage,
        minutes,
        minutesDigits,
        minutesPercentage,
    		seconds,
    		secondsDigits,
    		secondsPercentage;

  		timeRemaining = getTimeRemaining( element.dataset.datetime );
      message = element.dataset.message;
  		days = (element.dataset.days === 'true');
  		hours = (element.dataset.hours === 'true');
  		minutes = (element.dataset.minutes === 'true');
  		seconds = (element.dataset.seconds === 'true');

  		if ( timeRemaining ) {
        if(days){
          daysDigits = element.getElementsByClassName('cpfg-days')[0].childNodes[0].childNodes[0];
          // update only if the current element value is different from the dynamically retrieved value.
          if( daysDigits.textContent !== timeRemaining.days.toString() || refresh === true ){
              daysDigits.innerHTML = timeRemaining.days;
            // Show progress if it's set
            if( typeof(progress.days[index]) !== 'undefined' ){
              daysPercentage = (100 * timeRemaining.days) / daysOfYear;
              progress.days[index].setProgress(100 - daysPercentage, 0.5);
            }
          }

        }
        if(hours){
          hoursDigits = element.getElementsByClassName('cpfg-hours')[0].childNodes[0].childNodes[0];
          // update only if the current element value is different from the dynamically retrieved value.
          if( hoursDigits.textContent !== timeRemaining.hours.toString() || refresh === true ){
              hoursDigits.innerHTML = timeRemaining.hours;
              // Show progress if it's set
              if( typeof(progress.hours[index]) !== 'undefined' ){
                hoursPercentage = (100 * timeRemaining.hours) / 24;
                progress.hours[index].setProgress(100 - hoursPercentage, 0.5);
              }
          }
        }
        if(minutes){
          minutesDigits = element.getElementsByClassName('cpfg-minutes')[0].childNodes[0].childNodes[0];
          // update only if the current element value is different from the dynamically retrieved value.
          if( minutesDigits.textContent !== timeRemaining.minutes.toString() || refresh === true ){
              minutesDigits.innerHTML = timeRemaining.minutes;
              // Show progress if it's set
              if(typeof(progress.minutes[index]) !== 'undefined' ){
                minutesPercentage = (100 * timeRemaining.minutes) / 60;
                progress.minutes[index].setProgress(100 - minutesPercentage, 0.5);
              }
            }
        }
        if(seconds){
          secondsDigits = element.getElementsByClassName('cpfg-seconds')[0].childNodes[0].childNodes[0];
          // update only if the current element value is different from the dynamically retrieved value.
          if( secondsDigits.textContent !== timeRemaining.seconds.toString() || refresh === true ){
              secondsDigits.innerHTML = timeRemaining.seconds;
              // Show progress if it's set
              if(typeof(progress.seconds[index]) !== 'undefined' ){
                secondsPercentage = (100 * timeRemaining.seconds) / 60;
                progress.seconds[index].setProgress(100 - secondsPercentage, 0.5);
              }else{
                // console.log(progress);
              }
          }
        }

      } else if( timeRemaining.days == 0 && timeRemaining.hours == 0 && timeRemaining.minutes == 0 && timeRemaining.seconds == 0) {
  			innerHTML = '<div class="cpfg-countdown-message">' + message + '</div>';
        element.innerHTML = innerHTML;
        if( typeof(updateCounterInterval[index]) !== 'undefined' ){
          stopCounter(index);
        }
  		}

      // Show the element when loaded first time
      if( element.style.visibility !== 'visible' ){
        element.style.visibility = 'visible';
      }
  };

  const startCounter = function ( refresh = false ){

    var elements = document.getElementsByClassName('cpfg-countdown'),
        daysOfYear = daysOfTheYear(new Date().getFullYear());
    for ( let i = 0; i <= elements.length - 1; i++) {
      let index = i,
          element = elements[index],
          elementClasses = element.classList;

      // Hide element if `refresh` is true
      element.style.visibility = 'hidden';

      var counters = '';
      // Remove JS created elements if `refresh` is true
      if( refresh ){
        var counters = element.getElementsByClassName('cpfg-counter')
        for ( let c = 0; c <= counters.length - 1; c++) {

            let num = c,
                existingCounter = counters[num],
                progressIndicator = existingCounter.getElementsByClassName('radial-progress')[0];

            if( typeof(progressIndicator) !== 'undefined' ){
              existingCounter.removeChild(progressIndicator);
            }
        }
      }

      // Start counter instance
      if( elementClasses.contains('cpfg-progress') ){

            counters = counters !== '' ? counters : element.getElementsByClassName('cpfg-counter')
            var borderWidth = element.dataset.borderwidth,
                elementWidth = element.getElementsByClassName('cpfg-counter')[0].childNodes[0].offsetWidth + ( borderWidth * 4);

            for ( let n = 0; n <= counters.length - 1; n++) {
              let int = n,
                  counter = counters[int];
                  if( typeof(counter.getElementsByClassName('radial-progress')[0]) !== 'undefined' ){
                    continue;
                  }
                  if(counter.classList.contains('cpfg-days')){
                    progress.days[index] = new RadialProgress(element, counter, elementWidth, borderWidth, index, 'days');
                  }
                  if(counter.classList.contains('cpfg-hours')){
                    progress.hours[index] = new RadialProgress(element, counter, elementWidth, borderWidth, index, 'hours');
                  }
                  if(counter.classList.contains('cpfg-minutes')){
                    progress.minutes[index] = new RadialProgress(element, counter, elementWidth, borderWidth, index, 'minutes');
                  }
                  if(counter.classList.contains('cpfg-seconds')){
                    progress.seconds[index] = new RadialProgress(element, counter, elementWidth, borderWidth, index, 'seconds');
                  }

            }

      }

      // Run on call
      updateCounter( element, index, daysOfYear, true );
      // Set interval to run the counter every second if it's not already set
      if( typeof(updateCounterInterval[i]) == 'undefined' ){
        updateCounterInterval[i] = setInterval( function(){ updateCounter( element, index, daysOfYear, false ); }, 1000 );
      }

    }


  }

  const stopCounter = function (index = ''){
    if( index !== '' ){
      if( typeof(updateCounterInterval[index]) !== 'undefined' ){
        clearInterval(updateCounterInterval[index]);
        updateCounterInterval[index] = undefined;
      }
    }else{
      updateCounterInterval = [];
    }

    progress = { days: [], hours: [], minutes: [], seconds: [] };
  }



  /**
   * Initialize the countdown timer on front end
   */

   document.addEventListener("DOMContentLoaded", function(){
     if( typeof(document.getElementsByClassName('cpfg-countdown')[0]) !== 'undefined' ){
       startCounter();
     };
   });

   /**
    * Initialize the countdown timer on back end (Listen to and handle changes)
    */

    // Handle backend changes
    export const handleEditorChanges =  function( refresh = false ){

      if(refresh){
        // Stop all existing counter
        stopCounter();
      }
      // Reload
      startCounter( refresh );

    }

    // Stop the counter if countdown element is removed  // initiate it if loaded first time
    // ( Using subscribe() listener to check for changes)
    const subscription = subscribe(function () {
      var coreEditor = select('core/editor');
      var isSavingPost = coreEditor.isSavingPost();
      var isPublishingPost = coreEditor.isPublishingPost();

      if( isSavingPost || isPublishingPost){
        return;
      }

      var foundCounter = false;
      var allBlocks = coreEditor.getBlocks();
      for ( let block of allBlocks ) {
          if(block.name === 'cpfg/countdown' ){
            foundCounter = true;
            break;
          }
      }

      if(foundCounter === false){
        stopCounter();
      }

    });
