<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$modal_id         = isset( $attributes['modalId'] ) && ! empty( $attributes['modalId'] ) ? sanitize_title( $attributes['modalId'] ) : 'multi-step-form-modal';
$title            = isset( $attributes['title'] ) ? wp_kses_post( $attributes['title'] ) : "Don't wait any longer!";
$subtitle         = isset( $attributes['subtitle'] ) ? wp_kses_post( $attributes['subtitle'] ) : "Fill out this form and we'll create the landscape of your dreams.";
$name_label       = isset( $attributes['nameLabel'] ) ? wp_kses_post( $attributes['nameLabel'] ) : 'First and last name';
$name_placeholder = isset( $attributes['namePlaceholder'] ) ? (string) $attributes['namePlaceholder'] : 'Jane Doe';
$email_label      = isset( $attributes['emailLabel'] ) ? wp_kses_post( $attributes['emailLabel'] ) : 'Email*';
$email_placeholder = isset( $attributes['emailPlaceholder'] ) ? (string) $attributes['emailPlaceholder'] : 'email@email.com';
$phone_label      = isset( $attributes['phoneLabel'] ) ? wp_kses_post( $attributes['phoneLabel'] ) : 'Phone number*';
$phone_placeholder = isset( $attributes['phonePlaceholder'] ) ? (string) $attributes['phonePlaceholder'] : '(000) 000 - 0000';
$success_title    = isset( $attributes['successTitle'] ) ? wp_kses_post( $attributes['successTitle'] ) : 'Thank you!';
$success_text     = isset( $attributes['successText'] ) ? wp_kses_post( $attributes['successText'] ) : "We've received your information and we'll get back to you.";

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'multi-step-modal-form-block',
	)
);
?>
<div <?php echo $wrapper_attributes; ?>>
	<div class="wonderland-modal" aria-hidden="true" data-modal-root data-modal-id="<?php echo esc_attr( $modal_id ); ?>">
		<div class="wonderland-modal__backdrop" data-modal-close></div>
		<div id="<?php echo esc_attr( $modal_id ); ?>" class="wonderland-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="<?php echo esc_attr( $modal_id ); ?>-title" aria-describedby="<?php echo esc_attr( $modal_id ); ?>-subtitle" tabindex="-1">
			<button type="button" class="wonderland-modal__close" aria-label="<?php esc_attr_e( 'Close modal', 'wonderland-theme' ); ?>" data-modal-close>
				<span aria-hidden="true">&times;</span>
			</button>

			<div class="wonderland-modal__container">
				<form class="wonderland-modal__form" novalidate>
					<h2 id="<?php echo esc_attr( $modal_id ); ?>-title" class="wonderland-modal__title"><?php echo $title; ?></h2>
					<p id="<?php echo esc_attr( $modal_id ); ?>-subtitle" class="wonderland-modal__subtitle"><?php echo $subtitle; ?></p>
					<p class="wonderland-modal__errors" data-modal-errors aria-live="polite"></p>

					<section class="wonderland-modal__step is-active" data-step="1">
						<div class="wonderland-modal__step-content">
							<label class="wonderland-modal__label" for="<?php echo esc_attr( $modal_id ); ?>-email"><?php echo $email_label; ?></label>
							<input id="<?php echo esc_attr( $modal_id ); ?>-email" class="wonderland-modal__input" name="email" type="email" autocomplete="email" placeholder="<?php echo esc_attr( $email_placeholder ); ?>" required />
							<p class="wonderland-modal__hint"><?php esc_html_e( "By entering your email information, you accept to receive emails from Wonder-land.", 'wonderland-theme' ); ?></p>
							<div class="wonderland-modal__actions">
								<button type="button" class="wonderland-modal__btn wonderland-modal__btn--primary" data-action="next"><?php esc_html_e( 'Next', 'wonderland-theme' ); ?></button>
							</div>
						</div>
					</section>

					<section class="wonderland-modal__step" data-step="2" hidden>
						<div class="wonderland-modal__step-content">
							<label class="wonderland-modal__label" for="<?php echo esc_attr( $modal_id ); ?>-name"><?php echo $name_label; ?></label>
							<input id="<?php echo esc_attr( $modal_id ); ?>-name" class="wonderland-modal__input" name="name" type="text" autocomplete="name" placeholder="<?php echo esc_attr( $name_placeholder ); ?>" required />
							<div class="wonderland-modal__actions">
								<button type="button" class="wonderland-modal__btn wonderland-modal__btn--ghost" data-action="back"><?php esc_html_e( 'Go back', 'wonderland-theme' ); ?></button>
								<button type="button" class="wonderland-modal__btn wonderland-modal__btn--primary" data-action="next"><?php esc_html_e( 'Next', 'wonderland-theme' ); ?></button>
							</div>
						</div>
					</section>

					<section class="wonderland-modal__step" data-step="3" hidden>
						<div class="wonderland-modal__step-content">
							<label class="wonderland-modal__label" for="<?php echo esc_attr( $modal_id ); ?>-phone"><?php echo $phone_label; ?></label>
							<input id="<?php echo esc_attr( $modal_id ); ?>-phone" class="wonderland-modal__input" name="phone" type="tel" autocomplete="tel" placeholder="<?php echo esc_attr( $phone_placeholder ); ?>" required />
							<div class="wonderland-modal__actions">
								<button type="button" class="wonderland-modal__btn wonderland-modal__btn--ghost" data-action="back"><?php esc_html_e( 'Go back', 'wonderland-theme' ); ?></button>
								<button type="submit" class="wonderland-modal__btn wonderland-modal__btn--primary"><?php esc_html_e( 'Submit', 'wonderland-theme' ); ?></button>
							</div>
						</div>
					</section>

					<section class="wonderland-modal__step" data-step="4" hidden>
						<div class="wonderland-modal__step-content wonderland-modal__step-content--success">
							<span class="wonderland-modal__success-icon" aria-hidden="true">&#10003;</span>
							<div class="wonderland-modal__success-copy">
								<h3 class="wonderland-modal__success-title"><?php echo $success_title; ?></h3>
								<p class="wonderland-modal__success-text"><?php echo $success_text; ?></p>
							</div>
						</div>
					</section>

					<div class="wonderland-modal__indicator" aria-label="<?php esc_attr_e( 'Form progress', 'wonderland-theme' ); ?>">
						<span class="wonderland-modal__indicator-dot is-active" data-step-indicator="1"></span>
						<span class="wonderland-modal__indicator-dot" data-step-indicator="2"></span>
						<span class="wonderland-modal__indicator-dot" data-step-indicator="3"></span>
						<span class="wonderland-modal__indicator-dot" data-step-indicator="4"></span>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
