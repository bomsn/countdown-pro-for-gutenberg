  /**
   * WordPress dependencies
   */
  const { __ } = window.wp.i18n;
  const { dispatch } = window.wp.data;

  export const getElementCountClassName  = ( days, hours, minutes, seconds ) => {
    var count = 0;
    if(days){
      count++;
    }
    if(hours){
      count++;
    }
    if(minutes){
      count++;
    }
    if(seconds){
      count++;
    }
    return 'cpfg-elementsCount-' + count;
  };

  export const getTimeRemaining = (endtime) => {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'days': days >= 0 ? days : 0,
      'hours': hours >= 0 ? hours : 0,
      'minutes': minutes >= 0 ? minutes : 0,
      'seconds': seconds >= 0 ? seconds : 0
    };
  };

  export const daysOfTheYear = (year) => {
    if( year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ){
      return 366;
    }else{
      return 365;
    }
  };

  export const getSwitchHelp = ( checked, label ) => {
    if(label == 'progress'){
      return checked ? __( 'Visual progess is enabled.' ) : __( 'Toggle to enable visual progress.' );
    }else{
      return checked ? label + __( ' enabled.' ) : __( 'Toggle to enable ' ) + label;
    }

  };

  export const getCurrentStyle = ( classNames ) => {

    const isStyle = RegExp(/is-style-/)
    const styleName = isStyle.test(classNames)
        ? classNames.replace(isStyle, '')
        : null

    return styleName;
  };

  export const rgb = ( r, g, b, a ) => {
      r = Math.floor(r);
      g = Math.floor(g);
      b = Math.floor(b);
      return ["rgb(",r,",",g,",",b,",",a,")"].join("");
  };


  export const fontSizes = [
  	{
  		name: __( 'Small' ),
  		slug: 'small',
  		size: 35,
  	},
  	{
  		name: __( 'Regular' ),
  		slug: 'regular',
  		size: 45,
  	},
  	{
  		name: __( 'Large' ),
  		slug: 'large',
  		size: 55,
  	},
  	{
  		name: __( 'Larger' ),
  		slug: 'larger',
  		size: 60,
  	},
  ];

  export const RadialProgress = function(element, counter, elementWidth, borderWidth, index, type) {

    this.progress = 0;
    var requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    var counterCanvas = counter.getElementsByClassName('cpfg-canvas')[0],
        headElement = document.getElementsByTagName('head')[0],
        innerSize = elementWidth - ( borderWidth * 4),
        innerMargin = borderWidth * 2,
        clipMask = "rect(0px, " + elementWidth + "px, " + elementWidth + "px, " + elementWidth / 2 + "px)",
        clipFill = "rect(0px, " + elementWidth / 2 + "px, " + elementWidth + "px, 0px)",
        radialProgressUniqueClassName = 'radial-progress-' + index + '-' + type,
        radialProgressFullClassName = 'radial-progress ' + radialProgressUniqueClassName + '',
        indicatorElement;

    // Set the canvas width and height
    counterCanvas.style.width = innerSize + 'px';
    counterCanvas.style.height = innerSize + 'px';
    // Create our main elements in the DOM
    this.radialProgress = document.createElement('div');
    // Assign content/classes/styles to the elements we created
    this.radialProgress.className = radialProgressFullClassName;
    this.radialProgress.innerHTML = '<div class="inner-circle"></div>' +
      '<div class="outer-circle">' +
        '<div class="mask full">' +
          '<div class="fill"></div>' +
        '</div>' +
        '<div class="mask">' +
          '<div class="fill"></div>' +
          '<div class="fill fix"></div>' +
        '</div>' +
      '</div>';

    // // children[0] == .inner-circle || children[1] == .outer-circle
    // Style the main element (.radial-progress )
    this.radialProgress.style.width = elementWidth + "px";
    this.radialProgress.style.height = elementWidth + "px";
    // Style the first child element (.radial-progress .inner-circle)
    this.radialProgress.children[0].style.width = innerSize + "px";
    this.radialProgress.children[0].style.height = innerSize + "px";
    this.radialProgress.children[0].style.margin = innerMargin + "px";
    // Style the second child element (.radial-progress .outer-circle .mask)
    this.radialProgress.children[1].childNodes[0].style.clip = clipMask;
    this.radialProgress.children[1].childNodes[1].style.clip = clipMask;

    this.radialProgress.children[1].childNodes[0].style.width = elementWidth + "px";
    this.radialProgress.children[1].childNodes[1].style.width = elementWidth + "px";

    this.radialProgress.children[1].childNodes[0].style.height = elementWidth + "px";
    this.radialProgress.children[1].childNodes[1].style.height = elementWidth + "px";

    // Style the children of second child element (.radial-progress .outer-circle .mask .fill)
    this.radialProgress.children[1].childNodes[0].childNodes[0].style.clip = clipFill;
    this.radialProgress.children[1].childNodes[1].childNodes[0].style.clip = clipFill;
    this.radialProgress.children[1].childNodes[1].childNodes[1].style.clip = clipFill;

    this.radialProgress.children[1].childNodes[0].childNodes[0].style.width = elementWidth + "px";
    this.radialProgress.children[1].childNodes[1].childNodes[0].style.width = elementWidth + "px";
    this.radialProgress.children[1].childNodes[1].childNodes[1].style.width = elementWidth + "px";

    this.radialProgress.children[1].childNodes[0].childNodes[0].style.height = elementWidth + "px";
    this.radialProgress.children[1].childNodes[1].childNodes[0].style.height = elementWidth + "px";
    this.radialProgress.children[1].childNodes[1].childNodes[1].style.height = elementWidth + "px";

    // Add the progress indecator to the counter
    counter.appendChild(this.radialProgress);

    this.remove = function() {
      var self = this

      function step() {
          counter.removeChild(self.radialProgress);
      }

      step();
    };

    this.setProgress = function(suppliedProgress, duration) {
      suppliedProgress = (suppliedProgress > 100) ? 100 : Math.floor(suppliedProgress);
      var self = this;
      var $maskFull = this.radialProgress.getElementsByClassName('mask full')[0];
      var $fill = this.radialProgress.getElementsByClassName('fill');
      var $fillFix = this.radialProgress.getElementsByClassName('fill fix')[0];
      var deltaProgress = (suppliedProgress - this.progress) / (duration * 60);

      function step() {
        self.progress += deltaProgress;
        self.progress = (self.progress > suppliedProgress) ? suppliedProgress : self.progress;
        var rotate = self.progress * 1.8;
        $maskFull.style.transform = 'rotate(' + rotate + 'deg)';

        for (var i = 0; i < $fill.length; ++i) {
          $fill[i].style.transform = 'rotate(' + rotate + 'deg)';
        }

        $fillFix.style.transform = 'rotate(' + 2 * rotate + 'deg)';

        // Animate the progress from old percentage to new percentage
        if (self.progress < suppliedProgress) {
          requestAnimationFrame(step);
        }
      }

      step();

    };
  };
