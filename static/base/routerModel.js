;(function (context) {

	"use strict";

	/**
	* 
	*/
	function RouterModel () {}

	/**
	* 
	*/
	RouterModel.builder = function (config) {

		var newRouterModel = new RouterModel();

		newRouterModel.data.url = config.url;
		newRouterModel.data.path = config.url.split("/");
		newRouterModel.data.max = newRouterModel.data.path.lengh;

		newRouterModel.data.callback = (typeof config.callback === "function") ? config.callback : function () {};

		return newRouterModel;

	};

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "data", {

		writable: true,
		value: {}

	});

	/**
	* Trocar o nome de Path para Segments
	*/
	RouterModel.prototype.equalsPath = function (other) {

		return this.data.path == other.data.path;
	}

	/**
	* 
	*/
	RouterModel.prototype.equalsMax = function (other) {

		return this.data.max == other.data.max;

	};

	/**
	* 
	*/
	RouterModel.prototype.hasParameters = function (other) {

		return this.getParameters(other).length > 0;

	};

	/**
	* 
	*/
	RouterModel.prototype.getParameters = function (other) {

		var i = 0,
			max = other.data.max,
			parameters = [];

		while (i < max) {
		
			if (/^{(\d+)}$/i.test(this.data.path[i])) {
			
				parameters.push(other.data.path[i]);
			
			} else if (this.data.path[i] !== other.data.path[i]) {
			
				return parameters;
			
			}

			i += 1
		
		}

		return parameters;

	};

	context.Bizzy.RouterModel = RouterModel;

})(window);