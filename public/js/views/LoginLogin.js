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
			//console.log("LoginLogin loginclick "+JSON.stringify(window.app.user));
			var user=$('#username-field').val();
			var pwd=$('#password-field').val();
			if (user=='') user='nil';
			if (pwd=='') pwd='nil';
			$.getJSON('/login/'+user +'/'+pwd +'', function(data) {
				var newVals={};
				$.each(data, function(key, val) {
					if (key=='username') newVals[key]=val;
					//window.app.user.set({ username: val});
					if (key=='token')  newVals[key]=val;
					//window.app.user.set({ token: val});
					if (key=='language')  newVals[key]=val;
					if (key=='role')  newVals[key]=val;
					//window.app.user.set({ language: val});
				});
				if(newVals['username']!='') newVals['isLogged']=true;
				else Backbone.trigger('flash:error','Login error');
				//window.app.user.set({ isLogged: true});
				
				window.app.user.set(newVals);
				//console.log("LoginLogin loginclick 2 (setted isLogged true) "+JSON.stringify(window.app.user));
			});
			//Backbone.trigger('login:login:clicked');
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
