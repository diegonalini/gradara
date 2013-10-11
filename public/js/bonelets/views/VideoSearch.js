/*global define */

define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	'use strict';

	return Marionette.CompositeView.extend({
		events: {
            'click #search-submit': 'performSearch',
        },
  
        performSearch: function() {
            queryString = this.$el.find('#search-query').val();
            this.trigger('searchRequest', {queryString:queryString});
        },
        
		template: templates.videoSearch,

		onRender: function () {
		}
	
	});
});
