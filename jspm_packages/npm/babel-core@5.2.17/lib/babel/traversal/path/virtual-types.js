/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

exports.__esModule = true;

var _import = require("../../types");

var t = _interopRequireWildcard(_import);

var ReferencedIdentifier = {
  type: "Identifier",
  checkPath: function checkPath(path, opts) {
    return t.isReferencedIdentifier(path.node, path.parent, opts);
  }
};

exports.ReferencedIdentifier = ReferencedIdentifier;
var Scope = {
  type: "Scopable",
  checkPath: function checkPath(path) {
    return t.isScope(path.node, path.parent);
  }
};

exports.Scope = Scope;
var Referenced = {
  checkPath: function checkPath(path) {
    return t.isReferenced(path.node, path.parent);
  }
};

exports.Referenced = Referenced;
var BlockScoped = {
  checkPath: function checkPath(path) {
    return t.isBlockScoped(path.node);
  }
};

exports.BlockScoped = BlockScoped;
var Var = {
  type: "VariableDeclaration",
  checkPath: function checkPath(path) {
    return t.isVar(path.node);
  }
};
exports.Var = Var;