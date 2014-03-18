;(function (context) {

	"use strict";

	/**
	* 
	*/
	function Router () {

		this._initialize();

	}

	/**
	* 
	*/
	Object.defineProperty(Router.prototype, "_data", {

		writable: true,
		value: []

	});

	/**
	* 
	*/
	Router.prototype._initialize = function () {

		context.Bizzy.event.on(window, "hashchange", this._hashchange.bind(this));

	};

	/**
	* 
	*/
	Router.prototype._execute = function (route) {

		var outher = context.Bizzy.RouterModel.builder({ url: window.location.hash.substr(1) });
			
		if (route.equalsPath(other)) {

			route.callback()

		} else if (route.equalsMax(other) && route.hasParameters(other)) {

			route.data.callback(route.getParameters(other));

		}

	};

	/**
	* 
	*/
	Router.prototype._hashchange = function () {

		var i = 0,
			max = this._data.length;

		while (i < max) {

			this._execute(this._data[i]);
			i += 1;

		}

	};

	/**
	* 
	*/
	Router.prototype.define = function (routesDefination) {

		var i = 0,
			max = routesDefination.length;

		while (i < max) {

			this._data.push(contex.Bizzy.RouterModel.builder(routesDefination[i]));
			i += 1;

		}

	};

	/**
	* 
	*/
	Router.prototype.start = function () {

		context.Bizzy.event.trigger("hashchange");

	};

	context.Bizzy.router = new Router();

})(window);