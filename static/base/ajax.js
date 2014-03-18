;(function (context) {

	"use strict";

	/**
	* Classe para requisicoes Ajax
	* 
	* @namespace App
	* @class Ajax
	*/
	function Ajax () {

		this._initialize();

	}

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "method", {

		enumerable: true,
		writable: true,
		value: "GET"

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "url", {

		enumerable: true,
		writable: true,
		value: ""

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "sync", {

		enumerable: true,
		writable: true,
		value: true

	});

	/**
	*
	*/
	Object.defineProperty(Ajax.prototype, "data", {

		enumerable: true,
		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "headers", {

		enumerable: true,
		writable: true,
		value: []

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "onSuccess", {

		enumerable: true,
		writable: true,
		value: function () {}

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "onError", {

		enumerable: true,
		writable: true,
		value: function () {}

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "_xhr", {

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "_readyState", {

		writable: true,
		value: []

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "_status", {

		writable: true,
		value: []

	});

	/**
	* 
	*/
	Ajax.prototype._initialize = function () {

		this._defineXhr();
		this._defineReadyStateChange();
		this._defineReadyState();
		this._defineStatus();

	};

	/**
	* 
	*/
	Ajax.prototype._defineXhr = function () {

		this._xhr = bizzy.XHRFactory.create();

	};

	/**
	* 
	*/
	Ajax.prototype._defineReadyStateChange = function () {

		this._xhr.onreadystatechange = this._onreadystatechange.bind(this);

	};

	/**
	* 
	*/
	Ajax.prototype._defineReadyState = function () {

		this._readyState[0] = function () {};							// request not initialized
		this._readyState[1] = function () {};							// server connection established
		this._readyState[2] = function () {};							// request received
		this._readyState[3] = function () {};							// processing request

		this._readyState[4] = this._finishedRequest.bind(this);			// request finished and response is ready

	};

	/**
	*
	*/
	Ajax.prototype._defineStatus = function () {

		this._status[200] = this._onSuccess.bind(this);

		this._status[400] = this._onError.bind(this);
		this._status[401] = this._onError.bind(this);
		this._status[404] = this._onError.bind(this);
		this._status[500] = this._onError.bind(this);

	};

	/**
	* 
	*/
	Ajax.prototype._onSuccess = function () {

		this.onSuccess(this._xhr.responseText);

	};

	/**
	*
	*/
	Ajax.prototype._onError = function () {

		this.onError(this._xhr.responseText);

	};

	/**
	* 
	*/
	Ajax.prototype._finishedRequest = function () {

		this._status[this._xhr.status]();

	};

	/**
	* 
	*/
	Ajax.prototype._onreadystatechange = function () {

		this._readyState[this._xhr.readyState]();

	};

	/**
	* 
	*/
	Ajax.prototype._reset = function () {

		this.method = "GET";
		this.url = "";
		this.sync = true;
		this.data = {};
		this.headers = [];
		this.onSuccess = function () {};
		this.onError = function () {};

	};

	/**
	* 
	*/
	Ajax.prototype._extend = function (config) {

		for (var name in config) {

			this[name] = config[name];

		}

	};

	/**
	* 
	*/
	Ajax.prototype._open = function () {

		this._xhr.open(this.method, this.url, this.sync);

	};

	/**
	* 
	*/
	Ajax.prototype._setRequestHeader = function () {

		var i,
			max = this.headers.length;

		for (i = 0; i < max; i += 1) {

			this._xhr.setRequestHeader(this.headers[i].key, this.headers[i].value);

		}

	};

	/**
	* 
	*/
	Ajax.prototype._send = function () {

		this._xhr.send(JSON.stringify(this.data));

	};

	/**
	* 
	*/
	Ajax.prototype._execute = function () {

		this._open();
		this._setRequestHeader();
		this._send();

	};

	/**
	* 
	*/
	Ajax.prototype.request = function (config) {

		this._reset();
		this._extend(config);
		this._execute();

	};

	context.Bizzy.Ajax = Ajax;

})(window);