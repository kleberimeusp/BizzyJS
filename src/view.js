/*
 * BizzyJS
 * https://github.com/Bibizzy/BizzyJS
 *
 * Copyright (c) 2014 Bibizzy
 * Licensed under the MIT license.
 *
 */

/**
* 
* 
* @namespace B
* @module View
*/
window.B.View = (function (BIZZY) {

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
		BIZZY.utils.Dispatcher.call(this);

	}

	/**
	* 
	* 
	* @property __el
	* @private
	* @type Object
	* @default Objeto literal vazio
	*/
	Object.defineProperty(View.prototype, "__el", {

		writable: true,
		value: {}

	});

	/**
	* Container referente ao Objeto DOM criado no Navegador
	* 
	* @property _el
	* @protected
	* @type Object
	* @default Objeto literal vazio
	*/
	Object.defineProperty(View.prototype, "_el", {

		get: function () {

			return this.__el;

		},

		set: function (value) {

			this.__el = window.document.querySelector(value);

		}

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
		value: {}

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
	* @public
	* @type Array
	* @default Array literal vazio
	*/
	Object.defineProperty(View.prototype, "events", {

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
	View.prototype._subscribeEvents = function () {

		var name = "";

		for (name in this.events) {

			window.document.querySelector(name.split(" ")[1]).addEventListener(name.split(" ")[0], this.events[name], false);

		}

	};

	/**
	* 
	* 
	* @method _deleteEvents
	* @protected
	* return {void}
	*/
	View.prototype._deleteEvents = function () {

		var name = "";

		for (name in this.events) {

			window.document.querySelector(name.split(" ")[1]).removeEventListener(name.split(" ")[0], this.events[name], false);

		}

	};

	/**
	* Metodo executado na inicializacao da Classe
	*
	* @method _initialize
	* @protected
	* @return {void}
	*/
	View.prototype._initialize = function () {

		// Este metodo nao foi implementado

	};

	/**
	* Renderiza o Micro Template no Elemento Container
	* 
	* @method render
	* @public
	* @return {void}
	*/
	View.prototype.render = function () {

		this._el.innerHTML = this._template(this._model.data);
		this._subscribeEvents();

	};

	/**
	* Destroi o Micro Template renderizado no Elemento Container
	* 
	* @method destroy
	* @public
	* @return {void}
	*/
	View.prototype.destory = function () {

		this._el.innerHTML = "";
		this._deleteEvents();

	};

	/**
	* 
	* 
	* @namespace B
	* @class FacadeView
	* @public
	*/
	function FacadeView () {

		/**
		* Funcao construtora auto invocavel
		*/
		if (!(this instanceof FacadeView)) {

			return new FacadeView();

		}

		var view = new View(),
			revelation = {};

		/**
		* Revelation pattern
		*/
		revelation._el = view._el;

		revelation._initialize = view._initialize;
		revelation._template = view._template;
		revelation._model = view._model;
		revelation._subscribeEvents = view._subscribeEvents;
		revelation._deleteEvents = view._deleteEvents;

		revelation.render = view.render;
		revelation.destory = view.destory;

		return revelation;

	}

	return FacadeView;

})(window.B || {});