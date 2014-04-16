/*******************************************************
 *                                                     *
 * BizzyJS                                             *
 * https://github.com/Bibizzy/BizzyJS                  *
 *                                                     *
 * Copyright (c) 2014 Bibizzy                          *
 * Licensed under the MIT license.                     *
 *                                                     *
 ******************************************************/

/**
* 
*/
window.B.utils.Require = (function () {

	"use strict";

	/**
	* 
	*/
	function Require () {}

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__ajax", {

		value: new window.B.utils.Ajax()

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__head", {

		value: window.document.querySelector("head")

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__script", {

		value: window.document.createElement("script")

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__appendChild", {

		value: function (data) {

			this.__script.text = data;
			this.__head.appendChild(this.__script);

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "use", {

		value: function (urlDocuments) {

			urlDocuments.forEach(function (url) {

				this.__ajax.request({

					url: url,
					sync: false,
					onCompleted: this.__appendChild.bind(this)

				});

			}, this);

		}

	});

	return new Require();

})();