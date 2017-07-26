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

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _index = require('../../model/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ImageBlock = function (_React$Component) {
  (0, _inherits3['default'])(ImageBlock, _React$Component);

  function ImageBlock(props) {
    (0, _classCallCheck3['default'])(this, ImageBlock);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.blockPropsSrc = _this.blockPropsSrc.bind(_this);
    _this.defaultUrl = _this.defaultUrl.bind(_this);
    _this.defaultAspectRatio = _this.defaultAspectRatio.bind(_this);
    _this.updateData = _this.updateData.bind(_this);
    _this.replaceImg = _this.replaceImg.bind(_this);
    _this.startLoader = _this.startLoader.bind(_this);
    _this.stopLoader = _this.stopLoader.bind(_this);
    _this.handleUpload = _this.handleUpload.bind(_this);
    _this.aspectRatio = _this.aspectRatio.bind(_this);
    _this.updateDataSelection = _this.updateDataSelection.bind(_this);
    _this.handleGrafFigureSelectImg = _this.handleGrafFigureSelectImg.bind(_this);
    _this.getUploadUrl = _this.getUploadUrl.bind(_this);
    _this.uploadFile = _this.uploadFile.bind(_this);
    _this.uploadFailed = _this.uploadFailed.bind(_this);
    _this.uploadCompleted = _this.uploadCompleted.bind(_this);
    _this.updateProgressBar = _this.updateProgressBar.bind(_this);
    _this.placeHolderEnabled = _this.placeHolderEnabled.bind(_this);
    _this.placeholderText = _this.placeholderText.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.render = _this.render.bind(_this);
    var existing_data = _this.props.block.getData().toJS();

    _this.config = _this.props.blockProps.config;
    _this.file = _this.props.blockProps.data.get('file');
    _this.state = {
      loading: false,
      selected: false,
      loading_progress: 0,
      enabled: false,
      caption: _this.defaultPlaceholder(),
      direction: existing_data.direction || "center",
      width: 0,
      height: 0,
      file: null,
      url: _this.blockPropsSrc() || _this.defaultUrl(existing_data),
      aspect_ratio: _this.defaultAspectRatio(existing_data)
    };
    return _this;
  }

  ImageBlock.prototype.blockPropsSrc = function blockPropsSrc() {
    // console.log @.props.blockProps.data.src
    return this.props.blockProps.data.src;
  };
  /*
  debugger
  block = @.props
  entity = block.block.getEntityAt(0)
  if entity
    data = Entity.get(entity).getData().src
  else
    null
  */

  ImageBlock.prototype.defaultUrl = function defaultUrl(data) {
    if (data.url) {
      return data.url;
    }

    if (data.url) {
      if (data.file) {
        return URL.createObjectURL(data.file);
      } else {
        return data.url;
      }
    } else {
      return this.props.blockProps.data.src;
    }
  };

  ImageBlock.prototype.defaultPlaceholder = function defaultPlaceholder() {
    return this.props.blockProps.config.image_caption_placeholder;
  };

  ImageBlock.prototype.defaultAspectRatio = function defaultAspectRatio(data) {
    if (data.aspect_ratio) {
      return {
        width: data.aspect_ratio['width'],
        height: data.aspect_ratio['height'],
        ratio: data.aspect_ratio['ratio']
      };
    } else {
      return {
        width: 0,
        height: 0,
        ratio: 100
      };
    }
  };

  ImageBlock.prototype.getAspectRatio = function getAspectRatio(w, h) {
    var maxWidth = 1000;
    var maxHeight = 1000;
    var ratio = 0;
    var width = w; // Current image width
    var height = h; // Current image height

    // Check if the current width is larger than the max
    if (width > maxWidth) {
      ratio = maxWidth / width; // get ratio for scaling image
      height = height * ratio; // Reset height to match scaled image
      width = width * ratio; // Reset width to match scaled image

      // Check if current height is larger than max
    } else if (height > maxHeight) {
      ratio = maxHeight / height; // get ratio for scaling image
      width = width * ratio; // Reset width to match scaled image
      height = height * ratio; // Reset height to match scaled image
    }

    var fill_ratio = height / width * 100;
    var result = { width: width, height: height, ratio: fill_ratio
      // console.log result
    };return result;
  };

  // will update block state


  ImageBlock.prototype.updateData = function updateData() {
    var blockProps = this.props.blockProps;
    var block = this.props.block;
    var getEditorState = this.props.blockProps.getEditorState;
    var setEditorState = this.props.blockProps.setEditorState;

    var data = block.getData();
    var newData = data.merge(this.state).merge({ forceUpload: false });
    return setEditorState((0, _index.updateDataOfBlock)(getEditorState(), block, newData));
  };

  ImageBlock.prototype.replaceImg = function replaceImg() {
    var _this2 = this;

    this.img = new Image();
    this.img.src = this.refs.image_tag.src;
    this.setState({
      url: this.img.src });
    var self = this;
    // exit only when not blob and not forceUload
    if (!this.img.src.includes("blob:") && !this.props.block.data.get("forceUpload")) {
      return;
    }
    return this.img.onload = function () {
      _this2.setState({
        width: _this2.img.width,
        height: _this2.img.height,
        aspect_ratio: self.getAspectRatio(_this2.img.width, _this2.img.height)
      });

      return _this2.handleUpload();
    };
  };

  ImageBlock.prototype.startLoader = function startLoader() {
    return this.setState({
      loading: true });
  };

  ImageBlock.prototype.stopLoader = function stopLoader() {
    return this.setState({
      loading: false });
  };

  ImageBlock.prototype.handleUpload = function handleUpload() {
    this.startLoader();
    this.props.blockProps.addLock();
    this.updateData();
    return this.uploadFile();
  };

  ImageBlock.prototype.componentDidMount = function componentDidMount() {
    return this.replaceImg();
  };

  ImageBlock.prototype.aspectRatio = function aspectRatio() {
    return {
      maxWidth: '' + this.state.aspect_ratio.width,
      maxHeight: '' + this.state.aspect_ratio.height,
      ratio: '' + this.state.aspect_ratio.height
    };
  };

  ImageBlock.prototype.updateDataSelection = function updateDataSelection() {
    var _props$blockProps = this.props.blockProps,
        getEditorState = _props$blockProps.getEditorState,
        setEditorState = _props$blockProps.setEditorState;

    var newselection = getEditorState().getSelection().merge({
      anchorKey: this.props.block.getKey(),
      focusKey: this.props.block.getKey()
    });

    return setEditorState(_draftJs.EditorState.forceSelection(getEditorState(), newselection));
  };

  ImageBlock.prototype.handleGrafFigureSelectImg = function handleGrafFigureSelectImg(e) {
    e.preventDefault();
    return this.setState({ selected: true }, this.updateDataSelection);
  };

  //main_editor.onChange(main_editor.state.editorState)

  ImageBlock.prototype.coords = function coords() {
    return {
      maxWidth: this.state.aspect_ratio.width + 'px',
      maxHeight: this.state.aspect_ratio.height + 'px'
    };
  };

  ImageBlock.prototype.getBase64Image = function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");

    return dataURL;
  };

  ImageBlock.prototype.formatData = function formatData() {
    var formData = new FormData();
    if (this.file) {
      var formName = this.config.upload_formName || 'file';

      formData.append(formName, this.file);
      return formData;
    } else {
      formData.append('url', this.props.blockProps.data.get("url"));
      return formData;
    }
  };

  ImageBlock.prototype.getUploadUrl = function getUploadUrl() {
    var url = this.config.upload_url;
    if (typeof url === "function") {
      return url();
    } else {
      return url;
    }
  };

  ImageBlock.prototype.getUploadHeaders = function getUploadHeaders() {
    return this.config.upload_headers || {};
  };

  ImageBlock.prototype.uploadFile = function uploadFile() {
    var _this3 = this;

    var handleUp = void 0;
    // custom upload handler
    if (this.config.upload_handler) {
      return this.config.upload_handler(this.formatData().get('file'), this);
    }

    (0, _axios2['default'])({
      method: 'post',
      url: this.getUploadUrl(),
      headers: this.getUploadHeaders(),
      data: this.formatData(),
      onUploadProgress: function onUploadProgress(e) {
        return _this3.updateProgressBar(e);
      }
    }).then(function (result) {
      _this3.uploadCompleted(result.data.url);

      if (_this3.config.upload_callback) {
        return _this3.config.upload_callback(result, _this3);
      }
    })['catch'](function (error) {
      _this3.uploadFailed();

      console.log('ERROR: got error uploading file ' + error);
      if (_this3.config.upload_error_callback) {
        return _this3.config.upload_error_callback(error, _this3);
      }
    });

    return handleUp = function handleUp(json_response) {
      return _this3.uploadCompleted(json_response.url, n);
    };
  };

  ImageBlock.prototype.uploadFailed = function uploadFailed() {
    this.props.blockProps.removeLock();
    this.stopLoader();
  };

  ImageBlock.prototype.uploadCompleted = function uploadCompleted(url) {
    this.setState({ url: url }, this.updateData);
    this.props.blockProps.removeLock();
    this.stopLoader();
    this.file = null;
  };

  ImageBlock.prototype.updateProgressBar = function updateProgressBar(e) {
    var complete = this.state.loading_progress;
    if (e.lengthComputable) {
      complete = e.loaded / e.total * 100;
      complete = complete != null ? complete : { complete: 0 };
      this.setState({
        loading_progress: complete });
      return console.log('complete: ' + complete);
    }
  };

  ImageBlock.prototype.placeHolderEnabled = function placeHolderEnabled() {
    return this.state.enabled || this.props.block.getText();
  };

  ImageBlock.prototype.placeholderText = function placeholderText() {
    if (this.placeHolderEnabled()) {
      return "";
    }
    return this.config.image_caption_placeholder;
  };

  ImageBlock.prototype.handleFocus = function handleFocus(e) {
    var _this4 = this;

    // console.log "focus on placeholder"
    return setTimeout(function () {
      return _this4.setState({
        enabled: true });
    }, 0);
  };

  ImageBlock.prototype.render = function render() {

    return _react2['default'].createElement(
      'div',
      { ref: 'image_tag2', suppressContentEditableWarning: true },
      _react2['default'].createElement(
        'div',
        { className: 'aspectRatioPlaceholder is-locked',
          style: this.coords(),
          onClick: this.handleGrafFigureSelectImg },
        _react2['default'].createElement('div', { style: { paddingBottom: this.state.aspect_ratio.ratio + '%' },
          className: 'aspect-ratio-fill' }),
        _react2['default'].createElement('img', { src: this.state.url,
          ref: 'image_tag',
          height: this.state.aspect_ratio.height,
          width: this.state.aspect_ratio.width,
          className: 'graf-image' }),
        _react2['default'].createElement(Loader, { toggle: this.state.loading,
          progress: this.state.loading_progress })
      ),
      _react2['default'].createElement(
        'figcaption',
        { className: 'imageCaption', onMouseDown: this.handleFocus },
        !this.state.enabled ? _react2['default'].createElement(
          'span',
          { className: 'danteDefaultPlaceholder' },
          this.placeholderText()
        ) : undefined,
        _react2['default'].createElement(_draftJs.EditorBlock, (0, _assign2['default'])({}, this.props, {
          "editable": true, "className": "imageCaption" }))
      )
    );
  };

  return ImageBlock;
}(_react2['default'].Component);

exports['default'] = ImageBlock;

var Loader = function (_React$Component2) {
  (0, _inherits3['default'])(Loader, _React$Component2);

  function Loader() {
    (0, _classCallCheck3['default'])(this, Loader);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component2.apply(this, arguments));
  }

  Loader.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      null,
      this.props.toggle ? _react2['default'].createElement(
        'div',
        { className: 'image-upoader-loader' },
        _react2['default'].createElement(
          'p',
          null,
          this.props.progress === 100 ? "processing image..." : _react2['default'].createElement(
            'span',
            null,
            _react2['default'].createElement(
              'span',
              null,
              'loading'
            ),
            ' ',
            Math.round(this.props.progress)
          )
        )
      ) : undefined
    );
  };

  return Loader;
}(_react2['default'].Component);

module.exports = exports['default'];