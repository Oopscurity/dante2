'use strict';

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

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _draftJs = require('draft-js');

var _draftConvert = require('draft-convert');

var _index = require('../model/index.js');

var _link = require('./decorators/link');

var _link2 = _interopRequireDefault(_link);

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

var _find_entities = require('../utils/find_entities');

var _find_entities2 = _interopRequireDefault(_find_entities);

var _save_content = require('../utils/save_content');

var _save_content2 = _interopRequireDefault(_save_content);

var _html2content = require('../utils/html2content');

var _html2content2 = _interopRequireDefault(_html2content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*import ImageBlock from './blocks/image'
import EmbedBlock from './blocks/embed'
import VideoBlock from './blocks/video'
import PlaceholderBlock from './blocks/placeholder'*/

//import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent'

var DanteEditor = function (_React$Component) {
  (0, _inherits3['default'])(DanteEditor, _React$Component);

  function DanteEditor(props) {
    (0, _classCallCheck3['default'])(this, DanteEditor);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.initializeState = _this.initializeState.bind(_this);
    _this.refreshSelection = _this.refreshSelection.bind(_this);
    _this.forceRender = _this.forceRender.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.dispatchChangesToSave = _this.dispatchChangesToSave.bind(_this);
    _this.setPreContent = _this.setPreContent.bind(_this);
    _this.focus = _this.focus.bind(_this);
    _this.getEditorState = _this.getEditorState.bind(_this);
    _this.emitSerializedOutput = _this.emitSerializedOutput.bind(_this);
    _this.decodeEditorContent = _this.decodeEditorContent.bind(_this);
    _this.getTextFromEditor = _this.getTextFromEditor.bind(_this);
    _this.getLocks = _this.getLocks.bind(_this);
    _this.addLock = _this.addLock.bind(_this);
    _this.removeLock = _this.removeLock.bind(_this);
    _this.renderableBlocks = _this.renderableBlocks.bind(_this);
    _this.defaultWrappers = _this.defaultWrappers.bind(_this);
    _this.blockRenderer = _this.blockRenderer.bind(_this);
    _this.handleBlockRenderer = _this.handleBlockRenderer.bind(_this);
    _this.blockStyleFn = _this.blockStyleFn.bind(_this);
    _this.getDataBlock = _this.getDataBlock.bind(_this);
    _this.styleForBlock = _this.styleForBlock.bind(_this);
    _this.handlePasteText = _this.handlePasteText.bind(_this);
    _this.handleTXTPaste = _this.handleTXTPaste.bind(_this);
    _this.handleHTMLPaste = _this.handleHTMLPaste.bind(_this);
    _this.handlePasteImage = _this.handlePasteImage.bind(_this);
    _this.handleDroppedFiles = _this.handleDroppedFiles.bind(_this);
    _this.handleUpArrow = _this.handleUpArrow.bind(_this);
    _this.handleDownArrow = _this.handleDownArrow.bind(_this);
    _this.handleReturn = _this.handleReturn.bind(_this);
    _this.handleBeforeInput = _this.handleBeforeInput.bind(_this);
    _this.handleKeyCommand = _this.handleKeyCommand.bind(_this);
    _this.findCommandKey = _this.findCommandKey.bind(_this);
    _this.KeyBindingFn = _this.KeyBindingFn.bind(_this);
    _this.updateBlockData = _this.updateBlockData.bind(_this);
    _this.setDirection = _this.setDirection.bind(_this);
    _this.toggleEditable = _this.toggleEditable.bind(_this);
    _this.closePopOvers = _this.closePopOvers.bind(_this);
    _this.relocateTooltips = _this.relocateTooltips.bind(_this);
    _this.tooltipsWithProp = _this.tooltipsWithProp.bind(_this);
    _this.tooltipHasSelectionElement = _this.tooltipHasSelectionElement.bind(_this);
    _this.handleShowPopLinkOver = _this.handleShowPopLinkOver.bind(_this);
    _this.handleHidePopLinkOver = _this.handleHidePopLinkOver.bind(_this);
    _this.showPopLinkOver = _this.showPopLinkOver.bind(_this);
    _this.hidePopLinkOver = _this.hidePopLinkOver.bind(_this);
    _this.render = _this.render.bind(_this);
    _this.decorator = new _draftJs.CompositeDecorator([{
      strategy: _find_entities2['default'].bind(null, 'LINK', _this),
      component: _link2['default']
    }]);

    _this.blockRenderMap = (0, _immutable.Map)({
      "image": {
        element: 'figure'
      },
      "video": {
        element: 'figure'
      },
      "embed": {
        element: 'div'
      },
      'unstyled': {
        wrapper: null,
        element: 'div'
      },
      'paragraph': {
        wrapper: null,
        element: 'div'
      },
      'placeholder': {
        wrapper: null,
        element: 'div'
      }

    });

    _this.extendedBlockRenderMap = _draftJs.DefaultDraftBlockRenderMap.merge(_this.blockRenderMap);

    _this.state = {
      editorState: _this.initializeState(),
      read_only: _this.props.config.read_only,
      blockRenderMap: _this.extendedBlockRenderMap,
      locks: 0,
      debug: _this.props.config.debug
    };

    _this.widgets = _this.props.config.widgets;
    _this.tooltips = _this.props.config.tooltips;

    _this.key_commands = _this.props.config.key_commands;

    _this.continuousBlocks = _this.props.config.continuousBlocks;

    _this.block_types = _this.props.config.block_types;

    _this.default_wrappers = _this.props.config.default_wrappers;

    _this.character_convert_mapping = _this.props.config.character_convert_mapping;

    _this.save = new _save_content2['default']({
      getLocks: _this.getLocks,
      config: {
        xhr: _this.props.config.xhr,
        data_storage: _this.props.config.data_storage
      },
      editorState: _this.state.editorState,
      editorContent: _this.emitSerializedOutput()
    });
    return _this;
  }

  DanteEditor.prototype.initializeState = function initializeState() {
    if (this.props.content) {
      //and @.props.content.trim() isnt ""
      return this.decodeEditorContent(this.props.content);
    } else {
      return _draftJs.EditorState.createEmpty(this.decorator);
    }
  };

  DanteEditor.prototype.refreshSelection = function refreshSelection(newEditorState) {
    var editorState = this.state.editorState;
    // Setting cursor position after inserting to content

    var s = this.state.editorState.getSelection();
    var c = editorState.getCurrentContent();
    var focusOffset = s.getFocusOffset();
    var anchorKey = s.getAnchorKey();

    var selectionState = _draftJs.SelectionState.createEmpty(s.getAnchorKey());

    // console.log anchorKey, focusOffset
    selectionState = selectionState.merge({
      anchorOffset: focusOffset,
      focusKey: anchorKey,
      focusOffset: focusOffset
    });

    var newState = _draftJs.EditorState.forceSelection(newEditorState, selectionState);

    return this.onChange(newState);
  };

  DanteEditor.prototype.forceRender = function forceRender(editorState) {
    var selection = this.state.editorState.getSelection();
    var content = editorState.getCurrentContent();
    var newEditorState = _draftJs.EditorState.createWithContent(content, this.decorator);

    return this.refreshSelection(newEditorState);
  };

  DanteEditor.prototype.onChange = function onChange(editorState) {
    var _this2 = this;

    this.setPreContent();
    this.setState({ editorState: editorState });

    var currentBlock = (0, _index.getCurrentBlock)(this.state.editorState);
    var blockType = currentBlock.getType();

    if (!editorState.getSelection().isCollapsed()) {

      var tooltip = this.tooltipsWithProp('displayOnSelection')[0];
      if (!this.tooltipHasSelectionElement(tooltip, blockType)) {
        return;
      }
      this.handleTooltipDisplayOn('displayOnSelection');
    } else {
      this.handleTooltipDisplayOn('displayOnSelection', false);
    }

    setTimeout(function () {
      return _this2.relocateTooltips();
    }, 0);

    return this.dispatchChangesToSave();
  };

  DanteEditor.prototype.dispatchChangesToSave = function dispatchChangesToSave() {
    var _this3 = this;

    clearTimeout(this.saveTimeout);
    return this.saveTimeout = setTimeout(function () {
      return _this3.save.store(_this3.emitSerializedOutput());
    }, 100);
  };

  DanteEditor.prototype.setPreContent = function setPreContent() {
    var content = this.emitSerializedOutput();
    return this.save.editorContent = content;
  };

  DanteEditor.prototype.focus = function focus() {};
  //@props.refs.richEditor.focus()

  DanteEditor.prototype.getEditorState = function getEditorState() {
    return this.state.editorState;
  };

  DanteEditor.prototype.emitSerializedOutput = function emitSerializedOutput() {
    var raw = (0, _draftJs.convertToRaw)(this.state.editorState.getCurrentContent());

    return raw;
  };

  DanteEditor.prototype.decodeEditorContent = function decodeEditorContent(raw_as_json) {
    var new_content = (0, _draftJs.convertFromRaw)(raw_as_json);
    var editorState = void 0;

    return editorState = _draftJs.EditorState.createWithContent(new_content, this.decorator);
  };

  //# title utils


  DanteEditor.prototype.getTextFromEditor = function getTextFromEditor() {
    var c = this.state.editorState.getCurrentContent();
    var out = c.getBlocksAsArray().map(function (o) {
      return o.getText();
    }).join("\n");

    return out;
  };

  DanteEditor.prototype.emitHTML2 = function emitHTML2() {
    var html = void 0;

    return html = (0, _draftConvert.convertToHTML)({
      entityToHTML: function entityToHTML(entity, originalText) {
        if (entity.type === 'LINK') {
          return '<a href="' + entity.data.url + '">' + originalText + '</a>';
        } else {
          return originalText;
        }
      }

    })(this.state.editorState.getCurrentContent());
  };

  DanteEditor.prototype.getLocks = function getLocks() {
    return this.state.locks;
  };

  DanteEditor.prototype.addLock = function addLock() {
    return this.setState({
      locks: this.state.locks += 1 });
  };

  DanteEditor.prototype.removeLock = function removeLock() {
    return this.setState({
      locks: this.state.locks -= 1 });
  };

  DanteEditor.prototype.renderableBlocks = function renderableBlocks() {
    return this.widgets.filter(function (o) {
      return o.renderable;
    }).map(function (o) {
      return o.type;
    });
  };

  DanteEditor.prototype.defaultWrappers = function defaultWrappers(blockType) {
    return this.default_wrappers.filter(function (o) {
      return o.block === blockType;
    }).map(function (o) {
      return o.className;
    });
  };

  DanteEditor.prototype.blockRenderer = function blockRenderer(block) {

    switch (block.getType()) {

      case "atomic":

        var entity = block.getEntityAt(0);
        var entity_type = _draftJs.Entity.get(entity).getType();

        break;
    }

    if (this.renderableBlocks().includes(block.getType())) {
      return this.handleBlockRenderer(block);
    }

    return null;
  };

  DanteEditor.prototype.handleBlockRenderer = function handleBlockRenderer(block) {
    var dataBlock = this.getDataBlock(block);
    if (!dataBlock) {
      return null;
    }

    var read_only = this.state.read_only ? false : null;
    var editable = read_only !== null ? read_only : dataBlock.editable;
    return {
      component: eval(dataBlock.block),
      editable: editable,
      props: {
        data: block.getData(),
        getEditorState: this.getEditorState,
        setEditorState: this.onChange,
        addLock: this.addLock,
        removeLock: this.removeLock,
        getLocks: this.getLocks,
        config: dataBlock.options
      }
    };

    return null;
  };

  DanteEditor.prototype.blockStyleFn = function blockStyleFn(block) {
    var currentBlock = (0, _index.getCurrentBlock)(this.state.editorState);
    var is_selected = currentBlock.getKey() === block.getKey() ? "is-selected" : "";

    if (this.renderableBlocks().includes(block.getType())) {
      return this.styleForBlock(block, currentBlock, is_selected);
    }

    var defaultBlockClass = this.defaultWrappers(block.getType());
    if (defaultBlockClass.length > 0) {
      return 'graf ' + defaultBlockClass[0] + ' ' + is_selected;
    } else {
      return 'graf nana ' + is_selected;
    }
  };

  DanteEditor.prototype.getDataBlock = function getDataBlock(block) {
    return this.widgets.find(function (o) {
      return o.type === block.getType();
    });
  };

  DanteEditor.prototype.styleForBlock = function styleForBlock(block, currentBlock, is_selected) {
    var dataBlock = this.getDataBlock(block);

    if (!dataBlock) {
      return null;
    }

    var selectedFn = dataBlock.selectedFn ? dataBlock.selectedFn(block) : null;
    var selected_class = is_selected ? dataBlock.selected_class : '';

    return dataBlock.wrapper_class + ' ' + selected_class + ' ' + selectedFn;
  };

  DanteEditor.prototype.handleTooltipDisplayOn = function handleTooltipDisplayOn(prop, display) {
    var _this4 = this;

    if (display == null) {
      display = true;
    }

    return setTimeout(function () {
      var items = _this4.tooltipsWithProp(prop);
      return items.map(function (o) {
        _this4.refs[o.ref].display(display);
        return _this4.refs[o.ref].relocate();
      });
    }, 20);
  };

  DanteEditor.prototype.handlePasteText = function handlePasteText(text, html) {

    // https://github.com/facebook/draft-js/issues/685
    /*
    html = "<p>chao</p>
    <avv>aaa</avv>
    <p>oli</p>
    <img src='x'/>"
    */

    // if not html then fallback to default handler

    if (!html) {
      return this.handleTXTPaste(text, html);
    }
    if (html) {
      return this.handleHTMLPaste(text, html);
    }
  };

  DanteEditor.prototype.handleTXTPaste = function handleTXTPaste(text, html) {
    var currentBlock = (0, _index.getCurrentBlock)(this.state.editorState);

    var editorState = this.state.editorState;


    switch (currentBlock.getType()) {
      case "image":case "video":case "placeholder":
        var newContent = _draftJs.Modifier.replaceText(editorState.getCurrentContent(), new _draftJs.SelectionState({
          anchorKey: currentBlock.getKey(),
          anchorOffset: 0,
          focusKey: currentBlock.getKey(),
          focusOffset: 2
        }), text);

        editorState = _draftJs.EditorState.push(editorState, newContent, 'replace-text');

        this.onChange(editorState);

        return true;
      default:
        return false;
    }
  };

  DanteEditor.prototype.handleHTMLPaste = function handleHTMLPaste(text, html) {

    var currentBlock = (0, _index.getCurrentBlock)(this.state.editorState);

    // TODO: make this configurable
    switch (currentBlock.getType()) {
      case "image":case "video":case "placeholder":
        return this.handleTXTPaste(text, html);
        break;
    }

    var newContentState = (0, _html2content2['default'])(html, this.extendedBlockRenderMap);

    var selection = this.state.editorState.getSelection();
    var endKey = selection.getEndKey();

    var content = this.state.editorState.getCurrentContent();
    var blocksBefore = content.blockMap.toSeq().takeUntil(function (v) {
      return v.key === endKey;
    });
    var blocksAfter = content.blockMap.toSeq().skipUntil(function (v) {
      return v.key === endKey;
    }).rest();

    var newBlockKey = newContentState.blockMap.first().getKey();

    var newBlockMap = blocksBefore.concat(newContentState.blockMap, blocksAfter).toOrderedMap();

    var newContent = content.merge({
      blockMap: newBlockMap,
      selectionBefore: selection,
      selectionAfter: selection.merge({
        anchorKey: newBlockKey,
        anchorOffset: 0,
        focusKey: newBlockKey,
        focusOffset: 0,
        isBackward: false
      })
    });

    var pushedContentState = _draftJs.EditorState.push(this.state.editorState, newContent, 'insert-fragment');

    this.onChange(pushedContentState);

    return true;
  };

  DanteEditor.prototype.handlePasteImage = function handlePasteImage(files) {
    var _this5 = this;

    //TODO: check file types
    return files.map(function (file) {
      var opts = {
        url: URL.createObjectURL(file),
        file: file
      };

      return _this5.onChange((0, _index.addNewBlock)(_this5.state.editorState, 'image', opts));
    });
  };

  DanteEditor.prototype.handleDroppedFiles = function handleDroppedFiles(state, files) {
    var _this6 = this;

    return files.map(function (file) {
      var opts = {
        url: URL.createObjectURL(file),
        file: file
      };

      return _this6.onChange((0, _index.addNewBlock)(_this6.state.editorState, 'image', opts));
    });
  };

  DanteEditor.prototype.handleUpArrow = function handleUpArrow(e) {
    var _this7 = this;

    return setTimeout(function () {
      return _this7.forceRender(_this7.state.editorState);
    }, 10);
  };

  DanteEditor.prototype.handleDownArrow = function handleDownArrow(e) {
    var _this8 = this;

    return setTimeout(function () {
      return _this8.forceRender(_this8.state.editorState);
    }, 10);
  };

  DanteEditor.prototype.handleReturn = function handleReturn(e) {
    if (this.props.handleReturn) {
      if (this.props.handleReturn()) {
        return true;
      }
    }

    var editorState = this.state.editorState;


    if (!e.altKey && !e.metaKey && !e.ctrlKey) {
      var currentBlock = (0, _index.getCurrentBlock)(editorState);
      var blockType = currentBlock.getType();
      var selection = editorState.getSelection();

      var config_block = this.getDataBlock(currentBlock);

      if (currentBlock.getText().length === 0) {

        if (config_block && config_block.handleEnterWithoutText) {
          config_block.handleEnterWithText(this, currentBlock);
          this.closePopOvers();
          return true;
        }

        //TODO turn this in configurable
        switch (blockType) {
          case "header-one":
            this.onChange((0, _index.resetBlockWithType)(editorState, "unstyled"));
            return true;
            break;
          default:
            return false;
        }
      }

      if (currentBlock.getText().length > 0) {

        if (blockType === "unstyled") {
          // hack hackety hack
          // https://github.com/facebook/draft-js/issues/304
          var newContent = _draftJs.Modifier.splitBlock(this.state.editorState.getCurrentContent(), this.state.editorState.getSelection());

          var newEditorState = _draftJs.EditorState.push(this.state.editorState, newContent, 'insert-characters');
          this.onChange(newEditorState);

          setTimeout(function () {
            //TODO: check is element is in viewport
            var a = document.getElementsByClassName("is-selected");
            var pos = a[0].getBoundingClientRect();
            return window.scrollTo(0, pos.top + window.scrollY - 100);
          }, 0);

          return true;
        }

        if (config_block && config_block.handleEnterWithText) {
          config_block.handleEnterWithText(this, currentBlock);
          this.closePopOvers();
          return true;
        }

        if (currentBlock.getLength() === selection.getStartOffset()) {
          if (this.continuousBlocks.indexOf(blockType) < 0) {
            this.onChange((0, _index.addNewBlockAt)(editorState, currentBlock.getKey()));
            return true;
          }
        }

        return false;
      }

      // selection.isCollapsed() and # should we check collapsed here?
      if (currentBlock.getLength() === selection.getStartOffset()) {
        //or (config_block && config_block.breakOnContinuous))
        // it will match the unstyled for custom blocks
        if (this.continuousBlocks.indexOf(blockType) < 0) {
          this.onChange((0, _index.addNewBlockAt)(editorState, currentBlock.getKey()));
          return true;
        }
        return false;
      }

      return false;
    }
  };

  //return false

  // TODO: make this configurable


  DanteEditor.prototype.handleBeforeInput = function handleBeforeInput(chars) {
    var currentBlock = (0, _index.getCurrentBlock)(this.state.editorState);
    var blockType = currentBlock.getType();
    var selection = this.state.editorState.getSelection();

    var editorState = this.state.editorState;

    // close popovers

    if (currentBlock.getText().length !== 0) {
      //@closeInlineButton()
      this.closePopOvers();
    }

    // handle space on link
    var endOffset = selection.getEndOffset();
    var endKey = currentBlock.getEntityAt(endOffset - 1);
    var endEntityType = endKey && _draftJs.Entity.get(endKey).getType();
    var afterEndKey = currentBlock.getEntityAt(endOffset);
    var afterEndEntityType = afterEndKey && _draftJs.Entity.get(afterEndKey).getType();

    // will insert blank space when link found
    if (chars === ' ' && endEntityType === 'LINK' && afterEndEntityType !== 'LINK') {
      var newContentState = _draftJs.Modifier.insertText(editorState.getCurrentContent(), selection, ' ');
      var newEditorState = _draftJs.EditorState.push(editorState, newContentState, 'insert-characters');
      this.onChange(newEditorState);
      return true;
    }

    // block transform
    if (blockType.indexOf('atomic') === 0) {
      return false;
    }

    var blockLength = currentBlock.getLength();
    if (selection.getAnchorOffset() > 1 || blockLength > 1) {
      return false;
    }

    var blockTo = this.character_convert_mapping[currentBlock.getText() + chars];

    console.log('BLOCK TO SHOW: ' + blockTo);

    if (!blockTo) {
      return false;
    }

    this.onChange((0, _index.resetBlockWithType)(editorState, blockTo));

    return true;
  };

  // TODO: make this configurable


  DanteEditor.prototype.handleKeyCommand = function handleKeyCommand(command) {
    var editorState = this.state.editorState;

    var currentBlockType = void 0,
        newBlockType = void 0;

    if (this.props.handleKeyCommand && this.props.handleKeyCommand(command)) {
      return true;
    }

    if (command === 'add-new-block') {
      this.onChange((0, _index.addNewBlock)(editorState, 'blockquote'));
      return true;
    }

    var block = (0, _index.getCurrentBlock)(editorState);

    if (command.indexOf('toggle_inline:') === 0) {
      newBlockType = command.split(':')[1];
      currentBlockType = block.getType();
      this.onChange(_draftJs.RichUtils.toggleInlineStyle(editorState, newBlockType));
      return true;
    }

    if (command.indexOf('toggle_block:') === 0) {
      newBlockType = command.split(':')[1];
      currentBlockType = block.getType();

      this.onChange(_draftJs.RichUtils.toggleBlockType(editorState, newBlockType));
      return true;
    }

    var newState = _draftJs.RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }

    return false;
  };

  DanteEditor.prototype.findCommandKey = function findCommandKey(opt, command) {
    // console.log "COMMAND find: #{opt} #{command}"
    return this.key_commands[opt].find(function (o) {
      return o.key === command;
    });
  };

  DanteEditor.prototype.KeyBindingFn = function KeyBindingFn(e) {

    //⌘ + B / Ctrl + B   Bold
    //⌘ + I / Ctrl + I   Italic
    //⌘ + K / Ctrl + K   Turn into link
    //⌘ + Alt + 1 / Ctrl + Alt + 1   Header
    //⌘ + Alt + 2 / Ctrl + Alt + 2   Sub-Header
    //⌘ + Alt + 5 / Ctrl + Alt + 5   Quote (Press once for a block quote, again for a pull quote and a third time to turn off quote)

    var cmd = void 0;
    if (e.altKey) {
      if (e.shiftKey) {
        cmd = this.findCommandKey("alt-shift", e.which);
        if (cmd) {
          return cmd.cmd;
        }

        return (0, _draftJs.getDefaultKeyBinding)(e);
      }

      if (e.ctrlKey || e.metaKey) {
        cmd = this.findCommandKey("alt-cmd", e.which);
        if (cmd) {
          return cmd.cmd;
        }
        return (0, _draftJs.getDefaultKeyBinding)(e);
      }
    } else if (e.ctrlKey || e.metaKey) {
      cmd = this.findCommandKey("cmd", e.which);
      if (cmd) {
        return cmd.cmd;
      }
      return (0, _draftJs.getDefaultKeyBinding)(e);
    }

    return (0, _draftJs.getDefaultKeyBinding)(e);
  };

  // will update block state todo: movo to utils


  DanteEditor.prototype.updateBlockData = function updateBlockData(block, options) {
    var data = block.getData();
    var newData = data.merge(options);
    var newState = (0, _index.updateDataOfBlock)(this.state.editorState, block, newData);
    // this fixes enter from image caption
    return this.forceRender(newState);
  };

  DanteEditor.prototype.setDirection = function setDirection(direction_type) {
    var contentState = this.state.editorState.getCurrentContent();
    var selectionState = this.state.editorState.getSelection();
    var block = contentState.getBlockForKey(selectionState.anchorKey);

    return this.updateBlockData(block, { direction: direction_type });
  };

  //# read only utils


  DanteEditor.prototype.toggleEditable = function toggleEditable() {
    this.closePopOvers();

    return this.setState({ read_only: !this.state.read_only }, this.testEmitAndDecode);
  };

  DanteEditor.prototype.closePopOvers = function closePopOvers() {
    var _this9 = this;

    return this.tooltips.map(function (o) {
      return _this9.refs[o.ref].hide();
    });
  };

  DanteEditor.prototype.relocateTooltips = function relocateTooltips() {
    var _this10 = this;

    if (this.state.read_only) return;

    return this.tooltips.map(function (o) {
      return _this10.refs[o.ref].relocate();
    });
  };

  DanteEditor.prototype.tooltipsWithProp = function tooltipsWithProp(prop) {
    return this.tooltips.filter(function (o) {
      return o[prop];
    });
  };

  DanteEditor.prototype.tooltipHasSelectionElement = function tooltipHasSelectionElement(tooltip, element) {
    return tooltip.selectionElements.includes(element);
  };

  //################################
  // TODO: this methods belongs to popovers/link
  //################################

  DanteEditor.prototype.handleShowPopLinkOver = function handleShowPopLinkOver(e) {
    return this.showPopLinkOver();
  };

  DanteEditor.prototype.handleHidePopLinkOver = function handleHidePopLinkOver(e) {
    return this.hidePopLinkOver();
  };

  DanteEditor.prototype.showPopLinkOver = function showPopLinkOver(el) {
    // handles popover display
    // using anchor or from popover

    var parent_el = _reactDom2['default'].findDOMNode(this);

    // set url first in order to calculate popover width
    var coords = void 0;
    this.refs.anchor_popover.setState({ url: el ? el.href : this.refs.anchor_popover.state.url });

    if (el) {
      coords = this.refs.anchor_popover.relocate(el);
    }

    if (coords) {
      this.refs.anchor_popover.setPosition(coords);
    }

    this.refs.anchor_popover.setState({ show: true });

    this.isHover = true;
    return this.cancelHide();
  };

  DanteEditor.prototype.hidePopLinkOver = function hidePopLinkOver() {
    var _this11 = this;

    return this.hideTimeout = setTimeout(function () {
      return _this11.refs.anchor_popover.hide();
    }, 300);
  };

  DanteEditor.prototype.cancelHide = function cancelHide() {
    // console.log "Cancel Hide"
    return clearTimeout(this.hideTimeout);
  };

  //##############################

  DanteEditor.prototype.render = function render() {
    var _this12 = this;

    return _react2['default'].createElement(
      'div',
      { id: 'content', suppressContentEditableWarning: true },
      _react2['default'].createElement(
        'article',
        { className: 'postArticle' },
        _react2['default'].createElement(
          'div',
          { className: 'postContent' },
          _react2['default'].createElement(
            'div',
            { className: 'notesSource' },
            _react2['default'].createElement(
              'div',
              { id: 'editor', className: 'postField postField--body' },
              _react2['default'].createElement(
                'section',
                { className: 'section--first section--last' },
                _react2['default'].createElement(
                  'div',
                  { className: 'section-divider layoutSingleColumn' },
                  _react2['default'].createElement('hr', { className: 'section-divider' })
                ),
                _react2['default'].createElement(
                  'div',
                  { className: 'section-content' },
                  _react2['default'].createElement(
                    'div',
                    { ref: 'richEditor', className: 'section-inner layoutSingleColumn',
                      onClick: this.focus },
                    _react2['default'].createElement(_draftJs.Editor, {
                      blockRendererFn: this.blockRenderer,
                      editorState: this.state.editorState,
                      onChange: this.onChange,
                      onUpArrow: this.handleUpArrow,
                      onDownArrow: this.handleDownArrow,
                      handleReturn: this.handleReturn,
                      blockRenderMap: this.state.blockRenderMap,
                      blockStyleFn: this.blockStyleFn,
                      handlePastedText: this.handlePasteText,
                      handlePastedFiles: this.handlePasteImage,
                      handleDroppedFiles: this.handleDroppedFiles,
                      handleKeyCommand: this.handleKeyCommand,
                      keyBindingFn: this.KeyBindingFn,
                      handleBeforeInput: this.handleBeforeInput,
                      readOnly: this.state.read_only,
                      placeholder: this.props.config.body_placeholder,
                      ref: 'editor'
                    })
                  )
                )
              )
            )
          )
        )
      ),
      this.tooltips.map(function (o, i) {
        return _react2['default'].createElement(o.component, {
          ref: o.ref,
          key: i,
          editor: _this12,
          editorState: _this12.state.editorState,
          onChange: _this12.onChange,
          configTooltip: o,
          widget_options: o.widget_options,
          showPopLinkOver: _this12.showPopLinkOver,
          hidePopLinkOver: _this12.hidePopLinkOver,
          handleOnMouseOver: _this12.handleShowPopLinkOver,
          handleOnMouseOut: _this12.handleHidePopLinkOver
        });
      }),
      this.state.debug ? _react2['default'].createElement(_debug2['default'], { locks: this.state.locks, editor: this }) : undefined
    );
  };

  return DanteEditor;
}(_react2['default'].Component);

//import DanteImagePopover from './popovers/image'
//import DanteAnchorPopover from './popovers/link'

//import { getSelectionRect, getSelection } from "../utils/selection.js"
//import DanteInlineTooltip from './popovers/addButton'
//import DanteTooltip from './popovers/toolTip'


//import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor'

module.exports = DanteEditor;