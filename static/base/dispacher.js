;(function (context) {

	"use strict";

	/**
	* 
	*/
	function Dispacher () {}

	/**
	* 
	*/
	Object.defineProperty(Dispacher.prototype, "_listeners", {

		writable: true,
		value: []

	});

	/**
	* 
	*/
	Dispacher.prototype._getEvent = function (event) {

		this._listeners[event] = this._listeners[event] || [];
		return this._listeners[event];

	};

	/**
	* Subscribe
	*/
	Dispacher.prototype.on = function (event, callback) {

		this._getEvent(event).push(callback);

	};

	/**
	* Delete
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
	* Publish
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