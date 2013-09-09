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
			//console.log("LoginLogout logoutclick "+JSON.stringify(window.app.user));
			$.getJSON('/logout/'+window.app.user.get('token'), function(data) {
				console.log("logged out");
      			window.app.user.set({isLogged: false, token: '0', username: ''});
      		});
      		//console.log("LoginLogout logoutclick 2 (setted isLogged false) "+JSON.stringify(window.app.user));
			//Backbone.trigger('login:logout:clicked');
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
