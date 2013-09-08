/*global define */

define([
	'marionette',
	'templates'
], function (Marionette, templates, LoginLogin, LoginLogged) {
	'use strict';

	return Marionette.Layout.extend({
		template: templates.flash,


		initialize: function(){
			Backbone.on('flash:success', function(msg) {
				$( ".alert-success" ).html(msg).fadeIn( 300 ).delay( 2000 ).fadeOut( 400 );
			});
			Backbone.on('flash:error', function(msg) {
				$( ".alert-error" ).html(msg).fadeIn( 300 ).delay( 2000 ).fadeOut( 400 );
			});
		},

		onRender : function() {
		}
		
	});
});
