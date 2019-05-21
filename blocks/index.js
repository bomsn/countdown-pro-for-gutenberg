'strict mode'
/**
 * WordPress dependencies
 */
const { registerBlockType, unstable__bootstrapServerSideBlockDefinitions } = window.wp.blocks;

/**
 * Internal dependencies
 */
import './editor.scss';
import * as countdown from './countdown';

/**
 *  Register all available blocks
 */

// Create an array of all available blocks
const blocks = [countdown];
// Loop through the array and register block types
const registerCoreBlocks = () => {
  blocks.forEach( ( block ) => {
    if ( ! block ) {
      return;
    }
    const { metadata, settings, name } = block;
    if ( metadata ) {
      unstable__bootstrapServerSideBlockDefinitions( { [ name ]: metadata } ); // eslint-disable-line camelcase
    }
    registerBlockType( name, settings );
  } );
}

registerCoreBlocks();
