;(function (context) {

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

	context.Bizzy.RouterModel = FacadeRouterModel;

})(window);