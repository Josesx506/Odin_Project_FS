/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@fortawesome/fontawesome-free/js/all.js":
/*!**************************************************************!*\
  !*** ./node_modules/@fortawesome/fontawesome-free/js/all.js ***!
  \**************************************************************/
/***/ (() => {


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/index.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/index.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `nav {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 10px;\n    justify-content: center;\n    padding: 10px 10px;\n}\n\n.nav-btn a {\n    text-decoration: none;\n    color: #9ca3af;\n}\n\n.nav-btn {\n    font-size: larger;\n    color: #9ca3af;\n    border-radius: 5px;\n    border: 1.5px solid #6b7280;\n    background-color: transparent;\n    width: 160px;\n}\n\n.nav-btn:hover {\n    cursor: pointer;\n}\n\n.nav-btn:active, .nav-btn a:active {\n    color: #0284c7;\n    font-weight: bold;\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://odin-restaurant/./src/css/index.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://odin-restaurant/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://odin-restaurant/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./node_modules/pubsub-js/src/pubsub.js":
/*!**********************************************!*\
  !*** ./node_modules/pubsub-js/src/pubsub.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n/**\n * Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk\n * License: MIT - http://mrgnrdrck.mit-license.org\n *\n * https://github.com/mroderick/PubSubJS\n */\n\n(function (root, factory){\n    'use strict';\n\n    var PubSub = {};\n\n    if (root.PubSub) {\n        PubSub = root.PubSub;\n        console.warn(\"PubSub already loaded, using existing version\");\n    } else {\n        root.PubSub = PubSub;\n        factory(PubSub);\n    }\n    // CommonJS and Node.js module support\n    if (true){\n        if (module !== undefined && module.exports) {\n            exports = module.exports = PubSub; // Node.js specific `module.exports`\n        }\n        exports.PubSub = PubSub; // CommonJS module 1.1.1 spec\n        module.exports = exports = PubSub; // CommonJS\n    }\n    // AMD support\n    /* eslint-disable no-undef */\n    else {}\n\n}(( typeof window === 'object' && window ) || this, function (PubSub){\n    'use strict';\n\n    var messages = {},\n        lastUid = -1,\n        ALL_SUBSCRIBING_MSG = '*';\n\n    function hasKeys(obj){\n        var key;\n\n        for (key in obj){\n            if ( Object.prototype.hasOwnProperty.call(obj, key) ){\n                return true;\n            }\n        }\n        return false;\n    }\n\n    /**\n     * Returns a function that throws the passed exception, for use as argument for setTimeout\n     * @alias throwException\n     * @function\n     * @param { Object } ex An Error object\n     */\n    function throwException( ex ){\n        return function reThrowException(){\n            throw ex;\n        };\n    }\n\n    function callSubscriberWithDelayedExceptions( subscriber, message, data ){\n        try {\n            subscriber( message, data );\n        } catch( ex ){\n            setTimeout( throwException( ex ), 0);\n        }\n    }\n\n    function callSubscriberWithImmediateExceptions( subscriber, message, data ){\n        subscriber( message, data );\n    }\n\n    function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){\n        var subscribers = messages[matchedMessage],\n            callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,\n            s;\n\n        if ( !Object.prototype.hasOwnProperty.call( messages, matchedMessage ) ) {\n            return;\n        }\n\n        for (s in subscribers){\n            if ( Object.prototype.hasOwnProperty.call(subscribers, s)){\n                callSubscriber( subscribers[s], originalMessage, data );\n            }\n        }\n    }\n\n    function createDeliveryFunction( message, data, immediateExceptions ){\n        return function deliverNamespaced(){\n            var topic = String( message ),\n                position = topic.lastIndexOf( '.' );\n\n            // deliver the message as it is now\n            deliverMessage(message, message, data, immediateExceptions);\n\n            // trim the hierarchy and deliver message to each level\n            while( position !== -1 ){\n                topic = topic.substr( 0, position );\n                position = topic.lastIndexOf('.');\n                deliverMessage( message, topic, data, immediateExceptions );\n            }\n\n            deliverMessage(message, ALL_SUBSCRIBING_MSG, data, immediateExceptions);\n        };\n    }\n\n    function hasDirectSubscribersFor( message ) {\n        var topic = String( message ),\n            found = Boolean(Object.prototype.hasOwnProperty.call( messages, topic ) && hasKeys(messages[topic]));\n\n        return found;\n    }\n\n    function messageHasSubscribers( message ){\n        var topic = String( message ),\n            found = hasDirectSubscribersFor(topic) || hasDirectSubscribersFor(ALL_SUBSCRIBING_MSG),\n            position = topic.lastIndexOf( '.' );\n\n        while ( !found && position !== -1 ){\n            topic = topic.substr( 0, position );\n            position = topic.lastIndexOf( '.' );\n            found = hasDirectSubscribersFor(topic);\n        }\n\n        return found;\n    }\n\n    function publish( message, data, sync, immediateExceptions ){\n        message = (typeof message === 'symbol') ? message.toString() : message;\n\n        var deliver = createDeliveryFunction( message, data, immediateExceptions ),\n            hasSubscribers = messageHasSubscribers( message );\n\n        if ( !hasSubscribers ){\n            return false;\n        }\n\n        if ( sync === true ){\n            deliver();\n        } else {\n            setTimeout( deliver, 0 );\n        }\n        return true;\n    }\n\n    /**\n     * Publishes the message, passing the data to it's subscribers\n     * @function\n     * @alias publish\n     * @param { String } message The message to publish\n     * @param {} data The data to pass to subscribers\n     * @return { Boolean }\n     */\n    PubSub.publish = function( message, data ){\n        return publish( message, data, false, PubSub.immediateExceptions );\n    };\n\n    /**\n     * Publishes the message synchronously, passing the data to it's subscribers\n     * @function\n     * @alias publishSync\n     * @param { String } message The message to publish\n     * @param {} data The data to pass to subscribers\n     * @return { Boolean }\n     */\n    PubSub.publishSync = function( message, data ){\n        return publish( message, data, true, PubSub.immediateExceptions );\n    };\n\n    /**\n     * Subscribes the passed function to the passed message. Every returned token is unique and should be stored if you need to unsubscribe\n     * @function\n     * @alias subscribe\n     * @param { String } message The message to subscribe to\n     * @param { Function } func The function to call when a new message is published\n     * @return { String }\n     */\n    PubSub.subscribe = function( message, func ){\n        if ( typeof func !== 'function'){\n            return false;\n        }\n\n        message = (typeof message === 'symbol') ? message.toString() : message;\n\n        // message is not registered yet\n        if ( !Object.prototype.hasOwnProperty.call( messages, message ) ){\n            messages[message] = {};\n        }\n\n        // forcing token as String, to allow for future expansions without breaking usage\n        // and allow for easy use as key names for the 'messages' object\n        var token = 'uid_' + String(++lastUid);\n        messages[message][token] = func;\n\n        // return token for unsubscribing\n        return token;\n    };\n\n    PubSub.subscribeAll = function( func ){\n        return PubSub.subscribe(ALL_SUBSCRIBING_MSG, func);\n    };\n\n    /**\n     * Subscribes the passed function to the passed message once\n     * @function\n     * @alias subscribeOnce\n     * @param { String } message The message to subscribe to\n     * @param { Function } func The function to call when a new message is published\n     * @return { PubSub }\n     */\n    PubSub.subscribeOnce = function( message, func ){\n        var token = PubSub.subscribe( message, function(){\n            // before func apply, unsubscribe message\n            PubSub.unsubscribe( token );\n            func.apply( this, arguments );\n        });\n        return PubSub;\n    };\n\n    /**\n     * Clears all subscriptions\n     * @function\n     * @public\n     * @alias clearAllSubscriptions\n     */\n    PubSub.clearAllSubscriptions = function clearAllSubscriptions(){\n        messages = {};\n    };\n\n    /**\n     * Clear subscriptions by the topic\n     * @function\n     * @public\n     * @alias clearAllSubscriptions\n     * @return { int }\n     */\n    PubSub.clearSubscriptions = function clearSubscriptions(topic){\n        var m;\n        for (m in messages){\n            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0){\n                delete messages[m];\n            }\n        }\n    };\n\n    /**\n       Count subscriptions by the topic\n     * @function\n     * @public\n     * @alias countSubscriptions\n     * @return { Array }\n    */\n    PubSub.countSubscriptions = function countSubscriptions(topic){\n        var m;\n        // eslint-disable-next-line no-unused-vars\n        var token;\n        var count = 0;\n        for (m in messages) {\n            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {\n                for (token in messages[m]) {\n                    count++;\n                }\n                break;\n            }\n        }\n        return count;\n    };\n\n\n    /**\n       Gets subscriptions by the topic\n     * @function\n     * @public\n     * @alias getSubscriptions\n    */\n    PubSub.getSubscriptions = function getSubscriptions(topic){\n        var m;\n        var list = [];\n        for (m in messages){\n            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0){\n                list.push(m);\n            }\n        }\n        return list;\n    };\n\n    /**\n     * Removes subscriptions\n     *\n     * - When passed a token, removes a specific subscription.\n     *\n\t * - When passed a function, removes all subscriptions for that function\n     *\n\t * - When passed a topic, removes all subscriptions for that topic (hierarchy)\n     * @function\n     * @public\n     * @alias subscribeOnce\n     * @param { String | Function } value A token, function or topic to unsubscribe from\n     * @example // Unsubscribing with a token\n     * var token = PubSub.subscribe('mytopic', myFunc);\n     * PubSub.unsubscribe(token);\n     * @example // Unsubscribing with a function\n     * PubSub.unsubscribe(myFunc);\n     * @example // Unsubscribing from a topic\n     * PubSub.unsubscribe('mytopic');\n     */\n    PubSub.unsubscribe = function(value){\n        var descendantTopicExists = function(topic) {\n                var m;\n                for ( m in messages ){\n                    if ( Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0 ){\n                        // a descendant of the topic exists:\n                        return true;\n                    }\n                }\n\n                return false;\n            },\n            isTopic    = typeof value === 'string' && ( Object.prototype.hasOwnProperty.call(messages, value) || descendantTopicExists(value) ),\n            isToken    = !isTopic && typeof value === 'string',\n            isFunction = typeof value === 'function',\n            result = false,\n            m, message, t;\n\n        if (isTopic){\n            PubSub.clearSubscriptions(value);\n            return;\n        }\n\n        for ( m in messages ){\n            if ( Object.prototype.hasOwnProperty.call( messages, m ) ){\n                message = messages[m];\n\n                if ( isToken && message[value] ){\n                    delete message[value];\n                    result = value;\n                    // tokens are unique, so we can just stop here\n                    break;\n                }\n\n                if (isFunction) {\n                    for ( t in message ){\n                        if (Object.prototype.hasOwnProperty.call(message, t) && message[t] === value){\n                            delete message[t];\n                            result = true;\n                        }\n                    }\n                }\n            }\n        }\n\n        return result;\n    };\n}));\n\n\n//# sourceURL=webpack://odin-restaurant/./node_modules/pubsub-js/src/pubsub.js?");

/***/ }),

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./index.css */ \"./node_modules/css-loader/dist/cjs.js!./src/css/index.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://odin-restaurant/./src/css/index.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://odin-restaurant/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://odin-restaurant/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://odin-restaurant/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://odin-restaurant/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://odin-restaurant/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://odin-restaurant/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/about.js":
/*!**********************!*\
  !*** ./src/about.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet loadAboutCss = false;\n\nconst hoursOperation = (function () {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"hours-operations\");\n    \n    const sunday = document.createElement(\"div\");\n    sunday.textContent = \"Sunday: 8am - 8pm\";\n    const monday = document.createElement(\"div\");\n    monday.textContent = \"Monday: 6am - 6pm\";\n    const tuesday = document.createElement(\"div\");\n    tuesday.textContent = \"Tuesday: 6am - 6pm\";\n    const wednesday = document.createElement(\"div\");\n    wednesday.textContent = \"Wednesday: 6am - 6pm\";\n    const thursday = document.createElement(\"div\");\n    thursday.textContent = \"Thursday: 6am - 10pm\";\n    const friday = document.createElement(\"div\");\n    friday.textContent = \"Friday: 6am - 10pm\";\n    const saturday = document.createElement(\"div\");\n    saturday.textContent = \"Saturday: 8am - 10pm\";\n\n    const daysOfWeek = [sunday,monday,tuesday,wednesday,thursday,friday,saturday];\n    daysOfWeek.forEach((item) => {\n        item.classList.add(\"day-operating-hours\");\n        element.appendChild(item);\n    });\n\n    return element\n}) ()\n\nfunction Contact(title,phone,email) {\n    this.title = title;\n    this.phone = phone;\n    this.email = email;\n}\n\nconst contactTypes = (function () {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"contact-options\");\n\n    const allContacts = [new Contact(\"Manager\",\"+1 (225) 449-4416\",\"odinmanager@email.com\"),\n                         new Contact(\"Catering\",\"+1 (225) 449-4417\",\"odincatering@email.com\"),\n                         new Contact(\"Online Ordering\",\"+1 (225) 449-4418\",\"odinonlineorder@email.com\"),\n                         new Contact(\"Pickup\",\"+1 (225) 449-4419\",\"odinpickup@email.com\")\n    ];\n    \n    allContacts.forEach((item, index) => {\n        const card = document.createElement(\"div\");\n        card.classList.add(\"contact-card\");\n\n        const title = document.createElement(\"div\");\n        title.classList.add(\"card-title\");\n        title.textContent = item.title;\n        const body = document.createElement(\"div\");\n        body.classList.add(\"card-body\");\n        const phone = document.createElement(\"div\");\n        phone.classList.add(\"card-body-phone\");\n        phone.textContent = item.phone;\n        const email = document.createElement(\"div\");\n        email.classList.add(\"card-body-email\");\n        email.textContent = item.email;\n        body.appendChild(phone);\n        body.appendChild(email);\n        card.appendChild(title);\n        card.appendChild(body);\n        \n        element.appendChild(card);\n    });\n    return element\n}) ()\n\nfunction aboutPage(){\n    loadAboutCss = true;\n    if (loadAboutCss) {\n        __webpack_require__.e(/*! import() */ \"src_css_about_css\").then(__webpack_require__.bind(__webpack_require__, /*! ./css/about.css */ \"./src/css/about.css\"));\n    }\n    \n    const element = document.createElement(\"div\");\n    element.classList.add(\"about-page-content\");\n\n    const hours = document.createElement(\"div\");\n    hours.classList.add(\"mid-about-titles\");\n    hours.textContent = \"Hours\";\n\n    const contactTitle = document.createElement(\"div\");\n    contactTitle.classList.add(\"mid-about-titles\");\n    contactTitle.textContent = \"Contact\";\n    \n    element.appendChild(hours)\n    element.appendChild(hoursOperation)\n    element.appendChild(contactTitle)\n    element.appendChild(contactTypes)\n\n    loadAboutCss = false;\n    return element;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (aboutPage);\n\n//# sourceURL=webpack://odin-restaurant/./src/about.js?");

/***/ }),

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ homePage)\n/* harmony export */ });\nlet loadHomeCss = false;\n\nconst intro = (function () {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"top-div\");\n    element.innerHTML = `<span><i class=\"fa-solid fa-location-dot\"></i> 2401 East Brightside Road</span>`;\n    return element\n}) ()\n\nconst aboutMenu = (function () {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"page-card\");\n    const img = document.createElement(\"img\");\n    img.src = \"https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg\"\n    img.classList.add(\"page-card-images\");\n\n    const cardBody = document.createElement(\"div\");\n    cardBody.classList.add(\"page-card-body\");\n\n    const cardTitle = document.createElement(\"div\");\n    const cardSubtitle = document.createElement(\"div\");\n    const cardBodyText = document.createElement(\"div\");\n    const cardButton = document.createElement(\"button\");\n\n    cardTitle.classList.add(\"page-card-title\");\n    cardTitle.textContent = \"About Us\";\n\n    cardSubtitle.classList.add(\"page-card-subtitle\");\n    cardSubtitle.textContent = \"Odin Restaurant Project\";\n\n    cardBodyText.classList.add(\"page-card-bodytext\");\n    cardBodyText.textContent = \"Our neighborhood restaurant is dedicated to offering delicious food at reasonable prices in a warm, welcoming, and family-friendly atmosphere.\";\n\n    cardButton.classList.add(\"page-card-button\");\n    cardButton.classList.add(\"foodPage\");\n    cardButton.textContent = \"Our Menu\";\n\n    cardBody.appendChild(cardTitle);\n    cardBody.appendChild(cardSubtitle);\n    cardBody.appendChild(cardBodyText);\n    cardBody.appendChild(cardButton);\n\n    element.appendChild(img);\n    element.appendChild(cardBody);\n    return element\n}) ();\n\nconst drinksMenu = (function () {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"page-card\");\n    const img = document.createElement(\"img\");\n    img.src = \"https://images.pexels.com/photos/2104568/pexels-photo-2104568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\"\n    img.classList.add(\"page-card-images\");\n\n    const cardBody = document.createElement(\"div\");\n    cardBody.classList.add(\"page-card-body\");\n\n    const cardTitle = document.createElement(\"div\");\n    const cardSubtitle = document.createElement(\"div\");\n    const cardBodyText = document.createElement(\"div\");\n    const cardButton = document.createElement(\"button\");\n\n    cardTitle.classList.add(\"page-card-title\");\n    cardTitle.textContent = \"Drinks\";\n\n    cardSubtitle.classList.add(\"page-card-subtitle\");\n    cardSubtitle.textContent = \"Wine and Dinery\";\n\n    cardBodyText.classList.add(\"page-card-bodytext\");\n    cardBodyText.textContent = \"Our bar will focus on 100% locally-crafted spirits and beers! There are thousands of local libation options and house cocktails we hope to bring you over the years.\";\n\n    cardButton.classList.add(\"page-card-button\");\n    cardButton.classList.add(\"drinksPage\");\n    cardButton.textContent = \"Drinks\";\n\n    cardBody.appendChild(cardTitle);\n    cardBody.appendChild(cardSubtitle);\n    cardBody.appendChild(cardBodyText);\n    cardBody.appendChild(cardButton);\n\n    element.appendChild(cardBody);\n    element.appendChild(img);\n    return element\n}) ();\n\nconst reservationsMenu = (function () {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"page-card-wide\");\n\n    const cardBody = document.createElement(\"div\");\n    cardBody.classList.add(\"page-card-body\");\n    cardBody.classList.add(\"wide\");\n\n    const cardTitle = document.createElement(\"div\");\n    const cardSubtitle = document.createElement(\"div\");\n    const cardBodyText = document.createElement(\"div\");\n    const cardButton = document.createElement(\"button\");\n\n    cardTitle.classList.add(\"page-card-title\");\n    cardTitle.classList.add(\"wide\");\n    cardTitle.textContent = \"Reservations\";\n\n    cardSubtitle.classList.add(\"page-card-subtitle\");\n    cardSubtitle.classList.add(\"wide\");\n    cardSubtitle.textContent = \"Join Us Today\";\n\n    cardBodyText.classList.add(\"page-card-bodytext\");\n    cardBodyText.classList.add(\"wide\");\n    cardBodyText.textContent = \"Click the button below to make a reservation.\";\n    cardButton.style.backgroundColor = \"transparent\";\n    cardButton.style.border = \"1px solid white\"\n\n    cardButton.classList.add(\"page-card-button\");\n    cardButton.textContent = \"Reservations\";\n\n    cardBody.appendChild(cardTitle);\n    cardBody.appendChild(cardSubtitle);\n    cardBody.appendChild(cardBodyText);\n    cardBody.appendChild(cardButton);\n\n    element.appendChild(cardBody);\n    return element\n}) ();\n\nconst caterMenu = (function () {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"page-card\");\n    const img = document.createElement(\"img\");\n    img.src = \"https://images.pexels.com/photos/903376/pexels-photo-903376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\"\n    img.classList.add(\"page-card-images\");\n\n    const cardBody = document.createElement(\"div\");\n    cardBody.classList.add(\"page-card-body\");\n\n    const cardTitle = document.createElement(\"div\");\n    const cardSubtitle = document.createElement(\"div\");\n    const cardBodyText = document.createElement(\"div\");\n    const cardButton = document.createElement(\"button\");\n\n    cardTitle.classList.add(\"page-card-title\");\n    cardTitle.textContent = \"Cater with Us\";\n\n    cardSubtitle.classList.add(\"page-card-subtitle\");\n    cardSubtitle.textContent = \"Inquire Now\";\n\n    cardBodyText.classList.add(\"page-card-bodytext\");\n    cardBodyText.textContent = \"We specialize in on-site catering for weddings and other special events. We also provide pick-up or delivery, as well as set-up services.\";\n\n    cardButton.classList.add(\"page-card-button\");\n    cardButton.classList.add(\"caterPage\");\n    cardButton.textContent = \"Catering\";\n\n    cardBody.appendChild(cardTitle);\n    cardBody.appendChild(cardSubtitle);\n    cardBody.appendChild(cardBodyText);\n    cardBody.appendChild(cardButton);\n\n    element.appendChild(img);\n    element.appendChild(cardBody);\n    return element\n}) ();\n\nfunction homePage(){\n    loadHomeCss = true;\n    if (loadHomeCss) {\n        __webpack_require__.e(/*! import() */ \"src_css_home_css\").then(__webpack_require__.bind(__webpack_require__, /*! ./css/home.css */ \"./src/css/home.css\"));\n    }\n    \n    const element = document.createElement(\"div\");\n    element.classList.add(\"home-page-content\");\n\n    element.appendChild(intro)\n    element.appendChild(aboutMenu)\n    element.appendChild(drinksMenu)\n    element.appendChild(reservationsMenu)\n    element.appendChild(caterMenu)\n\n    loadHomeCss = false;\n    return element;\n};\n\n//# sourceURL=webpack://odin-restaurant/./src/home.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fortawesome_fontawesome_free_js_all__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/fontawesome-free/js/all */ \"./node_modules/@fortawesome/fontawesome-free/js/all.js\");\n/* harmony import */ var _fortawesome_fontawesome_free_js_all__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_js_all__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/index.css */ \"./src/css/index.css\");\n/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home */ \"./src/home.js\");\n/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu */ \"./src/menu.js\");\n/* harmony import */ var _about__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./about */ \"./src/about.js\");\n\n\n\n\n\n\nconsole.log(\"Restaurant launch!!!!!\");\n\n// Cache nav buttons and body\nconst navOdHome = document.querySelector(\".odin-home\")\nconst navHome = document.querySelector(\".home\")\nconst navMenu = document.querySelector(\".menu\")\nconst navAbout = document.querySelector(\".about\")\nconst body = document.getElementById(\"content\")\n\nfunction loadcomponent(pages) {\n    body.innerHTML = \"\"\n    body.appendChild(pages);\n};\n\n// Load the home page for the first time\nconst onload = new _home__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\nloadcomponent(onload);\n\nnavHome.addEventListener(\"click\", (e) => {\n    const home = new _home__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    loadcomponent(home);\n    const foodMenuBtn = document.querySelector(\".foodPage\");\n    const drinksMenuBtn = document.querySelector(\".drinksPage\");\n    foodMenuBtn.addEventListener(\"click\", (ev) => {\n        const menu = new _menu__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n        loadcomponent(menu)\n    });\n    // Load the drinks menu\n    drinksMenuBtn.addEventListener(\"click\", (ev) => {\n        const menu = new _menu__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n        loadcomponent(menu);\n        const drinksHeader = document.querySelector(\".mid-titles.drinks\");\n        drinksHeader.scrollIntoView({ behavior: \"smooth\" });\n    });\n})\n\nnavMenu.addEventListener(\"click\", (e) => {\n    const menu = new _menu__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n    loadcomponent(menu);\n})\n\nnavAbout.addEventListener(\"click\", (e) => {\n    const about = new _about__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n    loadcomponent(about);\n})\n\n//# sourceURL=webpack://odin-restaurant/./src/index.js?");

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ menuPage)\n/* harmony export */ });\n/* harmony import */ var _data_meals_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/meals.json */ \"./src/data/meals.json\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nlet loadMenuCss = false;\n\nconst cart = (function () {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"sticky-cart-total\");\n\n    const checkOut = document.createElement(\"button\");\n    checkOut.classList.add(\"check-out\");\n    checkOut.textContent = \"Checkout\";\n\n    const orders = document.createElement(\"div\");\n    orders.classList.add(\"cart-div\");\n    orders.innerHTML = `<span><i class=\"fa-solid fa-cart-shopping\"></i> Total: $</span>`;\n    const total = document.createElement(\"span\");\n    total.classList.add(\"cart-total\");\n    total.textContent = \"0\";\n    orders.appendChild(total);\n\n    element.appendChild(orders);\n    element.appendChild(checkOut);\n    return element\n}) ()\n\nclass Item {\n    constructor (title,ingredients,link,price,volume) {\n        this.title = title;\n        this.ingredients = ingredients;\n        this.link = link;\n        this.price = price;\n        this.volume = volume;\n    }\n    \n    incrementVolume() {\n        this.volume++;\n    };\n\n    decrementVolume() {\n        if (this.volume > 0) {\n            this.volume--;\n        } else {\n            this.volume = 0;\n        }\n    };\n\n    calculateItemTotal() {\n        let total = this.price * this.volume;\n        return total;\n    };\n};\n\nconst mealCntr = (function () {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"menu-items\");\n\n    // Using a json file for temp storage\n    const myMeals = _data_meals_json__WEBPACK_IMPORTED_MODULE_0__.map(meal => new Item(meal.title, meal.desc, meal.link, meal.price, meal.volume));\n\n    myMeals.forEach((item,idx)=> {\n        const itemCntr = document.createElement(\"div\");\n        itemCntr.classList.add(\"item-card\", \"meal\", idx);\n\n        const itemTitle = document.createElement(\"div\");\n        itemTitle.classList.add(\"card-item-title\");\n        itemTitle.textContent = item.title;\n\n        const itemImg = document.createElement(\"img\");\n        itemImg.classList.add(\"card-item-image\");\n        itemImg.src = item.link;\n\n        const itemIngredients = document.createElement(\"div\");\n        itemIngredients.classList.add(\"card-item-ingredients\");\n        itemIngredients.textContent = item.ingredients;\n\n        const itemStatus = document.createElement(\"div\");\n        itemStatus.classList.add(\"card-item-row4\");\n        const itemPrice = document.createElement(\"div\");\n        itemPrice.textContent = `$${item.price}`;\n        const itemVolume = document.createElement(\"div\");\n        itemVolume.textContent = item.volume;\n        itemStatus.appendChild(itemPrice);\n        itemStatus.appendChild(itemVolume);\n\n        const itemChange = document.createElement(\"div\");\n        itemChange.classList.add(\"card-item-row5\");\n        const itemDecr = document.createElement(\"button\");\n        itemDecr.textContent = \"-\";\n        const itemIncr = document.createElement(\"button\");\n        itemIncr.textContent = \"+\";\n        itemChange.appendChild(itemDecr);\n        itemChange.appendChild(itemIncr);\n\n        itemCntr.appendChild(itemTitle);\n        itemCntr.appendChild(itemImg);\n        itemCntr.appendChild(itemIngredients);\n        itemCntr.appendChild(itemStatus);\n        itemCntr.appendChild(itemChange);\n\n        // Add event listeners to the buttons\n        itemIncr.addEventListener(\"click\", () => {\n            item.incrementVolume();\n            itemVolume.textContent = item.volume;\n            pubsub_js__WEBPACK_IMPORTED_MODULE_1___default().publish(\"MEAL_ITEM_UPDATED\", myMeals);\n        });\n\n        itemDecr.addEventListener(\"click\", (e) => {\n            item.decrementVolume();\n            itemVolume.textContent = item.volume;\n            pubsub_js__WEBPACK_IMPORTED_MODULE_1___default().publish(\"MEAL_ITEM_UPDATED\", myMeals);\n        });\n\n        element.appendChild(itemCntr);\n    });\n\n    return {\n        element: element,\n        getMeals: () => myMeals\n    };\n}) ();\n\nconst drinkCntr = (function () {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"menu-items\");\n\n    const myDrinks = [new Item(\"Champagne\",\"Bottle\",\"https://static.vecteezy.com/system/resources/thumbnails/033/874/472/small_2x/ai-generative-champagne-popping-and-pouring-with-blurred-bokeh-background-photo.jpg\",120,0),\n                      new Item(\"Spirits and Vodka\",\"Bottle\",\"https://media.istockphoto.com/id/545346590/photo/bottle-of-absolut-vodka.jpg?s=612x612&w=0&k=20&c=EYvQpzyQUpaMrvV57eTYuE3afWED2_ZwKbMS1I0_o8E=\",40,0),\n                      new Item(\"Red Wine\",\"Bottle\",\"https://images.pexels.com/photos/374073/pexels-photo-374073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",45,0),\n                      new Item(\"White Wine\",\"Glass\",\"https://images.pexels.com/photos/2115740/pexels-photo-2115740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",12,0),\n                      new Item(\"Tap Beer\",\"Glass\",\"https://images.pexels.com/photos/691492/proost-beer-bar-cafe-691492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",8,0),\n                      new Item(\"Magarita\",\"Glass\",\"https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",14,0),];\n    \n    myDrinks.forEach((item,idx)=> {\n        const itemCntr = document.createElement(\"div\");\n        itemCntr.classList.add(\"item-card\", \"drink\", idx);\n\n        const itemTitle = document.createElement(\"div\");\n        itemTitle.classList.add(\"card-item-title\");\n        itemTitle.textContent = item.title;\n\n        const itemImg = document.createElement(\"img\");\n        itemImg.classList.add(\"card-item-image\");\n        itemImg.src = item.link;\n\n        const itemIngredients = document.createElement(\"div\");\n        itemIngredients.classList.add(\"card-item-ingredients\");\n        itemIngredients.textContent = item.ingredients;\n\n        const itemStatus = document.createElement(\"div\");\n        itemStatus.classList.add(\"card-item-row4\");\n        const itemPrice = document.createElement(\"div\");\n        itemPrice.textContent = `$${item.price}`;\n        const itemVolume = document.createElement(\"div\");\n        itemVolume.textContent = item.volume;\n        itemStatus.appendChild(itemPrice);\n        itemStatus.appendChild(itemVolume);\n\n        const itemChange = document.createElement(\"div\");\n        itemChange.classList.add(\"card-item-row5\");\n        const itemDecr = document.createElement(\"button\");\n        itemDecr.textContent = \"-\";\n        const itemIncr = document.createElement(\"button\");\n        itemIncr.textContent = \"+\";\n        itemChange.appendChild(itemDecr);\n        itemChange.appendChild(itemIncr);\n\n        itemCntr.appendChild(itemTitle);\n        itemCntr.appendChild(itemImg);\n        itemCntr.appendChild(itemIngredients);\n        itemCntr.appendChild(itemStatus);\n        itemCntr.appendChild(itemChange);\n\n        // Add event listeners to the buttons\n        itemIncr.addEventListener(\"click\", () => {\n            item.incrementVolume();\n            itemVolume.textContent = item.volume;\n            pubsub_js__WEBPACK_IMPORTED_MODULE_1___default().publish(\"MEAL_ITEM_UPDATED\", myDrinks);\n        });\n\n        itemDecr.addEventListener(\"click\", (e) => {\n            item.decrementVolume();\n            itemVolume.textContent = item.volume;\n            pubsub_js__WEBPACK_IMPORTED_MODULE_1___default().publish(\"MEAL_ITEM_UPDATED\", myDrinks);\n        });\n\n        element.appendChild(itemCntr);\n    });\n\n    return {\n        element: element,\n        getDrinks: () => myDrinks\n    };\n}) ();\n\nfunction calculateCartTotal(meals) {\n    return meals.reduce((total, item) => total + item.price * item.volume, 0);\n}\n\nfunction updateCartTotal() {\n    const myMeals = mealCntr.getMeals();\n    const totalMeal = calculateCartTotal(myMeals);\n    const myDrinks = drinkCntr.getDrinks();\n    const totalDrink = calculateCartTotal(myDrinks);\n    let total = totalMeal + totalDrink;\n    document.querySelector(\".cart-total\").textContent = total;\n}\n\nfunction menuPage(){\n    loadMenuCss = true;\n    if (loadMenuCss) {\n        __webpack_require__.e(/*! import() */ \"src_css_menu_css\").then(__webpack_require__.bind(__webpack_require__, /*! ./css/menu.css */ \"./src/css/menu.css\"));\n    }\n    \n    const element = document.createElement(\"div\");\n    element.classList.add(\"menu-page-content\");\n\n    const mealTitle = document.createElement(\"div\");\n    mealTitle.classList.add(\"mid-titles\", \"meals\");\n    mealTitle.textContent = \"Meals\";\n\n    const drinkTitle = document.createElement(\"div\");\n    drinkTitle.classList.add(\"mid-titles\", \"drinks\");\n    drinkTitle.textContent = \"Drinks\";\n\n    pubsub_js__WEBPACK_IMPORTED_MODULE_1___default().subscribe(\"MEAL_ITEM_UPDATED\", updateCartTotal);\n\n    element.appendChild(cart)\n    element.appendChild(mealTitle)\n    element.appendChild(mealCntr.element)\n    element.appendChild(drinkTitle)\n    element.appendChild(drinkCntr.element)\n    \n    return element;\n};\n\n//# sourceURL=webpack://odin-restaurant/./src/menu.js?");

/***/ }),

/***/ "./src/data/meals.json":
/*!*****************************!*\
  !*** ./src/data/meals.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('[{\"title\":\"Smash Burger\",\"desc\":\"Beef, Onions, Patties\",\"link\":\"https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",\"price\":10,\"volume\":0},{\"title\":\"Pancakes\",\"desc\":\"Flour, Milk\",\"link\":\"https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800\",\"price\":15,\"volume\":0},{\"title\":\"Shrimp Pasta\",\"desc\":\"Shrimp, Pasta\",\"link\":\"https://images.pexels.com/photos/8969080/pexels-photo-8969080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",\"price\":18,\"volume\":0},{\"title\":\"Alfredo Pasta\",\"desc\":\"Pasta, Cream, Parseley\",\"link\":\"https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800\",\"price\":20,\"volume\":0},{\"title\":\"Steak\",\"desc\":\"Steak, Carrots\",\"link\":\"https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",\"price\":30,\"volume\":0}]');\n\n//# sourceURL=webpack://odin-restaurant/./src/data/meals.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "odin-restaurant:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkodin_restaurant"] = self["webpackChunkodin_restaurant"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;