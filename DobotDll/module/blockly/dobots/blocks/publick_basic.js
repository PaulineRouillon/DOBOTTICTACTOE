/**
 * Blockly Demos: Block Factory Blocks
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blocks for Blockly's Block Factory application.
 * @author fraser@google.com (Neil Fraser)
 */

'use strict';

Blockly.Blocks['dobot_home'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_BASEIC_HOME);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_BASEIC_HOME_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_home'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'dType.SetHOMECmdEx(api, 0, 1)\n';
  return code;
};

Blockly.Blocks['dobot_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_BASEIC_TIME);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_BASEIC_TIME_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_time'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'dType.gettime()[0]';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['dobot_selectendtype'] = {
  init: function() {
    this.appendDummyInput("input")
        .appendField(Blockly.Msg.DOBOT_BASEIC_SETENDTYPE)
        .appendField(new Blockly.FieldDropdown(
      [[Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_SUCTIONCAP, "59.7"], 
      [Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_GRIPPER, "59.701"], 
      [Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_LASER, "70"], 
      [Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_PEN, "61"]]), "type");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
    UpdataSelectendTypeBlock(this)
  }
};

Blockly.Python['dobot_selectendtype'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  if (currentDev != "Magician")
  {
    var code = 'dType.SetEndEffectorTypeEx(api, '+dropdown_type+', 1)\n';
  }
  else
  {
    if(dropdown_type == "59.701")
      dropdown_type = "59.7";
    else if (dropdown_type == "93.1")
      dropdown_type = "93";
    // TODO: Assemble Python into code variable.
    var code = 'dType.SetEndEffectorParamsEx(api, '+dropdown_type+', 0, 0, 1)\n';
  }
  // if(dropdown_type == "59.701")
  //     dropdown_type = "59.7";
  // else if (dropdown_type == "93.1")
  //     dropdown_type = "93";
  // // TODO: Assemble Python into code variable.
  // var code = 'dType.SetEndEffectorParamsEx(api, '+dropdown_type+', 0, 0, 1)\n';
  return code;
};

Blockly.Blocks['dobot_SetEndEffectorParams'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_BASEIC_SETENDEFFECTORPARAMS);
    this.appendValueInput("xBias")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_xBias);
    this.appendValueInput("yBias")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_yBias);
    this.appendValueInput("zBias")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_zBias);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_BASEIC_SETENDEFFECTORPARAMS_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_SetEndEffectorParams'] = function(block) {
  var value_xbias = Blockly.Python.valueToCode(block, 'xBias', Blockly.Python.ORDER_ATOMIC) || 0.0;
  var value_ybias = Blockly.Python.valueToCode(block, 'yBias', Blockly.Python.ORDER_ATOMIC) || 0.0;
  var value_zbias = Blockly.Python.valueToCode(block, 'zBias', Blockly.Python.ORDER_ATOMIC) || 0.0;
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetEndEffectorParamsEx(api, '+value_xbias+',  '+value_ybias+',  '+value_zbias+', 1)\n';
  return code;
};

Blockly.Blocks['dobot_setptpjointparams'] = {
  init: function() {
    this.appendValueInput("Velocity")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_SET_JOINT_SPEED)
        .appendField(Blockly.Msg.DOBOT_VELOCITY);
    this.appendValueInput("Acceleration")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_ACCELERATION);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_JOINT_SPEED_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_setptpjointparams'] = function(block) {
  var vel = Blockly.Python.valueToCode(block, 'Velocity', Blockly.Python.ORDER_ATOMIC) || 20;
  var acc = Blockly.Python.valueToCode(block, 'Acceleration', Blockly.Python.ORDER_ATOMIC) || 50;
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetPTPJointParamsEx(api,'+vel+','+acc+','
            +vel+','+acc+','
            +vel+','+acc+','
            +vel+','+acc+',1)\n';
  return code;
};

Blockly.Blocks['dobot_setptpoordinateparams'] = {
  init: function() {
    this.appendValueInput("Velocity")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_SET_COORDINATE_SPEED)
        .appendField(Blockly.Msg.DOBOT_VELOCITY);
    this.appendValueInput("Acceleration")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_ACCELERATION);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_COORDINATE_SPEED_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_setptpoordinateparams'] = function(block) {
  var vel = Blockly.Python.valueToCode(block, 'Velocity', Blockly.Python.ORDER_ATOMIC) || 20;
  var acc = Blockly.Python.valueToCode(block, 'Acceleration', Blockly.Python.ORDER_ATOMIC) || 50;
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetPTPCoordinateParamsEx(api,'+vel+','+acc+','
            +vel+','+acc+',1)\n';
  return code;
};

Blockly.Blocks['dobot_setptplparams'] = {
  init: function() {
    this.appendValueInput("lVelocity")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_SET_L_SPEED)
        .appendField(Blockly.Msg.DOBOT_VELOCITY);
    this.appendValueInput("lAcceleration")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_ACCELERATION);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_JOINT_L_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};
Blockly.Python['dobot_setptplparams'] = function(block) {
  var value_lvelocity = Blockly.Python.valueToCode(block, 'lVelocity', Blockly.Python.ORDER_ATOMIC) || 20;
  var value_lacceleration = Blockly.Python.valueToCode(block, 'lAcceleration', Blockly.Python.ORDER_ATOMIC) || 50;
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetPTPLParamsEx(api,'+value_lvelocity+','+value_lacceleration+',1)\n';
  return code;
};

Blockly.Blocks['dobot_setlinearspeed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_SET_LINEAR_SPEED);
    this.appendValueInput("velocity")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_VELOCITY_RATIO);
    this.appendValueInput("acceleration")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_ACCELERATION_RATIO);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_LINEAR_SPEED_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_setlinearspeed'] = function(block) {
  var value_velocity = Blockly.Python.valueToCode(block, 'velocity', Blockly.Python.ORDER_ATOMIC) || 20;
  var value_acceleration = Blockly.Python.valueToCode(block, 'acceleration', Blockly.Python.ORDER_ATOMIC) || 50;
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetPTPCommonParamsEx(api,'+value_velocity+','+value_acceleration+',1)\n';
  return code;
};

//magician设置机械臂速度比例
Blockly.Blocks['dobot_SetArmSpeedRatio'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_SET_ARM_SPEED_RATIO)
        .appendField(Blockly.Msg.DOBOT_SET_ARM_SPEED_MODE)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_SET_ARM_SPEED_MODE_JOG, "0"], [Blockly.Msg.DOBOT_SET_ARM_SPEED_MODE_OTHER, "1"]]), 'mode')
        .appendField(Blockly.Msg.DOBOT_VELOCITY_RATIO)
        .appendField(new Blockly.FieldNumber('1',(number) => {if (number < 1 || number > 100) return 1}), 'velocity')
        .appendField('%');
    // this.appendValueInput("velocity")
    //     .setCheck("Number")
    //     .appendField(Blockly.Msg.DOBOT_VELOCITY_RATIO);
        // .appendField(new Blockly.FieldNumber('0',(number) => {if (number < 0 || number > 100) return 0}))
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_ARM_SPEED_RATIO_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};
Blockly.Python['dobot_SetArmSpeedRatio'] = function(block) {
  // var value_velocity = Blockly.Python.valueToCode(block, block.getFieldValue('velocity'), Blockly.Python.ORDER_ATOMIC) || 20;
  var value_velocity = block.getFieldValue('velocity');
  var value_mode = block.getFieldValue('mode');
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetArmSpeedRatioEx(api, '+value_mode+', '+value_velocity+', 1)\n';
  return code;
};

Blockly.Blocks['dobot_GetArmSpeedRatio'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_GET_ARM_SPEED_RATIO)
        .appendField(Blockly.Msg.DOBOT_SET_ARM_SPEED_MODE)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_SET_ARM_SPEED_MODE_JOG, "0"], [Blockly.Msg.DOBOT_SET_ARM_SPEED_MODE_OTHER, "1"]]), 'mode');
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_GET_ARM_SPEED_RATIO_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_GetArmSpeedRatio'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_mode = block.getFieldValue('mode');
  var code = 'dType.GetArmSpeedRatio(api, '+value_mode+')[0]';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['dobot_SetLSpeedRatio'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_SET_Liner_SPEED_RATIO)
        .appendField(Blockly.Msg.DOBOT_SET_LinearRail_SPEED_MODE)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_SET_LinearRail_SPEED_MODE_JOG, "0"], [Blockly.Msg.DOBOT_SET_LinearRail_SPEED_MODE_PTP, "1"]]), 'mode')
        .appendField(Blockly.Msg.DOBOT_VELOCITY_RATIO)
        .appendField(new Blockly.FieldNumber('1',(number) => {if (number < 1 || number > 100) return 1}), 'velocity')
        .appendField('%');
    // this.appendValueInput("velocity")
    //     .setCheck("Number")
    //     .appendField(Blockly.Msg.DOBOT_VELOCITY_RATIO);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_Liner_SPEED_RATIO_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};
Blockly.Python['dobot_SetLSpeedRatio'] = function(block) {
  // var value_velocity = Blockly.Python.valueToCode(block, 'velocity', Blockly.Python.ORDER_ATOMIC) || 20;
  var value_mode = block.getFieldValue('mode');
  var value_velocity = block.getFieldValue('velocity');
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetLSpeedRatioEx(api, '+value_mode+', '+value_velocity+',1)\n';
  return code;
};

Blockly.Blocks['dobot_GetLSpeedRatio'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_GET_Liner_SPEED_RATIO)
        .appendField(Blockly.Msg.DOBOT_SET_LinearRail_SPEED_MODE)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_SET_LinearRail_SPEED_MODE_JOG, "0"], [Blockly.Msg.DOBOT_SET_LinearRail_SPEED_MODE_PTP, "1"]]), 'mode');
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_GET_Liner_SPEED_RATIO_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_GetLSpeedRatio'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_mode = block.getFieldValue('mode');
  var code = 'dType.GetLSpeedRatio(api, '+value_mode+')[0]';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['dobot_GetEndEffectorType'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_GET_ENDEFFECTORTYPE);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_GET_ENDEFFECTORTYPE_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_GetEndEffectorType'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'dType.GetEndEffectorType(api)[0]';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// Blockly.Blocks['dobot_SetProgbar'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField(Blockly.Msg.DOBOT_SET_PROGBAR)
//         // .appendField(Blockly.Msg.DOBOT_SET_PROGBAR_VALUE)
//         // .appendField(new Blockly.FieldNumber('0',(number) => {if (number < 0 || number > 100) return 0}), 'velocity')
//     this.appendValueInput("velocity")
//         .setCheck("Number")
//         .appendField(Blockly.Msg.DOBOT_SET_PROGBAR_VALUE);
//     this.appendDummyInput()
//         .appendField('%');
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(330);
//     this.setTooltip(Blockly.Msg.DOBOT_SET_PROGBAR_TOOLTIP);
//     this.setHelpUrl('http://www.dobot.cc/');
//   }
// };
// Blockly.Python['dobot_SetProgbar'] = function(block) {
//   var value_velocity = Blockly.Python.valueToCode(block, 'velocity', Blockly.Python.ORDER_ATOMIC) || 20;
//   // TODO: Assemble Python into code variable.
//   var code = 'dType.SetProgbar(api,'+value_velocity+',1)\n';
//   return code;
// };

Blockly.Blocks['dobot_PrintInfo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_SET_PRINTINFO);
        // .appendField(Blockly.Msg.DOBOT_SET_PRINTINFO_VALUE)
        // .appendField(new Blockly.FieldNumber('0',(number) => {if (number < 0 || number > 100) return 0}), 'velocity')    
    this.appendValueInput("Info")
        .setCheck("String")
        .appendField(Blockly.Msg.DOBOT_SET_PRINTINFO_VALUE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_PRINTINFO_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};
Blockly.Python['dobot_PrintInfo'] = function(block) {
  var value_velocity = Blockly.Python.valueToCode(block, 'Info', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'dType.PrintInfo(api,'+value_velocity+')\n';
  return code;
};

Blockly.Blocks['dobot_setjumpheight'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_SET_JUMP_HEIGHT);
    this.appendValueInput("height")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_height);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_JUMP_HEIGHT_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_setjumpheight'] = function(block) {
  var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC) || 20;
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetPTPJumpParamsEx(api,'+value_height+',100,1)\n';
  return code;
};

// let dev_Magician = "Magician"
// let dev_MagicianLite = "Magician Lite"
// let dev_Controller = "Magic Box+Magician Lite"

function UpdataSelectendTypeBlock(block)
{
  let ioInput = block.getInput("input");
  ioInput.removeField("type");
  let listIOInfo = []
  
  if (currentDev == "Magician")
  {
      listIOInfo = [[Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_SUCTIONCAP, "59.7"], 
      [Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_GRIPPER, "59.701"], 
      [Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_LASER, "70"], 
      [Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_PEN, "61"]];
  }
  else if (currentDev == "Magician Lite")
  {
      listIOInfo = [[Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_SUCTIONCAP, "1"], 
      [Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_GRIPPER, "2"], 
      [Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_PEN, "3"]];
      
  }
  else if (currentDev == "Magic Box+Magician Lite")
  {
      listIOInfo = [[Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_SUCTIONCAP, "1"], 
      [Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_GRIPPER, "2"], 
      [Blockly.Msg.DOBOT_BASEIC_SETENDTYPE_PEN, "3"]];
      
  }
  ioInput.removeField("type")
  ioInput.appendField(new Blockly.FieldDropdown(listIOInfo), "type");
  // block.setFieldValue(1, 'type');
}

function UpdateBasicBlock(block) {
  switch(block.type)
  {
    case "dobot_selectendtype":
      UpdataSelectendTypeBlock(block);
      break;
  }

};
