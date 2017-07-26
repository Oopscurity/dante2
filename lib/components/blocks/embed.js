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

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _index = require('../../model/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var EmbedBlock = function (_React$Component) {
  (0, _inherits3['default'])(EmbedBlock, _React$Component);

  function EmbedBlock(props) {
    (0, _classCallCheck3['default'])(this, EmbedBlock);

    //api_key = "86c28a410a104c8bb58848733c82f840"

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.updateData = _this.updateData.bind(_this);
    _this.dataForUpdate = _this.dataForUpdate.bind(_this);
    _this.componentDidMount = _this.componentDidMount.bind(_this);
    _this.state = {
      embed_data: _this.defaultData(),
      error: ""
    };
    return _this;
  }

  EmbedBlock.prototype.defaultData = function defaultData() {
    var existing_data = this.props.block.getData().toJS();
    return existing_data.embed_data || {};
  };

  // will update block state


  EmbedBlock.prototype.updateData = function updateData() {
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

  EmbedBlock.prototype.dataForUpdate = function dataForUpdate() {

    return this.props.blockProps.data.toJS();
  };

  EmbedBlock.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (!this.props.blockProps.data) {
      return;
    }

    // ensure data isnt already loaded
    // unless @dataForUpdate().endpoint or @dataForUpdate().provisory_text

    if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
      //debugger
      return;
    }

    return (0, _axios2['default'])({
      method: 'get',
      url: '' + this.dataForUpdate().endpoint + this.dataForUpdate().provisory_text + '&scheme=https'
    }).then(function (result) {

      return _this2.setState({ embed_data: result.data //JSON.parse(data.responseText)
      }, _this2.updateData);
    })['catch'](function (error) {

      _this2.setState({
        error: error.response.data.error_message });
      return console.log("TODO: error");
    });
  };

  EmbedBlock.prototype.classForImage = function classForImage() {
    if (this.state.embed_data.images) {
      return "";
    } else {
      return "mixtapeImage--empty u-ignoreBlock";
    }
  };
  //if @state.embed_data.thumbnail_url then "" else "mixtapeImage--empty u-ignoreBlock"

  EmbedBlock.prototype.picture = function picture() {
    if (this.state.embed_data.images && this.state.embed_data.images.length > 0) {
      return this.state.embed_data.images[0].url;
    } else {
      return "";
    }
  };

  EmbedBlock.prototype.render = function render() {
    //block = @.props
    //foo = @.props.blockProps
    //data = Entity.get(block.block.getEntityAt(0)).getData()
    console.log("ERROR", this.state.error);
    return _react2['default'].createElement(
      'span',
      null,
      this.picture() ? _react2['default'].createElement('a', {
        target: '_blank',
        className: 'js-mixtapeImage mixtapeImage ' + this.classForImage(),
        href: this.state.embed_data.url,
        style: { backgroundImage: 'url(\'' + this.picture() + '\')' }
      }) : undefined,
      this.state.error ? _react2['default'].createElement(
        'h2',
        null,
        this.state.error
      ) : undefined,
      _react2['default'].createElement(
        'a',
        {
          className: 'markup--anchor markup--mixtapeEmbed-anchor',
          target: '_blank',
          href: this.state.embed_data.url
        },
        _react2['default'].createElement(
          'strong',
          { className: 'markup--strong markup--mixtapeEmbed-strong' },
          this.state.embed_data.title
        ),
        _react2['default'].createElement(
          'em',
          { className: 'markup--em markup--mixtapeEmbed-em' },
          this.state.embed_data.description
        )
      ),
      this.state.embed_data.provider_url
    );
  };

  return EmbedBlock;
}(_react2['default'].Component);

exports['default'] = EmbedBlock;
module.exports = exports['default'];