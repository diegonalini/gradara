/*global define */

define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	'use strict';

	return Marionette.CompositeView.extend({
		className: 'video',
        
		tagName: 'li',

		template: templates.singleVideo,

		ui: {
		},

		onRender: function () {
		}
	
	});
});
