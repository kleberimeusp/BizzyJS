;(function (window, undefined) {

	"use strict";

	/**
	* 
	*/
	function Event () {}

	/**
	* 
	*/
	Event.prototype.on = function (el, type, fn) {

		if (window.addEventListener) {
            
            this.on = function (el, type, fn) { el.addEventListener(type, fn, false); }();
            
        } else if (window.attachEvent) {
            
            this.on = function (el, type, fn) { el.attachEvent("on" + type, fn); }();
            
        } else {
            
            this.on = function (el, type, fn) { el["on" + type] =  fn; }();
            
        }

	};

	/**
	* 
	*/
	Event.prototype.off = function (el, type, fn) {
        
        if (window.removeEventListener) {
            
            this.off = function (el, type, fn) { el.removeEventListener(type, fn, false); }();
            
        } else if (window.detachEvent) {
            
            this.off = function (el, type, fn) { el.detachEvent("on" + type, fn); }();
            
        } else {
            
            this.off = function (el, type, fn) { el["on" + type] =  null; }();
            
        }
        
    };

    /**
    * 
    */
     Event.prototype.trigger = function (eventName) {
        
        var e = document.createEvent("Event");
            e.initEvent(eventName, true, true);
        
        window.dispatchEvent(e);
        
    };

    Bizzy.util.event = new Event();

})(window);