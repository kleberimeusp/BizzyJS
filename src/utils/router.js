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
window.B.utils.router = (function () {

	"use strict";

	/**
	* 
	*/
	function RouterModel (config) {

		this.__initialize(config);

	}

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "segments", {

		writable: true

	});

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "callback", {

		writable: true

	});

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "__validator", {

		writable: true

	});

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "__initialize", {

		value: function (config) {

			this.segments = config.url.split("/");
			this.callback = (typeof config.callback === "function") ? config.callback : function () {};

		}

	});

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "__buildValidator", {

		value: function () {

			var regularExpression = "",
				url = this.segments.join("/");

			regularExpression = url.replace(/{(\w+)}/g, function (match, number) {

				return "(\\w+)";

			});

			this.__validator = new RegExp(BIZZY.uitls.format("^({0})$", regularExpression));

		}

	});

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "getParameters", {

		value: function (other) {

			var i = other.segments.length,
				parameters = [];

			if (!this.equals(other)) {

				return [];

			}

			while (--i) {
			
				if (/^{(\d+)}$/i.test(this.segments[i])) {
				
					parameters.push(other.segments[i]);
				
				}
			
			}

			return parameters;

		}

	});

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "equals", { 

		value: function (other) {

			this.__buildValidator();

			this.equals = function (other) {

				return this.__validator.test(other.url);

			}.bind(this)(other);

		}

	});

	/**
	* 
	*/
	function Router () {

		this.__initialize();

	}

	/**
	* 
	*/
	Object.defineProperty(Router.prototype, "__data", {

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Router.prototype, "__initialize", {

		value: function () {

			window.addEventListener("hashchange", this.__hashchange.bind(this), false);

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Router.prototype, "__hashchange", {

		value: function () {

			var i = this.__data.length,
				other = new RouterModel({ url: window.location.hash.substr(1) });

			while (--i) {

				if (this.__data[i].equals(other)) {

					this.__data[i].callback(this.__data[i].getParameters(other));

				}

			}

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Router.prototype, "define", {

		value: function (routesDefination) {

			var i = routesDefination.length;

			while (--i) {

				this.__data.push(new RouterModel(routesDefination[i]));

			}

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Router.prototype, "start", {

		value: function () {

			window.dispatchEvent(new window.Event("hashchange"));

		}

	});

	return new Router();

})();