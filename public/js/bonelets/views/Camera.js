
define([
	'marionette',
	'templates',
	'camera'
], function (Marionette, templates) {
	'use strict';

	return Marionette.Layout.extend({
		template: templates.camera,

		initialize: function(){
			
		},

		onShow : function() {
			jQuery('#camera_wrap_1').camera({loader:'none', fx:'simpleFade'});
		}
		
	});
});