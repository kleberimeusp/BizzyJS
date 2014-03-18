;(function (context) {

	"use strict";

	function Serialize () {

		this._initialize();

	}

	Object.defineProperty(Serialize.prototype, "_form", {

		writable: true,
		value: {}

	});

	Object.defineProperty(Serialize.prototype, "_nodeName", {

		writable: true,
		value: []

	});

	Object.defineProperty(Serialize.prototype, "_type", {

		writable: true,
		value: []

	});

	Serialize.prototype._initialize = function () {

		this._defineNodeName();
		this._defineType();

	};

	Serialize.prototype._defineNodeName = function () {

		this._nodeName["INPUT"] = function () {};
		this._nodeName["TEXTAREA"] = function () {};
		this._nodeName["SELECT"] = function () {};
		this._nodeName["BUTTON"] = function () {};

	};

	Serialize.prototype._defineType = function () {



	};

	Serialize.prototype.toJSON = function (form)  {

		this._form = form;

	};

	context.Bizzy.Serialize = Serialize;

})(window);


/*

,function serialize(form) {
	
	if (!form || form.nodeName !== "FORM") {
		return;
	}

	var i, j, q = [];

	for (i = form.elements.length - 1; i >= 0; i = i - 1) {

		if (form.elements[i].name === "") {
			continue;
		}

		switch (form.elements[i].nodeName) {

			case 'INPUT':

				switch (form.elements[i].type) {
					case 'text':
					case 'hidden':
					case 'password':
					case 'button':
					case 'reset':
					case 'submit':
						q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						break;
					case 'checkbox':
					case 'radio':
						if (form.elements[i].checked) {
							q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						}						
						break;
					case 'file':
						break;
				}
				break;			 

			case 'TEXTAREA':
				q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				break;

			case 'SELECT':

				switch (form.elements[i].type) {

					case 'select-one':
						q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						break;
					case 'select-multiple':
						for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
							if (form.elements[i].options[j].selected) {
								q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
							}
						}
						break;

				}
				break;

			case 'BUTTON':

				switch (form.elements[i].type) {
					case 'reset':
					case 'submit':
					case 'button':
						q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						break;
					}
				break;
				
		}
	}
	return q.join("&");
}

*/