'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _immutable = require('immutable');

var _dante_editor = require('./dante_editor.js');

var _dante_editor2 = _interopRequireDefault(_dante_editor);

var _image = require('./popovers/image');

var _image2 = _interopRequireDefault(_image);

var _link = require('./popovers/link');

var _link2 = _interopRequireDefault(_link);

var _addButton = require('./popovers/addButton');

var _addButton2 = _interopRequireDefault(_addButton);

var _toolTip = require('./popovers/toolTip');

var _toolTip2 = _interopRequireDefault(_toolTip);

var _image3 = require('./blocks/image');

var _image4 = _interopRequireDefault(_image3);

var _embed = require('./blocks/embed');

var _embed2 = _interopRequireDefault(_embed);

var _video = require('./blocks/video');

var _video2 = _interopRequireDefault(_video);

var _placeholder = require('./blocks/placeholder');

var _placeholder2 = _interopRequireDefault(_placeholder);

var _index = require('../model/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Dante = function () {
  Dante.defaultOptions = function defaultOptions(options) {
    // default options
    if (options == null) {
      options = {};
    }
    var defaultOptions = {};
    defaultOptions.el = 'app';
    defaultOptions.content = "";
    defaultOptions.read_only = false;
    defaultOptions.spellcheck = false;
    defaultOptions.title_placeholder = "Title";
    defaultOptions.body_placeholder = "Write your story";
    // @defaultOptions.api_key = "86c28a410a104c8bb58848733c82f840"

    defaultOptions.widgets = [{
      title: 'add an image',
      icon: 'image',
      type: 'image',
      block: _image4['default'],
      editable: true,
      renderable: true,
      breakOnContinuous: true,
      wrapper_class: "graf graf--figure",
      selected_class: "is-selected is-mediaFocused",
      selectedFn: function selectedFn(block) {
        var _block$getData$toJS = block.getData().toJS(),
            direction = _block$getData$toJS.direction;

        switch (direction) {
          case "left":
            return "graf--layoutOutsetLeft";
          case "center":
            return "";
          case "wide":
            return "sectionLayout--fullWidth";
          case "fill":
            return "graf--layoutFillWidth";
        }
      },
      handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
        var editorState = ctx.state.editorState;

        return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
      },
      handleEnterWithText: function handleEnterWithText(ctx, block) {
        var editorState = ctx.state.editorState;

        return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
      },

      widget_options: {
        displayOnInlineTooltip: true,
        insertion: "upload",
        insert_block: "image"
      },
      options: {
        upload_url: options.upload_url,
        upload_headers: options.upload_headers,
        upload_formName: options.upload_formName,
        upload_handler: options.image_upload_handler,
        upload_callback: options.image_upload_callback,
        image_delete_callback: options.image_delete_callback,
        image_caption_placeholder: options.image_caption_placeholder || "Write caption for image (optional)"
      }
    }, {
      icon: 'embed',
      title: 'insert embed',
      type: 'embed',
      block: _embed2['default'],
      editable: true,
      renderable: true,
      breakOnContinuous: true,
      wrapper_class: "graf graf--mixtapeEmbed",
      selected_class: "is-selected is-mediaFocused",
      widget_options: {
        displayOnInlineTooltip: true,
        insertion: "placeholder",
        insert_block: "embed"
      },
      options: {
        endpoint: '//api.embed.ly/1/extract?key=' + options.api_key + '&url=',
        placeholder: 'Paste a link to embed content from another site (e.g. Twitter) and press Enter'
      },
      handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
        var editorState = ctx.state.editorState;

        return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
      },
      handleEnterWithText: function handleEnterWithText(ctx, block) {
        var editorState = ctx.state.editorState;

        return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
      }
    }, {
      icon: 'video',
      title: 'insert video',
      editable: true,
      type: 'video',
      block: _video2['default'],
      renderable: true,
      breakOnContinuous: true,
      wrapper_class: "graf--figure graf--iframe",
      selected_class: " is-selected is-mediaFocused",
      widget_options: {
        displayOnInlineTooltip: true,
        insertion: "placeholder",
        insert_block: "video"
      },
      options: {
        endpoint: '//api.embed.ly/1/oembed?key=' + options.api_key + '&url=',
        placeholder: 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter',
        caption: 'Type caption for embed (optional)'
      },

      handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
        var editorState = ctx.state.editorState;

        return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
      },
      handleEnterWithText: function handleEnterWithText(ctx, block) {
        var editorState = ctx.state.editorState;

        return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
      }
    }, {
      renderable: true,
      editable: true,
      block: _placeholder2['default'],
      type: 'placeholder',
      wrapper_class: "is-embedable",
      selected_class: " is-selected is-mediaFocused",
      widget_options: {
        displayOnInlineTooltip: false
      },
      handleEnterWithText: function handleEnterWithText(ctx, block) {
        var editorState = ctx.state.editorState;

        var data = {
          provisory_text: block.getText(),
          endpoint: block.getData().get('endpoint'),
          type: block.getData().get('type')
        };

        return ctx.onChange((0, _index.resetBlockWithType)(editorState, data.type, data));
      }
    }];

    defaultOptions.tooltips = [{
      ref: 'insert_tooltip',
      component: _toolTip2['default'],
      displayOnSelection: true,
      selectionElements: ["unstyled", "blockquote", "ordered-list", "unordered-list", "unordered-list-item", "ordered-list-item", "code-block", 'header-one', 'header-two', 'header-three', 'header-four'],
      widget_options: {
        placeholder: "Paste or type a link",
        block_types: [
        // {label: 'p', style: 'unstyled'},
        { label: 'h2', style: 'header-one', type: "block" }, { label: 'h3', style: 'header-two', type: "block" }, { label: 'h4', style: 'header-three', type: "block" }, { label: 'blockquote', style: 'blockquote', type: "block" }, { label: 'insertunorderedlist', style: 'unordered-list-item', type: "block" }, { label: 'insertorderedlist', style: 'ordered-list-item', type: "block" }, { label: 'code', style: 'code-block', type: "block" }, { label: 'bold', style: 'BOLD', type: "inline" }, { label: 'italic', style: 'ITALIC', type: "inline" }]
      }
    }, {
      ref: 'add_tooltip',
      component: _addButton2['default']
    }, {
      ref: 'anchor_popover',
      component: _link2['default']
    }, {
      ref: 'image_popover',
      component: _image2['default']
    }];

    defaultOptions.xhr = {
      before_handler: null,
      success_handler: null,
      error_handler: null
    };

    defaultOptions.data_storage = {
      url: null,
      method: "POST",
      success_handler: null,
      failure_handler: null,
      interval: 1500,
      withCredentials: false,
      crossDomain: false,
      headers: {}
    };

    defaultOptions.default_wrappers = [{ className: 'graf--p', block: 'unstyled' }, { className: 'graf--h2', block: 'header-one' }, { className: 'graf--h3', block: 'header-two' }, { className: 'graf--h4', block: 'header-three' }, { className: 'graf--blockquote', block: 'blockquote' }, { className: 'graf--insertunorderedlist', block: 'unordered-list-item' }, { className: 'graf--insertorderedlist', block: 'ordered-list-item' }, { className: 'graf--code', block: 'code-block' }, { className: 'graf--bold', block: 'BOLD' }, { className: 'graf--italic', block: 'ITALIC' }];

    defaultOptions.continuousBlocks = ["unstyled", "blockquote", "ordered-list", "unordered-list", "unordered-list-item", "ordered-list-item", "code-block"];

    defaultOptions.key_commands = {
      "alt-shift": [{ key: 65, cmd: 'add-new-block' }],
      "alt-cmd": [{ key: 49, cmd: 'toggle_block:header-one' }, { key: 50, cmd: 'toggle_block:header-two' }, { key: 53, cmd: 'toggle_block:blockquote' }],
      "cmd": [{ key: 66, cmd: 'toggle_inline:BOLD' }, { key: 73, cmd: 'toggle_inline:ITALIC' }, { key: 75, cmd: 'insert:link' }]
    };

    defaultOptions.character_convert_mapping = {
      '> ': "blockquote",
      '*.': "unordered-list-item",
      '* ': "unordered-list-item",
      '- ': "unordered-list-item",
      '1.': "ordered-list-item",
      '# ': 'header-one',
      '##': 'header-two',
      '==': "unstyled",
      '` ': "code-block"
    };

    return defaultOptions;
  };

  function Dante(options) {
    (0, _classCallCheck3['default'])(this, Dante);

    if (options == null) {
      options = {};
    }
    console.log("init editor Dante!");

    // deep merge on config
    var config = (0, _immutable.Map)((0, _immutable.fromJS)(Dante.defaultOptions(options)));

    this.options = config.mergeDeep(options).toJS();
    console.log(this.options);
  }

  Dante.prototype.getContent = function getContent() {
    return this.options.content;
  };

  Dante.prototype.render = function render() {
    return this.editor = _reactDom2['default'].render(_react2['default'].createElement(_dante_editor2['default'], { content: this.getContent(), config: this.options }), document.getElementById(this.options.el));
  };

  return Dante;
}();
//import Link from './decorators/link'

//import Debug from './debug'
//import findEntities from '../utils/find_entities'


//import { getSelectionRect, getSelection } from "../utils/selection.js"

//import Immutable from 'immutable'


module.exports = Dante;