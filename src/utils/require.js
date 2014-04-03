/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

window.B.utils.Require = (function (BIZZY) {

	"use strict";

	/**
	* 
	*/
	function Require () {}

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__ajax", {

		value: new BIZZY.uitls.Ajax()

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
	function Facade	() {

		var require =  new Require()
			revelation = {};

		/* Revelation pattern */
		revelation.use = require.use;

		return revelation;
		
	}

	return new Facade();

})(window.B || {});