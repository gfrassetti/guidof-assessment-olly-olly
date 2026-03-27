<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WONDERLAND_THEME_PATH', get_stylesheet_directory() );
define( 'WONDERLAND_THEME_URL', get_stylesheet_directory_uri() );
define( 'WONDERLAND_THEME_VER', wp_get_theme()->get( 'Version' ) );

function wonderland_theme_enqueue_fonts() {
	wp_enqueue_style(
		'wonderland-google-fonts',
		'https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@400;600;700&display=swap',
		array(),
		null
	);
}
add_action( 'wp_enqueue_scripts', 'wonderland_theme_enqueue_fonts', 5 );
add_action( 'enqueue_block_editor_assets', 'wonderland_theme_enqueue_fonts', 5 );

function wonderland_theme_enqueue_styles() {
	wp_enqueue_style(
		'wonderland-theme',
		get_stylesheet_uri(),
		array( 'wonderland-google-fonts' ),
		WONDERLAND_THEME_VER
	);
}
add_action( 'wp_enqueue_scripts', 'wonderland_theme_enqueue_styles' );

add_action(
	'after_setup_theme',
	function () {
		add_theme_support( 'editor-styles' );
		add_editor_style(
			array(
				'https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@400;600;700&display=swap',
				'style.css',
			)
		);
	}
);

function wonderland_theme_register_blocks() {
	$blocks_path = WONDERLAND_THEME_PATH . '/blocks';
	if ( ! is_dir( $blocks_path ) ) {
		return;
	}
	$metadata_files = glob( $blocks_path . '/*/block.json' );
	if ( ! is_array( $metadata_files ) || empty( $metadata_files ) ) {
		return;
	}

	foreach ( $metadata_files as $metadata ) {
		$metadata = str_replace( '\\', '/', $metadata );

		if ( function_exists( 'register_block_type_from_metadata' ) ) {
			register_block_type_from_metadata( $metadata );
			continue;
		}
		$args = json_decode( file_get_contents( $metadata ), true );
		if ( ! is_array( $args ) || empty( $args['name'] ) ) {
			continue;
		}

		$name = $args['name'];
		unset( $args['name'] );
		register_block_type( $name, $args );
	}
}
add_action( 'init', 'wonderland_theme_register_blocks' );


function wonderland_theme_render_global_modal_form() {
	if ( is_admin() || ! apply_filters( 'wonderland_theme_render_global_modal_form', true ) ) {
		return;
	}

	if ( ! function_exists( 'render_block' ) ) {
		return;
	}

	$parsed = array(
		'blockName'    => 'wonderland/multi-step-modal-form',
		'attrs'        => array(),
		'innerBlocks'  => array(),
		'innerHTML'    => '',
		'innerContent' => array(),
	);

	echo render_block( $parsed );
}
add_action( 'wp_footer', 'wonderland_theme_render_global_modal_form', 5 );

function wonderland_theme_acf_setup() {
	if ( ! function_exists( 'acf_register_block_type' ) ) {
		return;
	}
}
add_action( 'acf/init', 'wonderland_theme_acf_setup' );
