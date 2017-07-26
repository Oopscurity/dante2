'use strict';

var _dante = require('./components/dante');

var _dante2 = _interopRequireDefault(_dante);

var _dante_editor = require('./components/dante_editor');

var _dante_editor2 = _interopRequireDefault(_dante_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

module.exports = {
  Dante: _dante2['default'],
  DanteEditor: _dante_editor2['default']
};