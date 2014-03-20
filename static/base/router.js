;(function (context) {

	"use strict";

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

		context.Bizzy.event.on(window, "hashchange", this.__hashchange.bind(this));

	};

	/**
	* 
	*/
	Router.prototype.__hashchange = function () {

		var i = 0,
			max = this.__data.length,
			other = new context.Bizzy.RouterModel({ url: window.location.hash.substr(1) });

		while (i < max) {

			if (this.__data[i].equals(other)) {

				this.__data[i].callback(this.__data[i].getParameters(other));

			}

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

			this.__data.push(contex.Bizzy.RouterModel.builder(routesDefination[i]));
			i += 1;

		}

	};

	/**
	* 
	*/
	Router.prototype.start = function () {

		context.Bizzy.event.trigger("hashchange");

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

	context.Bizzy.router = new FacadeRouter();

})(window);