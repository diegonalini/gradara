/*global define */

define([
	'marionette',
	'templates',
	'views/MenuItemView', 
	'collections/MenuList'
], function (Marionette, templates, ItemView, MenuList) {
	'use strict';

	return Marionette.CompositeView.extend({
		template: templates.menu,

		itemView: ItemView,

		itemViewContainer: '#menu-list',

		ui: {
			//toggle: '#toggle-all'
		},

		events: {
			//'click #toggle-all': 'onToggleAllClick'
		},

		initialize: function () {
			this.collection=new MenuList();
			var that=this;
			this.collection.on('sort reset', this.render, this);
			Backbone.on('change:page login logout', function(msg) {
				that.render();
			});
		},

		onBeforeRender: function(){
		    this.collection.fetch();
		},
  
		onRender: function () {
			//var menuList = new MenuList();
			//menuList.fetch();
			//console.log(menuList);
			//this.updateToggleCheckbox();
		},

	});
});
