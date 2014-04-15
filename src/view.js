/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

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