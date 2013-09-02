/*global define */

define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	'use strict';


	return Marionette.CompositeView.extend({
		tagName: 'li',

		template: templates.loginLogin,

		value: '',

		ui: {
		},

		events: {
			'click .dropdown-menu': 'preventClose',
			'click #login-button' : 'onLoginClick'
		},

		onLoginClick: function (e) {
			e.stopPropagation();
			window.app.vent.trigger('login:login:clicked');
		},

		preventClose: function (e) {
			e.stopPropagation();
		},
		
		
		initialize: function () {
		
		},

		onRender: function () {
		}


	});
});
