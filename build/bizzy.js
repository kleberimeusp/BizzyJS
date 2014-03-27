;(function (window, undefined) {

	"use strict";

	/**
	* 
	*/
	var xhrFactory = function () {

		if (window.XMLHttpRequest) {

			xhrFactory = function () { return new XMLHttpRequest(); };
			return xhrFactory();

		} else if (window.ActiveXObject) {

			try {

				xhrFactory = function () { return new window.ActiveXObject("Msxml2.XMLHTTP"); };
				return xhrFactory();

			} catch (err) {}

			try {

				xhrFactory = function () { return new window.ActiveXObject("Msxml2.XMLHTTP.3.0"); };
				return xhrFactory();

			} catch (err) {}

			try {

				xhrFactory = function () { return new window.ActiveXObject("Msxml2.XMLHTTP.6.0"); };
				return xhrFactory();

			} catch (err) {}

			try {

				xhrFactory = function () { return new window.ActiveXObject("Msxml3.XMLHTTP"); };
				return xhrFactory();

			} catch (err) {}

			try {

				xhrFactory = function () { return new window.ActiveXObject("Microsoft.XMLHTTP"); };
				return xhrFactory();

			} catch (err) {}

		}

		return {};

	};

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

		this.__xhr = xhrFactory();

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
	function FacadeAjax () {

		if (!(this instanceof FacadeAjax)) {

			return new FacadeAjax();

		}

		var ajax = new Ajax();

		return {

			request: ajax.request

		};

	}

	Bizzy.util.Ajax = FacadeAjax;

})(window);
;(function (window, undefined) {

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

		var listeners = this.__getEvent(event),
			i = listeners.length;

		while (--i) {

			if (listeners[i] === callback) {

				delete listeners[i];

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

		var listeners = this.__getEvent(event),
			i = listeners.length;

		while (--i) {

			listeners[i](data);

		}

	};

	/**
	* 
	*/
	function FacadeDispatcher () {

		if (!(this instanceof FacadeDispatcher)) {

			return new FacadeDispatcher();

		}

		var dispatcher = new Dispatcher();

		return {

			on: dispatcher.on,
			off: dispatcher.off,
			trigger: dispatcher.trigger

		};

	}

	Bizzy.util.dispatcher = new FacadeDispatcher();
	
})(window);
;(function (window, undefined) {

	"use strict";

	/**
	* 
	*/
	function Event () {}

	/**
	* 
	*/
	Event.prototype.on = function (el, type, fn) {

		if (window.addEventListener) {
            
            this.on = function (el, type, fn) { el.addEventListener(type, fn, false); }();
            
        } else if (window.attachEvent) {
            
            this.on = function (el, type, fn) { el.attachEvent("on" + type, fn); }();
            
        } else {
            
            this.on = function (el, type, fn) { el["on" + type] =  fn; }();
            
        }

	};

	/**
	* 
	*/
	Event.prototype.off = function (el, type, fn) {
        
        if (window.removeEventListener) {
            
            this.off = function (el, type, fn) { el.removeEventListener(type, fn, false); }();
            
        } else if (window.detachEvent) {
            
            this.off = function (el, type, fn) { el.detachEvent("on" + type, fn); }();
            
        } else {
            
            this.off = function (el, type, fn) { el["on" + type] =  null; }();
            
        }
        
    };

    /**
    * 
    */
     Event.prototype.trigger = function (eventName) {
        
        var e = document.createEvent("Event");
            e.initEvent(eventName, true, true);
        
        window.dispatchEvent(e);
        
    };

    Bizzy.util.event = new Event();

})(window);
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
;(function (window, undefined) {

	"use strict";

	/**
	* 
	*/
	function Require () {}

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__ajax", {

		value: new Bizzy.Ajax()

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
	function FacadeRequire	() {

		var require =  new Require();

		return {

			use: require.use

		};
		
	}

	Bizzy.util.require = new FacadeRequire();

})(window);
;(function (window, undefined) {

	"use strict";

	/**
	* 
	*/
	function RouterModel () {}

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
	RouterModel.prototype.__buildValidator = function () {

		var regularExpression = "",
			url = this.segments.join("/");

		regularExpression = url.replace(/{(\w+)}/g, function (match, number) {

			return "(\\w+)";

		});

		this.__validator = new RegExp(context.Bizzy.format("^({0})$", regularExpression));

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
	function FacadeRouterModel (config) {

		if (!(this instanceof FacadeRouterModel)) {

			return new FacadeRouterModel(config);

		}

		var routerModel = new RouterModel();
		
		routerModel.segments = config.url.split("/");
		routerModel.callback = (typeof config.callback === "function") ? config.callback : function () {};

		return {

			equals: routerModel.equals,
			getParameters: routerModel.getParameters

		};

	}

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

		Bizzy.event.on(window, "hashchange", this.__hashchange.bind(this));

	};

	/**
	* 
	*/
	Router.prototype.__hashchange = function () {

		var i = this.__data.length,
			other = new Bizzy.RouterModel({ url: window.location.hash.substr(1) });

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

			this.__data.push(new FacadeRouterModel(routesDefination[i]));

		}

	};

	/**
	* 
	*/
	Router.prototype.start = function () {

		Bizzy.event.trigger("hashchange");

	};

	/**
	* 
	*/
	function FacadeRouter () {

		var router = new Router();

		return {

			define: router.define,
			start: router.start

		};

	}

	Bizzy.util.router = new FacadeRouter();

})(window);
;(function (window, undefined) {

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

		writable: true,
		value: {}

	});

	Object.defineProperty(Serialize.prototype, "_type", {

		writable: true

	});

	Serialize.prototype.__initialize = function () {

		this.__defineNodeName();
		this.__defineType();

	};

	Serialize.prototype.__defineNodeName = function () {

		this.__nodeName = {

			"INPUT": this.__searchForNodeType.bind(this),
			"BUTTON": this.__searchForNodeType.bind(this),
			"SELECT": this.__searchForNodeType.bind(this),

			"TEXTAREA": this.__push.bind(this)

		};

	};

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

		var i = this.__form.elements.length;

		while (--i) {

			if (this.__form.elements[i].name === "") {

				continue;

			}

			this.__serachForNodeName(this.__form.elements[i]);

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

		};

	}

	Bizzy.uitl.serialize = new FacadeSerialize();

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
;(function (window, undefined) {

	"use strict";

	/**
	* Classe Base Model que representa o Modelo de Dados
	* 
	* @namespace Bizzy
	* @class Model
	*/
	function Model () {

		this._initialize();

	}

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "_ajax", {

		value: new Bizzy.Ajax()

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
	* Nome do identificador unico da representacao do Modelo de Dados
	* 
	* @property _idName
	* @type String
	*/
	Object.definePrototype(Model.prototype, "_idName", {

		writable: true

	});

	/**
	* 
	*/
	Object.definePrototype(Model.prototype, "onCompleted", {

		writable: true,
		value: function () {}

	});

	/**
	* 
	*/
	Object.definePrototype(Model.prototype, "onFailed", {

		writable: true,
		value: function () {}

	});

	/**
	* Metodo executado na inicializacao da Classe
	*
	* @method _initialize
	*/
	Model.prototype._initialize = function () {

		// Este metodo nao foi implementado

	};

	/**
	* 
	*/
	Model.prototype.reset = function (data) {

		delete this.data;
		this.data = data;

	};

	/**
	* 
	*/
	Model.prototype.__completed = function (data) {

		this.reset(JSON.parse(data));
		this.onCompleted();

	};

	/**
	* 
	*/
	Model.prototype.__failed = function (data) {

		this.onFailed(JSON.parse(data));

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

		this.__request("GET");

	};

	/**
	* 
	*/
	Model.prototype.save = function () {

		this.__request(this.data[this._idName] ? "POST" : "PUT");

	};

	/**
	* 
	*/
	Model.prototype.delete = function() {

		this.__request("DELETE");

	};

	/**
	* 
	*/
	function FacadeModel () {

		if (!(this instanceof FacadeModel)) {

			return new FacadeModel();

		}

		var model = new Model();

		return {

			_initialize: model._initialize,
			_ajax: model._ajax,
			_headers: model._headers,
			_url: model._url,
			_idName: model._idName,
			data: model.data,
			onCompleted: model.onCompleted,
			onFailed: model.onFailed,
			reset: model.reset,
			fetch: model.fetch,
			save: model.save,
			delete: model.delete

		};

	}

	Bizzy.Model = FacadeModel;

})(window);
;(function (window, undefined) {

	"use strict";

	/**
	* Classe Base View que representa Modelo de Dados no DOM
	* 
	* @namespace Bizzy
	* @class View
	*/
	function View () {

		this._initialize();

	}

	/**
	* 
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

		for (var name in this.events) {

			Bizzy.util.event.on(document.querySelector(name.split(" ")[1]), name.split(" ")[0], this.events[name]);

		}

	};

	/**
	* 
	*/
	View.prototype._deleteEvents = function () {

		for (var name in this.events) {

			Bizzy.util.event.off(document.querySelector(name.split(" ")[1]), name.split(" ")[0], this.events[name]);

		}

	};

	/**
	* Metodo executado na inicializacao da Classe
	*
	* @method _initialize
	*/
	View.prototype._initialize = function () {

		// Este metodo nao foi implementado

	};

	/**
	* Renderiza o Micro Template no Elemento Container
	* 
	* @method render
	*/
	View.prototype.render = function () {

		this._el.innerHTML = this._template(this._model.data);
		this._subscribeEvents();

	};

	/**
	* Destroi o Micro Template renderizado no Elemento Container
	* 
	* @method destroy
	*/
	View.prototype.destory = function () {

		this._el.innerHTML = "";
		this._deleteEvents();

	};

	/**
	* 
	*/
	function FacadeView () {

		if (!(this instanceof FacadeView)) {

			return new FacadeView();

		}

		var view = new View();

		return {

			_initialize: view._initialize,
			_el: view._el,
			_template: view._template,
			_model: view._model,
			_subscribeEvents: view._subscribeEvents,
			_deleteEvents: view._deleteEvents,
			render: view.render,
			destory: view.destory

		};

	}

	Bizzy.View = FacadeView;

})(window);