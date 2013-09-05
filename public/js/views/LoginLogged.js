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
			e.preventDefault();
			$.getJSON('/logout/12345', function(data) {
				console.log("logged out");
      			window.app.user.set({islogged: false, token: '0', username: ''});
      		});
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
