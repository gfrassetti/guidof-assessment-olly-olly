<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$background_image_id  = isset( $attributes['backgroundImageId'] ) ? (int) $attributes['backgroundImageId'] : 0;
$background_image_url = isset( $attributes['backgroundImageUrl'] ) ? (string) $attributes['backgroundImageUrl'] : '';
$headline             = isset( $attributes['headline'] ) ? wp_kses_post( $attributes['headline'] ) : '';
$subheadline          = isset( $attributes['subheadline'] ) ? wp_kses_post( $attributes['subheadline'] ) : '';
$description          = isset( $attributes['description'] ) ? wp_kses_post( $attributes['description'] ) : '';
$cta_primary_text     = isset( $attributes['ctaPrimaryText'] ) ? wp_kses_post( $attributes['ctaPrimaryText'] ) : '';
$cta_primary_url      = isset( $attributes['ctaPrimaryUrl'] ) ? esc_url( $attributes['ctaPrimaryUrl'] ) : '#';
$cta_secondary_text   = isset( $attributes['ctaSecondaryText'] ) ? wp_kses_post( $attributes['ctaSecondaryText'] ) : '';
$cta_secondary_url    = isset( $attributes['ctaSecondaryUrl'] ) ? esc_url( $attributes['ctaSecondaryUrl'] ) : '#';
$reviews_text         = isset( $attributes['reviewsText'] ) ? wp_kses_post( $attributes['reviewsText'] ) : '';
$primary_is_modal     = ! empty( $cta_primary_url ) && str_starts_with( $cta_primary_url, '#' );
$has_primary_cta      = ! empty( trim( wp_strip_all_tags( $cta_primary_text ) ) ) && ! empty( $cta_primary_url );
$has_secondary_cta    = ! empty( trim( wp_strip_all_tags( $cta_secondary_text ) ) ) && ! empty( $cta_secondary_url );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wonderland-hero alignfull',
	)
);
?>
<section id="hero" <?php echo $wrapper_attributes; ?>>
	<?php if ( $background_image_id && wp_attachment_is_image( $background_image_id ) ) : ?>
		<div class="wonderland-hero__bg-image-wrapper" aria-hidden="true">
			<?php
			echo wp_get_attachment_image(
				$background_image_id,
				'full',
				false,
				array(
					'class'         => 'wonderland-hero__bg-image',
					'loading'       => 'eager',
					'decoding'      => 'async',
					'fetchpriority' => 'high',
					'sizes'         => '100vw',
				)
			);
			?>
		</div>
	<?php elseif ( ! empty( $background_image_url ) ) : ?>
		<div class="wonderland-hero__bg-image-wrapper" aria-hidden="true">
			<img class="wonderland-hero__bg-image" src="<?php echo esc_url( $background_image_url ); ?>" alt="" loading="eager" decoding="async" fetchpriority="high" />
		</div>
	<?php endif; ?>

	<div class="wonderland-hero__overlay"></div>

	<div class="wonderland-hero__inner">
		<h1 class="wonderland-hero__seo-title">Wonderland landscaping and garden care</h1>
		<div class="wonderland-hero__copy">
			<h2 class="wonderland-hero__headline"><?php echo $headline; ?></h2>
			<p class="wonderland-hero__subheadline"><?php echo $subheadline; ?></p>
			<p class="wonderland-hero__description"><?php echo $description; ?></p>
		</div>

		<div class="wonderland-hero__cta-row">
			<?php if ( $has_primary_cta ) : ?>
				<a
					class="wonderland-hero__cta wonderland-hero__cta--primary<?php echo $primary_is_modal ? ' js-open-modal' : ''; ?>"
					href="<?php echo $cta_primary_url; ?>"
					<?php if ( $primary_is_modal ) : ?>
						data-modal-target="<?php echo esc_attr( ltrim( $cta_primary_url, '#' ) ); ?>"
						aria-controls="<?php echo esc_attr( ltrim( $cta_primary_url, '#' ) ); ?>"
						aria-haspopup="dialog"
					<?php endif; ?>
				>
					<?php echo $cta_primary_text; ?>
				</a>
			<?php endif; ?>
			<?php if ( $has_secondary_cta ) : ?>
				<a class="wonderland-hero__cta wonderland-hero__cta--secondary" href="<?php echo $cta_secondary_url; ?>"><?php echo $cta_secondary_text; ?></a>
			<?php endif; ?>
		</div>

		<div class="wonderland-hero__rating">
			<span class="wonderland-icon--yelp" aria-hidden="true"></span>
			<div class="wonderland-hero__rating-text">
				<p class="wonderland-hero__rating-line">
					<span class="wonderland-hero__stars-row">
						<span class="wonderland-hero__stars-glyph" aria-hidden="true">
							<span class="wonderland-hero__star">★</span><span class="wonderland-hero__star">★</span><span class="wonderland-hero__star">★</span><span class="wonderland-hero__star">★</span><span class="wonderland-hero__star">★</span>
						</span>
						<span class="wonderland-hero__rating-value">4.9/5.0</span>
					</span>
				</p>
				<p class="wonderland-hero__reviews"><?php echo $reviews_text; ?></p>
			</div>
		</div>
	</div>
</section>
