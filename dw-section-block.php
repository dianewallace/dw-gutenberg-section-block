<?php
/**
 * Plugin Name: DW Gutenberg Section Block
 * Plugin URI:  https://brighttalk.com
 * Description: Block to contain other blocks.
 * Author: Diane Wallace
 * Author URI: https://dianewallace.co.uk/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package brighttalk
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'blocks/init.php';
