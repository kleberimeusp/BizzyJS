/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Cleber de Moraes Gonçalves
 * Licensed under the MIT license.
 *
 */

;(function (window, undefined) {

	"use strict";

	/**
	* 
	*/
	function Bizzy () {}

	/**
	* 
	*/
	Object.defineProperty(Bizzy.prototype, "views", {

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Bizzy.prototype, "templates", {

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Bizzy.prototype, "models", {

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Bizzy.prototype, "util", {

		writable: true,
		value: {}

	});

	window.Bizzy = new Bizzy();

})(window);

/*
 * BizzyJS
 */
