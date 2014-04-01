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
		window.Bizzy.utils.Dispatcher.call(this);

	}

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "__dispatcher", {

		value: new window.Bizzy.utils.Dispatcher()

	});

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "_ajax", {

		value: new window.Bizzy.utils.Ajax()

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

		delete thid.data;
		this.data = data;

		this.__dispatcher.trigger("model:reset", data);

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

		this.reset(JSON.parse(data));
		this.__dispatcher.trigger("model:completed", JSON.parse(data));

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

		if (!(this instanceof FacadeModel)) {

			return new FacadeModel();

		}

		var model = new Model(),
			revelation = {};

		// Revelation Pattern
		revelation._initialize: model._initialize;
		revelation._ajax: model._ajax;
		revelation._headers: model._headers;
		revelation._url: model._url;
		revelation._idName: model._idName;
		
		revelation.data: model.data;
		revelation.onCompleted: model.onCompleted;
		revelation.onFailed: model.onFailed;
		revelation.reset: model.reset;
		revelation.fetch: model.fetch;
		revelation.save: model.save;
		revelation.delete: model.delete;

		return revelation;

	}

	Bizzy.models.Model = Facade;

})(window);