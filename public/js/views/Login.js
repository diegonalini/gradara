/*global define */

define([
	'marionette',
	'templates',
	'views/LoginLogin',
	'views/LoginLogged'
], function (Marionette, templates, LoginLogin, LoginLogged) {
	'use strict';

	return Marionette.Layout.extend({
		template: templates.login,

		regions : {
			placeholder : '#placeholderLogin'
		},


		onRender : function() {
			this.placeholder.show(new LoginLogin());
			var that=this;
			
			app.vent.on('login:login:clicked', function() {
				console.log(this);
				that.placeholder.show(new LoginLogged());
			});
			
			app.vent.on('login:logout:clicked', function() {
				console.log(this);
				that.placeholder.show(new LoginLogin());
			});
		}
		
	});
});
