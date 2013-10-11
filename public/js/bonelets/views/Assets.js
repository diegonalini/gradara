
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
		
		group: '',
		
		itemViewContainer: '#asset_wrap',
		
		events: {
			'click #add': 'add'
		},
		
		add : function() {
			this.collection.add({title:'title here...', content:'content here...', group:this.group});
			
		},

		initialize: function(options){
			var self = this;
			this.group=options.group;
			app.assetfilter=options.group;
			this.collection=new AssetList();
			this.collection.fetch().done(function(){ // i am proceeding after i finish the fetch!
	            var filterType = _.filter(self.collection.models,function(item){
	                return item.get('group') == self.group;
	            })
	            self.collection.reset(filterType);
	        }).then(function() {
				self.render();
 			});
 			
 			this.listenTo(window.app.user, 'change:isLogged', function() {
				this.render();
			});
		},

		onRender : function() {
			if(window.app.user.get('role')!='admin' && window.app.user.get('role')!='editor'){
				this.$('#add').remove();
			}
		}
		
		
	});
});