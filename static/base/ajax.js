;(function (context) {

	"use strict";

	/**
	* Classe para requisicoes Ajax
	* 
	* @namespace App
	* @class Ajax
	*/
	function Ajax () {

		this.__initialize();

	}

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "__method", {

		enumerable: true,
		writable: true,
		value: "GET"

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "__url", {

		enumerable: true,
		writable: true,
		value: ""

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "__sync", {

		enumerable: true,
		writable: true,
		value: true

	});

	/**
	*
	*/
	Object.defineProperty(Ajax.prototype, "__data", {

		enumerable: true,
		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "__headers", {

		enumerable: true,
		writable: true,
		value: []

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "__onCompleted", {

		enumerable: true,
		writable: true,
		value: function () {}

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "__onFailed", {

		enumerable: true,
		writable: true,
		value: function () {}

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "__xhr", {

		writable: true,
		value: {}

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "__readyState", {

		writable: true,
		value: []

	});

	/**
	* 
	*/
	Object.defineProperty(Ajax.prototype, "__status", {

		writable: true,
		value: []

	});

	/**
	* 
	*/
	Ajax.prototype.__initialize = function () {

		this.__defineXhr();
		this.__defineReadyStateChange();
		this.__defineReadyState();
		this.__defineStatus();

	};

	/**
	* 
	*/
	Ajax.prototype.__defineXhr = function () {

		this.__xhr = bizzy.XHRFactory.create();

	};

	/**
	* 
	*/
	Ajax.prototype.__defineReadyStateChange = function () {

		this.__xhr.onreadystatechange = this.__onreadystatechange.bind(this);

	};

	/**
	* 
	*/
	Ajax.prototype.__defineReadyState = function () {

		this.__readyState[0] = function () {};							// request not initialized
		this.__readyState[1] = function () {};							// server connection established
		this.__readyState[2] = function () {};							// request received
		this.__readyState[3] = function () {};							// processing request

		this.__readyState[4] = this.__finishedRequest.bind(this);			// request finished and response is ready

	};

	/**
	*
	*/
	Ajax.prototype.__defineStatus = function () {

		this.__status[200] = this.__completed.bind(this);

		this.__status[400] = this.__failed.bind(this);
		this.__status[401] = this.__failed.bind(this);
		this.__status[404] = this.__failed.bind(this);
		this.__status[500] = this.__failed.bind(this);

	};

	/**
	* 
	*/
	Ajax.prototype.__completed = function () {

		this.__onCompleted(this.__xhr.responseText);

	};

	/**
	*
	*/
	Ajax.prototype.__failed = function () {

		this.__onFailed(this.__xhr.responseText);

	};

	/**
	* 
	*/
	Ajax.prototype.__finishedRequest = function () {

		this.__status[this.__xhr.status]();

	};

	/**
	* 
	*/
	Ajax.prototype.__onreadystatechange = function () {

		this.__readyState[this.__xhr.readyState]();

	};

	/**
	* 
	*/
	Ajax.prototype.__reset = function () {

		this.__method = "GET";
		this.__url = "";
		this.__sync = true;
		this.__data = {};
		this.__headers = [];
		this.__onCompleted = function () {};
		this.__onFailed = function () {};

	};

	/**
	* 
	*/
	Ajax.prototype.__extend = function (config) {

		for (var name in config) {

			this[name] = config[name];

		}

	};

	/**
	* 
	*/
	Ajax.prototype.__open = function () {

		this.__xhr.open(this.__method, this.__url, this.__sync);

	};

	/**
	* 
	*/
	Ajax.prototype.__setRequestHeader = function () {

		var i,
			max = this.__headers.length;

		for (i = 0; i < max; i += 1) {

			this.__xhr.setRequestHeader(this.__headers[i].key, this.__headers[i].value);

		}

	};

	/**
	* 
	*/
	Ajax.prototype.__send = function () {

		this.__xhr.send(JSON.stringify(this.__data));

	};

	/**
	* 
	*/
	Ajax.prototype.__execute = function () {

		this.__open();
		this.__setRequestHeader();
		this.__send();

	};

	/**
	* 
	*/
	Ajax.prototype.request = function (config) {

		this.__reset();
		this.__extend(config);
		this.__execute();

	};

	/**
	* 
	*/
	function FacadeAjax function () {

		if (!(this instanceof FacadeAjax)) {

			return new FacadeAjax();

		}

		var ajax = new Ajax();

		return {

			request: aja.request

		}

	}

	context.Bizzy.Ajax = Ajax;

})(window);