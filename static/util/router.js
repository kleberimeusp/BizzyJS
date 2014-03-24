;(function (window, undefined) {

	"use strict";

	/**
	* 
	*/
	function RouterModel () {}

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
	RouterModel.prototype.__buildValidator = function () {

		var regularExpression = "",
			url = this.segments.join("/");

		regularExpression = url.replace(/{(\w+)}/g, function (match, number) {

			return "(\\w+)";

		});

		this.__validator = new RegExp(context.Bizzy.format("^({0})$", regularExpression));

	});

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
	function FacadeRouterModel (config) {

		if (!(this instanceof FacadeRouterModel)) {

			return new FacadeRouterModel(config);

		}

		var routerModel = new RouterModel();
		
		routerModel.segments = config.url.split("/");
		routerModel.callback = (typeof config.callback === "function") ? config.callback : function () {};

		return {

			equals: routerModel.equals,
			getParameters: routerModel.getParameters

		}

	}

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

		Bizzy.event.on(window, "hashchange", this.__hashchange.bind(this));

	};

	/**
	* 
	*/
	Router.prototype.__hashchange = function () {

		var i = this.__data.length,
			other = new Bizzy.RouterModel({ url: window.location.hash.substr(1) });

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

			this.__data.push(new FacadeRouterModel(routesDefination[i]));

		}

	};

	/**
	* 
	*/
	Router.prototype.start = function () {

		Bizzy.event.trigger("hashchange");

	};

	/**
	* 
	*/
	function FacadeRouter () {

		var router = new Router();

		return {

			define: router.define,
			start: router.start

		}

	}

	Bizzy.util.router = new FacadeRouter();

})(window);