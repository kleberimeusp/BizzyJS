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