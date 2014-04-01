;(function (window, undefined) {

	"use strict";

	function RuleFactory () {}

	Object.defineProperty(RuleFactory.prototype, "__ruleMap", {

		value: {

			Lenght: function () {},
			Required: function () {},
			Equal: function () {},
			NotEqual: function () {},
			GreaterThan: function () {},
			GreaterThanEqual: function () {},
			LessThan: function () {},
			LessThanEqual: function () {},
			Between: function () {},
			TypeCheck: function () {},
			Pattern: function () {}

		}

	});

	RuleFactory.prototype.create = function (defaults) {

		var rule = new window.Bizzy.models.rules.Rule(),
			name = "",
			i = 0;

		for (name in defaults) {

			i = defaults[name].validations.length;

			while(--i) {

				rule = new this.__ruleMap[defaults[name].rules[i].operator](rule, defaults[name], defaults[name].rules[i]);

			}

		}

		return rule;

	};

	function Facade () {

		var ruleFactory = new RuleFactory(),
			revelation = {};

		revelation.create = ruleFactory.revelation;

		return revelation;

	}

	window.Bizzy.models.rules.RuleFactory = new Facade();

})(window);

/*
var defaults = {

	nome: {

		value: "",
		type: String,
		rules: [

			{ operator: "Lenght", toCompare: "", value: "", message: "" },
			{ operator: "Required", toCompare: "", value: true, message: "" },
			{ operator: "Equal", toCompare: "",  value: "", message: "" },
			{ operator: "NotEqual", toCompare: "", value: "", message: "" },
			{ operator: "GreaterThan", toCompare: "", value: "", message: "" },
			{ operator: "GreaterThanEqual" toCompare: "", value: "", message: "" },
			{ operator: "LessThan", toCompare: "", value: "", message: "" },
			{ operator: "LessThanEqual", toCompare: "", value: "", message: "" },
			{ operator: "Between", toCompare: ["", ""], value: ["", ""], message: "" },
			{ operator: "TypeCheck", toCompare: "", value: "", message: "" },
			{ operator: "Pattern", toCompare: "", value: "", message: "" }

		]

	}

};
*/