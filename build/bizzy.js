/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

window.B = (function (BIZZY) {

	"use strict";

	/**
	* 
	*/	
	BIZZY.utils = {};

	/**
	* 
	*/
	BIZZY.templates = {};
	BIZZY.views = {};
	BIZZY.models = {};

	return BIZZY;

})(window.B || {});
/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

window.B.utils.Ajax = (function (BIZZY) {

	"use strict";

	/**
	* Classe para requisicoes Ajax
	* 
	* @namespace App
	* @class Ajax
	*/
	function Ajax () {

		this.__initialize();

	}

	/**
	* Propriedade que contem o verbo http da requisicao
	*
	* @property __method
	* @default "GET"
	*/
	Object.defineProperty(Ajax.prototype, "__method", {

		writable: true

	});

	/**
	* Propriedade que contem a url da requisicao
	* @property __url
	* @default ""
	*/
	Object.defineProperty(Ajax.prototype, "__url", {

		writable: true

	});

	/**
	* Propriedade que indica se a requisica sera sync ou async
	* @property __sync
  * @default true
	*/
	Object.defineProperty(Ajax.prototype, "__sync", {

		writable: true

	});

	/**
	* Propriedade que contem os dados que trafegados na requisicao
	* @property __data
	* @default {}
	*/
	Object.defineProperty(Ajax.prototype, "__data", {

		writable: true

	});

	/**
	* Propriedade que contem a lista de headers da requisicao
	* @property __headers
	* @default []
	*/
	Object.defineProperty(Ajax.prototype, "__headers", {

		writable: true

	});

	/**
	* Propriedade que contem o callback que sera executado quando a requisicao terminar
	* @property __onCompleted
	* @default function () {}
	*/
	Object.defineProperty(Ajax.prototype, "__onCompleted", {

		writable: true

	});

	/**
	* Propriedade que contem o callback que sera executado quando a requisicao falhar]
	* @property __onFailed
	* @default function () {}
	*/
	Object.defineProperty(Ajax.prototype, "__onFailed", {

		writable: true

	});

	/**
	* Propriedade que contem o objeto responsavel por tratar as requisicoes
	* @property __xhr
	* @default {}
	*/
	Object.defineProperty(Ajax.prototype, "__xhr", {

		writable: true

	});

	/**
	* Propriedade que contem uma lista de callbacks que serao executados durantes os status do readyState da requisicao
	* @property __readyState
	* @default []
	*/
	Object.defineProperty(Ajax.prototype, "__readyState", {

		writable: true

	});

	/**
	* Propriedade que contem uma lista de callbacks que serao executados conforme o status code da requisicao
	* @property __status
	* @default []
	*/
	Object.defineProperty(Ajax.prototype, "__status", {

		writable: true

	});

	/**
	* Metodo de initializacao da classe, responsavel pela configuracao inicial
	* @method __initialize
	* @return {void}
	*/
	Ajax.prototype.__initialize = function () {

		this.__defineXhr();
		this.__defineReadyStateChange();
		this.__defineReadyState();
		this.__defineStatus();

	};

	/**
	* Metodo responsavel pela configuracao do xhr
	* @method __defineXhr
	* @return {void}
	*/
	Ajax.prototype.__defineXhr = function () {

		this.__xhr = new XMLHttpRequest();

	};

	/**
	* Metodo responsavel pela configuracao do evento do ready state
	* @method __defineReadyStateChange
	* @return {void}
	*/
	Ajax.prototype.__defineReadyStateChange = function () {

		this.__xhr.onreadystatechange = this.__onreadystatechange.bind(this);

	};

	/**
	* Metodo responsavel pela configuracao dos callbacks do ready state
	* @method __defineReadyState
	* @return {void}
	*/
	Ajax.prototype.__defineReadyState = function () {

		this.__readyState[0] = function () {};								// request not initialized
		this.__readyState[1] = function () {};								// server connection established
		this.__readyState[2] = function () {};								// request received
		this.__readyState[3] = function () {};								// processing request

		this.__readyState[4] = this.__finishedRequest.bind(this);			// request finished and response is ready

	};

	/**
	* Metodo responsavel pela configuracao dos callbacks do status code da requisicao http
	* @method __defineStatus
	* @return {void}
	*/
	Ajax.prototype.__defineStatus = function () {

		this.__status[200] = this.__completed.bind(this);

		this.__status[400] = this.__failed.bind(this);
		this.__status[401] = this.__failed.bind(this);
		this.__status[404] = this.__failed.bind(this);
		this.__status[500] = this.__failed.bind(this);

	};

	/**
	* Metodo que trata quando a requisicao completar
	* @method __completed
	* @return {void}
	*/
	Ajax.prototype.__completed = function () {

		this.__onCompleted(this.__xhr.responseText);

	};

	/**
	* Metodo que trata quando a requisicao falhar
	* @method __failed
	* @return {void}
	*/
	Ajax.prototype.__failed = function () {

		this.__onFailed(this.__xhr.responseText);

	};

	/**
	* Metodo que trata quando a requisicao terminar
	* @method __finishedRequest
	* @return {void}
	*/
	Ajax.prototype.__finishedRequest = function () {

		this.__status[this.__xhr.status]();

	};

	/**
	* Metodo responsavel por disparar o callback conforme o status do ready state
	* @method __onreadystatechange
	* @return {void}
	*/
	Ajax.prototype.__onreadystatechange = function () {

		this.__readyState[this.__xhr.readyState]();

	};

	/**
	* Metodo responsavel por resetar as propriedades da classe para os valores default
	* @method __resetProperties
	* @return {void}
	*/
	Ajax.prototype.__resetProperties = function () {

		this.__method = "GET";
		this.__url = "";
		this.__sync = true;
		this.__data = {};
		this.__headers = [];
		this.__onCompleted = function () {};
		this.__onFailed = function () {};

	};

	/**
	* Metodo responsavel por setar as propriedades da classe
	* @method __addProperties
	* @return {void}
	*/
	Ajax.prototype.__addProperties = function (config) {

		for (var name in config) {

			if (this.hasOwnProperty(name)) {

				this[name] = config[name];

			}

		}

	};

	/**
	* Metodo responsavel por abrir a requisicao
	* @method __open
	* @return {void}
	*/
	Ajax.prototype.__open = function () {

		this.__xhr.open(this.__method, this.__url, this.__sync);

	};

	/**
	* Metodo responsavel os headers da requisicao
	* @method __setRequestHeader
	* @return {void}
	*/
	Ajax.prototype.__setRequestHeader = function () {

		var i = this.__headers.length;

		while (--i) {

			this.__xhr.setRequestHeader(this.__headers[i].key, this.__headers[i].value);

		}

	};

	/**
	* Metodo responsavel por enviar a requisicao http
	* @method __send
	* @return {void}
	*/
	Ajax.prototype.__send = function () {

		this.__xhr.send(JSON.stringify(this.__data));

	};

	/**
	* Metodo responsavel por executar a requisicao http (open, setRequestHeaders, send)
	* @method __execute
	* @return {void}
	*/
	Ajax.prototype.__execute = function () {

		this.__open();
		this.__setRequestHeader();
		this.__send();

	};

	/**
	* Metodo responsavel por enviar a requisicao http (resetProperties, addProperties, execute)
	*/
	Ajax.prototype.request = function (config) {

		this.__resetProperties();
		this.__addProperties(config);
		this.__execute();

	};

	/**
	* Construtor do padrão Facade, responsavel por expor apenas apenas o escopo necessario
	* @method FacadeAjax
	* @return { request: Ajax.request }
	*/
	function Facade () {

		if (!(this instanceof Facade)) {

			return new Facade();

		}

		var ajax = new Ajax(),
			revelation = {};

		revelation.request = ajax.request;

		return revelation;

	}

	return Facade;

})(window.B || {});
/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */
 
window.B.utils.Dispatcher = (function (BIZZY) {

	"use strict";

	/**
	* Classe que implementa o padrao PubSub
	*
	* @namespace Bizzy
	* @class Dispacher
	*/
	function Dispatcher () {}

	/**
	* Propriedade que contem os callbacks que serao tratados pelo dispatcher
	*
	* @property __listeners
	* @default []
	*/
	Object.defineProperty(Dispatcher.prototype, "__listeners", {

		writable: true

	});

	/**
	* Recupera a lista de callbacks para um determinado evento
	*
	* @method __getEvent
	* @param {String} event Nome do evento
	* @return {Array} Lista de callbacks registrados para o evento
	*/
	Dispatcher.prototype.__getEvent = function (event) {

		this.__listeners[event] = this.__listeners[event] || [];
		return this.__listeners[event];

	};

	/**
	* Registra um novo callback de um determinado evento
	*
	* @method on
	* @param {String} event Nome do evento
	* @param {Function} callback Funcao de callback que a ser registrada
	* @return {Void}
	*/
	Dispatcher.prototype.on = function (event, callback) {

		this.__getEvent(event).push(callback);

	};

	/**
	* Deleta um callback de um determinado evento
	*
	* @method off
	* @param {String} event Nome do evento
	* @param {Function} callback Funcao de callback que a ser registrada
	* @return {Void}
	*/
	Dispatcher.prototype.off = function (event, callback) {

		var listener = this.__getEvent(event),
			i = listener.length;

		while (--i) {

			if (listener[i] === callback) {

				delete listener[i];

			}

		}

	};

	/**
	* Dispara os callbacks de um determinado evento
	*
	* @method trigger
	* @param {String} event Nome do evento
	* @param {Object} data Objeto contendo os dados que serao passados para o callbach
	* @return {Void}
	*/
	Dispatcher.prototype.trigger = function (event, data) {

		var listener = this.__getEvent(event),
			i = listener.length;

		while (--i) {

			listener[i](data);

		}

	};

	/**
	* 
	*/
	function Facade () {

		if (!(this instanceof Facade)) {

			return new Facade();

		}

		var dispatcher = new Dispatcher(),
			revelation = {};

		// Revelation Pattern
		revelation.on = dispatcher.on;
		revelation.off = dispatcher.off;
		revelation.trigger = dispatcher.trigger;

		return revelation;

	}

	return Facade;
	
})(window.B || {});
/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

window.B.utils.format = (function (BIZZY) {

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

	return format;

})(window.B || {});
/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

window.B.utils.Require = (function (BIZZY) {

	"use strict";

	/**
	* 
	*/
	function Require () {}

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__ajax", {

		value: new BIZZY.uitls.Ajax()

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__head", {

		value: document.querySelector("head")

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__script", {

		value: document.createElement("script")

	});

	/**
	* 
	*/
	Require.prototype.__appendChild = function (data) {

		this.__script.text = data;
		this.__head.appendChild(this.__script);

	};

	/**
	* 
	*/
	Require.prototype.use = function (urlDocuments) {

		urlDocuments.forEach(function (url) {

			this.__ajax.request({

				url: url,
				sync: false,
				onCompleted: this.__appendChild.bind(this)

			});

		}, this);

	};

	/**
	* 
	*/
	function Facade	() {

		var require =  new Require(),
			revelation = {};

		/* Revelation pattern */
		revelation.use = require.use;

		return revelation;
		
	}

	return new Facade();

})(window.B || {});
/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

window.B.utils.router = (function (BIZZY) {

	"use strict";

	/**
	* 
	*/
	function RouterModel (config) {

		this.__initialize(config);

	}

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "segments", {

		writable: true

	});

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "callback", {

		writable: true

	});

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "__validator", {

		writable: true

	});

	/**
	* 
	*/
	RouterModel.prototype.__initialize = function (config) {

		this.segments = config.url.split("/");
		this.callback = (typeof config.callback === "function") ? config.callback : function () {};

	};

	/**
	* 
	*/
	RouterModel.prototype.__buildValidator = function () {

		var regularExpression = "",
			url = this.segments.join("/");

		regularExpression = url.replace(/{(\w+)}/g, function (match, number) {

			return "(\\w+)";

		});

		this.__validator = new RegExp(BIZZY.uitls.format("^({0})$", regularExpression));

	};

	/**
	* 
	*/
	RouterModel.prototype.getParameters = function (other) {

		var i = other.segments.length,
			parameters = [];

		if (!this.equals(other)) {

			return [];

		}

		while (--i) {
		
			if (/^{(\d+)}$/i.test(this.segments[i])) {
			
				parameters.push(other.segments[i]);
			
			}
		
		}

		return parameters;

	};

	/**
	* 
	*/
	RouterModel.prototype.equals = function (other) {

		this.__buildValidator();

		this.equals = function (other) {

			return this.__validator.test(other.url);

		}.bind(this)(other);

	};

	/**
	* 
	*/
	function Router () {

		this.__initialize();

	}

	/**
	* 
	*/
	Object.defineProperty(Router.prototype, "__data", {

		writable: true

	});

	/**
	* 
	*/
	Router.prototype.__initialize = function () {

		window.addEventListener("hashchange", this.__hashchange.bind(this), false);

	};

	/**
	* 
	*/
	Router.prototype.__hashchange = function () {

		var i = this.__data.length,
			other = new RouterModel({ url: window.location.hash.substr(1) });

		while (--i) {

			if (this.__data[i].equals(other)) {

				this.__data[i].callback(this.__data[i].getParameters(other));

			}

		}

	};

	/**
	* 
	*/
	Router.prototype.define = function (routesDefination) {

		var i = routesDefination.length;

		while (--i) {

			this.__data.push(new RouterModel(routesDefination[i]));

		}

	};

	/**
	* 
	*/
	Router.prototype.start = function () {

		window.dispatchEvent(new Event("hashchange"));

	};

	/**
	* 
	*/
	function Facade () {

		var router = new Router(),
			revelation = {};

		/* Revelation pattern */
		revelation.define = router.define;
		revelation.start = router.start;

		return revelation;

	}

	return new Facade();

})(window.B || {});
/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

window.B.utils.serialize = (function (BIZZY) {

	"use strict";

	/**
	* 
	*/
	function Serialize () {

		this.__initialize();

	}

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__form", {

		writable: true

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__data", {

		writable: true

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__nodeName", {

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "_type", {

		writable: true

	});

	/**
	* 
	*/
	Serialize.prototype.__initialize = function () {

		this.__defineNodeName();
		this.__defineType();

	};

	/**
	* 
	*/
	Serialize.prototype.__defineNodeName = function () {

		this.__nodeName = {

			"INPUT": this.__searchForNodeType.bind(this),
			"BUTTON": this.__searchForNodeType.bind(this),
			"SELECT": this.__searchForNodeType.bind(this),

			"TEXTAREA": this.__push.bind(this)

		};

	};

	/**
	* 
	*/
	Serialize.prototype.__defineType = function () {

		this.__type = {

			"button": this.__push.bind(this),
			"hidden": this.__push.bind(this),
			"text": this.__push.bind(this),
			"password": this.__push.bind(this),
			"reset": this.__push.bind(this),
			"select-one": this.__push.bind(this),
			"submit": this.__push.bind(this),

			"checkbox": this.__pushChecked.bind(this),
			"radio": this.__pushChecked.bind(this),

			"select-multiple": this.__pushSelectMultiple.bind(this),

			"file": function () {}

		};

	};

	/**
	* 
	*/
	Serialize.prototype.__push = function (element) {

		this.__data[element.name] = element.value;

	};

	/**
	* 
	*/
	Serialize.prototype.__pushChecked = function (element) {

		this.__data[element.name] = element.checked ? element.value : null;

	};

	/**
	* 
	*/
	Serialize.prototype.__pushSelectMultiple = function (element) {

		var i = element.options.length;

		while (--i) {

			this.__data[element.name] = element.options[i].selected ? element.options[i].value : null;

		}

	};

	/**
	* 
	*/
	Serialize.prototype.__searchForNodeType = function (element) {

		this.__type[element.name](element);

	};

	/**
	* 
	*/
	Serialize.prototype.__serachForNodeName = function (element) {

		this.__nodeName[element.name](element);

	};

	/**
	* 
	*/
	Serialize.prototype.__execute = function () {

		var i = this.__form.elements.length;

		while (--i) {

			if (this.__form.elements[i].name === "") {

				continue;

			}

			this.__serachForNodeName(this.__form.elements[i]);

		}

	};

	/**
	* 
	*/
	Serialize.prototype.toJSON = function (form)  {

		if (!form || form.nodeName !== "FORM") {

			return {};

		}

		this.__form = form;
		this.__data = {};

		this.__execute();

		return this.__data;

	};

	/**
	* 
	*/
	function Facade () {

		var serialize = new Serialize();
			revelation = {};

		/* Revelation pattern */
		revelation.toJSON = serialize.toJSON;

		return revelation;

	}

	return new Facade();

})(window.B || {});
/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

 window.B.Mediator = (function (BIZZY) {

	"use strict";

	return new BIZZY.utils.Dispatcher();

 })(window.B || {});
/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

window.B.Model = (function (BIZZY) {

	"use strict";

	/**
	* Classe Base Model que representa o Modelo de Dados
	* 
	* @namespace Bizzy
	* @class Model
	*/
	function Model () {

		this._initialize();
		BIZZY.utils.Dispatcher.call(this);

	}

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "__dispatcher", {

		value: new BIZZY.utils.Dispatcher()

	});

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "_ajax", {

		value: new BIZZY.utils.Ajax()

	});

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "_headers", {

		writable: true,
		value: [

			{
				key: 'Content-Type',
				value: 'application/json; charset=utf-8'
			}

		]

	});

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "__url", {

		writable: true,
		value: ""

	});

	/**
	* Url para transferencia ou requisicao do Modelo de Dados
	* 
	* @property _url
	* @type String
	*/
	Object.defineProperty(Model.prototype, "_url", {

		get: function () {

			return context.Bizzy.format("{0}/{1}", this.__url, this.data[this._idName]);

		},

		set: function (value) {

			this.__url = value;

		}

	});

	/**
	* Nome do identificador unico da representacao do Modelo de Dados
	* 
	* @property _idName
	* @type String
	*/
	Object.definePrototype(Model.prototype, "_idName", {

		writable: true

	});

	/**
	* Container que transporta a representacao do Modelo de Dados
	* 
	* @property data
	* @type Object
	*/
	Object.definePrototype(Model.prototype, "data", {

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.definePrototype(Model.prototype, "defaults", {

		writable: true,
		value: {}

	});

	/**
	* Metodo executado na inicializacao da Classe
	*
	* @method _initialize
	*/
	Model.prototype._initialize = function () {

		this.reset();

	};

	/**
	* 
	*/
	Model.prototype.reset = function () {

		var name = "";

		for (name in this.defaults) {

			this.data[name] = this.defaults[name].value;

		}

		this.__dispatcher.trigger("model:reset", this.data);

	};

	/**
	* 
	*/
	Model.prototype.on = function (event, callback) {

		this.__dispatcher.on(event, callback);

	};

	/**
	* 
	*/
	Model.prototype.off = function (event, callback) {

		this.__dispatcher.off(event, callback);

	};

	/**
	* 
	*/
	Model.prototype.__completed = function (data) {

		this.data = JSON.parse(data);
		this.__dispatcher.trigger("model:completed", this.data);

	};

	/**
	* 
	*/
	Model.prototype.__failed = function (data) {

		this.__dispatcher.trigger("model:failed", JSON.parse(data));

	};

	/**
	* 
	*/
	Model.prototype.__request = function (method) {

		this._ajax.request({

			method: method,
			url: this._url,
			data: this.data,
			headers: this._headers,
			onCompleted: this.__completed.bind(this),
			onFailed: this.__failed.bind(this)

		});

	};

	/**
	* 
	*/
	Model.prototype.fetch = function () {

		this.__dispatcher.trigger("model:fetch", this.data);
		this.__request("GET");

	};

	/**
	* 
	*/
	Model.prototype.save = function () {

		this.__dispatcher.trigger("model:save", this.data);
		this.__request(this.data[this._idName] ? "POST" : "PUT");

	};

	/**
	* 
	*/
	Model.prototype.delete = function() {

		this.__dispatcher.trigger("model:delete", this.data);
		this.__request("DELETE");

	};

	/**
	* 
	*/
	function Facade () {

		if (!(this instanceof Facade)) {

			return new Facade();

		}

		var model = new Model(),
			revelation = {};

		// Revelation Pattern
		revelation._initialize = model._initialize;
		revelation._ajax = model._ajax;
		revelation._headers = model._headers;
		revelation._url = model._url;
		revelation._idName = model._idName;
		
		revelation.data = model.data;
		revelation.onCompleted = model.onCompleted;
		revelation.onFailed = model.onFailed;
		revelation.reset = model.reset;
		revelation.fetch = model.fetch;
		revelation.save = model.save;
		revelation.delete = model.delete;

		return revelation;

	}

	return Facade;

})(window.B || {});
/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

/**
* 
* 
* @namespace B
* @module View
*/
window.B.View = (function (BIZZY) {

	"use strict";

	/**
	* Classe Base View que representa Modelo de Dados no DOM
	* 
	* @namespace B
	* @module View
	* @class View
	*/
	function View () {

		this._initialize();
		BIZZY.utils.Dispatcher.call(this);

	}

	/**
	* 
	* 
	* @property __el
	* @type Object
	* @private
	*/
	Object.defineProperty(View.prototype, "__el", {

		writable: true,
		value: {}

	});

	/**
	* Container referente ao Objeto DOM criado no Navegador
	* 
	* @property _el
	* @type Object
	* @protected
	*/
	Object.defineProperty(View.prototype, "_el", {

		get: function () {

			return this.__el;

		},

		set: function (value) {

			this.__el = document.querySelector(value);

		}

	});

	/**
	* Representacao do Modelo de Dados
	* 
	* @property _model
	* @type Object
	*/
	Object.defineProperty(View.prototype, "_model", {

		writable: true,
		value: {}

	});

	/**
	* Micro Template que carrega o Modelo de Dados no Elemento DOM
	* 
	* @property _template
	* @type Function
	*/
	Object.defineProperty(View.prototype, "_template", {

		writable: true,
		value: function () { return {}; }

	});

	/**
	* 
	*/
	Object.defineProperty(View.prototype, "events", {

		writable: true,
		value: []

	});

	/**
	* 
	*/
	View.prototype._subscribeEvents = function () {

		var name = "";

		for (name in this.events) {

			document.querySelector(name.split(" ")[1]).addEventListener(name.split(" ")[0], this.events[name], false);

		}

	};

	/**
	* 
	*/
	View.prototype._deleteEvents = function () {

		var name = "";

		for (name in this.events) {

			document.querySelector(name.split(" ")[1]).removeEventListener(name.split(" ")[0], this.events[name], false);

		}

	};

	/**
	* Metodo executado na inicializacao da Classe
	*
	* @method _initialize
	* @protected
	*/
	View.prototype._initialize = function () {

		// Este metodo nao foi implementado

	};

	/**
	* Renderiza o Micro Template no Elemento Container
	* 
	* @method render
	* @public
	*/
	View.prototype.render = function () {

		this._el.innerHTML = this._template(this._model.data);
		this._subscribeEvents();

	};

	/**
	* Destroi o Micro Template renderizado no Elemento Container
	* 
	* @method destroy
	* @public
	*/
	View.prototype.destory = function () {

		this._el.innerHTML = "";
		this._deleteEvents();

	};

	/**
	* Revelation pattern
	* 
	* @namespace B
	* @class FacadeView
	*/
	function FacadeView () {

		if (!(this instanceof FacadeView)) {

			return new FacadeView();

		}

		var view = new View(),
			revelation = {};

		// Revelaton Pattern
		revelation._initialize = view._initialize;
		revelation._el = view._el;
		revelation._template = view._template;
		revelation._model = view._model;
		revelation._subscribeEvents = view._subscribeEvents;
		revelation._deleteEvents = view._deleteEvents;

		revelation.render = view.render;
		revelation.destory = view.destory;

		return revelation;

	}

	return FacadeView;

})(window.B || {});