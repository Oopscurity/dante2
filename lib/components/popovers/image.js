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

var _draftJs = require('draft-js');

var _selection = require('../../utils/selection.js');

var _index = require('../../model/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DanteImagePopover = function (_React$Component) {
  (0, _inherits3['default'])(DanteImagePopover, _React$Component);

  function DanteImagePopover(props) {
    (0, _classCallCheck3['default'])(this, DanteImagePopover);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.display = _this.display.bind(_this);
    _this.show = _this.show.bind(_this);
    _this.hide = _this.hide.bind(_this);
    _this._toggleScaled = _this._toggleScaled.bind(_this);
    _this.scale = _this.scale.bind(_this);
    _this.collapse = _this.collapse.bind(_this);
    _this.relocate = _this.relocate.bind(_this);
    _this.componentWillReceiveProps = _this.componentWillReceiveProps.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.state = {
      position: {
        top: 0,
        left: 0
      },
      show: false,
      scaled: false,
      buttons: [{ type: "left" }, { type: "center" }, { type: "fill" }, { type: "wide" }]
    };
    return _this;
  }

  DanteImagePopover.prototype.display = function display(b) {
    if (b) {
      return this.show();
    } else {
      return this.hide();
    }
  };

  DanteImagePopover.prototype.show = function show() {
    return this.setState({
      show: true });
  };

  DanteImagePopover.prototype.hide = function hide() {
    return this.setState({
      show: false });
  };

  DanteImagePopover.prototype.setPosition = function setPosition(coords) {
    return this.setState({
      position: coords });
  };

  DanteImagePopover.prototype._toggleScaled = function _toggleScaled(ev) {
    if (this.state.scaled) {
      return this.collapse();
    } else {
      return this.scale();
    }
  };

  DanteImagePopover.prototype.scale = function scale() {
    return this.setState({
      scaled: true });
  };

  DanteImagePopover.prototype.collapse = function collapse() {
    return this.setState({
      scaled: false });
  };

  DanteImagePopover.prototype.relocate = function relocate() {
    var editorState = this.props.editorState;


    if (editorState.getSelection().isCollapsed()) {

      var currentBlock = (0, _index.getCurrentBlock)(editorState);
      var blockType = currentBlock.getType();

      var contentState = editorState.getCurrentContent();
      var selectionState = editorState.getSelection();

      var block = contentState.getBlockForKey(selectionState.anchorKey);

      var nativeSelection = (0, _selection.getSelection)(window);
      if (!nativeSelection.rangeCount) {
        return;
      }

      var node = (0, _index.getNode)();

      var selectionBoundary = (0, _selection.getSelectionRect)(nativeSelection);
      var coords = selectionBoundary;

      var parent = _reactDom2['default'].findDOMNode(this.props.editor);
      var parentBoundary = parent.getBoundingClientRect();

      this.display(blockType === "image");

      if (blockType === "image") {
        selectionBoundary = node.anchorNode.parentNode.parentNode.parentNode.getBoundingClientRect();
        var el = this.refs.image_popover;
        var padd = el.offsetWidth / 2;
        return this.setPosition({
          top: selectionBoundary.top - parentBoundary.top + 60,
          left: selectionBoundary.left + selectionBoundary.width / 2 - padd
        });
      }
    } else {
      return this.hide();
    }
  };

  DanteImagePopover.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    return this.collapse();
  };

  DanteImagePopover.prototype.getStyle = function getStyle() {
    if (!this.state.position) {
      return {};
    }
  };

  DanteImagePopover.prototype.handleClick = function handleClick(item) {
    return this.props.editor.setDirection(item.type);
  };

  DanteImagePopover.prototype.render = function render() {
    var _this2 = this;

    return _react2['default'].createElement(
      'div',
      {
        ref: 'image_popover',
        className: 'dante-popover popover--Aligntooltip popover--top popover--animated ' + (this.state.show ? 'is-active' : undefined),
        style: { top: this.state.position.top,
          left: this.state.position.left }
      },
      _react2['default'].createElement(
        'div',
        { className: 'popover-inner' },
        _react2['default'].createElement(
          'ul',
          { className: 'dante-menu-buttons' },
          this.state.buttons.map(function (item, i) {
            return _react2['default'].createElement(DanteImagePopoverItem, {
              item: item,
              handleClick: _this2.handleClick,
              key: i
            });
          })
        )
      ),
      _react2['default'].createElement('div', { className: 'popover-arrow' })
    );
  };

  return DanteImagePopover;
}(_react2['default'].Component);

var DanteImagePopoverItem = function (_React$Component2) {
  (0, _inherits3['default'])(DanteImagePopoverItem, _React$Component2);

  function DanteImagePopoverItem() {
    (0, _classCallCheck3['default'])(this, DanteImagePopoverItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this3 = (0, _possibleConstructorReturn3['default'])(this, _React$Component2.call.apply(_React$Component2, [this].concat(args)));

    _this3.handleClick = _this3.handleClick.bind(_this3);
    _this3.render = _this3.render.bind(_this3);
    return _this3;
  }

  DanteImagePopoverItem.prototype.handleClick = function handleClick(e) {
    e.preventDefault();
    return this.props.handleClick(this.props.item);
  };

  DanteImagePopoverItem.prototype.render = function render() {
    return _react2['default'].createElement(
      'li',
      {
        className: 'dante-menu-button align-' + this.props.item.type,
        onMouseDown: this.handleClick },
      _react2['default'].createElement('span', { className: 'tooltip-icon dante-icon-image-' + this.props.item.type })
    );
  };

  return DanteImagePopoverItem;
}(_react2['default'].Component);

exports['default'] = DanteImagePopover;
module.exports = exports['default'];