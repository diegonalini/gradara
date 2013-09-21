/*global define */

define([
	'backbone'
], function (Backbone) {
	'use strict';

		return Backbone.Model.extend({
		    url: '/user',
		    defaults: {
		        first_name: '',
		        last_name: '',
		        email: '',
		        username: '',
		        password: ''
		    },
		    validate: function(attrs) {
		
		        var email_filter    = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		        var username_filter = /^([a-zA-Z0-9]){0,}$/;
		        var password_filter = /^([a-zA-Z0-9.,;:!*_-]){0,}$/;
		        var name_filter = /^([a-zA-Z]){3,}$/;
		
		        var errors = [];
		
		        if (!name_filter.test(attrs.first_name)) 
		            errors.push({name: 'first_name', error: 'Please enter valid First Name'});
		
		        if (!name_filter.test(attrs.last_name))  
		            errors.push({name: 'last_name', error: 'Please enter valid Last Name'});
		
				var testExistEmail=false;
		
		        if (!email_filter.test(attrs.email)) 
		            errors.push({name: 'email', error: 'Please enter a valid email address'});
				else	testExistEmail=true; 
				
				var unameErr=false;
				var testExistUname=false;
				
		        if (!username_filter.test(attrs.username)) {
		            errors.push({name: 'username', error: 'Invalid characters.  Only letters and numbers.'});
		        	unameErr=true;    
		        }          
		
		        if (attrs.username.length > 12) {
		            errors.push({name: 'username', error: 'Your username must be less than 12 characters'});    
					unameErr=true;    
		        }
		        
		        if (attrs.username.length < 4) {
		            errors.push({name: 'username', error: 'Your username must be at least 4 characters'});
		        	unameErr=true;    
		        }
		        
		        if (!unameErr) testExistUname=true;
		        
				if (attrs.password == '') 
		            errors.push({name: 'password', error: 'Please provide a password.'});           
		
		        if (attrs.password.length < 8) 
		            errors.push({name: 'password', error: 'Your password must be at least 8 characters.'});
				
				if (!password_filter.test(attrs.password)) 
		            errors.push({name: 'password', error: 'Invalid characters.'});
		            
		       if (testExistUname) $.ajax({
				  url: '/existsUsername/'+attrs.username,
				  dataType: 'json',
				  async: false,
				  success: function(data) {
				    if (data['exist'])	errors.push({name: 'username', error: 'This username is already taken, please try another.'});
				  }
				});
				
				if (testExistEmail) $.ajax({
				  url: '/existsEmail/'+attrs.email,
				  dataType: 'json',
				  async: false,
				  success: function(data) {
				    if (data['exist'])	errors.push({name: 'email', error: 'This email is already taken, please try another.'});
				  }
				});
				
				if(errors.length > 0) return errors;
				
			}
		});
	
});

