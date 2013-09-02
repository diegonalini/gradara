/*global define */

define(function (require) {
	'use strict';

	return {
		todoItemView: require('tpl!templates/todoItemView.tmpl'),
		todosCompositeView: require('tpl!templates/todoListCompositeView.tmpl'),
		footer: require('tpl!templates/todoFooter.tmpl'),
		header: require('tpl!templates/todoHeader.tmpl'),
		login: require('tpl!templates/login.tmpl'),
		loginLogin: require('tpl!templates/loginLogin.tmpl'),
		loginLogged: require('tpl!templates/loginLogged.tmpl'),
		todo: require('tpl!templates/todo.tmpl'),
		tableExG: require('tpl!templates/tableExG.tmpl'),
		tableExR: require('tpl!templates/tableExR.tmpl')
		
	};
});

