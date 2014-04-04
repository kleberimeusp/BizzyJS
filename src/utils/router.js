/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

window.B.utils.router = (function (BIZZY) {

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
	RouterModel.prototype.__initialize = function (config) {

		this.segments = config.url.split("/");
		this.callback = (typeof config.callback === "function") ? config.callback : function () {};

	};

	/**
	* 
	*/
	RouterModel.prototype.__buildValidator = function () {

		var regularExpression = "",
			url = this.segments.join("/");

		regularExpression = url.replace(/{(\w+)}/g, function (match, number) {

			return "(\\w+)";

		});

		this.__validator = new RegExp(BIZZY.uitls.format("^({0})$", regularExpression));

	};

	/**
	* 
	*/
	RouterModel.prototype.getParameters = function (other) {

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

	};

	/**
	* 
	*/
	RouterModel.prototype.equals = function (other) {

		this.__buildValidator();

		this.equals = function (other) {

			return this.__validator.test(other.url);

		}.bind(this)(other);

	};

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

		writable: true

	});

	/**
	* 
	*/
	Router.prototype.__initialize = function () {

		window.addEventListener("hashchange", this.__hashchange.bind(this), false);

	};

	/**
	* 
	*/
	Router.prototype.__hashchange = function () {

		var i = this.__data.length,
			other = new RouterModel({ url: window.location.hash.substr(1) });

		while (--i) {

			if (this.__data[i].equals(other)) {

				this.__data[i].callback(this.__data[i].getParameters(other));

			}

		}

	};

	/**
	* 
	*/
	Router.prototype.define = function (routesDefination) {

		var i = routesDefination.length;

		while (--i) {

			this.__data.push(new RouterModel(routesDefination[i]));

		}

	};

	/**
	* 
	*/
	Router.prototype.start = function () {

		window.dispatchEvent(new window.Event("hashchange"));

	};

	/**
	* 
	*/
	function Facade () {

		var router = new Router(),
			revelation = {};

		/* Revelation pattern */
		revelation.define = router.define;
		revelation.start = router.start;

		return revelation;

	}

	return new Facade();

})(window.B || {});