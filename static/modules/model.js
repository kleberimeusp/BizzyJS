;(function (context) {

	"use strict";

	/**
	* Classe Base Model que representa o Modelo de Dados
	* 
	* @namespace Bizzy
	* @class Model
	*/
	function Model () {

		this.initialize();

	}

	/**
	* Construtor de extensao de uma novo Model
	*
	* @method extend
	* @param {Object} config Definicoes da nova Classe
	* @return {Object} Retorna a Classe Model extendida da configuracao
	*/
	Model.extend = function (config) {

		var newModel = Model;

		for (var name in config) {

			newModel.prototype[name] = config[name];

		}

		return new newModel();

	};

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "ajax", {

		value: new bizzy.ajax();

	});

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "heaers", {

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
	Object.defineProperty(Model.prototype, "_url", {

		writable: true,
		value: ""

	});

	/**
	* Url para transferencia ou requisicao do Modelo de Dados
	* 
	* @property url
	* @type String
	*/
	Object.defineProperty(Model.prototype, "url", {

		get: function () {

			return context.Bizzy.format("{0}/{1}", this._url, this.data[this.idName]);

		},

		set: function (value) {

			this._url = value;

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
	* @property idName
	* @type String
	*/
	Object.definePrototype(Model.prototype, "idName", {

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
	* @method initialize
	*/
	Model.prototype.initialize = function () {

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
	Model.prototype._onCompleted = function (data) {

		this.reset(JSON.parse(data));
		this.onCompleted();

	};

	/**
	* 
	*/
	Model.prototype._onFailed = function (data) {

		this.onFailed(JSON.parse(data));

	};

	/**
	* 
	*/
	Model.prototype._request = function (method) {

		this.ajax.request({

			method: method,
			url: this.url,
			data: this.data,
			headers: this.headers,
			onCompleted: this._onCompleted.bind(this),
			onFailed: this._onFailed.bind(this)

		});

	}; 

	/**
	* 
	*/
	Model.prototype.get = function () {

		this._request("GET");

	};

	/**
	* 
	*/
	Model.prototype.post = function () {

		this._request("POST");

	};

	/**
	* 
	*/
	Model.prototype.put = function () {

		this._request("PUT");

	};

	/**
	* 
	*/
	Model.prototype.delete = function() {

		this._request("DELETE");

	};

	context.Bizzy.Model = Model;

})(window);