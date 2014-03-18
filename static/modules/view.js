;(function (context) {

	"use strict";

	/**
	* Classe Base View que representa Modelo de Dados no DOM
	* 
	* @namespace Bizzy
	* @class View
	*/
	function View () {

		this.initialize();

	}

	/**
	* 
	*/
	Object.defineProperty(View.prototype, "_el", {

		writable: true,
		value: {}

	});

	/**
	* Container referente ao Objeto DOM criado no Navegador
	* 
	* @property el
	* @type Object
	*/
	Object.defineProperty(View.prototype, "el", {

		get: function () {

			return this._el;

		},

		set: function (value) {

			this._el = document.querySelector(value);

		}

	});

	/**
	* Representacao do Modelo de Dados
	* 
	* @property model
	* @type Object
	*/
	Object.defineProperty(View.prototype, "model", {

		writable: true,
		value: {}

	});

	/**
	* Micro Template que carrega o Modelo de Dados no Elemento DOM
	* 
	* @property template
	* @type Function
	*/
	Object.defineProperty(View.prototype, "template", {

		writable: true,
		value: function () { return {}; }

	});

	/**
	* Metodo executado na inicializacao da Classe
	*
	* @method initialize
	*/
	View.prototype.initialize = function () {

		// Este metodo nao foi implementado

	};

	/**
	* Renderiza o Micro Template no Elemento Container
	* 
	* @method render
	*/
	View.prototype.render = function () {

		this.el.innerHTML = this.template(this.model.data);

	};

	/**
	* Destroi o Micro Template renderizado no Elemento Container
	* 
	* @method destroy
	*/
	View.prototype.destory = function () {

		this.el.innerHTML = "";

	};

	context.Bizzy.View = View;

})(window);