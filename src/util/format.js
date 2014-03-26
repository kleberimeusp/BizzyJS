;(function (window, undefined) {

	"use string";

	/**
	* 
	*/
	function format () {

		var text = arguments[0],
			itens = Array.prototype.slice.call(arguments, 1);

		return text.replace(/{(\d+)}/g, function(match, number) {

			return itens[number] || "";

		});

	}

	Bizzy.util.format = format;

})(window);