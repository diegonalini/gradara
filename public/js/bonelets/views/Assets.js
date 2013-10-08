
define([
	'marionette',
	'templates',
	'bonelets/collections/AssetList',
	'bonelets/views/AssetItemView'
], function (Marionette, templates, AssetList, AssetItemView) {
	'use strict';

	return Marionette.CompositeView.extend({
		name: "Asset",
		
		template: templates.assets,
		
		itemView: AssetItemView,
		
		itemViewContainer: '#asset_wrap',

		initialize: function(options){
			var self = this;
			app.assetfilter=options.group;
			this.collection=new AssetList();
			this.collection.fetch().then(function() {
				self.render();
 			});
 			
		},

		onRender : function() {
		}
		
	});
});