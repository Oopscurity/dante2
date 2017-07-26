'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PlaceholderBlock = function (_React$Component) {
  (0, _inherits3['default'])(PlaceholderBlock, _React$Component);

  function PlaceholderBlock(props) {
    (0, _classCallCheck3['default'])(this, PlaceholderBlock);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.placeholderText = _this.placeholderText.bind(_this);
    _this.placeholderFromProps = _this.placeholderFromProps.bind(_this);
    _this.defaultText = _this.defaultText.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.classForDefault = _this.classForDefault.bind(_this);
    _this.state = {
      enabled: false,
      data: _this.props.blockProps.data.toJS()
    };
    return _this;
  }

  PlaceholderBlock.prototype.placeholderText = function placeholderText() {
    if (this.state.enabled) {
      return "";
    }
    return this.props.blockProps.data.toJS().placeholder || this.placeholderFromProps() || this.defaultText();
  };
  //if @.props.blockProps.data then @.props.blockProps.data.placeholder else @defaultText()


  PlaceholderBlock.prototype.placeholderFromProps = function placeholderFromProps() {
    return this.props.block.toJS().placeholder;
  };

  PlaceholderBlock.prototype.defaultText = function defaultText() {
    return "write something ";
  };

  PlaceholderBlock.prototype.componentDidMount = function componentDidMount() {};

  PlaceholderBlock.prototype.handleFocus = function handleFocus(e) {
    var _this2 = this;

    // console.log "focus on placeholder"
    return setTimeout(function () {
      return _this2.setState({
        enabled: true });
    }, 0);
  };

  PlaceholderBlock.prototype.classForDefault = function classForDefault() {
    if (!this.state.enabled) {
      return "defaultValue defaultValue--root";
    } else {
      return "";
    }
  };

  PlaceholderBlock.prototype.render = function render() {
    return _react2['default'].createElement(
      'span',
      { className: this.classForDefault(), onMouseDown: this.handleFocus },
      this.placeholderText(),
      _react2['default'].createElement(_draftJs.EditorBlock, (0, _assign2['default'])({}, this.props, {
        "className": "imageCaption",
        "placeholder": "escrive alalal"
      }))
    );
  };

  return PlaceholderBlock;
}(_react2['default'].Component);

exports['default'] = PlaceholderBlock;
module.exports = exports['default'];