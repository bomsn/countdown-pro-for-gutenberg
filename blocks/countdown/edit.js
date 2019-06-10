/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import {getElementCountClassName, getSwitchHelp, rgb, fontSizes} from './helpers';
import {handleEditorChanges} from './frontend';

/**
 * WordPress dependencies
 */
const { __ } = window.wp.i18n;
const { InspectorControls } = window.wp.editor;
const { Fragment, createElement } = window.wp.element;
const { Panel, PanelBody, PanelRow, DateTimePicker, TextareaControl, ToggleControl, SelectControl, FontSizePicker, ColorPicker } = window.wp.components;
const { __experimentalGetSettings } = window.wp.date;

export default function edit( { attributes, setAttributes } ) {

  const { className, datetime, message, days, hours, minutes, seconds, animation, bgcolor, progress, fontsize, bordersize, digitscolor, labelscolor, bordercolor } = attributes;

	const elementCountClassName = getElementCountClassName(days, hours, minutes, seconds);
  const digitsColorClassName = digitscolor != 'none' ? 'cpfg-digits-' + digitscolor : false;
  const labelsColorClassName = labelscolor != 'none' ? 'cpfg-labels-' + labelscolor : false;
  const borderColorClassName = bordercolor != 'none' ? 'cpfg-border-' + bordercolor : false;
  const borderWidthClassName = bordersize ? 'cpfg-borderwidth-' + bordersize : false;

  const classNames = classnames(
    className,
    {'cpfg-countdown': true },
    {'cpfg-progress': progress },
    digitsColorClassName,
    labelsColorClassName,
    borderColorClassName,
		elementCountClassName,
		borderWidthClassName,
   );

  const onUpdateDate = ( dateTime ) => {
      var newDateTime = moment(dateTime).format( 'YYYY-MM-DD HH:mm' );
      setAttributes( { datetime: newDateTime } );

      document.getElementsByClassName('cpfg-countdown')[0].dataset.datetime;
      setTimeout(function(){
        handleEditorChanges();
      }, 300);
  };

  const onUpdateMessage = ( message ) => {
    setAttributes({
        message: message
    });
    handleEditorChanges();
  };

  const onUpdateBorders = ( val ) => {
    setAttributes({
        bordersize: val
    });

    setTimeout(function(){
      handleEditorChanges(false, false, true);
    }, 300);
  };

  const onUpdateProgress = ( val ) => {

    setAttributes({
        progress: val
    });

    setTimeout(function(){
      handleEditorChanges(false, false, true);
    }, 300);

  };

  const onUpdateAnimation = ( animation ) => {
    setAttributes({
        animation: animation
    });
    handleEditorChanges( true, animation );
  };

  const onUpdateSettings = ( val, type ) => {

    // Make sure not all counters are turned off
    if( [days,hours,minutes,seconds].filter(v => v).length === 1 && val === false  ){
      return;
    }

    if( 'days' == type ){
      setAttributes({
          days: val
      });
    }

    if( 'hours' == type ){
      setAttributes({
          hours: val
      });
    }

    if( 'minutes' == type ){
      setAttributes({
          minutes: val
      });
    }

    if( 'seconds' == type ){
      setAttributes({
          seconds: val
      });
    }

    setTimeout(function(){
      handleEditorChanges(false, false, true);
    }, 300);
  };


  const settings = __experimentalGetSettings();
  const is12HourTime = /a(?!\\)/i.test(
    settings.formats.time
      .toLowerCase() // Test only the lower case a
      .replace( /\\\\/g, '' ) // Replace "//" with empty strings
      .split( '' ).reverse().join( '' ) // Reverse the string and test for "a" not followed by a slash
  );


  return (
    <Fragment>
      <InspectorControls>
            <PanelBody
                title="Expiry Date & Time"
                icon=""
                initialOpen={ false }
            >
                <PanelRow>
                <DateTimePicker
                    currentDate={ datetime }
                    onChange={ ( val ) => onUpdateDate( val ) }
                    is12Hour={ true }
                />
                </PanelRow>
            </PanelBody>
            <PanelBody
                title="Expiry Message"
                icon=""
                initialOpen={ false }
            >
                <PanelRow>
                    <TextareaControl
                        className={ 'cpfg-textareacontrol' }
                        help="Enter an expiration message here!"
                        value={ message }
                        onChange={ ( val ) => onUpdateMessage( val ) }
                    />
                </PanelRow>
            </PanelBody>
            <PanelBody
                className={ 'cpfg-typography-panel' }
                title="Typography"
                icon=""
                initialOpen={ false }
            >
              <PanelRow>
                  <FontSizePicker
              			fontSizes={ fontSizes }
              			value={ fontsize }
              			fallbackFontSize={ 45 }
              			onChange={ ( newFontSize ) => { setAttributes( { fontsize: newFontSize } ); } }
              		/>
                </PanelRow>
                <PanelRow className={ 'cpfg-panelrow' }>
                  <SelectControl
                      className={ 'cpfg-selectcontrol' }
                      label="Border Size"
                      value={ bordersize }
                      options={ [
                          { label: '1px', value: '1' },
                          { label: '2px', value: '2' },
                          { label: '3px', value: '3' },
                          { label: '4px', value: '4' },
                          { label: '5px', value: '5' },
                      ] }
                      onChange={ ( val ) => onUpdateBorders( val ) }
                  />
                </PanelRow>
                <PanelRow className={ 'cpfg-panelrow' }>
                  <SelectControl
                      className={ 'cpfg-selectcontrol' }
                      label="Digits Color"
                      value={ digitscolor }
                      options={ [
                          { label: 'None', value: 'none' },
                          { label: 'Dark', value: 'dark' },
                          { label: 'Light', value: 'light' },
                          { label: 'Grey', value: 'grey' },
                          { label: 'Blue', value: 'blue' },
                          { label: 'Turquoise', value: 'turquoise' },
                          { label: 'Red', value: 'red' },
                          { label: 'Orange', value: 'orange' },
                      ] }
                      onChange={ (val) =>  setAttributes( { digitscolor: val }) }
                  />
                </PanelRow>
                <PanelRow className={ 'cpfg-panelrow' }>
                  <SelectControl
                      className={ 'cpfg-selectcontrol' }
                      label="Labels Color"
                      value={ labelscolor }
                      options={ [
                          { label: 'None', value: 'none' },
                          { label: 'Dark', value: 'dark' },
                          { label: 'Light', value: 'light' },
                          { label: 'Grey', value: 'grey' },
                          { label: 'Blue', value: 'blue' },
                          { label: 'Turquoise', value: 'turquoise' },
                          { label: 'Red', value: 'red' },
                          { label: 'Orange', value: 'orange' },
                      ] }
                      onChange={ (val) =>  setAttributes( { labelscolor: val }) }
                  />
                </PanelRow>
                <PanelRow className={ 'cpfg-panelrow' }>
                  <SelectControl
                      className={ 'cpfg-selectcontrol' }
                      label="Borders Color"
                      value={ bordercolor }
                      options={ [
                          { label: 'None', value: 'none' },
                          { label: 'Dark', value: 'dark' },
                          { label: 'Light', value: 'light' },
                          { label: 'Grey', value: 'grey' },
                          { label: 'Blue', value: 'blue' },
                          { label: 'Turquoise', value: 'turquoise' },
                          { label: 'Red', value: 'red' },
                          { label: 'Orange', value: 'orange' },
                          { label: 'Colorful', value: 'colorful' },
                      ] }
                      onChange={ (val) =>  setAttributes( { bordercolor: val }) }
                  />
                </PanelRow>
            </PanelBody>
            <PanelBody
                title="Settings"
                icon=""
                initialOpen={ false }
            >
                <PanelRow>
                  <ToggleControl
                      className={ 'cpfg-toggle' }
                      label={ __( 'Days' ) }
                      checked={ days }
                      onChange={ (val) =>  onUpdateSettings(val, 'days') }
                      help={ getSwitchHelp( days, 'days' ) }
                  />
                </PanelRow>
                <PanelRow>
                  <ToggleControl
                      className={ 'cpfg-toggle' }
                      label={ __( 'Hours' ) }
                      checked={ hours }
                      onChange={ (val) =>  onUpdateSettings(val, 'hours') }
                      help={ getSwitchHelp( hours, 'hours' ) }
                  />
                </PanelRow>
                <PanelRow>
                  <ToggleControl
                      className={ 'cpfg-toggle' }
                      label={ __( 'Minutes' ) }
                      checked={ minutes }
                      onChange={ (val) =>  onUpdateSettings(val, 'minutes') }
                      help={ getSwitchHelp( minutes, 'minutes' ) }
                  />
                </PanelRow>
                <PanelRow>
                  <ToggleControl
                      className={ 'cpfg-toggle' }
                      label={ __( 'Seconds' ) }
                      checked={ seconds }
                      onChange={ (val) =>  onUpdateSettings(val, 'seconds') }
                      help={ getSwitchHelp( seconds, 'seconds' ) }
                  />
                </PanelRow>
                <PanelRow>
                  <ToggleControl
                      className={ 'cpfg-toggle' }
                      label={ __( 'Visual Progress' ) }
                      checked={ progress }
                      onChange={ (val) =>  onUpdateProgress(val) }
                      help={ getSwitchHelp( progress, 'progress' ) }
                  />
                </PanelRow>
                <PanelRow className={ 'cpfg-panelrow' }>
                  <SelectControl
                      className={ 'cpfg-selectcontrol' }
                      label="Entrance Animation"
                      value={ animation }
                      options={ [
                          { label: 'None', value: 'none' },
                          { label: 'FadeIn', value: 'fadein' },
                          { label: 'BounceInLeft', value: 'bounceinleft' },
                          { label: 'BounceInRight', value: 'bounceinright' },
                      ] }
                      onChange={ (val) =>  onUpdateAnimation(val) }
                  />
                </PanelRow>
                <PanelRow className={ 'cpfg-panelrow-no-flex' }>
                  <label class="components-base-control__label">Background Color</label>
                  <ColorPicker
                      color={ bgcolor }
                      onChangeComplete={ ( val ) => setAttributes({ bgcolor: rgb(val.rgb.r, val.rgb.g, val.rgb.b, val.rgb.a) }) }
                  />
                </PanelRow>
            </PanelBody>
      </InspectorControls>
      { datetime ?
  			<div className={ classNames ? classNames : undefined } style={ {fontSize: fontsize + 'px'} } data-datetime={datetime}	data-message={message}	data-days={days}	data-hours={hours} data-minutes={minutes} data-seconds={seconds} data-animation={animation}  data-borderwidth={bordersize}>
  				{days ? <div className={'cpfg-counter cpfg-days'}><div className={ 'cpfg-canvas' } style={ {backgroundColor: bgcolor} }><span class={'cpfg-digits'}>0</span><span className={'cpfg-label'}>{ __( 'Days' ) }</span></div></div> : '' }
  				{hours ? <div className={'cpfg-counter cpfg-hours'}><div className={ 'cpfg-canvas' } style={ {backgroundColor: bgcolor} }><span class={'cpfg-digits'}>0</span><span className={'cpfg-label'}>{ __( 'Hours' ) }</span></div></div> : ''}
  				{minutes ? <div className={'cpfg-counter cpfg-minutes'}><div className={ 'cpfg-canvas' } style={ {backgroundColor: bgcolor} }><span class={'cpfg-digits'}>0</span><span className={'cpfg-label'}>{ __( 'Minutes' ) }</span></div></div> : ''}
  				{seconds ? <div className={'cpfg-counter cpfg-seconds'}><div className={ 'cpfg-canvas' } style={ {backgroundColor: bgcolor} }><span class={'cpfg-digits'}>0</span><span className={'cpfg-label'}>{ __( 'Seconds' ) }</span></div></div> : ''}
  			</div> :
  			<div className={'cpfg-notice'}>{ __( 'Please specify a date & time.' ) }</div> }
    </Fragment>
  );
}
