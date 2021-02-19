const setBlockIptValue = function(block, blickType, event){
  return function(){
    dobot.jsApi.onAddPoints.connect(function(poseData) {
         if (blickType === 'dobot_setjointangle'){
            block.getInputTargetBlock('Joint1').setFieldValue(poseData[4], 'NUM');
            block.getInputTargetBlock('Joint2').setFieldValue(poseData[5], 'NUM');
            block.getInputTargetBlock('Joint3').setFieldValue(poseData[6], 'NUM');
          } else {
            block.getInputTargetBlock('xBias').setFieldValue(poseData[0], 'NUM');
            block.getInputTargetBlock('yBias').setFieldValue(poseData[1], 'NUM');
            block.getInputTargetBlock('zBias').setFieldValue(poseData[2], 'NUM');
          }
     });
    dobot.jsApi.addPoint();
    // dobot.addPoint();
  };
};

const motionString = [
    'dobot_jumpto',
    'dobot_goto',
    'dobot_setjointangle'
  ];

const commonBlocks = function() {

  const showPostInblock = function(block,blickType, event){
    const disableSingleBlockOption = {
      text: Blockly.Msg.ADDPOINT,
      enabled: true,
      callback: setBlockIptValue(block,blickType, event)
    };
    return disableSingleBlockOption;
  };


  Blockly.BlockSvg.prototype.showContextMenu_ = function(e) {

    if (this.workspace.options.readOnly || !this.contextMenu) {
        return;
      }
      // Save the current block in a variable for use in closures.
      var block = this;
      var menuOptions = [];
      if (this.isDeletable() && this.isMovable() && !block.isInFlyout) {
        // Option to duplicate this block.
        var duplicateOption = {
          text: Blockly.Msg.DUPLICATE_BLOCK,
          enabled: true,
          callback: function() {
            Blockly.duplicate_(block);
          }
        };
        if (this.getDescendants().length > this.workspace.remainingCapacity()) {
          duplicateOption.enabled = false;
        }
        menuOptions.push(duplicateOption);

        if (this.isEditable() && !this.collapsed_ &&
            this.workspace.options.comments) {
          // Option to add/remove a comment.
          var commentOption = {enabled: !goog.userAgent.IE};
          if (this.comment) {
            commentOption.text = Blockly.Msg.REMOVE_COMMENT;
            commentOption.callback = function() {
              block.setCommentText(null);
            };
          } else {
            commentOption.text = Blockly.Msg.ADD_COMMENT;
            commentOption.callback = function() {
              block.setCommentText('');
            };
          }
          menuOptions.push(commentOption);
        }
    
        // Option to make block inline.
        if (!this.collapsed_) {
          for (var i = 1; i < this.inputList.length; i++) {
            if (this.inputList[i - 1].type != Blockly.NEXT_STATEMENT &&
                this.inputList[i].type != Blockly.NEXT_STATEMENT) {
              // Only display this option if there are two value or dummy inputs
              // next to each other.
              var inlineOption = {enabled: true};
              var isInline = this.getInputsInline();
              inlineOption.text = isInline ?
                  Blockly.Msg.EXTERNAL_INPUTS : Blockly.Msg.INLINE_INPUTS;
              inlineOption.callback = function() {
                block.setInputsInline(!isInline);
              };
              menuOptions.push(inlineOption);
              break;
            }
          }
        }
    
        if (this.workspace.options.collapse) {
          // Option to collapse/expand block.
          if (this.collapsed_) {
            var expandOption = {enabled: true};
            expandOption.text = Blockly.Msg.EXPAND_BLOCK;
            expandOption.callback = function() {
              block.setCollapsed(false);
            };
            menuOptions.push(expandOption);
          } else {
            var collapseOption = {enabled: true};
            collapseOption.text = Blockly.Msg.COLLAPSE_BLOCK;
            collapseOption.callback = function() {
              block.setCollapsed(true);
            };
            menuOptions.push(collapseOption);
          }
        }
    
        if (this.workspace.options.disable) {
          // Option to disable/enable block.
          var disableOption = {
            text: this.disabled ?
                Blockly.Msg.ENABLE_BLOCK : Blockly.Msg.DISABLE_BLOCK,
            enabled: !this.getInheritedDisabled(),
            callback: function() {
              block.setDisabled(!block.disabled);
            }
          };
          menuOptions.push(disableOption);
        }
    
        // Option to delete this block.
        // Count the number of blocks that are nested in this block.
        var descendantCount = this.getDescendants().length;
        var nextBlock = this.getNextBlock();
        if (nextBlock) {
          // Blocks in the current stack would survive this block's deletion.
          descendantCount -= nextBlock.getDescendants().length;
        }
        var deleteOption = {
          text: descendantCount == 1 ? Blockly.Msg.DELETE_BLOCK :
              Blockly.Msg.DELETE_X_BLOCKS.replace('%1', String(descendantCount)),
          enabled: true,
          callback: function() {
            Blockly.Events.setGroup(true);
            block.dispose(true, true);
            Blockly.Events.setGroup(false);
          }
        };
        menuOptions.push(deleteOption);

        const blickType = block.type;
        console.log(block.type)
        if (motionString.find(function(item){return item === blickType} )){
            menuOptions.push(showPostInblock(block, blickType, event));
        }

      }
    
      // Option to get help.
      var url = goog.isFunction(this.helpUrl) ? this.helpUrl() : this.helpUrl;
      var helpOption = {enabled: !!url};
      helpOption.text = Blockly.Msg.HELP;
      helpOption.callback = function() {
        block.showHelp_();
      };
      menuOptions.push(helpOption);
    
      // Allow the block to add or modify menuOptions.
      if (this.customContextMenu && !block.isInFlyout) {
        this.customContextMenu(menuOptions);
      }
    
      Blockly.ContextMenu.show(e, menuOptions, this.RTL);
      Blockly.ContextMenu.currentBlock = this;
  };

};
    commonBlocks()