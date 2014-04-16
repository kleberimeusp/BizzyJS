/*******************************************************
 *                                                     *
 * BizzyJS                                             *
 * https://github.com/Bibizzy/BizzyJS                  *
 *                                                     *
 * Copyright (c) 2014 Bibizzy                          *
 * Licensed under the MIT license.                     *
 *                                                     *
 ******************************************************/

/**
* Modulo que isola o namespace raiz
* 
* @namespace B
*/
window.B = (function () {

	"use strict";

	/**
	* Classe que raiz que cria todos nos namespace raiz que sera
	* utilizado para o encapsulamento das classes de Template, View e Model
	* 
	* @namespace B
	* @class Bizzy
	* @private
	*/
	function Bizzy () {}

	/**
	* Propriedade utilizado para representar os namespaces que
	* agrupa as classes pertencentes a utils
	* 
	* @property utils
	* @public
	* @type Object
	* @defatult Objeto literal vazio
	*/
	Object.defineProperty(Bizzy.prototype, "utils", { value:  {} });

	/**
	* Propriedade utilizado para representar os namespaces que
	* agrupa as classes pertencentes a templates
	* 
	* @property templates
	* @public
	* @type Object
	* @default Objeto literal vazio
	*/
	Object.defineProperty(Bizzy.prototype, "templates", { value: {} });

	/**
	* Propriedade utilizado para represetar os namespaces que
	* agrupa as classes pertencentes a templates
	* 
	* @property views
	* @public
	* @type Object
	* @default Objeto literal vazio
	*/
	Object.defineProperty(Bizzy.prototype, "views", {  value: {} });

	/**
	* Propriedade utilizado para representar os namespaces que
	* agrupa as classes pertencentes a models
	* 
	* @property models
	* @public
	* @type Object
	* @default Objeto literal vazio
	*/
	Object.defineProperty(Bizzy.prototype, "models", { value: {} });

	return new Bizzy();

})();
/*******************************************************
 *                                                     *
 * BizzyJS                                             *
 * https://github.com/Bibizzy/BizzyJS                  *
 *                                                     *
 * Copyright (c) 2014 Bibizzy                          *
 * Licensed under the MIT license.                     *
 *                                                     *
 ******************************************************/

/**
* Modulo que isola a classe Ajax
* 
* @namespace B.uitls
* @module Ajax
*/
window.B.utils.Ajax = (function () {

	"use strict";

	/**
	* Classe para requisicoes Ajax
	* 
	* @namespace B.utils
	* @class Ajax
	*/
	function Ajax () {

		this.__initialize();

	}

	/**
	* Propriedade que contem o verbo http da requisicao
	*
	* @property __method
	* @private
	* @type String
	* @default "GET"
	*/
	Object.defineProperty(Ajax.prototype, "__method", {

		writable: true,
		value: "GET"

	});

	/**
	* Propriedade que contem a url da requisicao
	* 
	* @property __url
	* @private
	* @type String
	* @default ""
	*/
	Object.defineProperty(Ajax.prototype, "__url", {

		writable: true,
		value: ""

	});

	/**
	* Propriedade que indica se a requisica sera sync ou async
	* 
	* @property __sync
	* @private
	* @type Boolena
 	* @default true
	*/
	Object.defineProperty(Ajax.prototype, "__sync", {

		writable: true,
		value: true

	});

	/**
	* Propriedade que contem os dados que trafegados na requisicao
	* 
	* @property __data
	* @private
	* @type Object
	* @default {}
	*/
	Object.defineProperty(Ajax.prototype, "__data", {

		writable: true,
		value: {}

	});

	/**
	* Propriedade que contem a lista de headers da requisicao
	* 
	* @property __headers
	* @private
	* @type Array
	* @default []
	*/
	Object.defineProperty(Ajax.prototype, "__headers", {

		writable: true,
		value: []

	});

	/**
	* Propriedade que contem o callback que sera executado quando a requisicao terminar
	* 
	* @property __onCompleted
	* @private
	* @type Function
	* @default function () {}
	*/
	Object.defineProperty(Ajax.prototype, "__onCompleted", {

		writable: true,
		value: function () {}

	});

	/**
	* Propriedade que contem o callback que sera executado quando a requisicao falhar
	* 
	* @property __onFailed
	* @private
	* @type Function
	* @default function () {}
	*/
	Object.defineProperty(Ajax.prototype, "__onFailed", {

		writable: true,
		value: function () {}

	});

	/**
	* Propriedade que contem o objeto responsavel por tratar as requisicoes
	* 
	* @property __xhr
	* @private
	* @type Objetct
	* @default {}
	*/
	Object.defineProperty(Ajax.prototype, "__xhr", {

		writable: true,
		value: {}

	});

	/**
	* Propriedade que contem uma lista de callbacks que serao executados
	* durantes os status do readyState da requisicao
	* 
	* @property __readyState
	* @private
	* @type Array
	* @default []
	*/
	Object.defineProperty(Ajax.prototype, "__readyState", {

		writable: true,
		value: []

	});

	/**
	* Propriedade que contem uma lista de callbacks que serao executados
	*  conforme o status code da requisicao
	* 
	* @property __status
	* @private
	* @type Array
	* @default []
	*/
	Object.defineProperty(Ajax.prototype, "__status", {

		writable: true,
		value: []

	});

	/**
	* Metodo de initializacao da classe, responsavel pela configuracao inicial
	* 
	* @method __initialize
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__initialize", {

		value: function () {

			this.__defineXhr();
			this.__defineReadyStateChange();
			this.__defineReadyState();
			this.__defineStatus();

		}

	});

	/**
	* Metodo responsavel pela configuracao do xhr
	* 
	* @method __defineXhr
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__defineXhr", {

		value: function () { 

			this.__xhr = new window.XMLHttpRequest();

		}

	});

	/**
	* Metodo responsavel pela configuracao do evento do ready state
	* 
	* @method __defineReadyStateChange
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__defineReadyStateChange", {

		value: function () {

			this.__xhr.onreadystatechange = this.__onreadystatechange.bind(this);

		}

	});

	/**
	* Metodo responsavel pela configuracao dos callbacks do ready state
	* 
	* @method __defineReadyState
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__defineReadyState", {

		valeu: function () {

			this.__readyState[0] = function () {};
			this.__readyState[1] = function () {};
			this.__readyState[2] = function () {};
			this.__readyState[3] = function () {};

			this.__readyState[4] = this.__finishedRequest.bind(this);

		}

	});

	/**
	* Metodo responsavel pela configuracao dos callbacks do status code da requisicao http
	* 
	* @method __defineStatus
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__defineStatus", {

		value: function () {

			this.__status[200] = this.__completed.bind(this);

			this.__status[400] = this.__failed.bind(this);
			this.__status[401] = this.__failed.bind(this);
			this.__status[404] = this.__failed.bind(this);
			this.__status[500] = this.__failed.bind(this);

		}

	});

	/**
	* Metodo que trata quando a requisicao completar
	* 
	* @method __completed
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__completed", {

		value: function () {

			this.__onCompleted(this.__xhr.responseText);

		}

	});

	/**
	* Metodo que trata quando a requisicao falhar
	* 
	* @method __failed
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__failed", {

		value: function () {

			this.__onFailed(this.__xhr.responseText);

		}

	});

	/**
	* Metodo que trata quando a requisicao terminar

	* @method __finishedRequest
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__finishedRequest", {

		value: function () {

			this.__status[this.__xhr.status]();

		}

	});

	/**
	* Metodo responsavel por disparar o callback conforme o status do ready state
	* 
	* @method __onreadystatechange
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__onreadystatechange", {

		value: function () {

			this.__readyState[this.__xhr.readyState]();

		}

	});

	/**
	* Metodo responsavel por resetar as propriedades da classe para os valores default
	*
	* @method __resetProperties
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__resetProperties", {

		value: function () {

			this.__method = "GET";
			this.__url = "";
			this.__sync = true;
			this.__data = {};
			this.__headers = [];
			this.__onCompleted = function () {};
			this.__onFailed = function () {};

		}

	});

	/**
	* Metodo responsavel por setar as propriedades da classe
	* 
	* @method __addProperties
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__addProperties", {

		value: function (config) {

			for (var name in config) {

				if (this.hasOwnProperty(name)) {

					this[name] = config[name];

				}

			}

		}

	});

	/**
	* Metodo responsavel por abrir a requisicao
	* 
	* @method __open
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__open", {

		value: function () {

			this.__xhr.open(this.__method, this.__url, this.__sync);

		}

	});

	/**
	* Metodo responsavel os headers da requisicao
	* 
	* @method __setRequestHeader
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__setRequestHeader", {

		value: function () {

			var i = this.__headers.length;

			while (--i) {

				this.__xhr.setRequestHeader(this.__headers[i].key, this.__headers[i].value);

			}

		}

	});

	/**
	* Metodo responsavel por enviar a requisicao http
	* 
	* @method __send
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__send", {

		value: function () {

			this.__xhr.send(JSON.stringify(this.__data));

		}

	});

	/**
	* Metodo responsavel por executar a requisicao http (open, setRequestHeaders, send)
	* 
	* @method __execute
	* @private
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "__execute", {

		value: function () {

			this.__open();
			this.__setRequestHeader();
			this.__send();

		}

	});

	/**
	* Metodo responsavel por enviar a requisicao http (resetProperties, addProperties, execute)
	* 
	* @method request
	* @public
	* @return {void}
	*/
	Object.defineProperty(Ajax.prototype, "request", {

		value: function (config) {

			this.__resetProperties();
			this.__addProperties(config);
			this.__execute();

		}

	});

	return Ajax;

})();
/*******************************************************
 *                                                     *
 * BizzyJS                                             *
 * https://github.com/Bibizzy/BizzyJS                  *
 *                                                     *
 * Copyright (c) 2014 Bibizzy                          *
 * Licensed under the MIT license.                     *
 *                                                     *
 ******************************************************/
 
/**
* Modulo que isola a classe Dispatcher
* 
* @namespace B.utils
* @module Dispatcher
*/
window.B.utils.Dispatcher = (function () {

	"use strict";

	/**
	* Classe que implementa o padrao PubSub
	*
	* @namespace B.utils
	* @class Dispacher
	*/
	function Dispatcher () {}

	/**
	* Propriedade que contem os callbacks que serao tratados pelo dispatcher
	*
	* @property __listeners
	* @private
	* @type Array
	* @default []
	*/
	Object.defineProperty(Dispatcher.prototype, "__listeners", {

		writable: true,
		value: []

	});

	/**
	* Recupera a lista de callbacks para um determinado evento
	*
	* @method __getEvent
	* @private
	* @param {String} event Nome do evento
	* @return {Array} Lista de callbacks registrados para o evento
	*/
	Object.defineProperty(Dispatcher.prototype, "__getEvent", {

		value: function (event) {

			this.__listeners[event] = this.__listeners[event] || [];
			return this.__listeners[event];

		}

	});

	/**
	* Registra um novo callback de um determinado evento
	*
	* @method on
	* @public
	* @param {String} event Nome do evento
	* @param {Function} callback Funcao de callback que a ser registrada
	* @return {Void}
	*/
	Object.defineProperty(Dispatcher.prototype, "on", {

		value: function (event, callback) {

			this.__getEvent(event).push(callback);

		}

	});

	/**
	* Deleta um callback de um determinado evento
	*
	* @method off
	* @public
	* @param {String} event Nome do evento
	* @param {Function} callback Funcao de callback que a ser registrada
	* @return {Void}
	*/
	Object.defineProperty(Dispatcher.prototype, "off", {

		value: function (event, callback) {

			var listener = this.__getEvent(event),
				i = listener.length;

			while (--i) {

				if (listener[i] === callback) {

					delete listener[i];

				}

			}

		}

	});

	/**
	* Dispara os callbacks de um determinado evento
	*
	* @method trigger
	* @public
	* @param {String} event Nome do evento
	* @param {Object} data Objeto contendo os dados que serao passados para o callbach
	* @return {Void}
	*/
	Object.defineProperty(Dispatcher.prototype, "trigger", {

		value: function (event, data) {

			var listener = this.__getEvent(event),
				i = listener.length;

			while (--i) {

				listener[i](data);

			}

		}

	});

	return Dispatcher;
	
})();
/*******************************************************
 *                                                     *
 * BizzyJS                                             *
 * https://github.com/Bibizzy/BizzyJS                  *
 *                                                     *
 * Copyright (c) 2014 Bibizzy                          *
 * Licensed under the MIT license.                     *
 *                                                     *
 ******************************************************/

window.B.utils.String = (function () {

	"use string";

	/**
	* 
	*/
	function Str () {}

	/**
	* 
	*/
	Object.defineProperty(Str.prototype, "format", {

		value: function () {

			var text = arguments[0],
				itens = Array.prototype.slice.call(arguments, 1);

			return text.replace(/{(\d+)}/g, function(match, number) {

				return itens[number] || "";

			});

		}

	});

	return new Str();

})();
/*******************************************************
 *                                                     *
 * BizzyJS                                             *
 * https://github.com/Bibizzy/BizzyJS                  *
 *                                                     *
 * Copyright (c) 2014 Bibizzy                          *
 * Licensed under the MIT license.                     *
 *                                                     *
 ******************************************************/

/**
* 
*/
window.B.utils.Require = (function () {

	"use strict";

	/**
	* 
	*/
	function Require () {}

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__ajax", {

		value: new window.B.utils.Ajax()

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__head", {

		value: window.document.querySelector("head")

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__script", {

		value: window.document.createElement("script")

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "__appendChild", {

		value: function (data) {

			this.__script.text = data;
			this.__head.appendChild(this.__script);

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Require.prototype, "use", {

		value: function (urlDocuments) {

			urlDocuments.forEach(function (url) {

				this.__ajax.request({

					url: url,
					sync: false,
					onCompleted: this.__appendChild.bind(this)

				});

			}, this);

		}

	});

	return new Require();

})();
/*******************************************************
 *                                                     *
 * BizzyJS                                             *
 * https://github.com/Bibizzy/BizzyJS                  *
 *                                                     *
 * Copyright (c) 2014 Bibizzy                          *
 * Licensed under the MIT license.                     *
 *                                                     *
 ******************************************************/

/**
* 
*/
window.B.utils.router = (function () {

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
	Object.defineProperty(RouterModel.prototype, "__initialize", {

		value: function (config) {

			this.segments = config.url.split("/");
			this.callback = (typeof config.callback === "function") ? config.callback : function () {};

		}

	});

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "__buildValidator", {

		value: function () {

			var regularExpression = "",
				url = this.segments.join("/");

			regularExpression = url.replace(/{(\w+)}/g, function (match, number) {

				return "(\\w+)";

			});

			this.__validator = new RegExp(window.B.uitls.String.format("^({0})$", regularExpression));

		}

	});

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "getParameters", {

		value: function (other) {

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

		}

	});

	/**
	* 
	*/
	Object.defineProperty(RouterModel.prototype, "equals", { 

		value: function (other) {

			this.__buildValidator();

			this.equals = function (other) {

				return this.__validator.test(other.url);

			}.bind(this)(other);

		}

	});

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

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Router.prototype, "__initialize", {

		value: function () {

			window.addEventListener("hashchange", this.__hashchange.bind(this), false);

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Router.prototype, "__hashchange", {

		value: function () {

			var i = this.__data.length,
				other = new RouterModel({ url: window.location.hash.substr(1) });

			while (--i) {

				if (this.__data[i].equals(other)) {

					this.__data[i].callback(this.__data[i].getParameters(other));

				}

			}

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Router.prototype, "define", {

		value: function (routesDefination) {

			var i = routesDefination.length;

			while (--i) {

				this.__data.push(new RouterModel(routesDefination[i]));

			}

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Router.prototype, "start", {

		value: function () {

			window.dispatchEvent(new window.Event("hashchange"));

		}

	});

	return new Router();

})();
/*******************************************************
 *                                                     *
 * BizzyJS                                             *
 * https://github.com/Bibizzy/BizzyJS                  *
 *                                                     *
 * Copyright (c) 2014 Bibizzy                          *
 * Licensed under the MIT license.                     *
 *                                                     *
 ******************************************************/

/**
* 
*/
window.B.utils.Serialize = (function (BIZZY) {

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

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__data", {

		writable: true,
		value: {}

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

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__initialize", {

		value: function () {

			this.__defineNodeName();
			this.__defineType();

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__defineNodeName", {

		value: function () {

			this.__nodeName = {

				"INPUT": this.__searchForNodeType.bind(this),
				"BUTTON": this.__searchForNodeType.bind(this),
				"SELECT": this.__searchForNodeType.bind(this),

				"TEXTAREA": this.__push.bind(this)

			};

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__defineType", {

		value: function () {

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

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__push", {

		value: function (element) {

			this.__data[element.name] = element.value;

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__pushChecked", {

		value: function (element) {

			this.__data[element.name] = element.checked ? element.value : null;

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__pushSelectMultiple", {

		value: function (element) {

			var i = element.options.length;

			while (--i) {

				this.__data[element.name] = element.options[i].selected ? element.options[i].value : null;

			}

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__searchForNodeType", {

		value: function (element) {

			this.__type[element.name](element);

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__serachForNodeName", {

		value: function (element) {

			this.__nodeName[element.name](element);

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "__execute", {

		value: function () {

			var i = this.__form.elements.length;

			while (--i) {

				if (this.__form.elements[i].name === "") {

					continue;

				}

				this.__serachForNodeName(this.__form.elements[i]);

			}

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Serialize.prototype, "toJSON", {

		value: function (form)  {

			if (!form || form.nodeName !== "FORM") {

				return {};

			}

			this.__form = form;
			this.__data = {};

			this.__execute();

			return this.__data;

		}

	});

	return new Serialize();

})();
/*******************************************************
 *                                                     *
 * BizzyJS                                             *
 * https://github.com/Bibizzy/BizzyJS                  *
 *                                                     *
 * Copyright (c) 2014 Bibizzy                          *
 * Licensed under the MIT license.                     *
 *                                                     *
 ******************************************************/

/**
* Modulo que isola uma instancia do modulo Dispatcher, para ser
* utilizado no padrao de projeto Mediator
*
* @namespace B
* @module Mediator
*/
 window.B.Mediator = (function () {

	"use strict";

	return new window.B.utils.Dispatcher();

 })();
/*******************************************************
 *                                                     *
 * BizzyJS                                             *
 * https://github.com/Bibizzy/BizzyJS                  *
 *                                                     *
 * Copyright (c) 2014 Bibizzy                          *
 * Licensed under the MIT license.                     *
 *                                                     *
 ******************************************************/

/**
* Modulo que isola a Classe Model
* 
* @namespace B
* @module Model
*/
window.B.Model = (function () {

	"use strict";

	/**
	* Classe Base Model que representa o Modelo de Dados
	* 
	* @namespace B
	* @class Model
	*/
	function Model () {

		this._initialize();

	}

	/**
	* 
	* 
	* @property __dispatcher
	* @private
	* @type Object
	* @default Uma nova instancia do modulo Dispatcher
	*/
	Object.defineProperty(Model.prototype, "__dispatcher", {

		value: new window.B.utils.Dispatcher()

	});

	/**
	* 
	* 
	* @property _ajax
	* @protected
	* @type Object
	* @default Uma nova instancia do modulo Ajax
	*/
	Object.defineProperty(Model.prototype, "_ajax", {

		value: new window.B.utils.Ajax()

	});

	/**
	* 
	* 
	* @property _headers
	* @protected
	* @type Array
	* @defatul Um Array literal com o cabecalho Content-Type JSON padrao
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
	* 
	* @property __url
	* @private
	* @type String
	* @default Um Objeto literal de String vazio
	*/
	Object.defineProperty(Model.prototype, "__url", {

		writable: true,
		value: ""

	});

	/**
	* Url para transferencia ou requisicao do Modelo de Dados
	* 
	* @property _url
	* @protected
	* @type String
	* @default Um Objeto litaral de String vazio
	*/
	Object.defineProperty(Model.prototype, "_url", {

		get: function () {

			return window.B.uitls.String.format("{0}/{1}", this.__url, this.data[this._idName]);

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
	Object.defineProperty(Model.prototype, "_idName", {

		writable: true

	});

	/**
	* Container que transporta a representacao do Modelo de Dados
	* 
	* @property data
	* @public
	* @type Object
	* @default Um Objeto literal vazio
	*/
	Object.defineProperty(Model.prototype, "data", {

		writable: true,
		value: {}

	});

	/**
	* 
	* 
	* @propety defaults
	* @public
	* @type Object
	* @default Um Objeto literal vazio
	*/
	Object.defineProperty(Model.prototype, "defaults", {

		writable: true,
		value: {}

	});

	/**
	* Metodo executado na inicializacao da Classe
	*
	* @method _initialize
	* @protected
	* @return {void}
	*/
	Object.defineProperty(Model.prototype, "_initialize", {

		value: function () {

			this.reset();

		}

	});

	/**
	* 
	* 
	* @method reset
	* @public
	* @return {void}
	*/
	Object.defineProperty(Model.prototype, "reset", {

		value: function () {

			var name = "";

			for (name in this.defaults) {

				this.data[name] = this.defaults[name].value;

			}

			this.__dispatcher.trigger("model:reset", this.data);

		}

	});

	/**
	* 
	* 
	* @method on
	* @public
	* @return {void}
	*/
	Object.defineProperty(Model.prototype, "on", {

		value: function (event, callback) {

			this.__dispatcher.on(event, callback);

		}

	});

	/**
	* 
	* 
	* @method off
	* @public
	* @return {void}
	*/
	Object.defineProperty(Model.prototype, "off", {

		value: function (event, callback) {

			this.__dispatcher.off(event, callback);

		}

	});

	/**
	* 
	* 
	* @method __completed
	* @private
	* @return {void}
	*/
	Object.defineProperty(Model.prototype, "__completed", {

		value: function (data) {

			this.data = JSON.parse(data);
			this.__dispatcher.trigger("model:completed", this.data);

		}

	});

	/**
	* 
	* 
	* @method __failed
	* @private
	* @return {void}
	*/
	Object.defineProperty(Model.prototype, "__failed", {

		value: function (data) {

			this.__dispatcher.trigger("model:failed", JSON.parse(data));

		}

	});

	/**
	* 
	* 
	* @method __request
	* @private
	* @return {void}
	*/
	Object.defineProperty(Model.prototype, "__request", {

		value: function (method) {

			this._ajax.request({

				method: method,
				url: this._url,
				data: this.data,
				headers: this._headers,
				onCompleted: this.__completed.bind(this),
				onFailed: this.__failed.bind(this)

			});

		}

	});

	/**
	* 
	* 
	* @method fetch
	* @public
	* @return {void}
	*/
	Object.defineProperty(Model.prototype, "fetch", {

		value: function () {

			this.__dispatcher.trigger("model:fetch", this.data);
			this.__request("GET");

		}

	});

	/**
	* 
	* 
	* @method save
	* @public
	* @default {void}
	*/
	Object.defineProperty(Model.prototype, "save", {

		value: function () {

			this.__dispatcher.trigger("model:save", this.data);
			this.__request(this.data[this._idName] ? "POST" : "PUT");

		}

	});

	/**
	* 
	* 
	* @method delete
	* @public
	* @return {void}
	*/
	Object.defineProperty(Model.prototype, "delete", {

		value: function () {

			this.__dispatcher.trigger("model:delete", this.data);
			this.__request("DELETE");

		}

	});

	return Model;

})();
/*******************************************************
 *                                                     *
 * BizzyJS                                             *
 * https://github.com/Bibizzy/BizzyJS                  *
 *                                                     *
 * Copyright (c) 2014 Bibizzy                          *
 * Licensed under the MIT license.                     *
 *                                                     *
 ******************************************************/

/**
* Modulo que isola a Classe View
* 
* @namespace B
* @module View
*/
window.B.View = (function () {

	"use strict";

	/**
	* Classe Base View que representa Modelo de Dados no DOM
	* 
	* @namespace B
	* @class View
	* @private
	*/
	function View () {

		this._initialize();

	}

	/**
	* Objeto DOM criado no Navegador
	* 
	* @property _el
	* @protected
	* @type Object
	* @default Objeto literal vazio
	*/
	Object.defineProperty(View.prototype, "_el", {

		writable: true,
		value: {}

	});

	/**
	* Representacao do Modelo de Dados
	* 
	* @property _model
	* @protected
	* @type Object
	* @default Objeto literal vazio
	*/
	Object.defineProperty(View.prototype, "_model", {

		writable: true,
		value: { data: {} }

	});

	/**
	* Micro Template que carrega o Modelo de Dados no Elemento DOM
	* 
	* @property _template
	* @protected
	* @type Function
	* @default Expressao de funcao/funcao anonima que retorna um objeto literal vazio
	*/
	Object.defineProperty(View.prototype, "_template", {

		writable: true,
		value: function () { return {}; }

	});

	/**
	* 
	* 
	* @property events
	* @protected
	* @type Array
	* @default Array literal vazio
	*/
	Object.defineProperty(View.prototype, "_events", {

		writable: true,
		value: []

	});

	/**
	* 
	* 
	* @method _subscribeEvents
	* @protected
	* return {void}
	*/
	Object.defineProperty(View.prototype, "_subscribeEvents", {

		value: function () {

			var name = "";

			for (name in this.events) {

				window.document.querySelector(name.split(" ")[1]).addEventListener(name.split(" ")[0], this.events[name], false);

			}

		}

	});

	/**
	* 
	* 
	* @method _deleteEvents
	* @protected
	* return {void}
	*/
	Object.defineProperty(View.prototype, "_deleteEvents", {

		value: function () {

			var name = "";

			for (name in this.events) {

				window.document.querySelector(name.split(" ")[1]).removeEventListener(name.split(" ")[0], this.events[name], false);

			}

		}

	});

	/**
	* Metodo executado na inicializacao da Classe
	*
	* @method _initialize
	* @protected
	* @return {void}
	*/
	Object.defineProperty(View.prototype, "_initialize", {

		value: function () {

			// Este metodo nao foi implementado

		}

	});

	/**
	* Renderiza o Micro Template no Elemento Container
	* 
	* @method render
	* @public
	* @return {void}
	*/
	Object.defineProperty(View.prototype, "render", {

		value: function () {

			this._el.innerHTML = this._template(this._model.data);
			this._subscribeEvents();

		}

	});

	/**
	* Destroi o Micro Template renderizado no Elemento Container
	* 
	* @method destroy
	* @public
	* @return {void}
	*/
	Object.defineProperty(View.prototype, "destory", {

		value: function () {

			this._el.innerHTML = "";
			this._deleteEvents();

		}

	});

	return View;

})();