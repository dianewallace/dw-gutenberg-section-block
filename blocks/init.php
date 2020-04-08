<?php
/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package dw-section-block
 */

add_action( 'admin_enqueue_scripts', 'dw_section_block_assets' );
/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @since 1.0.0
 */
function dw_section_block_assets() {
	$dir = dirname( __FILE__ );

	$index_js = 'block.build.js';
	wp_enqueue_script(
		'dw-section-block',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-components',
			'wp-editor',
		),
		filemtime( "$dir/$index_js" )
	);
}

add_action( 'init', 'dw_section_block_init' );
/**
 * Register BrightTALK section block.
 *
 * @since 1.3.0
 */
function dw_section_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type( 'section-block/section', array(
		'editor_script'   => 'dw-section-block',
	) );
}
