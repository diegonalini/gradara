/*global define */

define(function (require) {
	'use strict';

	return {
		todoItemView: require('tpl!templates/todoItemView.tmpl'),
		todosCompositeView: require('tpl!templates/todoListCompositeView.tmpl'),
		footer: require('tpl!templates/todoFooter.tmpl'),
		header: require('tpl!templates/todoHeader.tmpl'),
		login: require('tpl!templates/login.tmpl'),
		todo: require('tpl!templates/todo.tmpl'),
		tableExample: require('tpl!templates/tableExample.tmpl'),
		tableExG: require('tpl!templates/tableExG.tmpl'),
		tableExR: require('tpl!templates/tableExR.tmpl')
		
	};
});

