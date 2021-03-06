/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

exports.__esModule = true;
exports.ComprehensionExpression = ComprehensionExpression;

var _buildComprehension = require("../../helpers/build-comprehension");

var _buildComprehension2 = _interopRequireDefault(_buildComprehension);

var _traverse = require("../../../traversal");

var _traverse2 = _interopRequireDefault(_traverse);

var _import = require("../../../util");

var util = _interopRequireWildcard(_import);

var _import2 = require("../../../types");

var t = _interopRequireWildcard(_import2);

var metadata = {
  stage: 0
};

exports.metadata = metadata;

function ComprehensionExpression(node, parent, scope, file) {
  var callback = array;
  if (node.generator) callback = generator;
  return callback(node, parent, scope, file);
}

function generator(node) {
  var body = [];
  var container = t.functionExpression(null, [], t.blockStatement(body), true);
  container.shadow = true;

  body.push(_buildComprehension2["default"](node, function () {
    return t.expressionStatement(t.yieldExpression(node.body));
  }));

  return t.callExpression(container, []);
}

function array(node, parent, scope, file) {
  var uid = scope.generateUidBasedOnNode(parent);

  var container = util.template("array-comprehension-container", {
    KEY: uid
  });
  container.callee.shadow = true;

  var block = container.callee.body;
  var body = block.body;

  if (_traverse2["default"].hasType(node, scope, "YieldExpression", t.FUNCTION_TYPES)) {
    container.callee.generator = true;
    container = t.yieldExpression(container, true);
  }

  var returnStatement = body.pop();

  body.push(_buildComprehension2["default"](node, function () {
    return util.template("array-push", {
      STATEMENT: node.body,
      KEY: uid
    }, true);
  }));
  body.push(returnStatement);

  return container;
}