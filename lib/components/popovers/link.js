'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('../../model/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DanteAnchorPopover = function (_React$Component) {
  (0, _inherits3['default'])(DanteAnchorPopover, _React$Component);

  function DanteAnchorPopover(props) {
    (0, _classCallCheck3['default'])(this, DanteAnchorPopover);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.display = _this.display.bind(_this);
    _this.show = _this.show.bind(_this);
    _this.hide = _this.hide.bind(_this);
    _this.relocate = _this.relocate.bind(_this);
    _this.render = _this.render.bind(_this);
    _this.state = {
      position: {
        top: 0,
        left: 0
      },
      show: false,
      url: ""
    };
    return _this;
  }

  DanteAnchorPopover.prototype.display = function display(b) {
    if (b) {
      return this.show();
    } else {
      return this.hide();
    }
  };

  DanteAnchorPopover.prototype.show = function show() {
    return this.setState({
      show: true });
  };

  DanteAnchorPopover.prototype.hide = function hide() {
    return this.setState({
      show: false });
  };

  DanteAnchorPopover.prototype.setPosition = function setPosition(coords) {
    return this.setState({
      position: coords });
  };

  DanteAnchorPopover.prototype.relocate = function relocate(node) {
    if (node == null) {
      node = null;
    }
    if (!node) {
      return;
    }

    var editorState = this.props.editorState;

    var currentBlock = (0, _index.getCurrentBlock)(editorState);
    var blockType = currentBlock.getType();

    var contentState = editorState.getCurrentContent();
    var selectionState = editorState.getSelection();

    var selectionBoundary = node.getBoundingClientRect();
    var coords = selectionBoundary;

    var el = this.refs.dante_popover;
    var padd = el.offsetWidth / 2;

    var parent = _reactDom2['default'].findDOMNode(this.props.editor);
    var parentBoundary = parent.getBoundingClientRect();

    return {
      top: selectionBoundary.top - parentBoundary.top + 160,
      left: selectionBoundary.left + selectionBoundary.width / 2 - padd
    };
  };

  DanteAnchorPopover.prototype.render = function render() {
    var position = this.state.position;

    var style = {
      left: position.left,
      top: position.top,
      visibility: '' + (this.state.show ? 'visible' : 'hidden')
    };
    return _react2['default'].createElement(
      'div',
      {
        ref: 'dante_popover',
        className: 'dante-popover popover--tooltip popover--Linktooltip popover--bottom is-active',
        style: style,
        onMouseOver: this.props.handleOnMouseOver,
        onMouseOut: this.props.handleOnMouseOut
      },
      _react2['default'].createElement(
        'div',
        { className: 'popover-inner' },
        _react2['default'].createElement(
          'a',
          { href: this.props.url, target: '_blank' },
          this.state.url
        )
      ),
      _react2['default'].createElement('div', { className: 'popover-arrow' })
    );
  };

  return DanteAnchorPopover;
}(_react2['default'].Component);

exports['default'] = DanteAnchorPopover;
module.exports = exports['default'];