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

/***/ "./node_modules/pubsub-js/src/pubsub.js":
/*!**********************************************!*\
  !*** ./node_modules/pubsub-js/src/pubsub.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n/**\n * Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk\n * License: MIT - http://mrgnrdrck.mit-license.org\n *\n * https://github.com/mroderick/PubSubJS\n */\n\n(function (root, factory){\n    'use strict';\n\n    var PubSub = {};\n\n    if (root.PubSub) {\n        PubSub = root.PubSub;\n        console.warn(\"PubSub already loaded, using existing version\");\n    } else {\n        root.PubSub = PubSub;\n        factory(PubSub);\n    }\n    // CommonJS and Node.js module support\n    if (true){\n        if (module !== undefined && module.exports) {\n            exports = module.exports = PubSub; // Node.js specific `module.exports`\n        }\n        exports.PubSub = PubSub; // CommonJS module 1.1.1 spec\n        module.exports = exports = PubSub; // CommonJS\n    }\n    // AMD support\n    /* eslint-disable no-undef */\n    else {}\n\n}(( typeof window === 'object' && window ) || this || __webpack_require__.g, function (PubSub){\n    'use strict';\n\n    var messages = {},\n        lastUid = -1,\n        ALL_SUBSCRIBING_MSG = '*';\n\n    function hasKeys(obj){\n        var key;\n\n        for (key in obj){\n            if ( Object.prototype.hasOwnProperty.call(obj, key) ){\n                return true;\n            }\n        }\n        return false;\n    }\n\n    /**\n     * Returns a function that throws the passed exception, for use as argument for setTimeout\n     * @alias throwException\n     * @function\n     * @param { Object } ex An Error object\n     */\n    function throwException( ex ){\n        return function reThrowException(){\n            throw ex;\n        };\n    }\n\n    function callSubscriberWithDelayedExceptions( subscriber, message, data ){\n        try {\n            subscriber( message, data );\n        } catch( ex ){\n            setTimeout( throwException( ex ), 0);\n        }\n    }\n\n    function callSubscriberWithImmediateExceptions( subscriber, message, data ){\n        subscriber( message, data );\n    }\n\n    function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){\n        var subscribers = messages[matchedMessage],\n            callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,\n            s;\n\n        if ( !Object.prototype.hasOwnProperty.call( messages, matchedMessage ) ) {\n            return;\n        }\n\n        for (s in subscribers){\n            if ( Object.prototype.hasOwnProperty.call(subscribers, s)){\n                callSubscriber( subscribers[s], originalMessage, data );\n            }\n        }\n    }\n\n    function createDeliveryFunction( message, data, immediateExceptions ){\n        return function deliverNamespaced(){\n            var topic = String( message ),\n                position = topic.lastIndexOf( '.' );\n\n            // deliver the message as it is now\n            deliverMessage(message, message, data, immediateExceptions);\n\n            // trim the hierarchy and deliver message to each level\n            while( position !== -1 ){\n                topic = topic.substr( 0, position );\n                position = topic.lastIndexOf('.');\n                deliverMessage( message, topic, data, immediateExceptions );\n            }\n\n            deliverMessage(message, ALL_SUBSCRIBING_MSG, data, immediateExceptions);\n        };\n    }\n\n    function hasDirectSubscribersFor( message ) {\n        var topic = String( message ),\n            found = Boolean(Object.prototype.hasOwnProperty.call( messages, topic ) && hasKeys(messages[topic]));\n\n        return found;\n    }\n\n    function messageHasSubscribers( message ){\n        var topic = String( message ),\n            found = hasDirectSubscribersFor(topic) || hasDirectSubscribersFor(ALL_SUBSCRIBING_MSG),\n            position = topic.lastIndexOf( '.' );\n\n        while ( !found && position !== -1 ){\n            topic = topic.substr( 0, position );\n            position = topic.lastIndexOf( '.' );\n            found = hasDirectSubscribersFor(topic);\n        }\n\n        return found;\n    }\n\n    function publish( message, data, sync, immediateExceptions ){\n        message = (typeof message === 'symbol') ? message.toString() : message;\n\n        var deliver = createDeliveryFunction( message, data, immediateExceptions ),\n            hasSubscribers = messageHasSubscribers( message );\n\n        if ( !hasSubscribers ){\n            return false;\n        }\n\n        if ( sync === true ){\n            deliver();\n        } else {\n            setTimeout( deliver, 0 );\n        }\n        return true;\n    }\n\n    /**\n     * Publishes the message, passing the data to it's subscribers\n     * @function\n     * @alias publish\n     * @param { String } message The message to publish\n     * @param {} data The data to pass to subscribers\n     * @return { Boolean }\n     */\n    PubSub.publish = function( message, data ){\n        return publish( message, data, false, PubSub.immediateExceptions );\n    };\n\n    /**\n     * Publishes the message synchronously, passing the data to it's subscribers\n     * @function\n     * @alias publishSync\n     * @param { String } message The message to publish\n     * @param {} data The data to pass to subscribers\n     * @return { Boolean }\n     */\n    PubSub.publishSync = function( message, data ){\n        return publish( message, data, true, PubSub.immediateExceptions );\n    };\n\n    /**\n     * Subscribes the passed function to the passed message. Every returned token is unique and should be stored if you need to unsubscribe\n     * @function\n     * @alias subscribe\n     * @param { String } message The message to subscribe to\n     * @param { Function } func The function to call when a new message is published\n     * @return { String }\n     */\n    PubSub.subscribe = function( message, func ){\n        if ( typeof func !== 'function'){\n            return false;\n        }\n\n        message = (typeof message === 'symbol') ? message.toString() : message;\n\n        // message is not registered yet\n        if ( !Object.prototype.hasOwnProperty.call( messages, message ) ){\n            messages[message] = {};\n        }\n\n        // forcing token as String, to allow for future expansions without breaking usage\n        // and allow for easy use as key names for the 'messages' object\n        var token = 'uid_' + String(++lastUid);\n        messages[message][token] = func;\n\n        // return token for unsubscribing\n        return token;\n    };\n\n    PubSub.subscribeAll = function( func ){\n        return PubSub.subscribe(ALL_SUBSCRIBING_MSG, func);\n    };\n\n    /**\n     * Subscribes the passed function to the passed message once\n     * @function\n     * @alias subscribeOnce\n     * @param { String } message The message to subscribe to\n     * @param { Function } func The function to call when a new message is published\n     * @return { PubSub }\n     */\n    PubSub.subscribeOnce = function( message, func ){\n        var token = PubSub.subscribe( message, function(){\n            // before func apply, unsubscribe message\n            PubSub.unsubscribe( token );\n            func.apply( this, arguments );\n        });\n        return PubSub;\n    };\n\n    /**\n     * Clears all subscriptions\n     * @function\n     * @public\n     * @alias clearAllSubscriptions\n     */\n    PubSub.clearAllSubscriptions = function clearAllSubscriptions(){\n        messages = {};\n    };\n\n    /**\n     * Clear subscriptions by the topic\n     * @function\n     * @public\n     * @alias clearAllSubscriptions\n     * @return { int }\n     */\n    PubSub.clearSubscriptions = function clearSubscriptions(topic){\n        var m;\n        for (m in messages){\n            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0){\n                delete messages[m];\n            }\n        }\n    };\n\n    /**\n       Count subscriptions by the topic\n     * @function\n     * @public\n     * @alias countSubscriptions\n     * @return { Array }\n    */\n    PubSub.countSubscriptions = function countSubscriptions(topic){\n        var m;\n        // eslint-disable-next-line no-unused-vars\n        var token;\n        var count = 0;\n        for (m in messages) {\n            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {\n                for (token in messages[m]) {\n                    count++;\n                }\n                break;\n            }\n        }\n        return count;\n    };\n\n\n    /**\n       Gets subscriptions by the topic\n     * @function\n     * @public\n     * @alias getSubscriptions\n    */\n    PubSub.getSubscriptions = function getSubscriptions(topic){\n        var m;\n        var list = [];\n        for (m in messages){\n            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0){\n                list.push(m);\n            }\n        }\n        return list;\n    };\n\n    /**\n     * Removes subscriptions\n     *\n     * - When passed a token, removes a specific subscription.\n     *\n\t * - When passed a function, removes all subscriptions for that function\n     *\n\t * - When passed a topic, removes all subscriptions for that topic (hierarchy)\n     * @function\n     * @public\n     * @alias subscribeOnce\n     * @param { String | Function } value A token, function or topic to unsubscribe from\n     * @example // Unsubscribing with a token\n     * var token = PubSub.subscribe('mytopic', myFunc);\n     * PubSub.unsubscribe(token);\n     * @example // Unsubscribing with a function\n     * PubSub.unsubscribe(myFunc);\n     * @example // Unsubscribing from a topic\n     * PubSub.unsubscribe('mytopic');\n     */\n    PubSub.unsubscribe = function(value){\n        var descendantTopicExists = function(topic) {\n                var m;\n                for ( m in messages ){\n                    if ( Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0 ){\n                        // a descendant of the topic exists:\n                        return true;\n                    }\n                }\n\n                return false;\n            },\n            isTopic    = typeof value === 'string' && ( Object.prototype.hasOwnProperty.call(messages, value) || descendantTopicExists(value) ),\n            isToken    = !isTopic && typeof value === 'string',\n            isFunction = typeof value === 'function',\n            result = false,\n            m, message, t;\n\n        if (isTopic){\n            PubSub.clearSubscriptions(value);\n            return;\n        }\n\n        for ( m in messages ){\n            if ( Object.prototype.hasOwnProperty.call( messages, m ) ){\n                message = messages[m];\n\n                if ( isToken && message[value] ){\n                    delete message[value];\n                    result = value;\n                    // tokens are unique, so we can just stop here\n                    break;\n                }\n\n                if (isFunction) {\n                    for ( t in message ){\n                        if (Object.prototype.hasOwnProperty.call(message, t) && message[t] === value){\n                            delete message[t];\n                            result = true;\n                        }\n                    }\n                }\n            }\n        }\n\n        return result;\n    };\n}));\n\n\n//# sourceURL=webpack://battleships/./node_modules/pubsub-js/src/pubsub.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/home */ \"./src/views/home.js\");\n/* harmony import */ var _views_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/controller */ \"./src/views/controller.js\");\n/* harmony import */ var _views_logic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/logic */ \"./src/views/logic.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconst hardReset = document.querySelector(\".home-reset\");\nconst body = document.getElementById(\"content\");\n\nfunction clearElement(element) {\n    if (!element) return;\n    while (element.firstChild) {\n        element.removeChild(element.firstChild);\n    };\n};\n\nfunction renderApplication(pages) {\n    if (!pages || !body) return;\n    clearElement(body);\n    body.appendChild(pages);\n};\n\n// Load the home page for the first time\nrenderApplication(new _views_home__WEBPACK_IMPORTED_MODULE_0__[\"default\"]());\n\nconst initGame = document.querySelector(\".new-game-btn\");\ninitGame.addEventListener(\"click\", (e) => {\n    e.preventDefault();\n    // Setup the game by placing your ships. AI locations are random\n    let setupObj = new _views_controller__WEBPACK_IMPORTED_MODULE_1__.SetupController();\n    renderApplication(setupObj.body);\n\n    // Begin game after ship placement\n    pubsub_js__WEBPACK_IMPORTED_MODULE_3___default().subscribe(\"GAME_STARTED\", () => {\n        (0,_views_logic__WEBPACK_IMPORTED_MODULE_2__.gameLogic)(setupObj.p1,setupObj.pAI)});\n});\n\npubsub_js__WEBPACK_IMPORTED_MODULE_3___default().subscribe(\"GAME_PROGRESS\", (msg, resetBtn) => {\n    console.log(msg);\n    console.log(resetBtn);\n    resetBtn.addEventListener(\"click\", (e) => {\n        e.preventDefault();\n        renderApplication(new _views_home__WEBPACK_IMPORTED_MODULE_0__[\"default\"]());\n    });\n});\n\npubsub_js__WEBPACK_IMPORTED_MODULE_3___default().subscribe(\"GAME_ENDED\", (msg, resetBtn) => {\n    resetBtn.addEventListener(\"click\", (e) => {\n        e.preventDefault();\n        renderApplication(new _views_home__WEBPACK_IMPORTED_MODULE_0__[\"default\"]());\n    });\n});\n\nhardReset.addEventListener(\"click\", (e) => {\n    e.preventDefault();\n    renderApplication(new _views_home__WEBPACK_IMPORTED_MODULE_0__[\"default\"]());\n});\n\n//# sourceURL=webpack://battleships/./src/index.js?");

/***/ }),

/***/ "./src/models/aiPlayer.js":
/*!********************************!*\
  !*** ./src/models/aiPlayer.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AIController: () => (/* binding */ AIController)\n/* harmony export */ });\nclass AIController{\n    constructor(board) {\n        this.board = board;\n        this.lastHit = null;\n        this.successfulHits = [];\n        this.nextMovesQueue = [];\n        this.attackedPositions = new Set();\n        this.shipOrientation = null;      // \"horizontal\" or \"vertical\" or null\n        this.huntingDirection = null;     // \"forward\" or \"backward\" or null\n    }\n\n    positionToString(row, col) {\n        return `${row},${col}`;\n    }\n\n    isPositionAttacked(x, y) {\n        return (typeof this.board.board[x][y] === \"number\");\n    }\n\n    determineShipOrientation() {\n        if (this.successfulHits.length < 2) return null;\n\n        const [x1, y1] = this.successfulHits[this.successfulHits.length - 2];\n        const [x2, y2] = this.successfulHits[this.successfulHits.length - 1];\n\n        if (x1 === x2) return \"horizontal\";\n        if (y1 === y2) return \"vertical\";\n        return null;\n    }\n\n    getDirectionalMoves(x, y) {\n        if (!this.shipOrientation) return [];\n\n        if (this.shipOrientation === \"horizontal\") {\n            return [\n                [x, y + 1], // right\n                [x, y - 1]  // left\n            ].filter(pos => \n                this.board.isValidCoord(pos[0], pos[1]) && !this.isPositionAttacked(pos[0], pos[1])\n            );\n        } else {            // vertical\n            return [\n                [x - 1, y], // up\n                [x + 1, y]  // down\n            ].filter(pos => \n                this.board.isValidCoord(pos[0], pos[1]) && !this.isPositionAttacked(pos[0], pos[1])\n            );\n        }\n    }\n\n    // Get adjacent positions (up, right, down, left)\n    getAdjacentPositions(x, y) {\n        return [\n            [x - 1, y], // up\n            [x, y + 1], // right\n            [x + 1, y], // down\n            [x, y - 1]  // left\n        ].filter(pos => \n            this.board.isValidCoord(pos[0],pos[1]) && !this.isPositionAttacked(pos[0],pos[1])\n        );\n    }\n\n    // processAttackResult(x, y, result) {\n    //     this.attackedPositions.add(this.positionToString(x, y));\n\n    //     if (result === \"Hit\" || result === \"Sunk\") {\n    //         this.successfulHits.push([x, y]);\n            \n    //         if (result === \"Hit\") {\n    //             this.lastHit = [x, y];\n    //             // Add adjacent positions to the queue\n    //             const adjacentPositions = this.getAdjacentPositions(x,y);\n    //             this.nextMovesQueue.push(...adjacentPositions);\n    //         } else {\n    //             // Ship was sunk, reset hunting mode\n    //             this.lastHit = null;\n    //             this.nextMovesQueue = [];\n    //         }\n    //     }\n    // }\n\n\n    processAttackResult(x, y, result) {\n        this.attackedPositions.add(this.positionToString(x, y));\n\n        if (result === \"Hit\" || result === \"Sunk\") {\n            this.successfulHits.push([x, y]);\n            \n            if (result === \"Hit\") {\n                this.lastHit = [x, y];\n                \n                // Determine ship orientation after second hit\n                if (this.successfulHits.length >= 2) {\n                    this.shipOrientation = this.determineShipOrientation();\n                    \n                    if (this.shipOrientation) {\n                        // Clear the queue and add directional moves\n                        this.nextMovesQueue = [];\n                        this.nextMovesQueue.push(...this.getDirectionalMoves(x, y));\n                    }\n                } else {\n                    // First hit - add all adjacent positions\n                    this.nextMovesQueue.push(...this.getAdjacentPositions(x, y));\n                }\n            } else { // \"Sunk\"\n                // Reset all tracking when ship is sunk\n                this.lastHit = null;\n                this.nextMovesQueue = [];\n                this.successfulHits = [];\n                this.shipOrientation = null;\n                this.huntingDirection = null;\n            }\n        } else if (result === \"Miss\" && this.shipOrientation) {\n            // If we miss while knowing orientation, try the opposite direction\n            const lastHit = this.successfulHits[this.successfulHits.length - 1];\n            this.nextMovesQueue = this.getDirectionalMoves(...lastHit);\n        }\n    }\n\n    getRandomPosition() {\n        let available = [];\n        for (let x = 0; x < this.board.size; x++) {\n            for (let y = 0; y < this.board.size; y++) {\n                if (!this.isPositionAttacked(x, y)) {\n                    available.push([x, y]);\n                }\n            }\n        }\n        return available[Math.floor(Math.random() * available.length)];\n    }\n\n    // Make the next move\n    makeMove() {\n        let pos;\n        let result;\n        let tempCell;\n        let shipName;\n\n        // If we have queued moves from previous hits, try those first\n        while (this.nextMovesQueue.length > 0) {\n            pos = this.nextMovesQueue.shift();\n            tempCell = this.board.board[pos[0]][pos[1]];\n            if (!this.isPositionAttacked(pos[0],pos[1])) {\n                if (tempCell !== null && typeof tempCell === \"object\") {\n                    shipName = this.board.board[pos[0]][pos[1]].name;\n                }\n                result = this.board.receiveAttack(pos[0],pos[1]);\n                this.processAttackResult(pos[0],pos[1],result);\n                return [...pos, result, shipName];\n            }\n        }\n\n        // If no queued moves or all queued moves were invalid, get a random position\n        pos = this.getRandomPosition();\n        tempCell = this.board.board[pos[0]][pos[1]];\n        if (tempCell !== null && typeof tempCell === \"object\") {\n            shipName = this.board.board[pos[0]][pos[1]].name;\n        }\n        result = this.board.receiveAttack(pos[0],pos[1]);\n        this.processAttackResult(pos[0],pos[1],result);\n        \n\n        return [...pos, result, shipName];\n    }\n}\n\n\n\n//# sourceURL=webpack://battleships/./src/models/aiPlayer.js?");

/***/ }),

/***/ "./src/models/board.js":
/*!*****************************!*\
  !*** ./src/models/board.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ \"./src/models/ships.js\");\n\n\n// const Ship = require(\"./ships\").Ship;\n\nclass Gameboard{\n    constructor(size=10){\n        this.size = size;\n        this.board = this.initializeBoard(size);\n        this.ships = []; // Store all ships placed on the board\n    }\n\n    initializeBoard = (size) => {\n        let board = [];\n        for (let i = 0; i < size; i++) {\n          board[i] = [];\n          for (let j = 0; j < size; j++) {\n            board[i].push(null);\n          }\n        };\n        return board;\n    }\n\n    isValidCoord(x, y) {\n        return x >= 0 && x < this.size && y >= 0 && y < this.size;\n    }\n\n    // Check if a ship can be inserted\n    canPlaceShip(startX, startY, length, direction) {\n\n        // Check each cell based on direction\n        for (let i = 0; i < length; i++) {\n            let x = startX;\n            let y = startY;\n\n            if (direction === \"hor\") {\n                y += i;                          // Increment x for horizontal placement\n            } else if (direction === \"ver\") {\n                x += i;                          // Increment y for vertical placement\n            }\n\n            // Ensure coordinates are valid and unoccupied\n            if (!this.isValidCoord(x, y) || this.board[x][y] !== null) {\n                return false;\n            }\n        }\n\n        return true;\n    }\n\n    // Place a ship\n    placeShip(startX, startY, shipLen, direction, shipName) {\n        let newShip = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(shipLen,shipName);\n\n        if (!this.canPlaceShip(startX, startY, newShip.length, direction)) {\n            throw new Error(\"Invalid ship placement.\");\n        }\n\n        // Place the ship on the board\n        for (let i = 0; i < newShip.length; i++) {\n            let x = startX;\n            let y = startY;\n\n            if (direction === \"hor\") {\n                y += i;\n            } else if (direction === \"ver\") {\n                x += i;\n            }\n            \n            this.board[x][y] = newShip; // Store a reference to the ship\n        };\n        this.ships.push(newShip);\n    };\n\n    removeShip(startX, startY, shipLen, direction) {\n\n        let targetShip;\n        \n        // Place the ship on the board\n        for (let i = 0; i < shipLen; i++) {\n            let x = startX;\n            let y = startY;\n\n            if (direction === \"hor\") {\n                y += i;\n            } else if (direction === \"ver\") {\n                x += i;\n            }\n\n            if (typeof this.board[x][y] !== \"object\") {\n                throw new Error(\"Invalid ship location\");\n            } else {\n                targetShip = this.board[x][y]; // Store a reference to the ship\n            };\n            \n            this.board[x][y] = null;\n        };\n        let shipIndex = this.ships.indexOf(targetShip);\n        this.ships.splice(shipIndex,1);\n    };\n\n    receiveAttack(x, y) {\n        if (!this.isValidCoord(x, y)) {\n            throw new Error(\"Invalid attack coordinates.\");\n        }\n\n        let cell = this.board[x][y];\n\n        if (cell === null) { // Missed attack\n            this.board[x][y] = 0; // Mark the cell as a miss\n            return \"Miss\";\n        } else if (typeof cell === \"object\") { // Hit a ship\n            cell.hit();               // Call the ship's hit method\n            this.board[x][y] = -1;    // Mark the cell as a hit\n            return cell.isSunk() ? \"Sunk\" : \"Hit\";\n        } else {\n            return \"Already attacked\";\n        }\n    }\n\n    allShipsSunk() {\n        return this.ships.every((ship) => ship.isSunk() === true);\n    }\n\n    printBoard() {\n        let res = \"\";\n        for (let r = 0; r < this.size; r++) {\n          let srow = \"\";\n          for (let c = 0; c < this.size; c++) {\n            srow += \" \" + this.board[r][c];\n          }\n          res += `[${srow} ]` + \"\\n\";\n        }\n        return res;\n    }\n}\n\n\n\n\n// let brd = new Gameboard(10);\n// console.log(brd.printBoard());\n// brd.placeShip(0,0,3,\"ver\");\n// brd.placeShip(0,4,5,\"hor\");\n\n// brd.receiveAttack(1,0);\n// brd.receiveAttack(2,0);\n// brd.receiveAttack(3,0);\n\n// console.log(brd.allShipsSunk());\n\n// brd.receiveAttack(0,0);\n// brd.receiveAttack(0,4);\n// console.log(brd.printBoard());\n// console.log(brd.allShipsSunk());\n\n// console.log(brd.ships);\n\n//# sourceURL=webpack://battleships/./src/models/board.js?");

/***/ }),

/***/ "./src/models/player.js":
/*!******************************!*\
  !*** ./src/models/player.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/models/board.js\");\n\n\nclass Player{\n    constructor(id){\n        this.id = id;\n        this.board = new _board__WEBPACK_IMPORTED_MODULE_0__.Gameboard();\n        this.active = false;\n    }\n};\n\n\n\n//# sourceURL=webpack://battleships/./src/models/player.js?");

/***/ }),

/***/ "./src/models/ships.js":
/*!*****************************!*\
  !*** ./src/models/ships.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n    constructor(length,name){\n        this.length = length;\n        this.hits = 0;\n        this.sunk = false;\n        this.name = name\n    };\n\n    hit(){\n        if (this.hits < this.length){\n            this.hits += 1;\n        }\n    };\n\n    isSunk() {\n        if (this.hits === this.length) {\n            this.sunk = true;\n            return true;\n        } else {return false};\n    }\n};\n\n\n// module.exports = { Ship };\n\n//# sourceURL=webpack://battleships/./src/models/ships.js?");

/***/ }),

/***/ "./src/views/aiShips.js":
/*!******************************!*\
  !*** ./src/views/aiShips.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   randomShipPositioning: () => (/* binding */ randomShipPositioning)\n/* harmony export */ });\nfunction randomShipPositioning(player, boardGui, maxGridSize=10) {\n    let shipLengths = [5,4,3,3,2];\n    let shipNames = [\"carrier\",\"battleship\",\"cruiser\",\"submarine\",\"destroyer\"];\n    shipLengths.forEach((shipLen,idx) => {\n        let placement = addShip(player,shipLen,shipNames[idx],maxGridSize);\n        while (placement !== \"placed\") {\n            placement = addShip(player,shipLen,shipNames[idx],maxGridSize);\n        }\n    });\n    // console.log(player.board.printBoard());\n}\n\nfunction addShip(player, shipLen, shipName, maxGridSize=10) {\n    let randX = Math.floor(Math.random() * maxGridSize);\n    let randY = Math.floor(Math.random() * maxGridSize);\n    let randDir = Math.random() < 0.5;\n    let randOrientation = randDir ? \"ver\" : \"hor\";\n\n    if (player.board.canPlaceShip(randX,randY,shipLen,randOrientation)) {\n        player.board.placeShip(randX,randY,shipLen,randOrientation,shipName);\n        // console.log(`${randX},${randY},${shipLen},${randOrientation}`);\n        return \"placed\";\n    } else {\n        return \"invalid\";\n    }\n}\n\n\n\n\n//# sourceURL=webpack://battleships/./src/views/aiShips.js?");

/***/ }),

/***/ "./src/views/controller.js":
/*!*********************************!*\
  !*** ./src/views/controller.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SetupController: () => (/* binding */ SetupController)\n/* harmony export */ });\n/* harmony import */ var _models_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/player */ \"./src/models/player.js\");\n/* harmony import */ var _aiShips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aiShips */ \"./src/views/aiShips.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nlet loadGameCss = false;\n\nfunction createPlayerBoard (id) {\n    const element = document.createElement(\"div\");\n\n    const newPlayer = new _models_player__WEBPACK_IMPORTED_MODULE_0__.Player();\n    newPlayer.id = id;\n    const playBoard = newPlayer.board;\n\n    const boardView = document.createElement(\"div\");\n    boardView.classList.add(\"btshp-grid-cntr\",id);\n\n    let legend = document.createElement(\"legend\");\n    legend.textContent = `${id.toUpperCase()}-Board`;\n\n    playBoard.board.forEach((rowCell,rowIdx) => {\n        rowCell.forEach((colCell,colIdx) => {\n            let cellBtn = document.createElement(\"div\");\n            cellBtn.classList.add(\"grid-cell\");\n            if (id !== \"ai\") {\n                cellBtn.classList.add(\"droppable\");\n            }\n            cellBtn.dataset.row = rowIdx;\n            cellBtn.dataset.column = colIdx;\n            boardView.appendChild(cellBtn);\n        })\n    });\n\n    element.appendChild(legend);\n    element.appendChild(boardView);\n\n    return [element, newPlayer];\n}\n\nfunction createShips(shipName,shipSize) {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"ship\",`${shipName}-cntr`,\"draggable-source\");\n    element.dataset.size = shipSize;\n    element.draggable = true;\n\n    for (let i=0; i<shipSize; i++){\n        const inset = document.createElement(\"div\");\n        inset.classList.add(`${shipName}-${i}`);\n        element.appendChild(inset)\n    };\n\n    return element;\n}\n\nfunction createShipContainer () {\n    const shipCntr = document.createElement(\"div\");\n    shipCntr.classList.add(\"ships-placeholder\");\n\n    let carrier = createShips(\"carrier\",5);\n    let battleship = createShips(\"battleship\",4);\n    let cruiser = createShips(\"cruiser\",3);\n    let submarine = createShips(\"submarine\",3);\n    let destroyer = createShips(\"destroyer\",2);\n\n    shipCntr.appendChild(carrier);\n    shipCntr.appendChild(battleship);\n    shipCntr.appendChild(cruiser);\n    shipCntr.appendChild(submarine);\n    shipCntr.appendChild(destroyer);\n\n    return shipCntr;\n}\n\nfunction createMessageBoard () {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"msg-board\");\n    element.innerHTML = \"Drag and drop player ships to board. Click on first cell <br>\"\n    element.innerHTML += \"to rotate ship. Invalid drops/rotations are disallowed.\"\n\n    return element;\n}\n\n\nfunction dragPlayerShips(player) {\n    let draggedShip;\n    let shipPlaceholder = document.querySelector(\".ships-placeholder\");\n\n    function rotateShip(e) {\n        e.preventDefault();\n        let activeShip = e.target.parentElement;\n        let curGrid = activeShip.parentElement;\n    \n        if (activeShip.classList.contains(\"ship\") && activeShip.classList.contains(\"draggable-source\")) {\n            if (curGrid.classList.contains(\"grid-cell\")) {\n                let [gridX,gridY] = [parseInt(curGrid.dataset.row),parseInt(curGrid.dataset.column)];\n                let shipSize = parseInt(activeShip.dataset.size);\n                let currOrientation = activeShip.classList.contains(\"vertical\") ? \"ver\" : \"hor\";\n                let newOrientation = currOrientation===\"ver\" ? \"hor\" : \"ver\";\n                \n                if ((newOrientation===\"hor\" && player.board.canPlaceShip(gridX,gridY+1,shipSize,newOrientation)) || \n                    (newOrientation===\"ver\" && player.board.canPlaceShip(gridX+1,gridY,shipSize,newOrientation))\n                ) {\n                    e.target.parentElement.classList.toggle(\"vertical\");\n    \n                    player.board.removeShip(gridX,gridY,shipSize,currOrientation);\n                    let shipName = activeShip.classList[1].replace(\"-cntr\",\"\");\n                    player.board.placeShip(gridX,gridY,shipSize,newOrientation,shipName);\n                    // console.log(player.board.printBoard());\n                    activeShip.style.margin = 0;\n                }\n                \n            } else {\n                e.target.parentElement.classList.toggle(\"vertical\");\n            }\n    }};\n\n    function dragStart(e) {\n        draggedShip = e.target;\n        let curGrid = draggedShip.parentElement;\n        if (curGrid.classList.contains(\"grid-cell\")) {\n            let [gridX,gridY] = [parseInt(curGrid.dataset.row),parseInt(curGrid.dataset.column)];\n            let shipSize = parseInt(draggedShip.dataset.size);\n            let shipOrientation = draggedShip.classList.contains(\"vertical\") ? \"ver\" : \"hor\";\n            player.board.removeShip(gridX,gridY,shipSize,shipOrientation);\n        }\n    }\n\n    function dragOver(e) {\n        e.preventDefault();\n    }\n    \n    function dropShip(e) {\n        e.preventDefault();\n        let curGrid = e.target;\n        let [gridX,gridY] = [parseInt(curGrid.dataset.row),parseInt(curGrid.dataset.column)];\n        let shipSize = parseInt(draggedShip.dataset.size);\n        let shipOrientation = draggedShip.classList.contains(\"vertical\") ? \"ver\" : \"hor\";\n\n        if (player.board.canPlaceShip(gridX,gridY,shipSize,shipOrientation)) {\n            let shipName = draggedShip.classList[1].replace(\"-cntr\",\"\");\n            player.board.placeShip(gridX,gridY,shipSize,shipOrientation,shipName);\n            // console.log(player.board.printBoard());\n\n            if (draggedShip.parentElement) {\n                draggedShip.parentElement.removeChild(draggedShip);\n            }\n    \n            // Append ship to the target cell\n            curGrid.appendChild(draggedShip);\n            \n            draggedShip.style.margin = 0;\n        }\n        triggerStart(shipPlaceholder,allShips);\n    }\n\n    const allShips = document.querySelectorAll(\".ship.draggable-source\");\n\n    allShips.forEach((activeShip) => {\n        activeShip.addEventListener(\"dragstart\", dragStart)\n        activeShip.addEventListener(\"click\", rotateShip);\n    });\n\n    const playerGrids = document.querySelectorAll(\".grid-cell.droppable\");\n    playerGrids.forEach((playerBlock) => {\n        playerBlock.addEventListener(\"dragover\", dragOver);\n        playerBlock.addEventListener(\"drop\", dropShip);\n    });\n}\n\nfunction createStartBtn () {\n    let element = document.createElement(\"div\");\n    element.classList.add(\"start-game-btn\");\n\n    let start = document.createElement(\"button\");\n    start.textContent = \"Start Game\";\n    start.disabled=true;\n    element.appendChild(start);\n\n    return element;\n}\n\nfunction triggerStart(shipPlaceholder, shipElement) {\n    let startDOM = document.querySelector(\".start-game-btn button\");\n    let msgDOM = document.querySelector(\".msg-board\");\n    \n    if (shipPlaceholder.children.length===0) {\n        startDOM.disabled=false;\n        msgDOM.innerHTML = \"All ships have been placed. <br>Click Start to begin.\"\n    \n        startDOM.addEventListener(\"click\", (e) => {\n            e.preventDefault();\n\n            // Disable editing the ships\n            shipElement.forEach((elm) => {\n                elm.classList.remove(\"draggable-source\");\n                elm.draggable = false;\n            });\n\n            // Format the game reset button\n            startDOM.textContent = \"Reset Game\";\n            startDOM.classList.add(\"reset-game\");\n            startDOM.style.color = \"white\";\n            startDOM.style.backgroundColor = \"red\";\n            msgDOM.innerHTML = \"Player1's turn.\";\n            pubsub_js__WEBPACK_IMPORTED_MODULE_2___default().publish(\"GAME_STARTED\",\"hello world!\");\n        });\n\n    }\n}\n\n\nfunction SetupController() {    \n    loadGameCss = true;\n    if (loadGameCss) {\n        __webpack_require__.e(/*! import() */ \"src_css_game_css\").then(__webpack_require__.bind(__webpack_require__, /*! ../css/game.css */ \"./src/css/game.css\"));\n    }\n\n    const element = document.createElement(\"div\");\n    element.classList.add(\"game-cntr\");\n\n    const gameCntr = document.createElement(\"div\");\n    gameCntr.classList.add(\"boards-cntr\");\n\n    let [p1Board, p1] = createPlayerBoard(\"p1\");\n    let [pAIBoard, pAI] = createPlayerBoard(\"ai\");\n\n    gameCntr.appendChild(p1Board);\n    gameCntr.appendChild(pAIBoard);\n\n    // Create the container for ships\n    const shipCntr = createShipContainer();\n\n    // Create the message container\n    const msgCntr = createMessageBoard();\n\n    // Create the start button\n    const startBtn = createStartBtn();\n\n    element.appendChild(gameCntr);\n    element.appendChild(shipCntr);\n    element.appendChild(msgCntr);\n    element.appendChild(startBtn);\n\n    // Randomly position the AI ships\n    (0,_aiShips__WEBPACK_IMPORTED_MODULE_1__.randomShipPositioning)(pAI,pAIBoard);\n\n    // Initialize drag and drop after DOM is loaded\n    setTimeout(() => {\n        dragPlayerShips(p1);\n    }, 0);\n    \n\n    loadGameCss = false;\n    return {body: element,\n        p1: p1,\n        pAI: pAI\n    };\n}\n\n\n\n//# sourceURL=webpack://battleships/./src/views/controller.js?");

/***/ }),

/***/ "./src/views/home.js":
/*!***************************!*\
  !*** ./src/views/home.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ homePage)\n/* harmony export */ });\n/* harmony import */ var _css_noun_battleship_4933124_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/noun-battleship-4933124.svg */ \"./src/css/noun-battleship-4933124.svg\");\n\nlet loadHomeCss = false;\n\nfunction homePage(){\n    loadHomeCss = true;\n    if (loadHomeCss) {\n        __webpack_require__.e(/*! import() */ \"src_css_home_css\").then(__webpack_require__.bind(__webpack_require__, /*! ../css/home.css */ \"./src/css/home.css\"));\n    }\n    \n    const element = document.createElement(\"div\");\n    element.classList.add(\"home-page-content\");\n\n    let title = document.createElement(\"div\");\n    title.classList.add(\"home-title\");\n    title.textContent = \"BATTLESHIP\";\n\n    let newGame = document.createElement(\"button\");\n    newGame.classList.add(\"new-game-btn\");\n    newGame.textContent = \"New Game\";\n\n    let btsIcon = document.createElement(\"img\");\n    btsIcon.src = _css_noun_battleship_4933124_svg__WEBPACK_IMPORTED_MODULE_0__\n    btsIcon.classList.add(\"home-battleship-icon\");\n\n    element.appendChild(title);\n    element.appendChild(newGame);\n    element.appendChild(btsIcon);\n\n    loadHomeCss = false;\n    return element;\n};\n\n//# sourceURL=webpack://battleships/./src/views/home.js?");

/***/ }),

/***/ "./src/views/logic.js":
/*!****************************!*\
  !*** ./src/views/logic.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gameLogic: () => (/* binding */ gameLogic)\n/* harmony export */ });\n/* harmony import */ var _models_aiPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/aiPlayer */ \"./src/models/aiPlayer.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction gameLogic(p1, pAI) {\n    let shipPlaceholder = document.querySelector(\".ships-placeholder\");\n    let p1Board = document.querySelector(\".btshp-grid-cntr.p1\");\n    let pAIBoard = document.querySelector(\".btshp-grid-cntr.ai\");\n    let resetGame = document.querySelector(\".start-game-btn button\");\n    let msgInfo = document.querySelector(\".msg-board\");\n\n    pAI.active = true;\n    let aiMoves = new _models_aiPlayer__WEBPACK_IMPORTED_MODULE_0__.AIController(p1.board);\n    let gameOver = false;\n\n    function removeAllBoardListeners() {\n        p1Board.childNodes.forEach(grid => {\n            grid.removeEventListener(\"click\", handleP1Click);\n            grid.removeEventListener(\"click\", handlePAIClick);\n        });\n        pAIBoard.childNodes.forEach(grid => {\n            grid.removeEventListener(\"click\", handleP1Click);\n            grid.removeEventListener(\"click\", handlePAIClick);\n        });\n    }\n\n    function handleP1Click(e) {\n        if (p1.active && !gameOver) {\n            handleClick(e, pAI, msgInfo, p1, switchTurns);\n        }\n    }\n\n    function handlePAIClick(e) {\n        if (pAI.active && !gameOver) {\n            handleClick(e, p1, msgInfo, pAI, switchTurns);\n        }\n    }\n\n    function updateMessageBoard(message) {\n        if (!gameOver) {\n            msgInfo.textContent = message;\n        }\n    }\n\n    function endGame(winner) {\n        gameOver = true;\n        msgInfo.innerHTML = `Game Over! ${winner.toUpperCase()} wins!`;\n        msgInfo.innerHTML += `<br>Click top right to reset game.`\n        document.querySelectorAll(\".grid-cell\").forEach(cell => {\n            cell.classList.add(\"disabled\");\n        });\n        p1Board.classList.add(\"inactive-board\");\n        pAIBoard.classList.add(\"inactive-board\");\n        pubsub_js__WEBPACK_IMPORTED_MODULE_1___default().publish(\"GAME_ENDED\", ()=> {resetGame});\n    }\n\n    function handleAITurn() {\n        if (gameOver) return;\n\n        const [x, y, result, shipName] = aiMoves.makeMove();\n        let targetCell = p1Board.querySelector(`[data-row=\"${x}\"][data-column=\"${y}\"]`);\n        let cellToUpdate = targetCell;\n\n        if (targetCell.childNodes.length > 0) {\n            targetCell.classList.add(\"disabled\");\n            cellToUpdate = targetCell.firstChild.firstChild;\n        }\n        \n        switch (result) {\n            case \"Miss\":\n                cellToUpdate.classList.add(\"miss-shot\");\n                updateMessageBoard(`AI's shot missed`);\n                break;\n            case \"Hit\":\n                cellToUpdate.classList.add(\"hit-shot\");\n                updateMessageBoard(`AI hit P1's ${shipName}`);\n                break;\n            case \"Sunk\":\n                cellToUpdate.classList.add(\"hit-shot\");\n                updateMessageBoard(`AI sunk P1's ${shipName}`);\n                break;\n        }\n        cellToUpdate.classList.add(\"disabled\");\n\n        if (p1.board.allShipsSunk()) {\n            endGame(\"AI\");\n            return;\n        }\n\n        setTimeout(() => {\n            if (!gameOver) switchTurns();\n        }, 1000);\n    }\n\n    function switchTurns() {\n        if (gameOver) return;\n\n        removeAllBoardListeners();\n        \n        p1.active = !p1.active;\n        pAI.active = !pAI.active;\n\n        if (p1.active) {\n            updateMessageBoard(\"P1's turn\");\n            pAIBoard.childNodes.forEach(grid => {\n                if (!grid.classList.contains(\"disabled\")) {\n                    grid.addEventListener(\"click\", handleP1Click);\n                }\n            });\n            p1Board.classList.add(\"inactive-board\");\n            pAIBoard.classList.remove(\"inactive-board\");\n        } else {\n            updateMessageBoard(\"AI's turn\");\n            pAIBoard.classList.add(\"inactive-board\");\n            p1Board.classList.remove(\"inactive-board\");\n            handleAITurn();\n        }\n    }\n\n\n    if (shipPlaceholder.children.length === 0 && resetGame.classList.contains(\"reset-game\")) { \n        switchTurns();\n        pubsub_js__WEBPACK_IMPORTED_MODULE_1___default().publish(\"GAME_PROGRESS\", resetGame);\n    }\n}\n\nfunction handleClick(e, player, msg, opp, switchTurns) {\n    e.preventDefault();\n\n    if (!player.board.allShipsSunk()) {\n        let curGrid;\n        if (e.target.classList.contains(\"grid-cell\")) {\n            curGrid = e.target;\n        } else {\n            curGrid = e.target.parentElement.parentElement;\n        }\n        \n        let [gx, gy] = [parseInt(curGrid.dataset.row), parseInt(curGrid.dataset.column)];\n        let gCell = player.board.board[gx][gy];\n        let action = player.board.receiveAttack(gx, gy);\n        \n        switch (action) {\n            case \"Miss\":\n                e.target.classList.add(\"miss-shot\");\n                msg.textContent = `${opp.id.toUpperCase()}'s shot missed`;\n                break;\n            case \"Hit\":\n                e.target.classList.add(\"hit-shot\");\n                msg.textContent = `${opp.id.toUpperCase()} hit ${player.id.toUpperCase()}'s ${gCell.name}`;\n                break;\n            case \"Sunk\":\n                e.target.classList.add(\"hit-shot\");\n                msg.textContent = `${opp.id.toUpperCase()} sunk ${player.id.toUpperCase()}'s ${gCell.name}`;\n                break;\n        }\n        e.target.classList.add(\"disabled\");\n        \n        if (player.board.allShipsSunk()) {\n            msg.textContent = `Game Over! ${opp.id.toUpperCase()} wins!`;\n            document.querySelectorAll(\".grid-cell\").forEach(cell => {\n                cell.classList.add(\"disabled\");\n            });\n            return;\n        }\n        \n        // switchTurns();\n\n        setTimeout(() => {\n            switchTurns();\n        }, 1000);\n    }\n}\n\n\n\n//# sourceURL=webpack://battleships/./src/views/logic.js?");

/***/ }),

/***/ "./src/css/noun-battleship-4933124.svg":
/*!*********************************************!*\
  !*** ./src/css/noun-battleship-4933124.svg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"cc5de9cee72c1ba422fd.svg\";\n\n//# sourceURL=webpack://battleships/./src/css/noun-battleship-4933124.svg?");

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
/******/ 		var dataWebpackPrefix = "battleships:";
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
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkbattleships"] = self["webpackChunkbattleships"] || [];
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