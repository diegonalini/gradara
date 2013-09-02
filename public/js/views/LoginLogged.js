/*global define */

define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	'use strict';


	return Marionette.CompositeView.extend({
		tagName: 'li',

		template: templates.loginLogged,

		value: '',

		ui: {
		},

		events: {
			'click .dropdown-menu': 'preventClose',
			'click #logout-button' : 'onLogoutClick'
		},

		onLogoutClick: function (e) {
			e.stopPropagation();
			window.app.vent.trigger('login:logout:clicked');
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
