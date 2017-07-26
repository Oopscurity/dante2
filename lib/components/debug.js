"use strict";

exports.__esModule = true;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Debug = function (_React$Component) {
  (0, _inherits3["default"])(Debug, _React$Component);

  function Debug() {
    (0, _classCallCheck3["default"])(this, Debug);

    var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this));

    _this.handleToggleReadOnly = _this.handleToggleReadOnly.bind(_this);
    _this.handleTestEmitAndDecode = _this.handleTestEmitAndDecode.bind(_this);
    _this.handleTestEmitTEXT = _this.handleTestEmitTEXT.bind(_this);
    _this.testEmitAndDecode = _this.testEmitAndDecode.bind(_this);
    _this.testEmitTEXT = _this.testEmitTEXT.bind(_this);
    _this.logState = _this.logState.bind(_this);
    _this.toggleDisplay = _this.toggleDisplay.bind(_this);
    _this.open = _this.open.bind(_this);
    _this.render = _this.render.bind(_this);
    _this.state = {
      output: "",
      display: "none"
    };
    return _this;
  }

  Debug.prototype.handleToggleReadOnly = function handleToggleReadOnly(e) {
    e.preventDefault();
    this.props.editor.toggleEditable();
    return false;
  };

  Debug.prototype.handleTestEmitAndDecode = function handleTestEmitAndDecode(e) {
    e.preventDefault();
    return this.testEmitAndDecode();
  };

  Debug.prototype.handleTestEmitTEXT = function handleTestEmitTEXT(e) {
    e.preventDefault();
    return this.testEmitTEXT();
  };

  Debug.prototype.testEmitAndDecode = function testEmitAndDecode(e) {
    var raw_as_json = this.props.editor.emitSerializedOutput();
    this.props.editor.setState({
      editorState: this.props.editor.decodeEditorContent(raw_as_json) }, this.logState((0, _stringify2["default"])(raw_as_json)));
    return false;
  };

  Debug.prototype.testEmitTEXT = function testEmitTEXT() {
    var text = this.props.editor.getTextFromEditor();
    return this.logState(text);
  };

  Debug.prototype.logState = function logState(raw) {
    return this.setState({ output: raw }, this.open);
  };

  Debug.prototype.toggleDisplay = function toggleDisplay(e) {
    e.preventDefault();
    var d = this.state.display === "block" ? "none" : this.state.display;
    return this.setState({
      display: d });
  };

  Debug.prototype.open = function open() {
    return this.setState({
      display: "block" });
  };

  Debug.prototype.render = function render() {
    return _react2["default"].createElement(
      "div",
      null,
      _react2["default"].createElement(
        "div",
        { className: "debugControls" },
        _react2["default"].createElement(
          "ul",
          null,
          _react2["default"].createElement(
            "li",
            null,
            " LOCKS: ",
            this.props.editor.state.locks,
            " "
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "a",
              { href: "#", onClick: this.handleToggleReadOnly },
              "EDITABLE: ",
              this.props.editor.state.read_only ? 'NO' : 'YES'
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "a",
              { href: "#", onClick: this.handleTestEmitTEXT },
              "EDITOR TEXT"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "a",
              { href: "#", onClick: this.handleTestEmitAndDecode },
              "EDITOR STATE"
            )
          )
        )
      ),
      _react2["default"].createElement(
        "div",
        { className: "debugZone", style: { display: this.state.display } },
        _react2["default"].createElement("a", { href: "#", className: "dante-debug-close close", onClick: this.toggleDisplay }),
        _react2["default"].createElement(
          "div",
          { className: "debugOutput" },
          _react2["default"].createElement(
            "h2",
            null,
            "EDITOR OUTPUT"
          ),
          this.state.output.length > 0 ? _react2["default"].createElement(
            "pre",
            null,
            this.state.output
          ) : undefined
        )
      )
    );
  };

  return Debug;
}(_react2["default"].Component);

exports["default"] = Debug;
module.exports = exports["default"];