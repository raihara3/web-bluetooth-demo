/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.ts":
/*!*************************!*\
  !*** ./src/js/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/*\n  RSSI = TxPower - 20 * lg(d)\n  d = 10 ^ ((TxPower - RSSI) / 20)\n*/\nclass WebBluetooth {\n    constructor() {\n        this.deviceName = '';\n        this.bluetooth = window.navigator.bluetooth;\n        this.dom = document.getElementById('web-bluetooth');\n    }\n    isSupported() {\n        if (!this.dom) {\n            alert('There is no web-bluetooth dom.');\n            return false;\n        }\n        if (!this.bluetooth) {\n            this.dom.innerText = 'not supported.';\n            return false;\n        }\n        const button = document.createElement('button');\n        button.innerText = 'Pairing';\n        button.addEventListener('click', () => this.pairing());\n        this.dom.appendChild(button);\n        return true;\n    }\n    async pairing() {\n        const device = await this.bluetooth.requestDevice({\n            acceptAllDevices: true\n        });\n        if (!device)\n            return;\n        if (device.name)\n            this.deviceName = device.name;\n        const button = document.createElement('button');\n        button.innerText = 'Get Distance';\n        button.addEventListener('click', () => this.getDistance());\n        if (this.dom)\n            this.dom.appendChild(button);\n        console.debug(`name: ${device.name} , id: ${device.id}`);\n    }\n    async getDistance() {\n        await this.bluetooth.requestLEScan({\n            acceptAllAdvertisements: true\n        });\n        const div = document.createElement('div');\n        if (this.dom)\n            this.dom.appendChild(div);\n        this.bluetooth.addEventListener('advertisementreceived', event => {\n            if (this.deviceName !== event.device.name)\n                return;\n            const distance = Math.pow(10.0, (event.txPower - (event.rssi)) / 17.0);\n            div.innerText = `${event.device.name}までの距離は${Math.round(distance / 100)}cm`;\n        });\n    }\n}\nconst webBluetooth = new WebBluetooth();\nconst isSupported = webBluetooth.isSupported();\n\n\n//# sourceURL=webpack:///./src/js/index.ts?");

/***/ })

/******/ });