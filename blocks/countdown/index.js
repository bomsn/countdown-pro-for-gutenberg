/**
 * WordPress dependencies
 */
const { __ } = window.wp.i18n;

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import save from './save';

/**
 * Starting
 */

export const name = 'cpfg/countdown';

export const settings = {
        // Localize title using wp.i18n.__()
        title: __( 'Countdown' ),
        // Localize description using wp.i18n.__()
        description: __( 'A countdown block that makes adding countdown functionality to your content easier.'),
        // Category Options: common, formatting, layout, widgets, embed
        category: 'common',
        // Dashicons Options - https://goo.gl/aTM1DQ
        icon: icon,
        // Limit to 3 Keywords / Phrases
        keywords: [
          __( 'countdown' ),
          __( 'clock' ),
          __( 'time' )
        ],
        // Register block styles.
        styles: [
            // Mark style as default.
            {
                name: 'square',
                label: __( 'Square' ),
                isDefault: true
            },
            {
                name: 'circular',
                label: __( 'Circular' )
            },
        ],
        // Block supprt
        supports: {
          html: false,
          className: true,
          GeneratedClassname: true,
        },
        // Attributes set for each piece of dynamic data used in your block
        attributes: {
            className: {
                type: 'string',
            },
            datetime: {
                type: 'string',
                default: ''
            },
            message: {
                type: 'string',
                default: 'Sorry you are late!'
            },
            days: {
                type: 'boolean',
                default: true
            },
            hours: {
                type: 'boolean',
                default: true
            },
            minutes: {
                type: 'boolean',
                default: true
            },
            seconds: {
                type: 'boolean',
                default: true
            },
            animation: {
                type: 'string',
                default: 'none'
            },
            bgcolor: {
                type: 'string',
                default: 'none'
            },
            progress: {
                type: 'boolean',
                default: false
            },
            fontsize: {
                type: 'number',
                default: 45
            },
            bordersize: {
                type: 'string',
                default: '2'
            },
            digitscolor: {
                type: 'string',
                default: 'none'
            },
            labelscolor: {
                type: 'string',
                default: 'none'
            },
            bordercolor: {
                type: 'string',
                default: 'none'
            },
        },
        // Determines what is displayed in the editor
        edit: edit,
        // Determines what is displayed on the frontend
        save: save,
};
