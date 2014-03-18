;(function (context) {

	"use strict";

	/**
	* 
	*/
	function Require () {}

	Object.defineProperty(Require.prototype, "_ajax", {

		value: new context.Bizzy.Ajax()

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "_head", {

		value: document.querySelector("head")

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "_script", {

		value: document.createElement("script")

	});

	/**
	* 
	*/
	Require.prototype._onCompleted = function (data) {

		this._script.text = data;
		this._head.appendChild(this._script);

	};

	/**
	* 
	*/
	Require.prototype.use = function (urlDocuments) {

		urlDocuments.forEach(function (url) {

			this._ajax.request({

				url: url,
				sync: false,
				onCompleted: this._onCompleted.bind(this)

			});

		}, this);

	};

	context.Bizzy.require = new Require();

})(window);