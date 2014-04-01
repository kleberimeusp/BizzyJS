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

				rule = new this.__ruleMap[defaults[name].validations[i].rule](rule);

			}

		}

		return rule;

	};


	window.Bizzy.models.rules.RuleFactory = new RuleFactory();

})(window);


var defaults = {

	id: {

		value: 0,

		type: Number,

		validations: [

			{ rule: "lenght", value: 10, message: ""},
			{ rule: "range", value: [0, 10], message: "" },
			{ rule: "required", message: "" },
			{ rule: "pattern", value: "email", message: "" }

		],

		range: [8, 90],

		required: true,

		pattern: "email",



	}

};