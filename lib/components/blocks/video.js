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

var _index = require('../../model/index.js');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var VideoBlock = function (_React$Component) {
  (0, _inherits3['default'])(VideoBlock, _React$Component);

  function VideoBlock(props) {
    (0, _classCallCheck3['default'])(this, VideoBlock);

    //api_key = "86c28a410a104c8bb58848733c82f840"

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.updateData = _this.updateData.bind(_this);
    _this.dataForUpdate = _this.dataForUpdate.bind(_this);
    _this.state = { embed_data: _this.defaultData() };
    return _this;
  }

  VideoBlock.prototype.defaultData = function defaultData() {
    var existing_data = this.props.block.getData().toJS();
    return existing_data.embed_data || {};
  };

  // will update block state


  VideoBlock.prototype.updateData = function updateData() {
    var _props = this.props,
        block = _props.block,
        blockProps = _props.blockProps;
    var _props$blockProps = this.props.blockProps,
        getEditorState = _props$blockProps.getEditorState,
        setEditorState = _props$blockProps.setEditorState;

    var data = block.getData();
    var newData = data.merge(this.state);
    return setEditorState((0, _index.updateDataOfBlock)(getEditorState(), block, newData));
  };

  VideoBlock.prototype.dataForUpdate = function dataForUpdate() {
    return this.props.blockProps.data.toJS();
  };

  VideoBlock.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (!this.props.blockProps.data) {
      return;
    }
    // ensure data isnt already loaded
    if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
      return;
    }

    return (0, _axios2['default'])({
      method: 'get',
      url: '' + this.dataForUpdate().endpoint + this.dataForUpdate().provisory_text + '&scheme=https'
    }).then(function (result) {
      return _this2.setState({ embed_data: result.data //JSON.parse(data.responseText)
      }, _this2.updateData);
    })['catch'](function (error) {
      return console.log("TODO: error");
    });
  };

  VideoBlock.prototype.classForImage = function classForImage() {
    if (this.state.embed_data.thumbnail_url) {
      return "";
    } else {
      return "mixtapeImage--empty u-ignoreBlock";
    }
  };

  VideoBlock.prototype.render = function render() {
    return _react2['default'].createElement(
      'figure',
      { className: 'graf--figure graf--iframe graf--first', tabIndex: '0' },
      _react2['default'].createElement('div', { className: 'iframeContainer',
        dangerouslySetInnerHTML: { __html: this.state.embed_data.html } }),
      _react2['default'].createElement(
        'figcaption',
        { className: 'imageCaption' },
        _react2['default'].createElement(_draftJs.EditorBlock, (0, _assign2['default'])({}, this.props, { "className": "imageCaption" }))
      )
    );
  };

  return VideoBlock;
}(_react2['default'].Component);

exports['default'] = VideoBlock;
module.exports = exports['default'];