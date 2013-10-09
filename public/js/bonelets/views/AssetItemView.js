/*global define */

define([
	'marionette',
	'templates',
	'etch',
	'jqueryui'
], function (Marionette, templates) {
	'use strict';

	return Marionette.CompositeView.extend({
		tagName: 'li',

		template: templates.assetItem,

		ui: {
		},

		modelEvents: {
    		'saveModel': 'save1',
    		'click .destroy': 'destroy'
		},
		
		events: {
			'mousedown .editable': 'editableClick',
			'click .destroy': 'destroy'
		},
		
		destroy: function () {
			this.model.destroy();
		},

		save1: function () {
			//console.log(this.model);
			var title= this.$('.title').text();
			var body= this.$('.body').text();
          	this.model.save({title:title, content:body});
          	$(this.el).find('.editable').effect('highlight', {color: 'yellow'});
			//this.listenTo(this.model, 'change', this.render, this);
		},

        editableClick: etch.editableInit,

		initialize: function () {
          	//this.model.bind('save', this.model.save, this);
			//this.listenTo(this.model, 'change', this.render, this);
		},

		onRender: function () {
			if(window.app.user.get('role')!='admin' && window.app.user.get('role')!='editor'){
				this.$('.title').removeClass('editable');
				this.$('.title').removeAttr('contenteditable');
				this.$('.body').removeClass('editable');
				this.$('.body').removeAttr('contenteditable');
				this.$('.destroy').remove();
			}
		}
	
	});
});
