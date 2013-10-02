/*global define */

define([
	'marionette',
	'templates',
	'bonelets/views/ActiveCount',
	'bonelets/views/CompletedCount'
], function (Marionette, templates, ActiveCount, CompletedCount) {
	'use strict';

	return Marionette.Layout.extend({
		template: templates.todoFooter,

		regions: {
			activeCount: '#todo-count',
			completedCount: '#clear-completed'
		},

		ui: {
			filters: '#filters a'
		},

		events: {
			'click #clear-completed' : 'onClearClick'
		},

		onRender: function () {
			this.activeCount.show(new ActiveCount({ collection: this.collection }));
			this.completedCount.show(new CompletedCount({ collection: this.collection }));
		},

		updateFilterSelection: function (filter) {
			this.ui.filters
				.removeClass('selected')
				.filter('[href="#/' + filter + '"]')
				.addClass('selected');
		},

		onClearClick: function () {
			window.app.vent.trigger('todoList:clear:completed');
		}
	});
});
