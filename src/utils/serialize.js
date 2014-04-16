/*******************************************************
 *                                                     *
 * BizzyJS                                             *
 * https://github.com/Bibizzy/BizzyJS                  *
 *                                                     *
 * Copyright (c) 2014 Bibizzy                          *
 * Licensed under the MIT license.                     *
 *                                                     *
 ******************************************************/

/**
* 
*/
window.B.utils.Serialize = (function (BIZZY) {

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

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__data", {

		writable: true,
		value: {}

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

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__initialize", {

		value: function () {

			this.__defineNodeName();
			this.__defineType();

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__defineNodeName", {

		value: function () {

			this.__nodeName = {

				"INPUT": this.__searchForNodeType.bind(this),
				"BUTTON": this.__searchForNodeType.bind(this),
				"SELECT": this.__searchForNodeType.bind(this),

				"TEXTAREA": this.__push.bind(this)

			};

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__defineType", {

		value: function () {

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

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__push", {

		value: function (element) {

			this.__data[element.name] = element.value;

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__pushChecked", {

		value: function (element) {

			this.__data[element.name] = element.checked ? element.value : null;

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__pushSelectMultiple", {

		value: function (element) {

			var i = element.options.length;

			while (--i) {

				this.__data[element.name] = element.options[i].selected ? element.options[i].value : null;

			}

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__searchForNodeType", {

		value: function (element) {

			this.__type[element.name](element);

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__serachForNodeName", {

		value: function (element) {

			this.__nodeName[element.name](element);

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__execute", {

		value: function () {

			var i = this.__form.elements.length;

			while (--i) {

				if (this.__form.elements[i].name === "") {

					continue;

				}

				this.__serachForNodeName(this.__form.elements[i]);

			}

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "toJSON", {

		value: function (form)  {

			if (!form || form.nodeName !== "FORM") {

				return {};

			}

			this.__form = form;
			this.__data = {};

			this.__execute();

			return this.__data;

		}

	});

	return new Serialize();

})();