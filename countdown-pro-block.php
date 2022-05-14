<?php

/**
 * Plugin Name: Countdown Pro for Gutenberg
 * Plugin URI: https://plugins.wpali.com
 * Author: Ali Khallad
 * Author URI: https://wpali.com
 * Version: 1.0.0
 * Description: The ultimate countdown block for Gutenberg, that help adding countdown functionality to your content easily.
 * Text Domain: cpfg
 *
 * @package CPFG
 */
// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

// Only load if Gutenberg is available.
if (!function_exists('register_block_type')) {
    return;
}
// Define the plugin's version
define('CPFG_VERSION', '1.0.0');

/**
 * Enqueue back end Javascript and CSS on editor level
 *
 * @since    1.0.0
 */
add_action('enqueue_block_editor_assets', 'cpfg_editor_block_assets');
function cpfg_editor_block_assets()
{

    // Define path for the js and css files
    $editor_js = '/assets/js/blocks.editor.js';
    $editor_css = '/assets/css/blocks.editor.css';

    // Enqueue the bundled block JS file
    wp_enqueue_script(
        'cpfg-block-editor-js',
        plugins_url($editor_js, __FILE__),
        array('wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor'),
        filemtime(plugin_dir_path(__FILE__) . $editor_js)
    );


    // Enqueue optional editor only styles
    wp_enqueue_style(
        'cpfg-block-editor-css',
        plugins_url($editor_css, __FILE__),
        [],
        filemtime(plugin_dir_path(__FILE__) . $editor_css)
    );
}
/**
 * Enqueue front end and editor Javascript and CSS
 *
 * @since    1.0.0
 */
add_action('enqueue_block_assets', 'cpfg_block_assets');
function cpfg_block_assets()
{

    // Define path for the js and css files
    $block_js = '/assets/js/blocks.js';
    $block_css = '/assets/css/blocks.css';

    // Enqueue the bundled block JS file
    wp_enqueue_script(
        'cpfg-block-js',
        plugins_url($block_js, __FILE__),
        array('wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api', 'wp-editor'),
        filemtime(plugin_dir_path(__FILE__) . $block_js)
    );

    // Enqueue frontend and editor block styles
    wp_enqueue_style(
        'cpfg-block-css',
        plugins_url($block_css, __FILE__),
        null,
        filemtime(plugin_dir_path(__FILE__) . $block_css)
    );

    if (function_exists('wp_set_script_translations')) {
        wp_set_script_translations('cpfg-block-js', 'cpfg', plugin_dir_path(__FILE__) . 'languages');
    }
}

/**
 * Load translation files
 *
 * @since    1.0.0
 */
add_action('init', 'cpfg_init');
function cpfg_init()
{
    load_plugin_textdomain('cpfg', false, plugin_dir_path(__FILE__) . 'languages');

    if (function_exists('wp_set_script_translations')) {
        wp_set_script_translations('cpfg-block-js', 'cpfg', plugin_dir_path(__FILE__) . 'languages');
    }
}
