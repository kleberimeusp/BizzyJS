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
	* Instancia do Modulo Dispatcher, utilizado para criar os observadores
	* do Modelo de Dados, que seram diparados a cada evento que o Modelo
	* for submetido
	* 
	* @property __dispatcher
	* @private
	* @type Object
	* @default Instancia do modulo Dispatcher
	*/
	Object.defineProperty(Model.prototype, "__dispatcher", {

		value: new window.B.utils.Dispatcher()

	});

	/**
	* Instancia do modulo Ajax, utilizado para realizar as requisicoes
	* que o modelo for submetido
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
	* Cabecalho enviado nas requisicoes ajax
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
	* Url para transferancia ou requisao do Modelo de Dados
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
	* Url formatada para transferencia ou requisicao do Modelo de Dados,
	* exemplo: localhot/modelo/id
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
	* Container que transporta a representacao do Modelo de Dados, se
	* refindo sempre nas propriedades pre definidas no Defaults
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
	* Definicao das propriedades com seu valores pre definidos,
	* estes valores serao utilizados para resetar o modelo e para assegurar
	* que apenas estas propriedades existirao na representacao
	* do Modelo de Dados
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
	* Redefine os valores do objeto data para os que foram definidos
	* na propriedade Defaults
	* 
	* @method reset
	* @public
	* @return {void}
	*/
	Object.defineProperty(Model.prototype, "reset", {

		value: function (data) {

			var name = "",
				values = data || this.defaults;

			for (name in this.defaults) {

				this.data[name] = values[name] || this.defaults[name];

			}

		}

	});

	/**
	* Cria ouvinte dos eventos que ocorreram neste Modelo de Dados
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
	* Deleta um ouvinte, que foi definido no methodo On
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
	* Reseta o Modelo de Dados, e dispara uma trigger quando uma requisicao Ajax for
	* executado com sucesso
	* 
	* @method __completed
	* @private
	* @return {void}
	*/
	Object.defineProperty(Model.prototype, "__completed", {

		value: function (data) {

			this.reset(JSON.parse(data));
			this.__dispatcher.trigger("model:completed", this.data);

		}

	});

	/**
	* Dispara uma trigger quando uma requisicao Ajax for
	* executado com erro
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
	* Requisicao Ajax padrao utilizdo pelos metodos Fetch, Save e Delete
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
	* Requisicao Get do Modelo de Dados
	* 
	* @method fetch
	* @public
	* @return {void}
	*/
	Object.defineProperty(Model.prototype, "fetch", {

		value: function () {

			this.__request("GET");

		}

	});

	/**
	* Requisicao do Modelo de Dados, executa POST quando o identificador
	* do Modelo de Dados existir e PUT quanto nao existir um identificador para o
	* Modelo de Dados, este identificador é definido na propriedado idName
	* 
	* @method save
	* @public
	* @default {void}
	*/
	Object.defineProperty(Model.prototype, "save", {

		value: function () {

			this.__request(this.data[this._idName] ? "POST" : "PUT");

		}

	});

	/**
	* Requisicao Delete do Modelo de Dados
	* 
	* @method delete
	* @public
	* @return {void}
	*/
	Object.defineProperty(Model.prototype, "delete", {

		value: function () {

			this.__request("DELETE");

		}

	});

	return Model;

})();