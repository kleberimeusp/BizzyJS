window.B.utils.Dispatcher = (function (BIZZY) {

	"use strict";

	/**
	* Classe que implementa o padrao PubSub
	*
	* @namespace Bizzy
	* @class Dispacher
	*/
	function Dispatcher () {}

	/**
	* Propriedade que contem os callbacks que serao tratados pelo dispatcher
	*
	* @property __listeners
	* @default []
	*/
	Object.defineProperty(Dispatcher.prototype, "__listeners", {

		writable: true

	});

	/**
	* Recupera a lista de callbacks para um determinado evento
	*
	* @method __getEvent
	* @param {String} event Nome do evento
	* @return {Array} Lista de callbacks registrados para o evento
	*/
	Dispatcher.prototype.__getEvent = function (event) {

		this.__listeners[event] = this.__listeners[event] || [];
		return this.__listeners[event];

	};

	/**
	* Registra um novo callback de um determinado evento
	*
	* @method on
	* @param {String} event Nome do evento
	* @param {Function} callback Funcao de callback que a ser registrada
	* @return {Void}
	*/
	Dispatcher.prototype.on = function (event, callback) {

		this.__getEvent(event).push(callback);

	};

	/**
	* Deleta um callback de um determinado evento
	*
	* @method off
	* @param {String} event Nome do evento
	* @param {Function} callback Funcao de callback que a ser registrada
	* @return {Void}
	*/
	Dispatcher.prototype.off = function (event, callback) {

		var listener = this.__getEvent(event),
			i = listener.length;

		while (--i) {

			if (listener[i] === callback) {

				delete listener[i];

			}

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
	Dispatcher.prototype.trigger = function (event, data) {

		var listener = this.__getEvent(event),
			i = listener.length;

		while (--i) {

			listener[i](data);

		}

	};

	/**
	* 
	*/
	function Facade () {

		if (!(this instanceof Facade)) {

			return new Facade();

		}

		var dispatcher = new Dispatcher(),
			revelation = {};

		// Revelation Pattern
		revelation.on = dispatcher.on;
		revelation.off = dispatcher.off;
		revelation.trigger = dispatcher.trigger;

		return revelation;

	}

	return Facade;
	
})(window.B || {});