;(function (context) {

	"use strict";

	/**
	* 
	*/
	function XHRFactory () {

		this._initialize();

	}

	/**
	* 
	*/
	Object.defineProperty(XHRFactory.prototype, "_xmlHttpRequests", {

		writable: true,
		value: []

	});

	/**
	* 
	*/
	XHRFactory.prototype._initialize = function () {

		this._defineXmlHttpRequests();

	};

	/**
	* 
	*/
	XHRFactory.prototype._defineXmlHttpRequests = function () {

		this._xmlHttpRequests = [

			function () { return new window.XMLHttpRequest(); },

			function () { return new window.ActiveXObject("Msxml2.XMLHTTP"); },
			function () { return new window.ActiveXObject("Msxml2.XMLHTTP.3.0"); },
			function () { return new window.ActiveXObject("Msxml2.XMLHTTP.6.0"); },

			function () { return new window.ActiveXObject("Msxml3.XMLHTTP"); },

			function () { return new window.ActiveXObject("Microsoft.XMLHTTP"); }

		];

	};

	/**
	* 
	*/
	XHRFactory.prototype.create = function () {

		var i = 0,
			max = this._xmlHttpRequests.length;

		while (i < max) {

			try { return this._xmlHttpRequests[i](); }
			catch (e) { continue; }

			i += 1;

		}

	}

	context.Bizzy.xhrFactory = new XHRFactory();

})(window);