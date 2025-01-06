/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/ships */ \"./src/models/ships.js\");\n/* harmony import */ var _models_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/board */ \"./src/models/board.js\");\n/* harmony import */ var _models_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/player */ \"./src/models/player.js\");\n/* harmony import */ var _views_home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/home */ \"./src/views/home.js\");\n/* harmony import */ var _views_controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/controller */ \"./src/views/controller.js\");\n\n\n\n\n\n\nconst hardReset = document.querySelector(\".home-reset\");\nconst body = document.getElementById(\"content\");\n\n\nfunction loadcomponent(pages) {\n    body.innerHTML = \"\"\n    body.appendChild(pages);\n};\n\n// Load the home page for the first time\nconst loadHome = new _views_home__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nloadcomponent(loadHome);\n\nhardReset.addEventListener(\"click\", (e) => {\n    e.preventDefault();\n    loadcomponent(loadHome);\n});\n\nconst initGame = document.querySelector(\".new-game-btn\");\ninitGame.addEventListener(\"click\", (e) => {\n    e.preventDefault();\n    loadcomponent(new _views_controller__WEBPACK_IMPORTED_MODULE_4__.GameController());\n});\n\n\n// const resetGame = document.querySelector(\".reset-game\");\n// resetGame.addEventListener(\"click\", (e) => {\n//     e.preventDefault();\n//     loadcomponent(loadHome);\n// });\n\n//# sourceURL=webpack://battleships/./src/index.js?");

/***/ }),

/***/ "./src/models/board.js":
/*!*****************************!*\
  !*** ./src/models/board.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ \"./src/models/ships.js\");\n\n\n// const Ship = require(\"./ships\").Ship;\n\nclass Gameboard{\n    constructor(size=10){\n        this.size = size;\n        this.board = this.initializeBoard(size);\n        this.ships = []; // Store all ships placed on the board\n    }\n\n    initializeBoard = (size) => {\n        let board = [];\n        for (let i = 0; i < size; i++) {\n          board[i] = [];\n          for (let j = 0; j < size; j++) {\n            board[i].push(null);\n          }\n        };\n        return board;\n    }\n\n    isValidCoord(x, y) {\n        return x >= 0 && x < this.size && y >= 0 && y < this.size;\n    }\n\n    // Check if a ship can be inserted\n    canPlaceShip(startX, startY, length, direction) {\n\n        // Check each cell based on direction\n        for (let i = 0; i < length; i++) {\n            let x = startX;\n            let y = startY;\n\n            if (direction === \"hor\") {\n                y += i;                          // Increment x for horizontal placement\n            } else if (direction === \"ver\") {\n                x += i;                          // Increment y for vertical placement\n            }\n\n            // Ensure coordinates are valid and unoccupied\n            if (!this.isValidCoord(x, y) || this.board[x][y] !== null) {\n                return false;\n            }\n        }\n\n        return true;\n    }\n\n    // Place a ship\n    placeShip(startX, startY, shipLen, direction) {\n        let newShip = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(shipLen);\n\n        if (!this.canPlaceShip(startX, startY, newShip.length, direction)) {\n            throw new Error(\"Invalid ship placement.\");\n        }\n\n        // Place the ship on the board\n        for (let i = 0; i < newShip.length; i++) {\n            let x = startX;\n            let y = startY;\n\n            if (direction === \"hor\") {\n                y += i;\n            } else if (direction === \"ver\") {\n                x += i;\n            }\n            \n            this.board[x][y] = newShip; // Store a reference to the ship\n        };\n        this.ships.push(newShip);\n    };\n\n    removeShip(startX, startY, shipLen, direction) {\n\n        let targetShip;\n        \n        // Place the ship on the board\n        for (let i = 0; i < shipLen; i++) {\n            let x = startX;\n            let y = startY;\n\n            if (direction === \"hor\") {\n                y += i;\n            } else if (direction === \"ver\") {\n                x += i;\n            }\n\n            if (typeof this.board[x][y] !== \"object\") {\n                throw new Error(\"Invalid ship location\");\n            } else {\n                targetShip = this.board[x][y]; // Store a reference to the ship\n            };\n            \n            this.board[x][y] = null;\n        };\n        let shipIndex = this.ships.indexOf(targetShip);\n        this.ships.splice(shipIndex,1);\n    };\n\n    receiveAttack(x, y) {\n        if (!this.isValidCoord(x, y)) {\n            throw new Error(\"Invalid attack coordinates.\");\n        }\n\n        let cell = this.board[x][y];\n\n        if (cell === null) { // Missed attack\n            this.board[x][y] = 0; // Mark the cell as a miss\n            return \"Miss\";\n        } else if (typeof cell === \"object\") { // Hit a ship\n            cell.hit();               // Call the ship's hit method\n            this.board[x][y] = -1;    // Mark the cell as a hit\n            return cell.isSunk() ? \"Sunk\" : \"Hit\";\n        } else {\n            return \"Already attacked\";\n        }\n    }\n\n    allShipsSunk() {\n        return this.ships.every((ship) => ship.isSunk() === true);\n    }\n\n    printBoard() {\n        let res = \"\";\n        for (let r = 0; r < this.size; r++) {\n          let srow = \"\";\n          for (let c = 0; c < this.size; c++) {\n            srow += \" \" + this.board[r][c];\n          }\n          res += `[${srow} ]` + \"\\n\";\n        }\n        return res;\n    }\n}\n\n\n\n\n// let brd = new Gameboard(10);\n// console.log(brd.printBoard());\n// brd.placeShip(0,0,3,\"ver\");\n// brd.placeShip(0,4,5,\"hor\");\n\n// brd.receiveAttack(1,0);\n// brd.receiveAttack(2,0);\n// brd.receiveAttack(3,0);\n\n// console.log(brd.allShipsSunk());\n\n// brd.receiveAttack(0,0);\n// brd.receiveAttack(0,4);\n// console.log(brd.printBoard());\n// console.log(brd.allShipsSunk());\n\n// console.log(brd.ships);\n\n//# sourceURL=webpack://battleships/./src/models/board.js?");

/***/ }),

/***/ "./src/models/player.js":
/*!******************************!*\
  !*** ./src/models/player.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/models/board.js\");\n\n\nclass Player{\n    constructor(id){\n        this.id = id;\n        this.board = new _board__WEBPACK_IMPORTED_MODULE_0__.Gameboard();\n    }\n};\n\n\n\n//# sourceURL=webpack://battleships/./src/models/player.js?");

/***/ }),

/***/ "./src/models/ships.js":
/*!*****************************!*\
  !*** ./src/models/ships.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n    constructor(length){\n        this.length = length;\n        this.hits = 0;\n        this.sunk = false;\n    };\n\n    hit(){\n        if (this.hits < this.length){\n            this.hits += 1;\n        }\n    };\n\n    isSunk() {\n        if (this.hits === this.length) {\n            this.sunk = true;\n            return true;\n        } else {return false};\n    }\n};\n\n\n// module.exports = { Ship };\n\n//# sourceURL=webpack://battleships/./src/models/ships.js?");

/***/ }),

/***/ "./src/views/controller.js":
/*!*********************************!*\
  !*** ./src/views/controller.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameController: () => (/* binding */ GameController)\n/* harmony export */ });\n/* harmony import */ var _models_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/player */ \"./src/models/player.js\");\n/* harmony import */ var _oppo_ai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./oppo_ai */ \"./src/views/oppo_ai.js\");\n\n\n\nlet loadGameCss = false;\n\nfunction createPlayerBoard (id) {\n    const element = document.createElement(\"div\");\n\n    const newPlayer = new _models_player__WEBPACK_IMPORTED_MODULE_0__.Player();\n    newPlayer.id = id;\n    const playBoard = newPlayer.board;\n\n    const boardView = document.createElement(\"div\");\n    boardView.classList.add(\"btshp-grid-cntr\",id);\n\n    let legend = document.createElement(\"legend\");\n    legend.textContent = `${id.toUpperCase()}-Board`;\n\n    playBoard.board.forEach((rowCell,rowIdx) => {\n        rowCell.forEach((colCell,colIdx) => {\n            let cellBtn = document.createElement(\"div\");\n            cellBtn.classList.add(\"grid-cell\");\n            if (id !== \"ai\") {\n                cellBtn.classList.add(\"droppable\");\n            }\n            cellBtn.dataset.row = rowIdx;\n            cellBtn.dataset.column = colIdx;\n            boardView.appendChild(cellBtn);\n        })\n    });\n\n    element.appendChild(legend);\n    element.appendChild(boardView);\n\n    return [element, newPlayer];\n}\n\nfunction createShips(shipName,shipSize) {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"ship\",`${shipName}-cntr`,\"draggable-source\");\n    element.dataset.size = shipSize;\n    element.draggable = true;\n\n    for (let i=0; i<shipSize; i++){\n        const inset = document.createElement(\"div\");\n        inset.classList.add(`${shipName}-${i}`);\n        element.appendChild(inset)\n    };\n\n    return element;\n}\n\nfunction createShipContainer () {\n    const shipCntr = document.createElement(\"div\");\n    shipCntr.classList.add(\"ships-placeholder\");\n\n    let carrier = createShips(\"carrier\",5);\n    let battleship = createShips(\"battleship\",4);\n    let cruiser = createShips(\"cruiser\",3);\n    let submarine = createShips(\"submarine\",3);\n    let destroyer = createShips(\"destroyer\",2);\n\n    shipCntr.appendChild(carrier);\n    shipCntr.appendChild(battleship);\n    shipCntr.appendChild(cruiser);\n    shipCntr.appendChild(submarine);\n    shipCntr.appendChild(destroyer);\n\n    return shipCntr;\n}\n\nfunction createMessageBoard () {\n    const element = document.createElement(\"div\");\n    element.classList.add(\"msg-board\");\n    element.innerHTML = \"Drag and drop player ships to board. Click on first cell <br>\"\n    element.innerHTML += \"to rotate ship. Invalid drops/rotations are disallowed.\"\n\n    return element;\n}\n\n\nfunction dragPlayerShips(player) {\n    let draggedShip;\n\n    function rotateShip(e) {\n        e.preventDefault();\n        let activeShip = e.target.parentElement;\n        let curGrid = activeShip.parentElement;\n    \n        if (activeShip.classList.contains(\"ship\") && activeShip.classList.contains(\"draggable-source\")) {\n            if (curGrid.classList.contains(\"grid-cell\")) {\n                let [gridX,gridY] = [parseInt(curGrid.dataset.row),parseInt(curGrid.dataset.column)];\n                let shipSize = parseInt(activeShip.dataset.size);\n                let currOrientation = activeShip.classList.contains(\"vertical\") ? \"ver\" : \"hor\";\n                let newOrientation = currOrientation===\"ver\" ? \"hor\" : \"ver\";\n                \n                if ((newOrientation===\"hor\" && player.board.canPlaceShip(gridX,gridY+1,shipSize,newOrientation)) || \n                    (newOrientation===\"ver\" && player.board.canPlaceShip(gridX+1,gridY,shipSize,newOrientation))\n                ) {\n                    e.target.parentElement.classList.toggle(\"vertical\");\n    \n                    player.board.removeShip(gridX,gridY,shipSize,currOrientation);\n                    player.board.placeShip(gridX,gridY,shipSize,newOrientation);\n                    // console.log(player.board.printBoard());\n                    activeShip.style.margin = 0;\n                }\n                \n            } else {\n                e.target.parentElement.classList.toggle(\"vertical\");\n            }\n    }};\n\n    function dragStart(e) {\n        draggedShip = e.target;\n        let curGrid = draggedShip.parentElement;\n        if (curGrid.classList.contains(\"grid-cell\")) {\n            let [gridX,gridY] = [parseInt(curGrid.dataset.row),parseInt(curGrid.dataset.column)];\n            let shipSize = parseInt(draggedShip.dataset.size);\n            let shipOrientation = draggedShip.classList.contains(\"vertical\") ? \"ver\" : \"hor\";\n            player.board.removeShip(gridX,gridY,shipSize,shipOrientation);\n        }\n    }\n\n    function dragOver(e) {\n        e.preventDefault();\n    }\n    \n    function dropShip(e) {\n        e.preventDefault();\n        let curGrid = e.target;\n        let [gridX,gridY] = [parseInt(curGrid.dataset.row),parseInt(curGrid.dataset.column)];\n        let shipSize = parseInt(draggedShip.dataset.size);\n        let shipOrientation = draggedShip.classList.contains(\"vertical\") ? \"ver\" : \"hor\";\n\n        if (player.board.canPlaceShip(gridX,gridY,shipSize,shipOrientation)) {\n            player.board.placeShip(gridX,gridY,shipSize,shipOrientation);\n            // console.log(player.board.printBoard());\n\n            if (draggedShip.parentElement) {\n                draggedShip.parentElement.removeChild(draggedShip);\n            }\n    \n            // Append ship to the target cell\n            curGrid.appendChild(draggedShip);\n            \n            draggedShip.style.margin = 0;\n        }\n\n        triggerStart(player,allShips);\n    }\n\n    const allShips = document.querySelectorAll(\".ship.draggable-source\");\n\n    allShips.forEach((activeShip) => {\n        activeShip.addEventListener(\"dragstart\", dragStart)\n        activeShip.addEventListener(\"click\", rotateShip);\n    });\n\n    const playerGrids = document.querySelectorAll(\".grid-cell.droppable\");\n    playerGrids.forEach((playerBlock) => {\n        playerBlock.addEventListener(\"dragover\", dragOver);\n        playerBlock.addEventListener(\"drop\", dropShip);\n    });\n}\n\nfunction startGame () {\n    let element = document.createElement(\"div\");\n    element.classList.add(\"start-game-btn\");\n\n    let start = document.createElement(\"button\");\n    start.textContent = \"Start Game\";\n    start.disabled=true;\n    element.appendChild(start);\n\n    return element;\n}\n\nfunction triggerStart(player, shipElement) {\n    let startDOM = document.querySelector(\".start-game-btn button\");\n    let msgDOM = document.querySelector(\".msg-board\");\n    \n    if (player.board.ships.length===5) {\n        startDOM.disabled=false;\n        msgDOM.innerHTML = \"All ships have been placed. <br>Click Start to begin.\"\n    \n        startDOM.addEventListener(\"click\", (e) => {\n            e.preventDefault();\n\n            // Disable editing the ships\n            shipElement.forEach((elm) => {\n                elm.classList.remove(\"draggable-source\");\n                elm.draggable = false;\n            });\n\n            // Format the game reset button\n            startDOM.textContent = \"Reset Game\";\n            startDOM.classList.add(\"reset-game\");\n            startDOM.style.color = \"white\";\n            startDOM.style.backgroundColor = \"red\";\n            msgDOM.innerHTML = \"Player1's turn.\";\n        });\n\n    }\n}\n\n\nfunction GameController() {    \n    loadGameCss = true;\n    if (loadGameCss) {\n        __webpack_require__.e(/*! import() */ \"src_css_game_css\").then(__webpack_require__.bind(__webpack_require__, /*! ../css/game.css */ \"./src/css/game.css\"));\n    }\n\n    const element = document.createElement(\"div\");\n    element.classList.add(\"game-cntr\");\n\n    const gameCntr = document.createElement(\"div\");\n    gameCntr.classList.add(\"boards-cntr\");\n\n    let [p1Board, p1] = createPlayerBoard(\"p1\");\n    let [pAIBoard, pAI] = createPlayerBoard(\"ai\");\n\n    gameCntr.appendChild(p1Board);\n    gameCntr.appendChild(pAIBoard);\n\n    // Create the container for ships\n    const shipCntr = createShipContainer();\n\n    // Create the message container\n    const msgCntr = createMessageBoard();\n\n    // Create the start button\n    const startBtn = startGame();\n\n    element.appendChild(gameCntr);\n    element.appendChild(shipCntr);\n    element.appendChild(msgCntr);\n    element.appendChild(startBtn);\n\n    // Randomly position the AI ships\n    (0,_oppo_ai__WEBPACK_IMPORTED_MODULE_1__.randomShipPositioning)(pAI,pAIBoard);\n\n    // Initialize drag and drop after DOM is loaded\n    setTimeout(() => {\n        dragPlayerShips(p1);\n    }, 0);\n    \n\n    loadGameCss = false;\n    return element;\n}\n\n\n\n//# sourceURL=webpack://battleships/./src/views/controller.js?");

/***/ }),

/***/ "./src/views/home.js":
/*!***************************!*\
  !*** ./src/views/home.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ homePage)\n/* harmony export */ });\n/* harmony import */ var _css_noun_battleship_4933124_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/noun-battleship-4933124.svg */ \"./src/css/noun-battleship-4933124.svg\");\n\nlet loadHomeCss = false;\n\nfunction homePage(){\n    loadHomeCss = true;\n    if (loadHomeCss) {\n        __webpack_require__.e(/*! import() */ \"src_css_home_css\").then(__webpack_require__.bind(__webpack_require__, /*! ../css/home.css */ \"./src/css/home.css\"));\n    }\n    \n    const element = document.createElement(\"div\");\n    element.classList.add(\"home-page-content\");\n\n    let title = document.createElement(\"div\");\n    title.classList.add(\"home-title\");\n    title.textContent = \"BATTLESHIP\";\n\n    let newGame = document.createElement(\"button\");\n    newGame.classList.add(\"new-game-btn\");\n    newGame.textContent = \"New Game\";\n\n    let btsIcon = document.createElement(\"img\");\n    btsIcon.src = _css_noun_battleship_4933124_svg__WEBPACK_IMPORTED_MODULE_0__\n    btsIcon.classList.add(\"home-battleship-icon\");\n\n    element.appendChild(title);\n    element.appendChild(newGame);\n    element.appendChild(btsIcon);\n\n    loadHomeCss = false;\n    return element;\n};\n\n//# sourceURL=webpack://battleships/./src/views/home.js?");

/***/ }),

/***/ "./src/views/oppo_ai.js":
/*!******************************!*\
  !*** ./src/views/oppo_ai.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   randomShipPositioning: () => (/* binding */ randomShipPositioning)\n/* harmony export */ });\nfunction randomShipPositioning(player, boardGui, maxGridSize=10) {\n    let shipLengths = [5,4,3,3,2];\n    shipLengths.forEach((shipLen) => {\n        let placement = addShip(player,shipLen,maxGridSize);\n        while (placement !== \"placed\") {\n            placement = addShip(player,shipLen,maxGridSize);\n        }\n    });\n    // console.log(player.board.printBoard());\n}\n\nfunction addShip(player, shipLen, maxGridSize=10) {\n    let randX = Math.floor(Math.random() * maxGridSize);\n    let randY = Math.floor(Math.random() * maxGridSize);\n    let randDir = Math.random() < 0.5;\n    let randOrientation = randDir ? \"ver\" : \"hor\";\n\n    if (player.board.canPlaceShip(randX,randY,shipLen,randOrientation)) {\n        player.board.placeShip(randX,randY,shipLen,randOrientation);\n        // console.log(`${randX},${randY},${shipLen},${randOrientation}`);\n        return \"placed\";\n    } else {\n        return \"invalid\";\n    }\n}\n\n\n\n\n//# sourceURL=webpack://battleships/./src/views/oppo_ai.js?");

/***/ }),

/***/ "./src/css/noun-battleship-4933124.svg":
/*!*********************************************!*\
  !*** ./src/css/noun-battleship-4933124.svg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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