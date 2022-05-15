/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import {getElementCountClassName} from './helpers';

/**
 * WordPress dependencies
 */
const { __ } = window.wp.i18n;
const { createElement, Fragment } = window.wp.element;
const { getBlockDefaultClassName } = window.wp.blocks;

export default function save( { attributes } ) {

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

	return (
		<Fragment>
		{ datetime ?
			<div className={ classNames ? classNames : undefined } style={ {fontSize: fontsize + 'px'} } data-datetime={datetime}	data-message={message}	data-days={days}	data-hours={hours} data-minutes={minutes} data-seconds={seconds} data-animation={animation}  data-borderwidth={bordersize}>
				{days ? <div className={'cpfg-counter cpfg-days'}><div className={ 'cpfg-canvas' } style={ {backgroundColor: bgcolor} }><span class={'cpfg-digits'}>0</span><span className={'cpfg-label'}>{ window.wp.i18n.__( 'Days', 'cpfg' ) }</span></div></div> : '' }
				{hours ? <div className={'cpfg-counter cpfg-hours'}><div className={ 'cpfg-canvas' } style={ {backgroundColor: bgcolor} }><span class={'cpfg-digits'}>0</span><span className={'cpfg-label'}>{ window.wp.i18n.__( 'Hours', 'cpfg' ) }</span></div></div> : ''}
				{minutes ? <div className={'cpfg-counter cpfg-minutes'}><div className={ 'cpfg-canvas' } style={ {backgroundColor: bgcolor} }><span class={'cpfg-digits'}>0</span><span className={'cpfg-label'}>{ window.wp.i18n.__( 'Minutes', 'cpfg' ) }</span></div></div> : ''}
				{seconds ? <div className={'cpfg-counter cpfg-seconds'}><div className={ 'cpfg-canvas' } style={ {backgroundColor: bgcolor} }><span class={'cpfg-digits'}>0</span><span className={'cpfg-label'}>{ window.wp.i18n.__( 'Seconds', 'cpfg' ) }</span></div></div> : ''}
			</div> :
			<div className={'cpfg-notice'}>{ __( 'Please specify a date & time.' ) }</div> }
		</Fragment>
	);
}
