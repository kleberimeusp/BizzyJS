;(function (window, undefined) {

	"use strict";

	function RuleFactory () {}

	Object.defineProperty(RuleFactory.prototype, "__ruleMap", {

		value: {



		}

	});

	RuleFactory.prototype.create = function (defaults) {

		var rule = new window.Bizzy.models.rules.Rule(),
			name = "",
			i = 0;

		for (name in defaults) {

			i = defaults[name].validations.length;

			while(--i) {

				rule = new this.__ruleMap[defaults[name].rules[i].operator](rule);

			}

		}

		return rule;

	};


	window.Bizzy.models.rules.RuleFactory = new RuleFactory();

})(window);


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