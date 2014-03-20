;(function (context) {

	"use strict";

	function Serialize () {

		this.__initialize();

	}

	Object.defineProperty(Serialize.prototype, "__form", {

		writable: true

	});

	Object.defineProperty(Serialize.prototype, "__data", {

		writable: true

	});

	Object.defineProperty(Serialize.prototype, "__nodeName", {

		writable: true

	});

	Object.defineProperty(Serialize.prototype, "_type", {

		writable: true

	});

	Serialize.prototype.__initialize = function () {

		this.__defineNodeName();
		this.__defineType();

	};

	Serialize.prototype.__defineNodeName = function () {

		this.__nodeName["INPUT"] = this.__searchForNodeType.bind(this);
		this.__nodeName["BUTTON"] = this.__searchForNodeType.bind(this);
		this.__nodeName["SELECT"] = this.__searchForNodeType.bind(this);

		this.__nodeName["TEXTAREA"] = this.__push.bind(this);

	};

	Serialize.prototype.__defineType = function () {

		this.__type["button"] = this.__push.bind(this);
		this.__type["hidden"] = this.__push.bind(this);
		this.__type["text"] = this.__push.bind(this);
		this.__type["password"] = this.__push.bind(this);
		this.__type["reset"] = this.__push.bind(this);
		this.__type["select-one"] = this.__push.bind(this);
		this.__type["submit"] = this.__push.bind(this);

		this.__type["checkbox"] = this.__pushChecked.bind(this);
		this.__type["radio"] = this.__pushChecked.bind(this);

		this.__type["select-multiple"] = this.__pushSelectMultiple.bind(this);

		this.__type["file"] = function () {};

	};

	Serialize.prototype.__push = function (element) {

		this.__data[element.name] = element.value;

	};

	Serialize.prototype.__pushChecked = function (element) {

		this.__data[element.name] = element.checked ? element.value : null;

	};

	Serialize.prototype.__pushSelectMultiple = function (element) {

		var i = 0,
			max = element.options.length;

		while (i < max) {

			this.__data[element.name] = element.options[i].selected ? element.options[i].value : null;
			i += 1;

		}

	};

	Serialize.prototype.__searchForNodeType = function (element) {

		this.__type[element.name](element);

	};

	Serialize.prototype.__serachForNodeName = function (element) {

		this.__nodeName[element.name](element);

	};

	Serialize.prototype.__execute = function () {

		var i = 0,
			max = this.__form.elements.length;

		while (i < max) {

			if (this.__form.elements[i].name === "") {

				continue;

			}

			this.__serachForNodeName(this.__form.elements[i]);

			i += 1;

		}

	};

	Serialize.prototype.toJSON = function (form)  {

		if (!form || form.nodeName !== "FORM") {

			return {};

		}

		this.__form = form;
		this.__data = {};

		this.__execute();

		return this.__data;

	};

	function FacadeSerialize () {

		var serialize = new Serialize();

		return {

			toJSON: serialize.toJSON

		}

	}

	context.Bizzy.serialize = new FacadeSerialize();

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