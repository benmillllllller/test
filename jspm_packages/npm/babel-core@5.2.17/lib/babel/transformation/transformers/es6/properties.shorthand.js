/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

exports.__esModule = true;
exports.shouldVisit = shouldVisit;
exports.Property = Property;

var _import = require("../../../types");

var t = _interopRequireWildcard(_import);

function shouldVisit(node) {
  return t.isProperty(node) && (node.method || node.shorthand);
}

function Property(node) {
  if (node.method) {
    node.method = false;
  }

  if (node.shorthand) {
    node.shorthand = false;
    node.key = t.removeComments(t.clone(node.key));
  }
}