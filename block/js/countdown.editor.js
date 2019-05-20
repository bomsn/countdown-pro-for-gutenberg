'strict mode'
/**
 *  dependencies
 */
import './scss/countdown.editor.scss';

// Get helper functions from global scope (Internal block libraries)
const { Fragment } = window.wp.element;
const { __ } = window.wp.i18n;
const { registerBlockType } = window.wp.blocks;

/*
 * Register the countdown blcok
 */

 registerBlockType(
   'countdown-pro-for-gutenberg/countdown-block',
   {
     // Localize title using wp.i18n.__()
     title: __( 'Countdown' ),
     // Localize description using wp.i18n.__()
     description: __( 'A countdown block that makes adding countdown functionality to your content easier.'),
     // Category Options: common, formatting, layout, widgets, embed
     category: 'common',
     // Dashicons Options - https://goo.gl/aTM1DQ
     icon: {
       background : '#520093',
       foreground : '#fff',
       src : 'clock'
     },
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
     // Attributes set for each piece of dynamic data used in your block
     attributes: {
       exampleContent: {
         type: 'array',
         source: 'children',
         selector: 'div.my-content',
       },
     },
     // Determines what is displayed in the editor
     edit: props => {
       const onChangeContent = value => {
         props.setAttributes( { exampleContent: value } );
       };
       return (
         <div className={props.className}>
           <Editable
             tagname="div"
             multiline="p"
             className="my-content"
             placeholder={ __( 'Add your content...' ) }
             value={props.attributes.exampleContent}
             onChange={onChangeContent}
           />
         </div>
       );
     },
     // Determines what is displayed on the frontend
     save: props => {
       return (
         <div className={props.className}>
           {props.attributes.exampleContent}
         </div>
       );
     },
   },
 );
