( function( wp ) {
	/**
	 * Registers a new block provided a unique name and an object defining its behavior.
	 * @see https://github.com/WordPress/gutenberg/tree/master/blocks#api
	 */
	const { registerBlockType } = wp.blocks

	/**
	 * Components used to generate block controls.
	 * @see https://github.com/WordPress/gutenberg/tree/master/packages/components
	 */
	const { TextControl }   = wp.components

	/**
	 * Block Controls appear in the post settings sidebar when a block is being edited.
	 * @see https://github.com/WordPress/gutenberg/tree/master/packages/editor
	 */
	const {
		InnerBlocks,
		InspectorControls,
		PanelColorSettings,
		withColors,
		MediaUpload,
		getColorClassName,
		AlignmentToolbar,
		BlockControls
	} = wp.blockEditor;

	/**
	 * Retrieves the translation of text.
	 * @see https://github.com/WordPress/gutenberg/tree/master/i18n#api
	 */
	const { __ } = wp.i18n

	/**
	 * Fragments let you group a list of children without adding extra nodes to the DOM.
	 * @see https://reactjs.org/docs/fragments.html
	 */
	const { Fragment } = wp.element;

	/**
	 * Every block starts by registering InspectorControls new block type definition.
	 * @see https://wordpress.org/gutenberg/handbook/block-api/
	 */
	registerBlockType( 'section-block/section', {
		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __( 'Section Block', 'dw-section-block' ),

		/**
		 * An icon property should be specified to make it easier to identify a block.
		 * These can be any of WordPress’ Dashicons, or a custom svg element.
		 */
		icon: 'align-center',

		/**
		 * Blocks are grouped into categories to help users browse and discover them.
		 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
		 */
		category: 'layout',

		/**
		 * Block Attributes
		 */
		attributes: {
			backgroundColour: {
				type: 'string',
			},
			mediaURL: {
				type: 'string',
			},
			textColour: {
				type: 'string',
			},
			bgImageCover: {
				type: 'boolean',
				default: false,
			},
			fixedBGImage: {
				type: 'boolean',
				default: false,
			},
			alignment: {
				type: 'string',
			},
		},
		supports: {
			align: ['full'],
		},


		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#edit
		 *
		 * @param {Object} [props] Properties passed from the editor.
		 * @return {Element}       Element to render.
		 */
		edit: props => {
			const {
				attributes: {
					setAttributes,
					attributes,
					className,
					backgroundColour,
					textColour,
					alignment
				}
			} = props;

			const setBackgroundColour = newValue => {
				props.setAttributes( { backgroundColour: newValue } );
			};

			const setTextColour = newValue => {
				props.setAttributes( { textColour: newValue } );
			};

			const onChangeAlignment = ( newAlignment ) => {
				props.setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } );
			};

			return (
				<Fragment>
					<InspectorControls>
						<PanelColorSettings
							title={ __( 'Color Settings', 'dw-section-block' ) }
							initialOpen={ false }
							colorSettings={ [
								{
									label: __( 'Background Color', 'dw-section-block' ),
									value: backgroundColour,
									onChange: setBackgroundColour,
								},
								{
									label: __( 'Text Color', 'dw-section-block' ),
									value: textColour,
									onChange: setTextColour,
								},
							] }
						/>
					</InspectorControls>
					<BlockControls>
						<AlignmentToolbar
							value={ alignment }
							onChange={ onChangeAlignment }
						/>
					</BlockControls>
					<div
						style={{
							'background-color': backgroundColour,
							color: textColour,
							'text-align': alignment,
						}}
					>
						<div className={ 'section-block' }>
							<InnerBlocks />
						</div>
					</div>
					</Fragment>
			);
		},


		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into `post_content`.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
		 *
		 * @return {Element}       Element to render.
		 */
		save: function( props ) {
			const { attributes } = props;
			const { className, backgroundColour, textColour, alignment } = props.attributes;

			return (
				<div
					style={{
						'background-color': backgroundColour,
						color: textColour,
						'text-align': alignment,
					}}
				>
					<section className={ 'section-block' }>
						<InnerBlocks.Content />
					</section>
				</div>
			);
		},

	} );
} )(
	window.wp
);
