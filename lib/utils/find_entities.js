'use strict';

exports.__esModule = true;

var _draftJs = require('draft-js');

//TODO: what the f*ck is happening here? ;-;
var findEntities = function findEntities(entityType, instance, contentBlock, callback) {
  return contentBlock.findEntityRanges(function (_this) {
    return function (character) {
      var entityKey, opts, res;
      entityKey = character.getEntity();
      return res = entityKey !== null && _draftJs.Entity.get(entityKey).getType() === entityType, res ? (opts = {
        showPopLinkOver: instance.showPopLinkOver,
        hidePopLinkOver: instance.hidePopLinkOver
      }, _draftJs.Entity.mergeData(entityKey, opts)) : void 0, res;
    };
  }(undefined), callback);
};

exports['default'] = findEntities;
module.exports = exports['default'];