/*global define */

define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	'use strict';

	return Marionette.ItemView.extend({
		tagName: 'li',

		template: templates.assetItem,

		ui: {
		},

		events: {
		},

		initialize: function () {
			//this.listenTo(this.model, 'change', this.render, this);
		},

		onRender: function () {
		}
	
	});
});
