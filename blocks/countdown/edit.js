/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { getElementCountClassName, getSwitchHelp, getCurrentStyle, rgb, fontSizes } from './helpers';
import { handleEditorChanges } from './frontend';

/**
 * WordPress dependencies
 */
const { __ } = window.wp.i18n;
const { dispatch } = window.wp.data;
const { InspectorControls } = window.wp.editor;
const { Fragment, createElement, useEffect } = window.wp.element;
const { Panel, PanelBody, PanelRow, DateTimePicker, TextareaControl, ToggleControl, SelectControl, FontSizePicker, ColorPicker } = window.wp.components;

export default function edit({ attributes, setAttributes }) {

  const { className, datetime, message, days, hours, minutes, seconds, animation, bgcolor, progress, fontsize, bordersize, digitscolor, labelscolor, bordercolor } = attributes;

  // Prepare element classes
  const elementCountClassName = getElementCountClassName(days, hours, minutes, seconds);
  const digitsColorClassName = digitscolor != 'none' ? 'cpfg-digits-' + digitscolor : false;
  const labelsColorClassName = labelscolor != 'none' ? 'cpfg-labels-' + labelscolor : false;
  const borderColorClassName = bordercolor != 'none' ? 'cpfg-border-' + bordercolor : false;
  const borderWidthClassName = bordersize ? 'cpfg-borderwidth-' + bordersize : false;

  const classNames = classnames(
    className,
    { 'cpfg-countdown': true },
    { 'cpfg-progress': progress },
    digitsColorClassName,
    labelsColorClassName,
    borderColorClassName,
    elementCountClassName,
    borderWidthClassName,
  );

  // Get the current block style
  const currentStyle = getCurrentStyle(className);

  /**
   * Handlers to the be called onChange event,
   * setting attribute values differently.
   */

  const onUpdateDate = (dateTime) => {
    var newDateTime = moment(dateTime).format('YYYY-MM-DD HH:mm');
    setAttributes({ datetime: newDateTime });
  };

  const onUpdateMessage = (message) => {
    setAttributes({
      message: message
    });
  };

  const onUpdateAnimation = (val) => {
    setAttributes({
      animation: val
    });
  };

  const onUpdateBorders = (val) => {
    setAttributes({
      bordersize: val
    });
  };

  const onUpdateSettings = (val, type) => {
    // Make sure not all counters are turned off
    if ([days, hours, minutes, seconds].filter(v => v).length === 1 && val === false) {
      return;
    }

    if ('days' == type) {
      setAttributes({
        days: val
      });
    }

    if ('hours' == type) {
      setAttributes({
        hours: val
      });
    }

    if ('minutes' == type) {
      setAttributes({
        minutes: val
      });
    }

    if ('seconds' == type) {
      setAttributes({
        seconds: val
      });
    }
  };

  const onUpdateProgress = (val) => {
    // Add notice if user is trying to apply progress indicator while current style is not circular
    if (val === true && currentStyle !== 'circular') {

      dispatch('core/notices').createNotice(
        'warning', // Can be one of: success, info, warning, error.
        __('Visual progress only works on countdown circular style.'), // Text string to display.
        {
          isDismissible: true, // Whether the user can dismiss the notice.
        }
      );

      return;
    }

    setAttributes({
      progress: val
    });
  };

  /**
   * `useEffect` will run after the render is committed to the screen
   * By default, effects run after every completed render,
   * but you can choose to fire it only when certain values have changed as below.
   */

  // Instantly update the counter after values updated
  useEffect(() => {
    handleEditorChanges();
  }, [datetime, message]);

  // Clear all timers, JS added content and reload the counter again
  useEffect(() => {
    handleEditorChanges(true);
  }, [bordersize, days, hours, minutes, seconds, progress]);


  /**
   * Make sure to change `progress` attribute value to false
   * if the current style is not circular
   */

  if (currentStyle !== 'circular' && progress === true) {
    onUpdateProgress(false);
  }


  return (
    <Fragment>
      <InspectorControls>
        <PanelBody
          title="Expiry Date & Time"
          icon=""
          initialOpen={false}
        >
          <PanelRow>
            <DateTimePicker
              currentDate={datetime}
              onChange={(val) => onUpdateDate(val)}
              is12Hour={true}
            />
          </PanelRow>
        </PanelBody>
        <PanelBody
          title="Expiry Message"
          icon=""
          initialOpen={false}
        >
          <PanelRow>
            <TextareaControl
              className={'cpfg-textareacontrol'}
              help="Enter an expiration message here!"
              value={message}
              onChange={(val) => onUpdateMessage(val)}
            />
          </PanelRow>
        </PanelBody>
        <PanelBody
          className={'cpfg-typography-panel'}
          title="Typography"
          icon=""
          initialOpen={false}
        >
          <PanelRow>
            <FontSizePicker
              fontSizes={fontSizes}
              value={fontsize}
              fallbackFontSize={45}
              onChange={(newFontSize) => { setAttributes({ fontsize: newFontSize }); }}
            />
          </PanelRow>
          <PanelRow className={'cpfg-panelrow'}>
            <SelectControl
              className={'cpfg-selectcontrol'}
              label="Border Size"
              value={bordersize}
              options={[
                { label: '1px', value: '1' },
                { label: '2px', value: '2' },
                { label: '3px', value: '3' },
                { label: '4px', value: '4' },
                { label: '5px', value: '5' },
              ]}
              onChange={(val) => onUpdateBorders(val)}
            />
          </PanelRow>
          <PanelRow className={'cpfg-panelrow'}>
            <SelectControl
              className={'cpfg-selectcontrol'}
              label="Digits Color"
              value={digitscolor}
              options={[
                { label: 'None', value: 'none' },
                { label: 'Dark', value: 'dark' },
                { label: 'Light', value: 'light' },
                { label: 'Grey', value: 'grey' },
                { label: 'Blue', value: 'blue' },
                { label: 'Turquoise', value: 'turquoise' },
                { label: 'Red', value: 'red' },
                { label: 'Orange', value: 'orange' },
              ]}
              onChange={(val) => setAttributes({ digitscolor: val })}
            />
          </PanelRow>
          <PanelRow className={'cpfg-panelrow'}>
            <SelectControl
              className={'cpfg-selectcontrol'}
              label="Labels Color"
              value={labelscolor}
              options={[
                { label: 'None', value: 'none' },
                { label: 'Dark', value: 'dark' },
                { label: 'Light', value: 'light' },
                { label: 'Grey', value: 'grey' },
                { label: 'Blue', value: 'blue' },
                { label: 'Turquoise', value: 'turquoise' },
                { label: 'Red', value: 'red' },
                { label: 'Orange', value: 'orange' },
              ]}
              onChange={(val) => setAttributes({ labelscolor: val })}
            />
          </PanelRow>
          <PanelRow className={'cpfg-panelrow'}>
            <SelectControl
              className={'cpfg-selectcontrol'}
              label="Borders Color"
              value={bordercolor}
              options={[
                { label: 'None', value: 'none' },
                { label: 'Dark', value: 'dark' },
                { label: 'Light', value: 'light' },
                { label: 'Grey', value: 'grey' },
                { label: 'Blue', value: 'blue' },
                { label: 'Turquoise', value: 'turquoise' },
                { label: 'Red', value: 'red' },
                { label: 'Orange', value: 'orange' },
                { label: 'Colorful', value: 'colorful' },
              ]}
              onChange={(val) => setAttributes({ bordercolor: val })}
            />
          </PanelRow>
        </PanelBody>
        <PanelBody
          title="Settings"
          icon=""
          initialOpen={false}
        >
          <PanelRow>
            <ToggleControl
              className={'cpfg-toggle'}
              label={window.wp.i18n.__('Days', 'cpfg')}
              checked={days}
              onChange={(val) => onUpdateSettings(val, 'days')}
              help={getSwitchHelp(days, 'days')}
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              className={'cpfg-toggle'}
              label={window.wp.i18n.__('Hours', 'cpfg')}
              checked={hours}
              onChange={(val) => onUpdateSettings(val, 'hours')}
              help={getSwitchHelp(hours, 'hours')}
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              className={'cpfg-toggle'}
              label={window.wp.i18n.__('Minutes', 'cpfg')}
              checked={minutes}
              onChange={(val) => onUpdateSettings(val, 'minutes')}
              help={getSwitchHelp(minutes, 'minutes')}
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              className={'cpfg-toggle'}
              label={window.wp.i18n.__('Seconds', 'cpfg')}
              checked={seconds}
              onChange={(val) => onUpdateSettings(val, 'seconds')}
              help={getSwitchHelp(seconds, 'seconds')}
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              className={'cpfg-toggle'}
              label={__('Visual Progress')}
              checked={progress}
              onChange={(val) => onUpdateProgress(val)}
              help={getSwitchHelp(progress, 'progress')}
            />
          </PanelRow>
          <PanelRow className={'cpfg-panelrow'}>
            <SelectControl
              className={'cpfg-selectcontrol'}
              label="Entrance Animation"
              value={animation}
              options={[
                { label: 'None', value: 'none' },
                { label: 'FadeIn', value: 'fadein' },
                { label: 'BounceInLeft', value: 'bounceinleft' },
                { label: 'BounceInRight', value: 'bounceinright' },
              ]}
              onChange={(val) => onUpdateAnimation(val)}
            />
          </PanelRow>
          <PanelRow className={'cpfg-panelrow-no-flex'}>
            <label class="components-base-control__label">Background Color</label>
            {currentStyle == 'circular' ? (
              <ColorPicker
                color={bgcolor}
                onChangeComplete={(val) => setAttributes({ bgcolor: rgb(val.rgb.r, val.rgb.g, val.rgb.b, val.rgb.a) })}
                disableAlpha
              />
            ) : (
              <ColorPicker
                color={bgcolor}
                onChangeComplete={(val) => setAttributes({ bgcolor: rgb(val.rgb.r, val.rgb.g, val.rgb.b, val.rgb.a) })}
              />
            )}

          </PanelRow>
        </PanelBody>
      </InspectorControls>
      {datetime ?
        <div className={classNames ? classNames : undefined} style={{ fontSize: fontsize + 'px' }} data-datetime={datetime} data-message={message} data-days={days} data-hours={hours} data-minutes={minutes} data-seconds={seconds} data-animation={animation} data-borderwidth={bordersize}>
          {days ? <div className={'cpfg-counter cpfg-days'}><div className={'cpfg-canvas'} style={{ backgroundColor: bgcolor }}><span class={'cpfg-digits'}>0</span><span className={'cpfg-label'}>{window.wp.i18n.__('Days', 'cpfg')}</span></div></div> : ''}
          {hours ? <div className={'cpfg-counter cpfg-hours'}><div className={'cpfg-canvas'} style={{ backgroundColor: bgcolor }}><span class={'cpfg-digits'}>0</span><span className={'cpfg-label'}>{window.wp.i18n.__('Hours', 'cpfg')}</span></div></div> : ''}
          {minutes ? <div className={'cpfg-counter cpfg-minutes'}><div className={'cpfg-canvas'} style={{ backgroundColor: bgcolor }}><span class={'cpfg-digits'}>0</span><span className={'cpfg-label'}>{window.wp.i18n.__('Minutes', 'cpfg')}</span></div></div> : ''}
          {seconds ? <div className={'cpfg-counter cpfg-seconds'}><div className={'cpfg-canvas'} style={{ backgroundColor: bgcolor }}><span class={'cpfg-digits'}>0</span><span className={'cpfg-label'}>{window.wp.i18n.__('Seconds', 'cpfg')}</span></div></div> : ''}
        </div> :
        <div className={'cpfg-notice'}>{__('Please specify a date & time.')}</div>}
    </Fragment>
  );
}
