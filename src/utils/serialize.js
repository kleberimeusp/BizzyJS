/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

window.B.utils.serialize = (function (BIZZY) {

	"use strict";

	/**
	* 
	*/
	function Serialize () {

		this.__initialize();

	}

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__form", {

		writable: true

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__data", {

		writable: true

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__nodeName", {

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "_type", {

		writable: true

	});

	/**
	* 
	*/
	Serialize.prototype.__initialize = function () {

		this.__defineNodeName();
		this.__defineType();

	};

	/**
	* 
	*/
	Serialize.prototype.__defineNodeName = function () {

		this.__nodeName = {

			"INPUT": this.__searchForNodeType.bind(this),
			"BUTTON": this.__searchForNodeType.bind(this),
			"SELECT": this.__searchForNodeType.bind(this),

			"TEXTAREA": this.__push.bind(this)

		};

	};

	/**
	* 
	*/
	Serialize.prototype.__defineType = function () {

		this.__type = {

			"button": this.__push.bind(this),
			"hidden": this.__push.bind(this),
			"text": this.__push.bind(this),
			"password": this.__push.bind(this),
			"reset": this.__push.bind(this),
			"select-one": this.__push.bind(this),
			"submit": this.__push.bind(this),

			"checkbox": this.__pushChecked.bind(this),
			"radio": this.__pushChecked.bind(this),

			"select-multiple": this.__pushSelectMultiple.bind(this),

			"file": function () {}

		};

	};

	/**
	* 
	*/
	Serialize.prototype.__push = function (element) {

		this.__data[element.name] = element.value;

	};

	/**
	* 
	*/
	Serialize.prototype.__pushChecked = function (element) {

		this.__data[element.name] = element.checked ? element.value : null;

	};

	/**
	* 
	*/
	Serialize.prototype.__pushSelectMultiple = function (element) {

		var i = element.options.length;

		while (--i) {

			this.__data[element.name] = element.options[i].selected ? element.options[i].value : null;

		}

	};

	/**
	* 
	*/
	Serialize.prototype.__searchForNodeType = function (element) {

		this.__type[element.name](element);

	};

	/**
	* 
	*/
	Serialize.prototype.__serachForNodeName = function (element) {

		this.__nodeName[element.name](element);

	};

	/**
	* 
	*/
	Serialize.prototype.__execute = function () {

		var i = this.__form.elements.length;

		while (--i) {

			if (this.__form.elements[i].name === "") {

				continue;

			}

			this.__serachForNodeName(this.__form.elements[i]);

		}

	};

	/**
	* 
	*/
	Serialize.prototype.toJSON = function (form)  {

		if (!form || form.nodeName !== "FORM") {

			return {};

		}

		this.__form = form;
		this.__data = {};

		this.__execute();

		return this.__data;

	};

	/**
	* 
	*/
	function Facade () {

		var serialize = new Serialize(),
			revelation = {};

		/* Revelation pattern */
		revelation.toJSON = serialize.toJSON;

		return revelation;

	}

	return new Facade();

})(window.B || {});