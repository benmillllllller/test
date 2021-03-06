/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _estraverse = require("estraverse");

var _estraverse2 = _interopRequireDefault(_estraverse);

var _extend = require("lodash/object/extend");

var _extend2 = _interopRequireDefault(_extend);

var _types = require("ast-types");

var _types2 = _interopRequireDefault(_types);

var _import = require("./types");

var t = _interopRequireWildcard(_import);

// estraverse

_extend2["default"](_estraverse2["default"].VisitorKeys, t.VISITOR_KEYS);

// regenerator/ast-types

var def = _types2["default"].Type.def;
var or = _types2["default"].Type.or;

//def("File")
//  .bases("Node")
//  .build("program")
//  .field("program", def("Program"));

def("AssignmentPattern").bases("Pattern").build("left", "right").field("left", def("Pattern")).field("right", def("Expression"));

def("RestElement").bases("Pattern").build("argument").field("argument", def("expression"));

def("DoExpression").bases("Expression").build("body").field("body", [def("Statement")]);

def("Super").bases("Expression");

def("ExportDefaultDeclaration").bases("Declaration").build("declaration").field("declaration", or(def("Declaration"), def("Expression"), null));

def("ExportNamedDeclaration").bases("Declaration").build("declaration").field("declaration", or(def("Declaration"), def("Expression"), null)).field("specifiers", [or(def("ExportSpecifier"))]).field("source", or(def("ModuleSpecifier"), null));

def("ExportNamespaceSpecifier").bases("Specifier").field("exported", def("Identifier"));

def("ExportDefaultSpecifier").bases("Specifier").field("exported", def("Identifier"));

def("ExportAllDeclaration").bases("Declaration").build("exported", "source").field("exported", def("Identifier")).field("source", def("Literal"));

_types2["default"].finalize();