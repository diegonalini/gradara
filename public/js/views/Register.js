/*global define */

define([
	'marionette',
	'templates',
	'models/UserRegister'
], function (Marionette, templates, UserRegister) {
	'use strict';

		return Marionette.ItemView.extend({
			template: templates.userRegister,
	
			ui: {
				username: 			'input[name="username"]',
				first_name :        'input[name="first_name"]',
	            last_name :         'input[name="last_name"]',
	            email  :            'input[name="email"]',
	            password :          'input[name="password"]',
	            confirm_password:   'input[name="confirm_password"]' 
			},
			
	        initialize: function() {
	        	var self = this;
	            this.user = new UserRegister;
	            self.user.on('invalid', function(model, error) {
	            	self.processErrors(error);
	            });
	        },
	        
	        onShow : function() {
	        	$('#registerModal').modal({
				  backdrop: 'static',
				  keyboard: false
				});
	        },
	        
	        destroy : function() {
	        	this.remove();
	        },
	        
	        events: {
	            'click #registerSubmit' : 'onSubmit',
	            'blur input[name="username"]' : 'checkUsernameExists',
	            'blur input[name="email"]'    : 'checkEmailExists',
	            'click .destroyRegister' : 'destroy'
	        },
	        
	        checkUsernameExists: function(e) {
	            var self = this;
	            if(this.ui.username.val().length > 3) {
	            	$.getJSON('/existsUsername/'+this.ui.username.val(), function(data) {
						if (data['exist'])	self.processErrors([{name: 'username', error: 'This username is already taken, please try another.'}]);
						else {
							$('input[name="reg_username"]').closest('.controls').find('.help-inline').empty();
							$('#registerUsername').removeClass('error').addClass('success');
						}
      				});
	            }
	        },
	        
	        checkEmailExists: function(e) {
	            var self = this;
	            var email_filter    = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	            if (email_filter.test(this.ui.email.val())) {
	            	$.getJSON('/existsEmail/'+this.ui.email.val(), function(data) {
						if (data['exist'])	self.processErrors([{name: 'email', error: 'This email is already taken, please try another.'}]);
						else {
							$('input[name="reg_email"]').closest('.controls').find('.help-inline').empty();
							$('#registerEmail').removeClass('error').addClass('success');
						}
      				});	                
	            }
	        },  
	        
	        onSubmit: function(e) {
	            var self = this;
	            e.preventDefault();
	            	
	            var attrs = {
	                'first_name': this.ui.first_name.val(),
	                'last_name':  this.ui.last_name.val(),
	                'email':    this.ui.email.val(),
	                'username': this.ui.username.val(),
	                'password': this.ui.password.val()
	            };
	
	            $('div.control-error').html('');
						$('#registerUsername').removeClass('error').addClass('success');
	            		$('#registerFirstName').removeClass('error').addClass('success');
	            		$('#registerEmail').removeClass('error').addClass('success');
	            		$('#registerLastName').removeClass('error').addClass('success');
	            		$('#registerPassword').removeClass('error').addClass('success');
	            		$('#registerConfirmPassword').removeClass('error').addClass('success');
	            		$('.help-inline').html("");
	            var user = this.user.set(attrs, {validate:true});
	
	            var errors = [];

                if (self.ui.confirm_password.val() == '') 
                    errors.push({name: 'confirm_password', error: 'Please confirm your password.'});

                else if (self.ui.confirm_password.val() !== self.ui.password.val()) 
                        errors.push({name: 'confirm_password', error: 'Your passwords do not match.  Please confirm your passwords.'});
                if(errors.length > 0) {
                    self.processErrors(errors);
                 } else if(user){
					
					$.ajax({
					  url: '/register',
					  dataType: 'json',
					  type: "POST",
					  data: this.user.toJSON()
					}).done(function( msg ) {
						Backbone.trigger('flash:success','Registration request accepted. Confirmation EMAIL sent');
                   		$('.modal-backdrop').remove();
                   		self.remove();
					});
                }
          
	        },
	        
	        processErrors: function(response) {
	            for (var key in response) {
	            	if (response.hasOwnProperty(key)) {
	                    var field = response[key];
	                    $('input[name="'+field.name+'"]').closest('.controls').find('.help-inline').html(field.error);
	                    $('input[name="'+field.name+'"]').closest('.control-group').removeClass('success');
	                    $('input[name="'+field.name+'"]').closest('.control-group').addClass('error');
	                }
	            }
			}
	});
	
	
});
