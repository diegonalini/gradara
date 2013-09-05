/*global define */

define([
	'marionette',
	'templates',
	'models/User'
], function (Marionette, templates, User) {
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
			e.preventDefault();
			$.getJSON('/login/pippo/b', function(data) {
				$.each(data, function(key, val) {
					if (key=='username') window.app.user.set({ username: val});
					if (key=='token') window.app.user.set({ token: val});
					if (key=='language') window.app.user.set({ language: val});
				});
			});
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
