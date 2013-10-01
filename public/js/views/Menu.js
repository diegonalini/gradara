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
			var that=this;
			Backbone.on('change:page', function(msg) {
				that.render();
			});
		},

		onRender: function () {
			//var menuList = new MenuList();
			//menuList.fetch();
			//console.log(menuList);
			//this.updateToggleCheckbox();
		},

	});
});
