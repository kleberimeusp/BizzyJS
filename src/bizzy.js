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
* Modulo que isola o namespace raiz
* 
* @namespace B
*/
window.B = (function () {

	"use strict";

	/**
	* Classe que raiz que cria todos nos namespace raiz que sera
	* utilizado para o encapsulamento das classes de Template, View e Model
	* 
	* @namespace B
	* @class Bizzy
	* @private
	*/
	function Bizzy () {}

	/**
	* Propriedade utilizado para representar os namespaces que
	* agrupa as classes pertencentes a utils
	* 
	* @property utils
	* @public
	* @type Object
	* @defatult Objeto literal vazio
	*/
	Object.defineProperty(Bizzy.prototype, "utils", { value:  {} });

	/**
	* Propriedade utilizado para representar os namespaces que
	* agrupa as classes pertencentes a templates
	* 
	* @property templates
	* @public
	* @type Object
	* @default Objeto literal vazio
	*/
	Object.defineProperty(Bizzy.prototype, "templates", { value: {} });

	/**
	* Propriedade utilizado para represetar os namespaces que
	* agrupa as classes pertencentes a templates
	* 
	* @property views
	* @public
	* @type Object
	* @default Objeto literal vazio
	*/
	Object.defineProperty(Bizzy.prototype, "views", {  value: {} });

	/**
	* Propriedade utilizado para representar os namespaces que
	* agrupa as classes pertencentes a models
	* 
	* @property models
	* @public
	* @type Object
	* @default Objeto literal vazio
	*/
	Object.defineProperty(Bizzy.prototype, "models", { value: {} });

	return new Bizzy();

})();