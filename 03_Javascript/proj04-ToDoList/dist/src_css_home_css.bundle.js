"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkodin_todo"] = self["webpackChunkodin_todo"] || []).push([["src_css_home_css"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/home.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/home.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.content-cntr {\n    display: grid;\n    gap: 20px;\n    padding: 10px;\n    width: min(100%,1200px);\n    margin: 0 auto;\n}\n\n.projects-sidebar-cntr {\n    display: grid;\n    overflow: auto;\n    /* resize: both; */\n    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));\n    grid-auto-rows: 40px;\n    justify-items: center;\n    align-items: center;\n    gap: 7px 20px;\n    padding: 15px;\n}\n\n.todo-lists {\n    display: grid;\n}\n\n.priority-containers {\n    display: grid;\n    overflow: auto;\n    /* resize: both; */\n    grid-template-columns: repeat(auto-fill, minmax(305px, 1fr));\n    grid-auto-rows:  250px;\n    gap: 20px 10px;\n    margin: 0;\n    padding: 10px;\n    justify-items: center;\n}\n\n.priority-cntr-box {\n    border: 1px solid lightgray;\n    border-radius: 5px;\n    width: 100%;\n    justify-items: center;\n    text-align: center;\n    overflow: scroll;\n}\n\n.clickable-btn {\n    width: 140px;\n    cursor: pointer;\n}\n\n.add-todo {\n    justify-self: end;\n    margin-right: 10px;\n    font-size: medium;\n}\n\n.add-todo:focus {\n    transform: scale(1.05);\n    font-weight: bold;\n    color: #34d399;\n}\n\n.add-project, .project-item-cntr {\n    display: grid;\n    grid-auto-flow: column;\n    align-items: center;\n    font-size: medium;\n    gap: 5px;\n    border: 0.5px solid black;\n    background-color: lightgrey;\n    border-radius: 5px;\n    padding: 3px 8px;\n}\n\n.project-item-cntr span {\n    max-width: 65ch;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.project-item-cntr:hover {\n    cursor: pointer;\n}\n\n.project-item-cntr.selected {\n    font-weight: bolder;\n    background-color: #34d399;\n    color: white;\n    transform: scale(1.1);\n}\n\n.icon-btns, \n.add-project svg,\n.add-todo span path,\n.modal-close-btn,\n.todo-item-right-cntr button {\n    cursor: pointer;\n    border: none;\n    outline: none;\n    background: none;\n    font-size: 1.05rem;\n}\n\n.delete-project-btn,\n.todo-item-right-cntr {\n    justify-self: end;\n}\n\n.delete-project-btn:hover,\n.modal-close-btn:hover,\n.delete-todo-item:hover {\n    color: #C70000;\n}\n\n.edit-todo-item:hover {\n    color: #f59e0b;\n}\n\n.new-project-entry {\n    width: 95%;\n    background: transparent;\n    border: 0;\n    color: inherit;\n    font-size: inherit;\n    border-bottom: 1px solid currentColor;\n    outline: none;\n}\n\n.cntr-body {\n    display: grid;\n    border: 1px solid blue;\n    min-height: 20px;\n    margin: 5px;\n    border-radius: 5px;\n    gap: 5px;\n    padding: 5px;\n    width: 90%;\n}\n\n.cntr-title {\n    font-weight: bolder;\n    text-transform: uppercase;\n}\n\n.todo-item {\n    display: grid;\n    grid-auto-flow: column;\n    justify-items: start;\n    border: 0.5px solid #0ea5e9;\n    align-items: center;\n}\n\n.todo-item.due-todo {\n    border-left: 4px solid #C70000;\n}\n\n.todo-item-left-cntr,\n.todo-item-right-cntr {\n    align-items: center;\n}\n\n.todo-item-left-cntr.checked {\n    text-decoration: line-through;\n    font-style: italic;\n}\n\n.check-todo-item.checked {\n    color: #34d399;\n}\n\n.modal {\n    position: fixed;\n    top: 50%; left: 50%;\n    transform: translate(-50%, -50%) scale(0); \n    transition: 200ms ease-in-out;\n    border: 1px solid black; \n    border-radius: 10px; \n    z-index: 10;\n    background-color: white;\n    width: 500px;\n    max-width: 90%;\n    display: grid;\n}\n\n.modal.active {\n    transform: translate(-50%, -50%) scale(1);\n}\n\n.modal-header {\n    display: flex;\n    justify-content: space-between;\n    padding: 2px 5px;\n    border-bottom: 2px solid black;\n    margin-bottom: 10px;\n}\n\n.modal-title, .modal-close-btn {\n    font-weight: bolder;\n    font-size: 1.5rem;\n    color: gray;\n}\n\n#new-todo-list-entry-cntr {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(1fr,45%));\n    padding: 5px;\n    gap: 10px;\n}\n\n.todo-list-entry-input {\n    display: grid;\n    align-content: start;\n}\n\n#todo-list-form-submit {\n    grid-column: 1 / 3;\n    justify-self: center;\n    background-color: #34d399;\n    color: white;\n    font-weight: bold;\n    font-size: 1.05rem;\n    border-radius: 5px;\n}\n\n.expanded-todo-item {\n    display: grid;\n    grid-template-rows: 1fr 3fr 1fr;\n    gap: 10px;\n    padding: 10px;\n    height: 200px;\n    padding-top: 0;\n}\n\n.expanded-todo-lower-cntr {\n    display: grid;\n    grid-auto-flow: column;\n}\n\n.expanded-todo-field-cntr {\n    border-bottom: 1px solid gray;\n}\n\n.expanded-todo-label {\n    font-weight: bold;\n    font-style: oblique;\n}\n\n.expanded-todo-description {\n    padding-bottom: 5px;\n}\n\n.expanded-todo-field-cntr.description,\n.expanded-todo-field-cntr.notes {\n    display: flex;\n    flex-direction: column;\n    gap: 5px;\n}\n\n.expanded-todo-field-cntr.priority,\n.expanded-todo-field-cntr.date {\n    display: flex;\n    justify-content: flex-start;\n    gap: 10px;\n}\n\n#overlay {\n    position: fixed;\n    opacity: 0;\n    transition: 200ms ease-in-out;\n    top: 0; \n    left: 0; \n    right: 0; \n    bottom: 0;\n    background-color: rgba(0, 0, 0, .5);\n    pointer-events: none;\n    border: 1px solid black;\n}\n\n#overlay.active {\n    opacity: 1;\n    /* Prevent all mouse pointers from working */\n    pointer-events: all;\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://odin-todo/./src/css/home.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./src/css/home.css":
/*!**************************!*\
  !*** ./src/css/home.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./home.css */ \"./node_modules/css-loader/dist/cjs.js!./src/css/home.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://odin-todo/./src/css/home.css?");

/***/ })

}]);