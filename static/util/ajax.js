;(function (context) {

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

		enumerable: true,
		writable: true,
		value: "GET"

	});

	/**
	* Propriedade que contem a url da requisicao
	* @property __url
	* @default ""
	*/
	Object.defineProperty(Ajax.prototype, "__url", {

		enumerable: true,
		writable: true,
		value: ""

	});

	/**
	* Propriedade que indica se a requisica sera sync ou async
	* @property __sync
  * @default true
	*/
	Object.defineProperty(Ajax.prototype, "__sync", {

		enumerable: true,
		writable: true,
		value: true

	});

	/**
	* Propriedade que contem os dados que trafegados na requisicao
	* @property __data
	* @default {}
	*/
	Object.defineProperty(Ajax.prototype, "__data", {

		enumerable: true,
		writable: true,
		value: {}

	});

	/**
	* Propriedade que contem a lista de headers da requisicao
	* @property __headers
	* @default []
	*/
	Object.defineProperty(Ajax.prototype, "__headers", {

		enumerable: true,
		writable: true,
		value: []

	});

	/**
	* Propriedade que contem o callback que sera executado quando a requisicao terminar
	* @property __onCompleted
	* @default function () {}
	*/
	Object.defineProperty(Ajax.prototype, "__onCompleted", {

		enumerable: true,
		writable: true,
		value: function () {}

	});

	/**
	* Propriedade que contem o callback que sera executado quando a requisicao falhar]
	* @property __onFailed
	* @default function () {}
	*/
	Object.defineProperty(Ajax.prototype, "__onFailed", {

		enumerable: true,
		writable: true,
		value: function () {}

	});

	/**
	* Propriedade que contem o objeto responsavel por tratar as requisicoes
	* @property __xhr
	* @default {}
	*/
	Object.defineProperty(Ajax.prototype, "__xhr", {

		writable: true,
		value: XHRFactory();

	});

	/**
	* Propriedade que contem uma lista de callbacks que serao executados durantes os status do readyState da requisicao
  	* @property __readyState
  	* @default []
	*/
	Object.defineProperty(Ajax.prototype, "__readyState", {

		writable: true,
		value: []

	});

	/**
	* Propriedade que contem uma lista de callbacks que serao executados conforme o status code da requisicao
	* @property __status
	* @default []
	*/
	Object.defineProperty(Ajax.prototype, "__status", {

		writable: true,
		value: []

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

		if (window.XMLHttpRequest) {

			this.__defineXhr = function () {

				this.__xhr = new XMLHttpRequest();

			}.bind(this)();
		    
		} else {

			this.__defineXhr = function () {

				this.__xhr = new window.ActiveXObject("Msxml2.XMLHTTP.3.0");

			}.bind(this)();

		}

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

			this[name] = config[name];

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

		var i,
			max = this.__headers.length;

		for (i = 0; i < max; i += 1) {

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
	function FacadeAjax function () {

		if (!(this instanceof FacadeAjax)) {

			return new FacadeAjax();

		}

		var ajax = new Ajax();

		return {

			request: ajax.request

		}

	}

	context.Bizzy.Ajax = Ajax;

})(window);