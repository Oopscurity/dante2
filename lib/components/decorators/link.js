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

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Link = function (_React$Component) {
  (0, _inherits3['default'])(Link, _React$Component);

  function Link(props) {
    (0, _classCallCheck3['default'])(this, Link);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this._validateLink = _this._validateLink.bind(_this);
    _this._checkProtocol = _this._checkProtocol.bind(_this);
    _this._showPopLinkOver = _this._showPopLinkOver.bind(_this);
    _this._hidePopLinkOver = _this._hidePopLinkOver.bind(_this);
    _this.isHover = false;
    return _this;
  }

  Link.prototype._validateLink = function _validateLink() {
    var pattern = new RegExp('^(https?:\/\/)?' + // protocol
    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|' + // domain name
    '((\d{1,3}\.){3}\d{1,3}))' + // OR ip (v4) address
    '(\:\d+)?(\/[-a-z\d%_.~+]*)*' + // port and path
    '(\?[&a-z\d%_.~+=-]*)?' + // query string
    '(\#[-a-z\d_]*)?$', 'i'); // fragment locater
    if (!pattern.test(str)) {
      alert("Please enter a valid URL.");
      return false;
    } else {
      return true;
    }
  };

  Link.prototype._checkProtocol = function _checkProtocol() {
    return console.log("xcvd");
  };

  Link.prototype._showPopLinkOver = function _showPopLinkOver(e) {
    if (!this.data.showPopLinkOver) {
      return;
    }
    return this.data.showPopLinkOver(this.refs.link);
  };

  Link.prototype._hidePopLinkOver = function _hidePopLinkOver(e) {
    if (!this.data.hidePopLinkOver) {
      return;
    }
    return this.data.hidePopLinkOver();
  };

  Link.prototype.render = function render() {
    this.data = _draftJs.Entity.get(this.props.entityKey).getData();

    return _react2['default'].createElement(
      'a',
      {
        ref: 'link',
        href: this.data.url,
        className: 'markup--anchor',
        onMouseOver: this._showPopLinkOver,
        onMouseOut: this._hidePopLinkOver
      },
      this.props.children
    );
  };

  return Link;
}(_react2['default'].Component);

exports['default'] = Link;
module.exports = exports['default'];