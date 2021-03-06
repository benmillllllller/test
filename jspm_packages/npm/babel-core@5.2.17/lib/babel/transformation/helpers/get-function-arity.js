/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

exports.__esModule = true;

var _import = require("../../types");

var t = _interopRequireWildcard(_import);

exports["default"] = function (node) {
  var lastNonDefault = 0;
  for (var i = 0; i < node.params.length; i++) {
    if (!t.isAssignmentPattern(node.params[i])) lastNonDefault = i + 1;
  }
  return lastNonDefault;
};

;
module.exports = exports["default"];