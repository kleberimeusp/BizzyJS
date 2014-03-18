;(function (context) {

	"use strict";

	/**
	* Classe que implementa o padrao PubSub
	*
	* @namespace Bizzy
	* @class Dispacher
	*/
	function Dispacher () {}

	/**
	* Propriedade que contem os callbacks que serao tratados pelo dispatcher
	*
	* @property _listeners
	* @default []
	*/
	Object.defineProperty(Dispacher.prototype, "_listeners", {

		writable: true,
		value: []

	});

	/**
	* Recupera a lista de callbacks para um determinado evento
	*
	* @method _getEvent
	* @param {String} event Nome do evento
	* @return {Array} Lista de callbacks registrados para o evento
	*/
	Dispacher.prototype._getEvent = function (event) {

		this._listeners[event] = this._listeners[event] || [];
		return this._listeners[event];

	};

	/**
	* Registra um novo callback de um determinado evento
	*
	* @method on
	* @param {String} event Nome do evento
	* @param {Function} callback Funcao de callback que a ser registrada
	* @return {Void}
	*/
	Dispacher.prototype.on = function (event, callback) {

		this._getEvent(event).push(callback);

	};

	/**
	* Deleta um callback de um determinado evento
	*
	* @method off
	* @param {String} event Nome do evento
	* @param {Function} callback Funcao de callback que a ser registrada
	* @return {Void}
	*/
	Dispacher.prototype.off = function (event, callback) {

		var i = 0,
			listeners = this._getEvent(event),
			max = listeners.length;

		while (i < max) {

			if (listeners[i] === callback) {

				delete listeners[i];

			}

			i += 1;

		}

	};

	/**
	* Dispara os callbacks de um determinado evento
	*
	* @method trigger
	* @param {String} event Nome do evento
	* @param {Object} data Objeto contendo os dados que serao passados para o callbach
	* @return {Void}
	*/
	Dispacher.prototype.trigger = function (event, data) {

		var i = 0,
			listeners = this._getEvent(event),
			max = listeners.length;

		while (i < max) {

			listeners[i](data);
			i += 1;

		}

	};

	context.Bizzy.dispacher = new Dispacher();
	
})(window);