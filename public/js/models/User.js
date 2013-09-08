/*global define */

define([
	'backbone',
	'localStorage'
], function (Backbone) {
	'use strict';

	return Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage('gradaraUser'),
		
		defaults: {
			id: 1,
			
			username: '',
			token: '0',
			language: 'en',
			
			networkLink: true,
			isLogged: false
		},
		
		update: function () {
	        console.log("User.update");
	        //this.save();
	    },
	    
	    updateLoggedState: function () {
	        //console.log("User.updateLoggedState "+JSON.stringify(window.app.user));
	        	if (window.app.user.get('isLogged')){
	        		Backbone.trigger('login');
	        		Backbone.trigger('flash:success','&nbsp;Successfully logged in');
	        	}else{
	        		Backbone.trigger('logout');
	        		Backbone.trigger('flash:success','&nbsp;Successfully logged out');
	        	}
	        window.app.user.save();
	        //console.log("User.updateLoggedState 2 "+JSON.stringify(window.app.user));
	    },

		    
		initialize: function () {
			this.fetch();
			//_.bindAll(this, "update");
			this.on("change", this.updateLoggedState);
			//this.on('change', this.update);
			
			
			/*$(function() {
			    $.ajaxSetup({
			        error: function(jqXHR, exception) {
			        	 $(".modal").overlay({
			      			// some mask tweaks suitable for modal dialogs
						      mask: {
						        color: '#ebecff',
						        loadSpeed: 200,
						        opacity: 0.9
						      },
						      closeOnClick: false
						  }).load();
			            if (jqXHR.status === 0) {
			                console.log('Not connect.\n Verify Network.');
			            } else if (jqXHR.status == 404) {
			                console.log('Requested page not found. [404]');
			            } else if (jqXHR.status == 500) {
			                console.log('Internal Server Error [500].');
			            } else if (exception === 'parsererror') {
			                console.log('Requested JSON parse failed.');
			            } else if (exception === 'timeout') {
			                console.log('Time out error.');
			            } else if (exception === 'abort') {
			                console.log('Ajax request aborted.');
			            } else {
			                console.log('Uncaught Error.\n' + jqXHR.responseText);
			            }
			        }
			    });
			});*/
			var seconds = 5;
        	window.setInterval(_.bind(this.cycle, this), 1000 * seconds);
		},

		cycle: function () {
			//console.log("User.cycle "+JSON.stringify(window.app.user));
			$.getJSON('/islogged/'+window.app.user.get('token'), function(data) {
				try{
					
				}
				catch(e){}
				$.each(data, function(key, val) {
					//console.log("User.cycle 2 "+val+" "+JSON.stringify(window.app.user));
					if (key=='valid'){ 
						if(!window.app.user.get('networkLink')){
							$(".fadeMe").hide();
							window.app.user.set({networkLink: true});
						}
						if (val==true) {
							if (!window.app.user.get('isLogged')){
								window.app.user.set({isLogged: true});
							}
						} 
						else {
							if (window.app.user.get('isLogged')){
								window.app.user.set({isLogged: false, token: '0', username: ''});
							}
						}
					}
					//console.log("User.cycle 4 "+val+" "+JSON.stringify(window.app.user));
				});
			}).error(function() { 
				window.app.user.set({networkLink: false});
				$(".fadeMe").show();
			});
		}
	});
});

