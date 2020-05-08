// Generated by CoffeeScript 2.5.1
(function () {
  var Random, SPACEBAR, allowCopy, allowRegeneration, app, appendHistory, assembleHex, currentStyle, firstNode, generateColumn, hex, hexLength, history, injectColumn, injectNewBackground, int, maxColumnLimit, presentColor, previousStyle, revertedOnce, space;
  Random = class Random {
    constructor(max) {
      this.max = max;
    }

    create() {
      return Math.floor(Math.random() * this.max);
    }

  };
  app = document.getElementById('app');
  history = document.getElementById('history-previewer');
  space = " ";
  SPACEBAR = space.charCodeAt();
  allowRegeneration = 1;
  maxColumnLimit = 4;
  firstNode = 0;
  revertedOnce = 0;
  int = new Random(100);
  hex = new Random(16);
  hexLength = new Random(2);
  currentStyle = null;
  previousStyle = null;

  generateColumn = function (color) {
    var column;
    column = document.createElement('div');
    column.className = 'column button is-small';
    column.setAttribute('onclick', `revertSuggestion(\`${color}\`)`);
    column.style.background = color;
    column.style.border = 'none';
    return column;
  };

  injectColumn = function (object) {
    history.appendChild(object);

    if (history.childElementCount > maxColumnLimit) {
      return history.childNodes[firstNode].remove();
    }
  };

  appendHistory = function (color) {
    var newColumn; // Ignore empty generated column during initial start
    // & excluse listing previous suggestions

    if (color === null || revertedOnce === 1) {
      revertedOnce = 0;
      return false;
    } else {
      newColumn = generateColumn(color);
      return injectColumn(newColumn);
    }
  };

  assembleHex = function () {
    var hexArray, hexString, hexValue, i, randLength, ref, x;

    if (hexLength.create() === 0) {
      randLength = 3;
    } else {
      randLength = 6;
    }

    hexString = '#';
    hexArray = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (x = i = 1, ref = randLength; 1 <= ref ? i <= ref : i >= ref; x = 1 <= ref ? ++i : --i) {
      hexValue = hex.create();

      if (hexValue > 9) {
        hexString += hexArray[hexValue - 10];
      } else {
        hexString += hexValue;
      }
    }

    return hexString;
  };

  presentColor = function (id, color) {
    return document.getElementById(id).innerText = color;
  };

  allowCopy = function (id) {
    document.getElementById(id).setAttribute('class', 'displayValue');
    return document.getElementById(id).setAttribute('onclick', 'togglePopup()');
  };

  injectNewBackground = function () {
    var _from, _to;

    _from = assembleHex();
    _to = assembleHex();
    presentColor('from', _from);
    presentColor('to', _to);
    previousStyle = currentStyle;
    appendHistory(previousStyle);
    currentStyle = `linear-gradient(${int.create()}deg, ${_from}, ${_to})`;
    return app.style.background = currentStyle;
  };

  this.revertSuggestion = function (background) {
    var _from, _to, parsedBackground;

    currentStyle = background;
    parsedBackground = background.replace('linear-gradient', '').replace(/\(|\)/g, '').split(',');
    _from = parsedBackground[1];
    _to = parsedBackground[2];
    presentColor('from', _from);
    presentColor('to', _to);
    presentColor('popupContent', `background: ${currentStyle};`);
    app.style.background = currentStyle;
    document.getElementById('copyColorValue').setAttribute('data-clipboard-text', `background: ${currentStyle};`);
    return revertedOnce = 1;
  };

  this.togglePopup = function () {
    document.getElementById('popup').classList.toggle('is-active');
    presentColor('popupContent', `background: ${currentStyle};`);
    document.getElementById('copyColorValue').setAttribute('data-clipboard-text', `background: ${currentStyle};`); // Do not let the user trigger newBackground() if the popup is displayed

    if (allowRegeneration === 0) {
      return allowRegeneration = 1;
    } else {
      return allowRegeneration = 0;
    }
  };

  document.onkeydown = function (key) {
    if (key.keyCode === SPACEBAR && allowRegeneration === 1) {
      injectNewBackground();
      return allowCopy('copyArea');
    }
  };

  document.getElementById('previewArea').onclick = function () {
    if (allowRegeneration === 1) {
      injectNewBackground();
      return allowCopy('copyArea');
    }
  };

  injectNewBackground();
  presentColor('from', 'Hit space or click');
  presentColor('to', 'to generate a new color');
}).call(this);
//# sourceMappingURL=script.js.map
