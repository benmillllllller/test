/* */ 
"format cjs";
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

exports.__esModule = true;
exports.internal = internal;
exports.blacklist = blacklist;
exports.whitelist = whitelist;
exports.stage = stage;
exports.optional = optional;

var _includes = require("lodash/collection/includes");

var _includes2 = _interopRequireDefault(_includes);

function internal(transformer, opts) {
  if (transformer.key[0] === "_") return true;
}

function blacklist(transformer, opts) {
  var blacklist = opts.blacklist;
  if (blacklist.length && _includes2["default"](blacklist, transformer.key)) return false;
}

function whitelist(transformer, opts) {
  var whitelist = opts.whitelist;
  if (whitelist) return _includes2["default"](whitelist, transformer.key);
}

function stage(transformer, opts) {
  var stage = transformer.metadata.stage;
  if (stage != null && stage >= opts.stage) return true;
}

function optional(transformer, opts) {
  if (transformer.metadata.optional && !_includes2["default"](opts.optional, transformer.key)) return false;
}