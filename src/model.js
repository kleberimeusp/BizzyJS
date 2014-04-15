/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

window.B.Model = (function () {

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
	Object.defineProperty(Model.prototype, "__dispatcher", {

		value: new window.B.utils.Dispatcher()

	});

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "_ajax", {

		value: new window.B.utils.Ajax()

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

			return window.B.uitls.format("{0}/{1}", this.__url, this.data[this._idName]);

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
	* @type Object
	*/
	Object.defineProperty(Model.prototype, "data", {

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "defaults", {

		writable: true,
		value: {}

	});

	/**
	* Metodo executado na inicializacao da Classe
	*
	* @method _initialize
	*/
	Object.defineProperty(Model.prototype, "_initialize", {

		value: function () {

			this.reset();

		}

	});

	/**
	* 
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
	*/
	Object.defineProperty(Model.prototype, "on", {

		value: function (event, callback) {

			this.__dispatcher.on(event, callback);

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "off", {

		value: function (event, callback) {

			this.__dispatcher.off(event, callback);

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "__completed", {

		value: function (data) {

			this.data = JSON.parse(data);
			this.__dispatcher.trigger("model:completed", this.data);

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "__failed", {

		value: function (data) {

			this.__dispatcher.trigger("model:failed", JSON.parse(data));

		}

	});

	/**
	* 
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
	*/
	Object.defineProperty(Model.prototype, "fetch", {

		value: function () {

			this.__dispatcher.trigger("model:fetch", this.data);
			this.__request("GET");

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "save", {

		value: function () {

			this.__dispatcher.trigger("model:save", this.data);
			this.__request(this.data[this._idName] ? "POST" : "PUT");

		}

	});

	/**
	* 
	*/
	Object.defineProperty(Model.prototype, "delete", {

		value: function () {

			this.__dispatcher.trigger("model:delete", this.data);
			this.__request("DELETE");

		}

	});

	return Model;

})();