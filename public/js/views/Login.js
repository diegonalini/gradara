/*global define */

define([
	'marionette',
	'templates',
	'views/LoginLogin',
	'views/LoginLogged',
	'jqueryTools',
	'jqueryMigrate'
], function (Marionette, templates, LoginLogin, LoginLogged, tools, migrate) {
	'use strict';

	return Marionette.Layout.extend({
		template: templates.login,

		regions : {
			placeholder : '#placeholderLogin'
		},


		onRender : function() {
			if(window.app.user.get('islogged')) 
				this.placeholder.show(new LoginLogged());
			else 
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
