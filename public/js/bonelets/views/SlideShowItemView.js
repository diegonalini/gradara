/*global define */

define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	'use strict';

	return Marionette.ItemView.extend({
		tagName: 'div',

		template: templates.slideShowItemView,

		ui: {
		},

		events: {
		},

		initialize: function () {
			//this.listenTo(this.model, 'change', this.render, this);
		},

		onRender: function () {
			 var self=this;
			 this.el.setAttribute('data-src', this.model.get('url'));
			 if(this.model.get('group')!=app.slideshowfilter)this.el.className="removeMe";
		}
	
	});
});
