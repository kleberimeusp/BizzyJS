;(function (contex) {

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

	contex.Bizzy = new Bizzy();

})(window);