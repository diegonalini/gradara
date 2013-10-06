
define([
	'marionette',
	'templates',
	'bonelets/collections/SlideShowList',
	'bonelets/views/SlideShowItemView',
	'camera'
], function (Marionette, templates, SlideShowList, SlideShowItemView) {
	'use strict';

	return Marionette.CompositeView.extend({
		name: "Camera",
		
		template: templates.slideShow,
		
		itemView: SlideShowItemView,
		
		itemViewContainer: '#camera_wrap_1',

		initialize: function(options){
			var self = this;
			app.slideshowfilter=options.group;
			this.collection=new SlideShowList();
			this.collection.fetch().then(function() {
				self.render();
 			});
 			
		},

		onRender : function() {
			$('.removeMe').remove()
			if(this.collection.size()>0)
				jQuery('#camera_wrap_1').camera({loader:'none', fx:'simpleFade'});
		}
		
	});
});