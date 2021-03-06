/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

exports.__esModule = true;

var _explode = require("./explode-assignable-expression");

var _explode2 = _interopRequireDefault(_explode);

var _import = require("../../types");

var t = _interopRequireWildcard(_import);

exports["default"] = function (exports, opts) {
  var isAssignment = function isAssignment(node) {
    return node.operator === opts.operator + "=";
  };

  var buildAssignment = function buildAssignment(left, right) {
    return t.assignmentExpression("=", left, right);
  };

  exports.shouldVisit = function (node) {
    return node.operator && (node.operator === opts.operator || node.operator === opts.operator + "=");
  };

  exports.ExpressionStatement = function (node, parent, scope, file) {
    // hit the `AssignmentExpression` one below
    if (this.isCompletionRecord()) return;

    var expr = node.expression;
    if (!isAssignment(expr)) return;

    var nodes = [];
    var exploded = _explode2["default"](expr.left, nodes, file, scope, true);

    nodes.push(t.expressionStatement(buildAssignment(exploded.ref, opts.build(exploded.uid, expr.right))));

    return nodes;
  };

  exports.AssignmentExpression = function (node, parent, scope, file) {
    if (!isAssignment(node)) return;

    var nodes = [];
    var exploded = _explode2["default"](node.left, nodes, file, scope);
    nodes.push(buildAssignment(exploded.ref, opts.build(exploded.uid, node.right)));
    return nodes;
  };

  exports.BinaryExpression = function (node) {
    if (node.operator !== opts.operator) return;
    return opts.build(node.left, node.right);
  };
};

;
module.exports = exports["default"];