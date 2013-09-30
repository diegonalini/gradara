/*global define */

define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	'use strict';

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	return Marionette.CompositeView.extend({
		tagName: 'li',

		template: templates.menuItemView,

		ui: {
			edit: '.edit'
		},

		events: {
			'click': 'clicked'
			
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render, this);
		},

		onRender: function () {
			this.$el
				.removeClass('active')
				.addClass((this.model.get('title').toLowerCase()=='home' && Backbone.history.fragment=='')||this.model.get('title')==Backbone.history.fragment ? 'active' : '');
		},
		
		clicked: function () {
			$("#menu-list li").removeClass('active');
			this.$el
				.removeClass('active')
				.addClass(/*this.model.get('active') ? 'active' : ''*/'active');
		    var dest=this.model.get('title');
		    if(dest.toLowerCase()=='home') dest='';
			app.router.navigate(dest);
		},

		destroy: function () {
			this.model.destroy();
		},

		toggle: function () {
			this.model.toggle();
		},

		toggleEditingMode: function () {
			this.$el.toggleClass('editing');
		},

		onEditDblclick: function () {
			this.toggleEditingMode();
		},

		onEditKeypress: function (event) {
		},

		onEditBlur: function (event) {
		}
	});
});
