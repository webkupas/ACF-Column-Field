(function($){
	
	
	/*
	*  acf/setup_fields
	*
	*  This event is triggered when ACF adds any new elements to the DOM. 
	*
	*  @type	function
	*  @since	1.1.0
	*  @date	08/29/14
	*
	*  @param	event		e: an event object. This can be ignored
	*  @param	Element		postbox: An element which contains the new HTML
	*
	*  @return	N/A
	*/
	
	acf.add_action('ready append', function( $el ){
	 	
		var count = 'first';
		
		// search $el for fields of type 'column'
		acf.get_fields({ type : 'column'}, $el).each(function(e, postbox){
			var columns = $(postbox).find('.acf-column').data('column'),
				colClass = '';,
				is_collapse_field = '';

			$(postbox).find('.acf-column').each(function() {
				var root = $(this).parents('.acf-field-column');
				if ( columns == '1_1' ) {
					$(postbox).replaceWith('<div class="acf-field acf-field-columngroup column-end-layout"></div>');
					count = 'first';
				} else {
					var acf_fields = $(root).nextUntil('.acf-field-column');

					acf_fields.each(function() {
						if ( $(this).hasClass('-collapsed-target') ) {
							is_collapse_field = ' -collapsed-target';
							return is_collapse_field;
						}
					});
					
					if ( $(postbox).hasClass('hidden-by-tab') ) {
						colClass = 'acf-field acf-field-columngroup column-layout-' + columns + ' ' + count + ' hidden-by-tab';
					} else {
						colClass = 'acf-field acf-field-columngroup column-layout-' + columns + ' ' + count;
					}
					$(root)	.nextUntil('.acf-field-column')
							.removeClass('hidden-by-tab')
							.wrapAll('<div class="' + colClass + is_collapse_field + '"></div>');
					$(postbox).remove();
					count = '';
				}
			});
		});
	});

})(jQuery);
