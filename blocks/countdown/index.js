/**
 * WordPress dependencies
 */
const { __ } = window.wp.i18n;
const { createElement } = window.wp.element;
const { DateTimePicker } = window.wp.components;
const { __experimentalGetSettings } = window.wp.date;
const { withState } = window.wp.compose;

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


const defaultDateTime = moment().add(7, 'days');
const dateTimeFormat = 'YYYY-MM-DD HH:mm';

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
                name: 'default',
                label: __( 'Rounded' ),
                isDefault: true
            },
            {
                name: 'outline',
                label: __( 'Outline' )
            },
            {
                name: 'squared',
                label: __( 'Squared' )
            }
        ],
        // Block supprt
        supports: {
          html: false,
        },
        // Attributes set for each piece of dynamic data used in your block
        attributes: {
            datetime: {
                type: 'string',
                default: defaultDateTime.format( dateTimeFormat )
            }
        },
        // Determines what is displayed in the editor
        edit: ( { attributes, setAttributes } ) => {
            const onUpdateDate = ( val ) => {
                setAttributes( { datetime: val } );
            }
            const settings = __experimentalGetSettings();
            const is12HourTime = /a(?!\\)/i.test(
              settings.formats.time
                .toLowerCase() // Test only the lower case a
                .replace( /\\\\/g, '' ) // Replace "//" with empty strings
                .split( '' ).reverse().join( '' ) // Reverse the string and test for "a" not followed by a slash
            );

            return (
              <div></div>
            );
        },
        // Determines what is displayed on the frontend
        save: ( { attributes } ) => {
            return (
              <div></div>
            );
        },
};
