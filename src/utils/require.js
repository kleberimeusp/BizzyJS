;(function (window, undefined) {

	"use strict";

	/**
	* 
	*/
	function Require () {}

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__ajax", {

		value: new Bizzy.Ajax()

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__head", {

		value: document.querySelector("head")

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__script", {

		value: document.createElement("script")

	});

	/**
	* 
	*/
	Require.prototype.__appendChild = function (data) {

		this.__script.text = data;
		this.__head.appendChild(this.__script);

	};

	/**
	* 
	*/
	Require.prototype.use = function (urlDocuments) {

		urlDocuments.forEach(function (url) {

			this.__ajax.request({

				url: url,
				sync: false,
				onCompleted: this.__appendChild.bind(this)

			});

		}, this);

	};

	/**
	* 
	*/
	function FacadeRequire	() {

		var require =  new Require();

		return {

			use: require.use

		};
		
	}

	Bizzy.util.require = new FacadeRequire();

})(window);