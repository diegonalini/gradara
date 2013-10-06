/*global define */

define(function (require) {
	'use strict';

	return {
		todoItemView: require('tpl!bonelets/templates/todoItemView.tmpl'),
		todosCompositeView: require('tpl!bonelets/templates/todoListCompositeView.tmpl'),
		slideShowItemView: require('tpl!bonelets/templates/slideShowItemView.tmpl'),
		todoFooter: require('tpl!bonelets/templates/todoFooter.tmpl'),
		header: require('tpl!bonelets/templates/todoHeader.tmpl'),
		login: require('tpl!templates/login.tmpl'),
		loginLogin: require('tpl!templates/loginLogin.tmpl'),
		loginLogged: require('tpl!templates/loginLogged.tmpl'),
		todo: require('tpl!bonelets/templates/todo.tmpl'),
		flash: require('tpl!templates/flash.tmpl'),
		tableExG: require('tpl!bonelets/templates/tableExG.tmpl'),
		tableExR: require('tpl!bonelets/templates/tableExR.tmpl'),
		slideShow: require('tpl!bonelets/templates/slideShow.tmpl'),
		userRegister: require('tpl!templates/userRegister.tmpl'),
		menu: require('tpl!templates/menu.tmpl'),
		menuItemView: require('tpl!templates/menuItemView.tmpl')
	};
});

