/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

window.B = (function () {

	"use strict";

	/**
	* 
	*/
	function Bizzy () {}

	/**
	* 
	*/
	Object.defineProperty(Bizzy.prototype, "utils", { value:  {} });

	/**
	* 
	*/
	Object.defineProperty(Bizzy.prototype, "templates", { value: {} });

	/**
	* 
	*/
	Object.defineProperty(Bizzy.prototype, "views", {  value: {} });

	/**
	* 
	*/
	Object.defineProperty(Bizzy.prototype, "models", { value: {} });

	return new Bizzy();

})();