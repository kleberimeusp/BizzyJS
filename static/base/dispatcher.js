;(function (context) {

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

		writable: true,
		value: []

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

		var i = 0,
			listeners = this.__getEvent(event),
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
	Dispatcher.prototype.trigger = function (event, data) {

		var i = 0,
			listeners = this.__getEvent(event),
			max = listeners.length;

		while (i < max) {

			listeners[i](data);
			i += 1;

		}

	};

	/**
	* 
	*/
	function FacadeDispatcher () {

		var dispatcher = new Dispatcher();

		return {

			on: dispatcher.on,
			off: dispatcher.off,
			trigger: dispatcher.trigger

		}

	}

	context.Bizzy.dispatcher = new FacadeDispacher();
	
})(window);