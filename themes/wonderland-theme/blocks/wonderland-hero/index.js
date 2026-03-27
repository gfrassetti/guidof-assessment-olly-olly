( function ( wp ) {
	var registerBlockType = wp.blocks.registerBlockType;
	var el = wp.element.createElement;
	var __ = wp.i18n.__;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var MediaUpload = wp.blockEditor.MediaUpload;
	var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
	var RichText = wp.blockEditor.RichText;
	var URLInputButton = wp.blockEditor.URLInputButton;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = wp.components.PanelBody;
	var Button = wp.components.Button;
	var TextControl = wp.components.TextControl;

	registerBlockType( 'wonderland/hero', {
		title: __( 'Wonderland Hero', 'wonderland-theme' ),
		description: __( 'Editable hero section for Wonderland landing.', 'wonderland-theme' ),
		category: 'design',
		icon: 'cover-image',
		supports: {
			html: false,
			align: [ 'wide', 'full' ]
		},
		attributes: {
			backgroundImageUrl: { type: 'string', default: '' },
			backgroundImageId: { type: 'number' },
			headline: {
				type: 'string',
				default: 'As a Court Appointed Expert<br />Witness in Mold-Related<br />Cases, We\'re Trusted Across<br />Washington, DC'
			},
			subheadline: {
				type: 'string',
				default: 'Contact Us for a Free Consultation'
			},
			description: {
				type: 'string',
				default: 'Let our expertise guide you. Schedule a consultation to determine if on-site mold testing is the next step for you.'
			},
			ctaPrimaryText: {
				type: 'string',
				default: 'Schedule a visit'
			},
			ctaPrimaryUrl: {
				type: 'string',
				default: '#multi-step-form-modal'
			},
			ctaSecondaryText: {
				type: 'string',
				default: 'Call Us Now!'
			},
			ctaSecondaryUrl: {
				type: 'string',
				default: 'tel:+15080000000'
			},
			reviewsText: {
				type: 'string',
				default: 'Over 14.5k happy customers on Yelp'
			}
		},
		edit: function ( props ) {
			var a = props.attributes;
			var set = props.setAttributes;
			var blockProps = useBlockProps( {
				className: 'wonderland-hero-block-editor'
			} );
			var bgStyle = a.backgroundImageUrl ? { backgroundImage: 'url(' + a.backgroundImageUrl + ')' } : {};

			return el(
				'div',
				blockProps,
				el(
					InspectorControls,
					{},
					el(
						PanelBody,
						{ title: __( 'Hero image', 'wonderland-theme' ), initialOpen: true },
						el( MediaUploadCheck, {}, el( MediaUpload, {
							onSelect: function ( media ) {
								set( { backgroundImageUrl: media.url, backgroundImageId: media.id } );
							},
							allowedTypes: [ 'image' ],
							value: a.backgroundImageId,
							render: function ( mediaProps ) {
								return el(
									Button,
									{ variant: 'secondary', onClick: mediaProps.open },
									a.backgroundImageUrl ? __( 'Replace background image', 'wonderland-theme' ) : __( 'Select background image', 'wonderland-theme' )
								);
							}
						} ) )
					),
					el(
						PanelBody,
						{ title: __( 'Links', 'wonderland-theme' ), initialOpen: false },
						el( TextControl, {
							label: __( 'Primary button URL', 'wonderland-theme' ),
							value: a.ctaPrimaryUrl || '',
							onChange: function ( value ) { set( { ctaPrimaryUrl: value } ); }
						} ),
						el( TextControl, {
							label: __( 'Secondary button URL', 'wonderland-theme' ),
							value: a.ctaSecondaryUrl || '',
							onChange: function ( value ) { set( { ctaSecondaryUrl: value } ); }
						} )
					)
				),
				el(
					'section',
					{ className: 'wonderland-hero alignfull', style: bgStyle },
					el( 'div', { className: 'wonderland-hero__overlay' } ),
					el(
						'div',
						{ className: 'wonderland-hero__inner' },
						el( RichText, {
							tagName: 'h2',
							className: 'wonderland-hero__headline',
							value: a.headline,
							onChange: function ( value ) { set( { headline: value } ); },
							placeholder: __( 'Hero headline', 'wonderland-theme' )
						} ),
						el( RichText, {
							tagName: 'p',
							className: 'wonderland-hero__subheadline',
							value: a.subheadline,
							onChange: function ( value ) { set( { subheadline: value } ); },
							placeholder: __( 'Hero subheadline', 'wonderland-theme' )
						} ),
						el( RichText, {
							tagName: 'p',
							className: 'wonderland-hero__description',
							value: a.description,
							onChange: function ( value ) { set( { description: value } ); },
							placeholder: __( 'Supporting text', 'wonderland-theme' )
						} ),
						el(
							'div',
							{ className: 'wonderland-hero__cta-row' },
							el( RichText, {
								tagName: 'a',
								className: 'wonderland-hero__cta wonderland-hero__cta--primary',
								value: a.ctaPrimaryText,
								onChange: function ( value ) { set( { ctaPrimaryText: value } ); },
								placeholder: __( 'Primary CTA', 'wonderland-theme' ),
								allowedFormats: []
							} ),
							el( URLInputButton, {
								url: a.ctaPrimaryUrl || '',
								onChange: function ( value ) { set( { ctaPrimaryUrl: value || '#' } ); }
							} ),
							el( RichText, {
								tagName: 'a',
								className: 'wonderland-hero__cta wonderland-hero__cta--secondary',
								value: a.ctaSecondaryText,
								onChange: function ( value ) { set( { ctaSecondaryText: value } ); },
								placeholder: __( 'Secondary CTA', 'wonderland-theme' ),
								allowedFormats: []
							} ),
							el( URLInputButton, {
								url: a.ctaSecondaryUrl || '',
								onChange: function ( value ) { set( { ctaSecondaryUrl: value || '#' } ); }
							} )
						),
						el(
							'div',
							{ className: 'wonderland-hero__rating' },
							el( 'span', { className: 'wonderland-icon--yelp', 'aria-hidden': 'true' } ),
							el(
								'div',
								{ className: 'wonderland-hero__rating-text' },
								el( 'p', { className: 'wonderland-hero__stars' }, el( 'span', { className: 'wonderland-hero__stars-glyph', 'aria-hidden': 'true' }, '★★★★★' ), ' ', el( 'span', { className: 'wonderland-hero__rating-value' }, '4.9/5.0' ) ),
								el( RichText, {
									tagName: 'p',
									className: 'wonderland-hero__reviews',
									value: a.reviewsText,
									onChange: function ( value ) { set( { reviewsText: value } ); },
									placeholder: __( 'Reviews text', 'wonderland-theme' )
								} )
							)
						)
					)
				)
			);
		},
		save: function () {
			return null;
		}
	} );
} )( window.wp );
