;(function (window, undefined) {

	"use strict";

	function RuleFactory () {}

	Object.defineProperty(RuleFactory.prototype, "__ruleMap", {

		value: {



		}

	});

	RuleFactory.prototype.create = function (defaults) {

		var rule = new window.Bizzy.models.rules.Rule(),
			name = "";

		for (name in defaults) {

			rule = new this.__ruleMap[defaults[name].rule](rule);

		}

		return rule;

	};


	window.Bizzy.models.rules.RuleFactory = new RuleFactory();

})(window);