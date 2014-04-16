/*******************************************************
 *                                                     *
 * BizzyJS                                             *
 * https://github.com/Bibizzy/BizzyJS                  *
 *                                                     *
 * Copyright (c) 2014 Bibizzy                          *
 * Licensed under the MIT license.                     *
 *                                                     *
 ******************************************************/

window.B.utils.String = (function () {

	"use string";

	/**
	* 
	*/
	function Str () {}

	/**
	* 
	*/
	Object.defineProperty(Str.prototype, "format", {

		value: function () {

			var text = arguments[0],
				itens = Array.prototype.slice.call(arguments, 1);

			return text.replace(/{(\d+)}/g, function(match, number) {

				return itens[number] || "";

			});

		}

	});

	return new Str();

})();