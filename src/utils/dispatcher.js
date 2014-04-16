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
* Modulo que isola a classe Dispatcher
* 
* @namespace B.utils
* @module Dispatcher
*/
window.B.utils.Dispatcher = (function () {

	"use strict";

	/**
	* Classe que implementa o padrao PubSub
	*
	* @namespace B.utils
	* @class Dispacher
	*/
	function Dispatcher () {}

	/**
	* Propriedade que contem os callbacks que serao tratados pelo dispatcher
	*
	* @property __listeners
	* @private
	* @type Array
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
	* @private
	* @param {String} event Nome do evento
	* @return {Array} Lista de callbacks registrados para o evento
	*/
	Object.defineProperty(Dispatcher.prototype, "__getEvent", {

		value: function (event) {

			this.__listeners[event] = this.__listeners[event] || [];
			return this.__listeners[event];

		}

	});

	/**
	* Registra um novo callback de um determinado evento
	*
	* @method on
	* @public
	* @param {String} event Nome do evento
	* @param {Function} callback Funcao de callback que a ser registrada
	* @return {Void}
	*/
	Object.defineProperty(Dispatcher.prototype, "on", {

		value: function (event, callback) {

			this.__getEvent(event).push(callback);

		}

	});

	/**
	* Deleta um callback de um determinado evento
	*
	* @method off
	* @public
	* @param {String} event Nome do evento
	* @param {Function} callback Funcao de callback que a ser registrada
	* @return {Void}
	*/
	Object.defineProperty(Dispatcher.prototype, "off", {

		value: function (event, callback) {

			var listener = this.__getEvent(event),
				i = listener.length;

			while (--i) {

				if (listener[i] === callback) {

					delete listener[i];

				}

			}

		}

	});

	/**
	* Dispara os callbacks de um determinado evento
	*
	* @method trigger
	* @public
	* @param {String} event Nome do evento
	* @param {Object} data Objeto contendo os dados que serao passados para o callbach
	* @return {Void}
	*/
	Object.defineProperty(Dispatcher.prototype, "trigger", {

		value: function (event, data) {

			var listener = this.__getEvent(event),
				i = listener.length;

			while (--i) {

				listener[i](data);

			}

		}

	});

	return Dispatcher;
	
})();