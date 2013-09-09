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


		initialize: function(){
			var that=this;
			Backbone.on('login', function() {
				console.log("Login show logged");
				that.placeholder.show(new LoginLogged());
			});
			
			Backbone.on('logout', function() {
				console.log("Login show login");
				that.placeholder.show(new LoginLogin());
			});
		},

		onRender : function() {
			//console.log("Login onRender");
			if(window.app.user.get('isLogged')) 
				this.placeholder.show(new LoginLogged());
			else 
				this.placeholder.show(new LoginLogin());
			$.ajaxSetup (
   				{headers: {'ACCESS_TOKEN':window.app.user.get('token')}}
			);
		}
		
	});
});
