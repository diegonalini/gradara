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
			
			network_link: true,
			islogged: false 
		},
		
		update: function () {
	        console.log("updated User ");
	        this.save();
	    },
		    
		initialize: function () {
			this.fetch();
			//_.bindAll(this, "update");
			this.on('change', this.update);
			
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
			console.log(this.toJSON());
			$.getJSON('/islogged/'+this.get('token'), function(data) {
				try{$(".modal").overlay().close();}
				catch(e){}
				$.each(data, function(key, val) {
					if (key=='valid') if (val==true) window.app.user.set({islogged: true}); else {
						window.app.user.set({islogged: false, token: '0', username: ''});
					}
					if (key=='valid')console.log(val);
				});
			}).error(function() { 
				$(".modal").overlay({
	      			// some mask tweaks suitable for modal dialogs
				      mask: {
				        color: '#ebecff',
				        loadSpeed: 200,
				        opacity: 0.9
				      },
				      closeOnClick: false
				  }).load();
			 });
		}
	});
});

