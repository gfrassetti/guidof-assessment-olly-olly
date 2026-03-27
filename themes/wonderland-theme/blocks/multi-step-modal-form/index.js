( function ( wp ) {
	var registerBlockType = wp.blocks.registerBlockType;
	var el = wp.element.createElement;
	var __ = wp.i18n.__;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var RichText = wp.blockEditor.RichText;
	var PanelBody = wp.components.PanelBody;
	var TextControl = wp.components.TextControl;
	var TextareaControl = wp.components.TextareaControl;

	registerBlockType( 'wonderland/multi-step-modal-form', {
		title: __( 'Multi-step Modal Form', 'wonderland-theme' ),
		description: __( 'Reusable modal with multi-step lead form.', 'wonderland-theme' ),
		category: 'design',
		icon: 'feedback',
		attributes: {
			modalId: { type: 'string', default: 'multi-step-form-modal' },
			title: { type: 'string', default: 'Don\'t wait any longer!' },
			subtitle: { type: 'string', default: 'Fill out this form and we\'ll create the landscape of your dreams.' },
			nameLabel: { type: 'string', default: 'First and last name' },
			namePlaceholder: { type: 'string', default: 'Jane Doe' },
			emailLabel: { type: 'string', default: 'Email*' },
			emailPlaceholder: { type: 'string', default: 'email@email.com' },
			phoneLabel: { type: 'string', default: 'Phone number*' },
			phonePlaceholder: { type: 'string', default: '(000) 000 - 0000' },
			successTitle: { type: 'string', default: 'Thank you!' },
			successText: { type: 'string', default: 'We\'ve received your information and we\'ll get back to you.' }
		},
		edit: function ( props ) {
			var a = props.attributes;
			var set = props.setAttributes;
			var blockProps = useBlockProps( { className: 'wonderland-modal-editor-preview' } );

			return el(
				'div',
				blockProps,
				el(
					InspectorControls,
					{},
					el(
						PanelBody,
						{ title: __( 'Modal settings', 'wonderland-theme' ), initialOpen: true },
						el( 'p', {
							className: 'components-help-text',
							style: { marginTop: 0, fontSize: '12px', color: '#757575' }
						}, __( 'On the site, open this modal with buttons that use class js-open-modal and data-modal-target matching this key (or href #key).', 'wonderland-theme' ) ),
						el( TextControl, {
							label: __( 'Modal ID', 'wonderland-theme' ),
							value: a.modalId || '',
							onChange: function ( value ) { set( { modalId: value || 'multi-step-form-modal' } ); },
							help: __( 'Must match data-modal-id on the modal and data-modal-target (or #fragment) on triggers.', 'wonderland-theme' )
						} ),
						el( TextControl, {
							label: __( 'Modal title', 'wonderland-theme' ),
							value: a.title || '',
							onChange: function ( value ) { set( { title: value } ); }
						} ),
						el( TextareaControl, {
							label: __( 'Modal subtitle', 'wonderland-theme' ),
							value: a.subtitle || '',
							onChange: function ( value ) { set( { subtitle: value } ); },
							rows: 3
						} ),
						el( TextControl, {
							label: __( 'Name label', 'wonderland-theme' ),
							value: a.nameLabel || '',
							onChange: function ( value ) { set( { nameLabel: value } ); }
						} ),
						el( TextControl, {
							label: __( 'Email label', 'wonderland-theme' ),
							value: a.emailLabel || '',
							onChange: function ( value ) { set( { emailLabel: value } ); }
						} ),
						el( TextControl, {
							label: __( 'Phone label', 'wonderland-theme' ),
							value: a.phoneLabel || '',
							onChange: function ( value ) { set( { phoneLabel: value } ); }
						} )
					)
				),
				el( RichText, {
					tagName: 'h3',
					className: 'wonderland-modal-editor-preview__title',
					value: a.title,
					onChange: function ( value ) { set( { title: value } ); },
					placeholder: __( 'Modal title', 'wonderland-theme' )
				} ),
				el( RichText, {
					tagName: 'p',
					className: 'wonderland-modal-editor-preview__subtitle',
					value: a.subtitle,
					onChange: function ( value ) { set( { subtitle: value } ); },
					placeholder: __( 'Modal subtitle', 'wonderland-theme' )
				} )
			);
		},
		save: function () {
			return null;
		}
	} );
} )( window.wp );
