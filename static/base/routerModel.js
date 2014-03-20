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

	Object.defineProperty(RouterModel.prototype, "callback", {

		writable: true

	});

	/**
	* 
	*/
	RouterModel.prototype.__equalsSegments = function (other) {

		return this.segments == other.segments;

	};

	/**
	* 
	*/
	RouterModel.prototype.__equalsMax = function (other) {

		return this.segments.length == other.segments.length;

	};

	/**
	* 
	*/
	RouterModel.prototype.__isVariable = function (segment) {

		return /^{(\d+)}$/i.test(segment);

	};

	/**
	* 
	*/
	RouterModel.prototype.__hasParameters = function (other) {

		return this.getParameters(other).length > 0;

	};

	/**
	* 
	*/
	RouterModel.prototype.getParameters = function (other) {

		var i = 0,
			max = other.segments.length,
			parameters = [];

		if (!this.__equalsMax(other)) {

			return [];

		}

		while (i < max) {
		
			if (this.__isVariable(this.segments[i])) {
			
				parameters.push(other.segments[i]);
			
			} else if (this.segments[i] !== other.segments[i]) {
			
				return [];
			
			}

			i += 1;
		
		}

		return parameters;

	};

	/**
	* 
	*/
	RouterModel.prototype.equals = function (other) {

		var i = 0,
			max = other.segments.length;

		if (!this.__equalsSegments(other)) {

			return false;

		}

		if (!this.__equalsMax(other)) {

			return false;

		}

		while (i < max) {

			if (this.__isVariable(this.segments[i])) {

				continue;

			} else if (this.segments[i] !== other.segments[i]) {

				return false;

			}

			i += 1;

		}

		return true;

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