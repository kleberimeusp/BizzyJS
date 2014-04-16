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