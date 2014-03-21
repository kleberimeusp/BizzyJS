;(function (context) {

	"use strict";

	/**
	* 
	*/
	function XHRFactory () {

		this.__initialize();

	}

	/**
	* 
	*/
	Object.defineProperty(XHRFactory.prototype, "__xmlHttpRequests", {

		writable: true,
		value: []

	});

	/**
	* 
	*/
	XHRFactory.prototype.__initialize = function () {

		this.__defineXmlHttpRequests();

	};

	/**
	* 
	*/
	XHRFactory.prototype.__defineXmlHttpRequests = function () {

		this.__xmlHttpRequests = [

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
			max = this.__xmlHttpRequests.length;

		while (i < max) {

			try { return this.__xmlHttpRequests[i](); }
			catch (e) { continue; }

			i += 1;

		}

	}

	/**
	* 
	*/
	function FacadeXHRFactory () {

		var xhrFactory = new XHRFactory();

		return  {

			create: xhrFactory.create

		}

	}

	context.Bizzy.xhrFactory = new FacadeXHRFactory();

})(window);