;(function (window, undefined) {

	"use strict";

	/**
	* Classe Base View que representa Modelo de Dados no DOM
	* 
	* @namespace Bizzy
	* @class View
	*/
	function View () {

		this._initialize();

	}

	/**
	* 
	*/
	Object.defineProperty(View.prototype, "__el", {

		writable: true,
		value: {}

	});

	/**
	* Container referente ao Objeto DOM criado no Navegador
	* 
	* @property _el
	* @type Object
	*/
	Object.defineProperty(View.prototype, "_el", {

		get: function () {

			return this.__el;

		},

		set: function (value) {

			this.__el = document.querySelector(value);

		}

	});

	/**
	* Representacao do Modelo de Dados
	* 
	* @property _model
	* @type Object
	*/
	Object.defineProperty(View.prototype, "_model", {

		writable: true,
		value: {}

	});

	/**
	* Micro Template que carrega o Modelo de Dados no Elemento DOM
	* 
	* @property _template
	* @type Function
	*/
	Object.defineProperty(View.prototype, "_template", {

		writable: true,
		value: function () { return {}; }

	});

	/**
	* 
	*/
	Object.defineProperty(View.prototype, "events", {

		writable: true,
		value: []

	});

	/**
	* 
	*/
	View.prototype._subscribeEvents = function () {

		for (var name in this.events) {

			Bizzy.util.event.on(document.querySelector(name.split(" ")[1]), name.split(" ")[0], this.events[name]);

		}

	};

	/**
	* 
	*/
	View.prototype._deleteEvents = function () {

		for (var name in this.events) {

			Bizzy.util.event.off(document.querySelector(name.split(" ")[1]), name.split(" ")[0], this.events[name]);

		}

	};

	/**
	* Metodo executado na inicializacao da Classe
	*
	* @method _initialize
	*/
	View.prototype._initialize = function () {

		// Este metodo nao foi implementado

	};

	/**
	* Renderiza o Micro Template no Elemento Container
	* 
	* @method render
	*/
	View.prototype.render = function () {

		this._el.innerHTML = this._template(this._model.data);
		this._subscribeEvents();

	};

	/**
	* Destroi o Micro Template renderizado no Elemento Container
	* 
	* @method destroy
	*/
	View.prototype.destory = function () {

		this._el.innerHTML = "";
		this._deleteEvents();

	};

	/**
	* 
	*/
	function FacadeView () {

		if (!(this instanceof FacadeView)) {

			return new FacadeView();

		}

		var view = new View();

		return {

			_initialize: view._initialize,
			_el: view._el,
			_template: view._template,
			_model: view._model,
			render: view.render,
			destory: view.destory

		}

	}

	Bizzy.View = View;

})(window);