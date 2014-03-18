;(function (context) {

	"use string";

	/**
	* 
	*/
	function Str () {}

	/**
	* 
	*/
	Str.prototype.format = function () {

		var text = arguments[0],
			itens = Array.prototype.slice.call(arguments, 1);

		return text.replace(/{(\d+)}/g, function(match, number) {

			return itens[number] || "";

		});

	};

	context.Bizzy.string = new Str();

})(window);