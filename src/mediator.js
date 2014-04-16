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
* Modulo que isola uma instancia do modulo Dispatcher, para ser
* utilizado no padrao de projeto Mediator
*
* @namespace B
* @module Mediator
*/
 window.B.Mediator = (function () {

	"use strict";

	return new window.B.utils.Dispatcher();

 })();