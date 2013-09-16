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
			'click #logout-button' : 'onLogoutClick',
			'click #changepwd-button' : 'onChangepwdClick'
		},

		
		onChangepwdClick: function (e) {
			e.stopPropagation();
			e.preventDefault();
			$('#changepwdModal').appendTo("body").modal('show');
			$('#password1-field').val('');
			$('#password2-field').val('');
			$('#oldpassword-field').val('');
			$('body').off('click',"#changepwd-submit");
			$('body').on('click',"#changepwd-submit", function( e ) {
				e.preventDefault();
				$('#changepwdModal').modal('hide');
				var pwd1=$('#password1-field').val();
				var pwd2=$('#password2-field').val();
				var old=$('#oldpassword-field').val();
				if(pwd1!=pwd2 || pwd1.length<8 || old.length<1 || old==pwd1) Backbone.trigger('flash:error','Error changing password: at least 8 chars');
				else 
				$.getJSON('/changepwd/'+old+'/'+pwd1, function(data) {
					if (data['updatedExisting'])	Backbone.trigger('flash:success','Password changed');
					else Backbone.trigger('flash:error','Error changing password');
      			});
				
			});
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
