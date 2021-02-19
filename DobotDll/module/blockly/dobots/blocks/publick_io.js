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
//Blockly.Python.definitions_['import_random'] = 'import random';
'use strict';
Blockly.Blocks['dobot_linearRail'] = {
  init: function() {
    this.appendDummyInput("ioInput")
        .appendField(Blockly.Msg.DOBOT_SET_LINEAR_RAIL)
        .appendField(Blockly.Msg.DOBOT_ENABELD)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_OFF, "0"], [Blockly.Msg.DOBOT_ON, "1"]]), "enable")
        .appendField(Blockly.Msg.DOBOT_VERSION, "text")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_OLD, "0"], [Blockly.Msg.DOBOT_NEW, "1"]]), "version");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_LINEAR_RAIL_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
    UpdateLinearRail(this)
  }
};

Blockly.Python['dobot_linearRail'] = function(block) {
  var isEnable = block.getFieldValue('enable');
  var version = block.getFieldValue('version');
  // TODO: Assemble Python into code variable.
  if (currentDev != dev_Magician)
  {
    var code = 'dType.SetDeviceWithL(api, '+isEnable+', 1)\nmain.btnProcess("CheckLinearRail", "")\n';
  } 
  else
  {
    var code = 'dType.SetDeviceWithL(api, '+isEnable+', '+version+')\nmain.process.emit("CheckLinearRail", "")\n';
  }  
  return code;
};

Blockly.Blocks['dobot_conveyor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_SET_CONVEYOR)
        .appendField(Blockly.Msg.DOBOT_MOTOR)
        .appendField(new Blockly.FieldDropdown([["STEPPER1", "0"], ["STEPPER2", "1"]]), "io");
    this.appendValueInput("speed")
        .setCheck("Number")
        .appendField(Blockly.Msg.Dobot_Speed);
    this.appendDummyInput()
        .appendField("mm/s");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_CONVEYOR_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_conveyor'] = function(block) {
  var dropdown_io = block.getFieldValue('io');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC) || 50.0;
  var isEnable = (speed != 0) ? 1 : 0;
  // TODO: Assemble Python into code variable.
  if (currentDev != dev_Magician)          //如果有设备下拉框
  {
    var code = 'STEP_PER_CRICLE = 360.0 / 1.8 * 10.0 * 16.0\nMM_PER_CRICLE = 3.1415926535898 * 36.0\nvel = float('+speed+') * STEP_PER_CRICLE / MM_PER_CRICLE\ndType.SetEMotorExtEx(api, '+dropdown_io+', '+isEnable+', int(vel), 1)\n';
  }
  else
  var code = 'STEP_PER_CRICLE = 360.0 / 1.8 * 10.0 * 16.0\nMM_PER_CRICLE = 3.1415926535898 * 36.0\nvel = float('+speed+') * STEP_PER_CRICLE / MM_PER_CRICLE\ndType.SetEMotorEx(api, '+dropdown_io+', '+isEnable+', int(vel), 1)\n';
   
  return code;
};

Blockly.Blocks['dobot_SetServoAngle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_SET_SERVOANGLE)
        .appendField(Blockly.Msg.DOBOT_SERVO_PORT)
        .appendField(new Blockly.FieldDropdown([["PORT1", "0"], ["PORT2", "1"], ["PORT3", "2"], ["PORT4", "3"], ["PORT5", "4"], ["PORT6", "5"]]), "io");
    this.appendValueInput("angle")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_SERVO_ANGLE_VALUE);
    this.appendDummyInput()
        .appendField("°");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_SERVOANGLE_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_SetServoAngle'] = function(block) {
  var dropdown_io = block.getFieldValue('io');
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC) || 50.0;
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetServoAngleEx(api, '+dropdown_io+', '+angle+', 1)\n'; 
  return code;
};

Blockly.Blocks['dobot_GetServoAngle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_GET_SERVOANGLE)
        .appendField(Blockly.Msg.DOBOT_SERVO_PORT)
        .appendField(new Blockly.FieldDropdown([["PORT1", "0"], ["PORT2", "1"], ["PORT3", "2"], ["PORT4", "3"], ["PORT5", "4"], ["PORT6", "5"]]), "port");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_GET_SERVOANGLE_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_GetServoAngle'] = function(block) {
  // TODO: Assemble Python into code variable.
  var port = block.getFieldValue('port');
  var code = 'dType.GetServoAngle(api,'+ port +')[0]';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['dobot_setemotor'] = {
  init: function() {
    this.appendDummyInput("ioInput")
        .appendField(Blockly.Msg.DOBOT_SET_MOTOR)
        .appendField(Blockly.Msg.DOBOT_MOTOR, 'DOBOT_MOTOR')
        .appendField(new Blockly.FieldDropdown([["STEPPER1", "0"], ["STEPPER2", "1"]]), "io");
    this.appendValueInput("speed")
        .setCheck("Number")
        .appendField(Blockly.Msg.Dobot_Speed);
    this.appendDummyInput()
        .appendField("pulse/s");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_MOTOR_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
    // UpdateSetemotor(this);
  }
};

Blockly.Python['dobot_setemotor'] = function(block) {
  var dropdown_io = block.getFieldValue('io');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC) || 10000;
  var isEnable = (speed != 0) ? 1 : 0;
  // TODO: Assemble Python into code variable.
  if (currentDev != dev_Magician)          //如果有设备下拉框
  {
    var code = 'dType.SetEMotorExtEx(api, '+dropdown_io+', '+isEnable+', '+speed+', 1)\n';
  }
  else{
    var code = 'dType.SetEMotorEx(api, '+dropdown_io+', '+isEnable+', '+speed+', 1)\n';
  }
  
  return code;
};

Blockly.Blocks['dobot_setemotors'] = {
  init: function() {
    this.appendDummyInput("ioInput")
        .appendField(Blockly.Msg.DOBOT_SET_MOTORS, 'DOBOT_SET_MOTORS')
        .appendField(Blockly.Msg.DOBOT_MOTOR, 'DOBOT_MOTOR')
        .appendField(new Blockly.FieldDropdown([["STEPPER1", "0"], ["STEPPER2", "1"]]), "io");
    this.appendValueInput("speed")
        .setCheck("Number")
        .appendField(Blockly.Msg.Dobot_Speed);
    this.appendDummyInput()
        .appendField("pulse/s");
    this.appendValueInput("distance")
        .setCheck("Number")
        .appendField(Blockly.Msg.Dobot_DISTANCE);
    this.appendDummyInput()
        .appendField("pulse");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_MOTORS_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
    // UpdateSetemotors(this)
  }
};

Blockly.Python['dobot_setemotors'] = function(block) {
  var dropdown_io = block.getFieldValue('io');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC) || 10000;
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.Python.ORDER_ATOMIC) || 10000;
  var isEnable = (speed != 0 && distance > 0) ? 1 : 0;
  // TODO: Assemble Python into code variable.
  if (currentDev != dev_Magician)          //如果有设备下拉框
  {
    var code = 'dType.SetEMotorSExtEx(api, '+dropdown_io+', '+isEnable+', '+speed+', '+distance+', 1)\n';
  }
  else{
    var code = 'dType.SetEMotorSEx(api, '+dropdown_io+', '+isEnable+', '+speed+', '+distance+', 1)\n';
  }
  
  return code;
};

Blockly.Blocks['dobot_get_adc'] = {
  init: function() {
    this.appendDummyInput("ioInput")
        .appendField(Blockly.Msg.DOBOT_GET_ADC)
        .appendField("EIO", "EIO")
        .appendField(new Blockly.FieldDropdown([["EIO01", "1"], ["EIO05", "5"], ["EIO07", "7"], ["EIO09", "9"], ["EIO12", "12"], ["EIO15", "15"]]), "io");
    this.setInputsInline(true);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_GET_INPUT_EIO_TOOLTIP);
    this.setHelpUrl('http://www.example.com/');
    UpdateADCBlock(this);
  }
};

Blockly.Python['dobot_get_adc'] = function(block) {
  var dropdown_name = block.getFieldValue('io');
  // TODO: Assemble Python into code variable.
 if (currentDev != dev_Magician)          //如果有设备下拉框
  {
    var code = 'dType.GetIOADCExt(api, '+dropdown_name+')[0]';
  }
  else
    var code = 'dType.GetIOADC(api, '+dropdown_name+')[0]';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['dobot_setiopwm'] = {
  init: function() {
    this.appendDummyInput('ioInput')
        .appendField(Blockly.Msg.DOBOT_SET_PWM)
        .appendField("EIO", "EIO")
        .appendField(new Blockly.FieldDropdown([["EIO04", "4"], ["EIO06", "6"], ["EIO08", "8"], ["EIO11", "11"], ["EIO14", "14"]]), "io");
    this.appendValueInput("frequency")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_FREQUENCY);
    this.appendValueInput("dutyCycle")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_DUTYCYCLE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_PWM_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
    UpdataSetPWMBlock(this)
  }
};

Blockly.Python['dobot_setiopwm'] = function(block) {
  var dropdown_io = block.getFieldValue('io');
  var frequency = Blockly.Python.valueToCode(block, 'frequency', Blockly.Python.ORDER_ATOMIC) || 1;
  var dutyCycle = Blockly.Python.valueToCode(block, 'dutyCycle', Blockly.Python.ORDER_ATOMIC) || 40;
  // var dropdown_DevTypeValue = block.getFieldValue('UpdataSetPWM');
  // TODO: Assemble Python into code variable.
  if (currentDev != dev_Magician)
  {
    var code = 'dType.SetIOPWMExtEx(api,'+dropdown_io+', '+frequency+', '+dutyCycle+', 1)\n';
  } 
  else
  {
    var code = 'dType.SetIOPWMEx(api, '+dropdown_io+', '+frequency+', '+dutyCycle+', 1)\n';
  }
  return code;
};

Blockly.Blocks['dobot_getiopwm'] = {
  init: function() {
    this.appendDummyInput("ioInput")
        .appendField(Blockly.Msg.DOBOT_GET_PWM)
        .appendField(new Blockly.FieldDropdown([["EIO04", "4"], ["EIO06", "6"], ["EIO08", "8"], ["EIO11", "11"], ["EIO14", "14"]]), "io")
        .appendField(Blockly.Msg.DOBOT_Value, "text")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_FREQUENCY, "0"], [Blockly.Msg.DOBOT_DUTYCYCLE, "1"]]), "value");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_GET_PWM_TOOLTIP);
    this.setHelpUrl('http://www.example.com/');
//    UpdatePWMBlock(this, 'init');
  }
};

Blockly.Python['dobot_getiopwm'] = function(block) {
  var dropdown_name = block.getFieldValue('io');
  var dropdown_value = block.getFieldValue('value');
  // TODO: Assemble Python into code variable.
  if (currentDev != dev_Magician)
  {
    var code = 'dType.GetIOPWMExt(api, '+dropdown_name+')['+dropdown_value+']';
  } 
  else
    var code = 'dType.GetIOPWM(api, '+dropdown_name+')['+dropdown_value+']';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['dobot_get_input'] = {
  init: function() {
    this.appendDummyInput("ioInput")
        .appendField(Blockly.Msg.DOBOT_GET_INPUT_EIO)
        .appendField("EIO", "EIO")
        .appendField(new Blockly.FieldDropdown([["EIO01", "1"], ["EIO04", "4"], ["EIO5", "5"], ["EIO06", "6"], ["EIO07", "7"], ["EIO08", "8"], ["EIO09", "9"], ["EIO11", "11"], ["EIO12", "12"], ["EIO14", "14"], ["EIO15", "15"], ["EIO18", "18"], ["EIO19", "19"], ["EIO20", "20"]]), "io");
    this.setInputsInline(true);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_GET_INPUT_EIO_TOOLTIP);
    this.setHelpUrl('http://www.example.com/');
    UpdateInput3VBlock(this);
  }
};

Blockly.Python['dobot_get_input'] = function(block) {
  var dropdown_name = block.getFieldValue('io');
  // var dropdown_DevTypeValue = block.getFieldValue('UpdateInput3V');
  // TODO: Assemble Python into code variable.
  if (currentDev != dev_Magician)           //如果有设备下拉框
  {
    var code = 'dType.GetIODIExt(api, '+dropdown_name+')[0]';
  }
  else
    var code = 'dType.GetIODI(api, '+dropdown_name+')[0]';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['dobot_setiomultiplexing'] = {
  init: function() {
    this.appendDummyInput("ioInput")
        .appendField(Blockly.Msg.DOBOT_SET_IOMULTIPLEXING)
        .appendField(Blockly.Msg.DOBOT_type, 'type')
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Dobot_IO_INPUT_3V,   "1"], [Blockly.Msg.Dobot_IO_ADC,        "3"],
                                                [Blockly.Msg.Dobot_IO_OUTPUT_3V,  "4"], [Blockly.Msg.Dobot_IO_OUTPUT_5V,  "5"],
                                                [Blockly.Msg.Dobot_IO_OUTPUT_12V, "6"], [Blockly.Msg.Dobot_IO_PWM,        "7"]]), "value")
        .appendField("EIO", "text")
        .appendField(new Blockly.FieldDropdown([["EIO01", "1"], ["EIO02", "2"], ["EIO03", "3"], ["EIO04", "4"], ["EIO05", "5"], ["EIO06", "6"], ["EIO07", "7"], ["EIO08", "8"], ["EIO09", "9"], ["EIO10", "10"], ["EIO11", "11"], ["EIO12", "12"], ["EIO13", "13"], ["EIO14", "14"], ["EIO15", "15"], ["EIO16", "16"], ["EIO17", "17"], ["EIO18", "18"], ["EIO19", "19"], ["EIO20", "20"]], "dropdown"), "io");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_IOMULTIPLEXING_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
    UpdateMultiplexingBlock(this);
  }
};

Blockly.Python['dobot_setiomultiplexing'] = function(block) {
  var dropdown_io = block.getFieldValue('io');
  var dropdown_value = block.getFieldValue('value');
  // var dropdown_DevTypeValue = block.getFieldValue('DevTypeValue');
  switch(dropdown_value){
    case "1":
      dropdown_value = "3";
      break;
    case "3":
      dropdown_value = "4";
      break;
    case "4":
    case "5":
    case "6":
      dropdown_value = "1";
      break;
    case "7":
      dropdown_value = "2";
      break;
  }
  // TODO: Assemble Python into code variable.
  if (currentDev != dev_Magician)          
  {
    var code = 'dType.SetIOMultiplexingExtEx(api, '+dropdown_io+', '+dropdown_value+', 1)\n';
  }
  else
  {
    var code = 'dType.SetIOMultiplexingEx(api, '+dropdown_io+', '+dropdown_value+', 1)\n';
  }  
  return code;
};

Blockly.Blocks['dobot_set_output'] = {
  init: function() {
    this.appendDummyInput("ioInput")
        .appendField(Blockly.Msg.DOBOT_SET_OUTPUT)
        .appendField("EIO", "EIO")
        .appendField(new Blockly.FieldDropdown([["EIO01", "1"], ["EIO02", "2"], ["EIO03", "3"], ["EIO04", "4"], ["EIO05", "5"], ["EIO06", "6"], ["EIO07", "7"], ["EIO08", "8"], ["EIO09", "9"], ["EIO10", "10"], ["EIO11", "11"], ["EIO12", "12"], ["EIO13", "13"], ["EIO14", "14"], ["EIO15", "15"], ["EIO16", "16"], ["EIO17", "17"], ["EIO18", "18"], ["EIO19", "19"], ["EIO20", "20"]]), "io")
        .appendField(Blockly.Msg.DOBOT_value, "text")
        .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "value");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_OUTPUT_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
    UpdateOutput3VBlock(this);
  }
};

Blockly.Python['dobot_set_output'] = function(block) {
  var dropdown_io = block.getFieldValue('io');
  var dropdown_value = block.getFieldValue('value');
  // var dropdown_DevTypeValue = block.getFieldValue('UpdateOutput3V');
  // TODO: Assemble Python into code variable.
  if (currentDev != dev_Magician)           //如果有设备下拉框
  {
    var code = 'dType.SetIODOExtEx(api, '+dropdown_io+', '+dropdown_value+', 1)\n';
  }
  else
  {
    var code = 'dType.SetIODOEx(api, '+dropdown_io+', '+dropdown_value+', 1)\n';
  }
  
  return code;
};

Blockly.Blocks['dobot_set_output5V'] = {
  init: function() {
    this.appendDummyInput("ioInput")
        .appendField(Blockly.Msg.DOBOT_SET_OUTPUT5V)
        .appendField("EIO", "EIO")
        .appendField(new Blockly.FieldDropdown([["EIO02", "2"], ["EIO03", "3"], ["EIO16/SW01", "16"], ["EIO17/SW02", "17"]]), "io");
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_ENABELD)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_OFF, "0"], [Blockly.Msg.DOBOT_ON, "1"]]), "enable");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_OUTPUT5V_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
    UpdateInput5VBlock(this)
  }
};

Blockly.Python['dobot_set_output5V'] = function(block) {
  var dropdown_io = block.getFieldValue('io');
  var isEnable = block.getFieldValue('enable');
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetIODOEx(api, '+dropdown_io+', '+isEnable+', 1)\n';
  return code;
};

Blockly.Blocks['dobot_set_output12V'] = {
  init: function() {
    this.appendDummyInput("ioInput")
        .appendField(Blockly.Msg.DOBOT_SET_OUTPUT12V)
        .appendField("EIO", "EIO")
        .appendField(new Blockly.FieldDropdown([["EIO02", "2"], ["EIO03", "3"], ["EIO16/SW01", "16"], ["EIO17/SW02", "17"]]), "io");
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_ENABELD)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_OFF, "0"], [Blockly.Msg.DOBOT_ON, "1"]]), "enable");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_OUTPUT12V_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
    UpdateInput12VBlock(this)
  }
};

Blockly.Python['dobot_set_output12V'] = function(block) {
  var dropdown_io = block.getFieldValue('io');
  var isEnable = block.getFieldValue('enable');
  // TODO: Assemble Python into code variable.
  if (currentDev != dev_Magician)           //如果有设备下拉框
  {
    var code = 'dType.SetIODOExtEx(api, '+dropdown_io+', '+isEnable+', 1)\n';
  }
  else
  {
    var code = 'dType.SetIODOEx(api, '+dropdown_io+', '+isEnable+', 1)\n';
  }
  
  return code;
};

Blockly.Blocks['dobot_get_12voutput'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_GET_12OUTPUT)
        .appendField(new Blockly.FieldDropdown([["EIO2", "2"], ["EIO3", "3"], ["EIO16", "16"], ["EIO17", "17"]]), "NAME");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_GET_12OUTPUT_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_get_12voutput'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble Python into code variable.
  if (currentDev != dev_Magician)           //如果有设备下拉框
  {
    
    var code = 'dType.GetIODIExt(api, '+dropdown_name+')[0]';
  }
  else
  {
    var code = 'dType.GetIODI(api, '+dropdown_name+')[0]';
  }
  
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['dobot_set_colorseneor'] = {
  init: function() {
    this.appendDummyInput("input")
        .appendField(Blockly.Msg.DOBOT_SET_COLORSENEOR)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_OFF, "0"], [Blockly.Msg.DOBOT_ON, "1"]]), "io")
        .appendField(Blockly.Msg.DOBOT_VERSION)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_OLD, "0"], [Blockly.Msg.DOBOT_NEW, "1"]]), "version")
        .appendField(Blockly.Msg.DOBOT_PORT)
        .appendField(new Blockly.FieldDropdown([["GP1", "0"], ["GP2", "1"], ["GP4", "2"], ["GP5", "3"]]), "port");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_COLORSENEOR_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
    UpdateColorOrInfraredDrop(this, '0');
  }
};

Blockly.Python['dobot_set_colorseneor'] = function(block) {
  var isEnable = block.getFieldValue('io');
  var port = block.getFieldValue('port');
  var version = block.getFieldValue('version');
  // TODO: Assemble Python into code variable.
  if (currentDev != dev_Magician)
  {
    var code = 'dType.SetColorSensorExtEx(api, '+isEnable+' ,'+port+', '+version+', 1)\n';
  }
  else
    var code = 'dType.SetColorSensor(api, '+isEnable+' ,'+port+', '+version+')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Blocks['dobot_SetInfraredSensor'] = {
  init: function() {
    this.appendDummyInput("input")
        .appendField(Blockly.Msg.DOBOT_SET_INFRARED_SENEOR)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_OFF, "0"], [Blockly.Msg.DOBOT_ON, "1"]]), "io")
        .appendField(Blockly.Msg.DOBOT_VERSION)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_OLD, "0"], [Blockly.Msg.DOBOT_NEW, "1"]]), "version")
        .appendField(Blockly.Msg.DOBOT_PORT)
        .appendField(new Blockly.FieldDropdown([["GP1", "0"], ["GP2", "1"],["GP4", "2"], ["GP5", "3"]]), "port");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_SET_INFRARED_SENEOR_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
    UpdateColorOrInfraredDrop(this, '0');
  }
};

Blockly.Python['dobot_SetInfraredSensor'] = function(block) {
  var isEnable = block.getFieldValue('io');
  var port = block.getFieldValue('port');
  var version = block.getFieldValue('version');
  // TODO: Assemble Python into code variable.
  if (currentDev != dev_Magician)
  {
    var code = 'dType.SetInfraredSensorExtEx(api, '+isEnable+' ,'+port+', '+version+', 1)\n';
  }
  else
    var code = 'dType.SetInfraredSensor(api, '+isEnable+' ,'+port+', '+version+')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Blocks['dobot_get_colorseneor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_GET_COLORSENEOR)
        .appendField(new Blockly.FieldDropdown([["r", "0"], ["g", "1"], ["b", "2"]]), "NAME");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_GET_COLORSENEOR_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};

Blockly.Python['dobot_get_colorseneor'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble Python into code variable.
  if (currentDev == dev_Controller)
  {
    var code = 'dType.GetColorSensorExt(api, '+dropdown_name+')';
  }
  else
  {
    var code = 'dType.GetColorSensorEx(api, '+dropdown_name+')';
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['dobot_GetInfraredSensor'] = {
  init: function() {
    this.appendDummyInput("input")
        .appendField(Blockly.Msg.DOBOT_GET_INFRARED_SENEOR)
        .appendField(new Blockly.FieldDropdown([["GP1", "0"], ["GP2", "1"],["GP4", "2"], ["GP5", "3"]]), "port");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_GET_INFRARED_SENEOR_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
    UpdateGetInfraredSensor(this)
  }
};

Blockly.Python['dobot_GetInfraredSensor'] = function(block) {
  var port = block.getFieldValue('port');
  // TODO: Assemble Python into code variable.
  if (currentDev == dev_Controller)
  {
    var code = 'dType.GetInfraredSensorExt(api, '+port+')[0]';
  }
  else{
    var code = 'dType.GetInfraredSensor(api, '+port+')[0]';
  } 
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

//2019-08-22 Seeed Sensor
Blockly.Blocks['dobot_GetSeeedDistanceSensor'] = {
  init: function() {
    this.appendDummyInput("input")
        .appendField(Blockly.Msg.DOBOT_Get_SeeedDistanceSensor)
        .appendField(Blockly.Msg.DOBOT_PORT)
        .appendField(new Blockly.FieldDropdown([["PORT1", "0"], ["PORT2", "1"],["PORT3", "2"], ["PORT4", "3"], ["PORT5", "4"], ["PORT6", "5"]]), "port");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_Get_SeeedDistanceSensor_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};
Blockly.Python['dobot_GetSeeedDistanceSensor'] = function(block) {
  var port = block.getFieldValue('port');
  // TODO: Assemble Python into code variable.
  var code = 'dType.GetSeeedDistanceSensorExt(api, '+port+')[0]'; 
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['dobot_SetSeeedTemperatureSensor'] = {
  init: function() {
    this.appendDummyInput("input")
        .appendField(Blockly.Msg.DOBOT_Set_SeeedTemperatureSensor)
        .appendField(Blockly.Msg.DOBOT_PORT)
        .appendField(new Blockly.FieldDropdown([["PORT1", "0"], ["PORT2", "1"],["PORT3", "2"], ["PORT4", "3"], ["PORT5", "4"], ["PORT6", "5"]]), "port");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_Set_SeeedTemperatureSensor_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};
Blockly.Python['dobot_SetSeeedTemperatureSensor'] = function(block) {
  var port = block.getFieldValue('port');
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetSeeedTempSensorExtEx(api, '+port+', 1)\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Blocks['dobot_GetSeeedTemperatureSensor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_Get_SeeedTemperatureSensor);
    this.setInputsInline(true);
    this.setOutput(true, "Array");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_Get_SeeedTemperatureSensor_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};
Blockly.Python['dobot_GetSeeedTemperatureSensor'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'dType.GetSeeedTempSensorExt(api)';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['dobot_SetSeeedInfraredSensor'] = {
  init: function() {
    this.appendDummyInput("input")
        .appendField(Blockly.Msg.DOBOT_Set_SeeedInfraredSensor)
        .appendField(Blockly.Msg.DOBOT_PORT)
        .appendField(new Blockly.FieldDropdown([["PORT1", "0"], ["PORT2", "1"],["PORT3", "2"], ["PORT4", "3"], ["PORT5", "4"], ["PORT6", "5"]]), "port");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_Set_SeeedInfraredSensor_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};
Blockly.Python['dobot_SetSeeedInfraredSensor'] = function(block) {
  var port = block.getFieldValue('port');
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetSeeedLightSensorExtEx(api, '+port+', 1)\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Blocks['dobot_GetSeeedInfraredSensor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_Get_SeeedInfraredSensor);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_Get_SeeedInfraredSensor_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};
Blockly.Python['dobot_GetSeeedInfraredSensor'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'dType.GetSeeedLightSensorExt(api)[0]';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['dobot_SetSeeedColorSensor'] = {
  init: function() {
    this.appendDummyInput("input")
        .appendField(Blockly.Msg.DOBOT_Set_SeeedColorSensor)
        .appendField(Blockly.Msg.DOBOT_PORT)
        .appendField(new Blockly.FieldDropdown([["PORT1", "0"], ["PORT2", "1"],["PORT3", "2"], ["PORT4", "3"], ["PORT5", "4"], ["PORT6", "5"]]), "port");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_Set_SeeedColorSensor_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};
Blockly.Python['dobot_SetSeeedColorSensor'] = function(block) {
  var port = block.getFieldValue('port');
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetSeeedColorSensorExtEx(api, '+port+', 1)\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Blocks['dobot_GetSeeedColorSensor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.DOBOT_Get_SeeedColorSensor);
    this.setInputsInline(true);
    this.setOutput(true, "Array");
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_Get_SeeedColorSensor_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};
Blockly.Python['dobot_GetSeeedColorSensor'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'dType.GetSeeedColorSensorExt(api)';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['dobot_SetSeeedRgbLED'] = {
  init: function() {
    this.appendDummyInput("input")
        .appendField(Blockly.Msg.DOBOT_Set_SeeedRgbLED)
        .appendField(Blockly.Msg.DOBOT_PORT)
        .appendField(new Blockly.FieldDropdown([["PORT1", "0"], ["PORT2", "1"],["PORT3", "2"], ["PORT4", "3"], ["PORT5", "4"], ["PORT6", "5"]]), "port");
    this.appendValueInput("RGB")
        .setCheck("Number")
        .appendField(Blockly.Msg.DOBOT_value);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip(Blockly.Msg.DOBOT_Set_SeeedRgbLED_TOOLTIP);
    this.setHelpUrl('http://www.dobot.cc/');
  }
};
Blockly.Python['dobot_SetSeeedRgbLED'] = function(block) {
  var port = block.getFieldValue('port');
  var rgb = Blockly.Python.valueToCode(block, 'RGB', Blockly.Python.ORDER_ATOMIC) || 0.0;
  // TODO: Assemble Python into code variable.
  var code = 'dType.SetSeeedRgbExtEx(api, '+port+', '+rgb+', 1)\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};




let dev_Magician = "Magician"
let dev_MagicianLite = "Magician Lite"
let dev_Controller = "Magic Box+Magician Lite"
let dev_MagicBox = "Magic Box"

// let devTypeSwitch = "0"
// let Output3VSwitch = "0"
// let pwmSwitch = "0"
// let input3VSwitch = "0"
// let ADCSwitch = "0"

// let devTypeMultiplexingBlock = 'init'

let LIST_IO_Magician = {
  //0.0.0版本
  INPUT_3V_0:  [["EIO01","1"],  ["EIO04","4"],  ["EIO05","5"],  ["EIO06","6"],  ["EIO07","7"],   ["EIO08","8"],    ["EIO09","9"],
                ["EIO11","11"], ["EIO12","12"], ["EIO14","14"], ["EIO15","15"], ["EIO18","18"],  ["EIO19","19"],   ["EIO20","20"]],
  ADC_0:       [["EIO01", "1"], ["EIO05", "5"], ["EIO07", "7"], ["EIO09", "9"], ["EIO12", "12"], ["EIO15", "15"]],
  OUTPUT_3V_0: [["EIO01","1"],  ["EIO04","4"],  ["EIO05","5"],  ["EIO06","6"],  ["EIO07","7"],   ["EIO08","8"],    ["EIO09","9"],
                ["EIO11","11"], ["EIO12","12"], ["EIO14","14"], ["EIO15","15"], ["EIO18","18"],  ["EIO19","19"],   ["EIO20","20"]],

  //1.0.0版本
  INPUT_3V_1:  [["EIO01","1"],  ["EIO05","5"],    ["EIO07","7"],  ["EIO09","9"],
                ["EIO12","12"], ["EIO14","14"],   ["EIO15","15"], ["EIO19","19"], ["EIO20","20"]],
  ADC_1:       [["EIO09", "9"], ["EIO15", "15"]],
  OUTPUT_3V_1: [["EIO04","4"],  ["EIO06","6"],    ["EIO08","8"],  ["EIO11","11"], ["EIO14","14"], ["EIO15","15"], ["EIO18","18"]],

  // 通用
  OUTPUT_5V:   [["EIO10","10"], ["EIO13","13"]],
  OUTPUT_12V:  [["EIO02","2"],  ["EIO03","3"],   ["EIO16/SW01","16"], ["EIO17/SW02","17"]],
  PWM:         [["EIO04","4"],  ["EIO06","6"],   ["EIO08","8"],       ["EIO11","11"],       ["EIO14","14"]]
}

let LIST_IO_MagicianLite = {
  INPUT_3V_0:  [["EIO01", "1"], ["EIO02", "2"], ["EIO03", "3"], ["EIO04", "4"], ["EIO05", "5"], ["EIO06", "6"],
                ["EIO07", "7"], ["EIO08", "8"], ["EIO09", "9"], ["EIO10", "10"]],
  OUTPUT_3V_0: [["EIO01", "1"], ["EIO02", "2"], ["EIO03", "3"], ["EIO04", "4"], ["EIO05", "5"], ["EIO06", "6"],
                ["EIO07", "7"], ["EIO08", "8"], ["EIO09", "9"], ["EIO010", "10"]],
  PWM:         [["EIO06", "6"], ["EIO07", "7"]],

  ADC_0:       [["EIO07", "7"]]
}

let LIST_IO_Controller = {
  INPUT_3V_0:  [["EIO01", "1"], ["EIO02", "2"], ["EIO03", "3"], ["EIO04", "4"], ["EIO05", "5"], ["EIO06", "6"],
                    ["EIO07", "7"],["EIO08", "8"], ["EIO09", "9"], ["EIO10", "10"], ["EIO11", "11"], ["EIO12", "12"],
                    ["EIO13", "13"], ["EIO14", "14"], ["EIO15", "15"], ["EIO16", "16"], ["EIO17", "17"], ["EIO18", "18"],
                    ["EIO19", "19"], ["EIO20", "20"], ["EIO21", "21"], ["EIO22", "22"], ["EIO23", "23"], ["EIO24", "24"]],
  OUTPUT_3V_0: [["EIO01", "1"], ["EIO02", "2"], ["EIO03", "3"], ["EIO04", "4"], ["EIO05", "5"], ["EIO06", "6"],
                    ["EIO07", "7"],["EIO08", "8"], ["EIO09", "9"], ["EIO10", "10"], ["EIO11", "11"], ["EIO12", "12"],
                    ["EIO13", "13"], ["EIO14", "14"], ["EIO15", "15"], ["EIO16", "16"], ["EIO17", "17"], ["EIO18", "18"],
                    ["EIO19", "19"], ["EIO20", "20"], ["EIO21", "21"], ["EIO22", "22"], ["EIO23", "23"], ["EIO24", "24"]],

  OUTPUT_12V:  [["EIO11/SW1","11"], ["EIO12/SW2","12"]],

  PWM:         [["EIO13", "13"], ["EIO16", "16"], ["EIO17", "17"], ["EIO18", "18"], ["EIO19", "19"], ["EIO20", "20"], ["EIO21", "21"],
                    ["EIO23", "23"]],

  ADC_0:       [["EIO22", "22"], ["EIO24", "24"]]
}

let listDevType = [[Blockly.Msg.DOBOT_Controller,   dev_Controller],   [Blockly.Msg.DOBOT_MagicianLite,  dev_MagicianLite]];

function WorkspaceChanged(block, type, element, name, newValue)
{
  if (type === Blockly.Events.CHANGE && element === 'field') {
    if (name === 'value')
      UpdateMultiplexingBlockIndexDrop(block, newValue);
    else if (name === 'version')
      UpdateColorOrInfraredDrop(block, newValue)
    // else                                        //2019.4.25   控制盒+Magicianlite的时候区区分选择哪个设备
    //   UpdateDevTypeIndexDrop(block, newValue, name)
  }
}

function UpdateColorOrInfraredDrop(block, value)
{
  if (block.type != "dobot_set_colorseneor" && block.type != "dobot_SetInfraredSensor")
    return

  let colorInput = block.getInput("input");
  let tempPort = block.getFieldValue('port');
  colorInput.removeField("port");
  let listPort = []
  if (currentDev == dev_Magician)
  {
    // 如果是新硬件加旧传感器，限定是GP2
         listPort = (value === "0" && hwVersion === "1.0.0")
                  ? [["GP2", "1"]]
                  : [["GP1", "0"], ["GP2", "1"], ["GP4", "2"], ["GP5", "3"]]
        colorInput.appendField(new Blockly.FieldDropdown(listPort), "port");

        // 防止IOType重置后，IOIndex被改变
        listPort.forEach((port)=>
        {
          if (parseInt(port[1]) == tempPort)
          {
            block.setFieldValue(tempPort, 'port');
          }
        });
  }
  else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
  {
        // listPort = (value === "0")
        //           ? [["J12", "0"]]
        //           : [["J12", "0"], ["J13", "1"], ["J14", "2"], ["J15", "3"], ["J16", "4"], ["J17", "5"]]
        listPort = [["PORT1", "0"], ["PORT2", "1"], ["PORT3", "2"], ["PORT4", "3"], ["PORT5", "4"], ["PORT6", "5"]]
        colorInput.appendField(new Blockly.FieldDropdown(listPort), "port");
        // block.setFieldValue(parseInt(listPort[1]), 'port');

        // 防止IOType重置后，IOIndex被改变
        listPort.forEach((port)=>
        {
          if (parseInt(port[1]) == tempPort)
          {
            block.setFieldValue(tempPort, 'port');
          }
        });

  }

 
}

function UpdateGetInfraredSensor(block)
{
  if (block.type != "dobot_GetInfraredSensor")
    return

  let colorInput = block.getInput("input");
  let tempPort = block.getFieldValue('port');
  colorInput.removeField("port");
  let listPort = []
  if (currentDev == dev_Magician)
  {
    // 如果是新硬件加旧传感器，限定是GP2
        listPort = [["GP1", "0"], ["GP2", "1"], ["GP4", "2"], ["GP5", "3"]]
        colorInput.appendField(new Blockly.FieldDropdown(listPort), "port");

  }
  else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
  {
        listPort = [["PORT1", "0"], ["PORT2", "1"], ["PORT3", "2"], ["PORT4", "3"], ["PORT5", "4"], ["PORT6", "5"]]
        colorInput.appendField(new Blockly.FieldDropdown(listPort), "port");
  }
    // 防止IOType重置后，IOIndex被改变
    listPort.forEach((port)=>
    {
      if (parseInt(port[1]) == tempPort)
      {
        block.setFieldValue(tempPort, 'port');
      }
    });
}

function UpdateMultiplexingBlockIndexDrop(block, value)
{
  if (block.type != "dobot_setiomultiplexing")
    return
  let ioInput = block.getInput("ioInput");
  let ioIndex = block.getFieldValue('io');
  let listIOInfo = [["None","0"]];
  switch(value) {
    case "1": // Dobot_IO_INPUT_3V    
      if ((currentDev == dev_Magician))
      {
        listIOInfo = hwVersion === "1.0.0" ? LIST_IO_Magician.INPUT_3V_1 : LIST_IO_Magician.INPUT_3V_0;
      }
      else if (currentDev == dev_MagicianLite)
      {
        listIOInfo = LIST_IO_MagicianLite.INPUT_3V_0;
      }
      else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
      {
          listIOInfo = LIST_IO_Controller.INPUT_3V_0;
      }
      break;
    case "3": // Dobot_IO_ADC
      if ((currentDev == dev_Magician))
      {
        listIOInfo = hwVersion === "1.0.0" ? LIST_IO_Magician.ADC_1 : LIST_IO_Magician.ADC_0;
      }
      else if (currentDev == dev_MagicianLite)
      {
        listIOInfo = LIST_IO_MagicianLite.ADC_0;
      }
      else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
      {
          listIOInfo = LIST_IO_Controller.ADC_0;
      }
      break
    case "4": // Dobot_IO_OUTPUT_3V
      if ((currentDev == dev_Magician))
      {
        listIOInfo = hwVersion === "1.0.0" ? LIST_IO_Magician.OUTPUT_3V_1 : LIST_IO_Magician.OUTPUT_3V_0;
      }
      else if (currentDev == dev_MagicianLite)
      {
        listIOInfo = LIST_IO_MagicianLite.OUTPUT_3V_0;
      }
      else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
      {
          listIOInfo = LIST_IO_Controller.OUTPUT_3V_0;
      }
      break
    case "5": // Dobot_IO_OUTPUT_5V
      listIOInfo = LIST_IO_Magician.OUTPUT_5V;
      break
    case "6": // Dobot_IO_OUTPUT_12V
      if ((currentDev == dev_Magician))
      {
        listIOInfo = LIST_IO_Magician.OUTPUT_12V;
      }
      else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
      {
          listIOInfo = LIST_IO_Controller.OUTPUT_12V;
      }
      break
    case "7": // Dobot_IO_PWM
      if ((currentDev == dev_Magician))
      {
        listIOInfo = LIST_IO_Magician.PWM;
      }
      else if (currentDev == dev_MagicianLite)
      {
        listIOInfo = LIST_IO_MagicianLite.PWM;
      }
      else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
      {
          listIOInfo = LIST_IO_Controller.PWM;
      } 
      break
  }
  ioInput.removeField("io")
  ioInput.appendField(new Blockly.FieldDropdown(listIOInfo),"io");

  // 防止IOType重置后，IOIndex被改变
  listIOInfo.forEach((ioInfo)=>
  {
    if (parseInt(ioInfo[1]) == ioIndex)
    {
      block.setFieldValue(ioIndex,'io');
    }
  });
};

// function UpdateDevTypeIndexDrop(block, value, name)   //设备类型发生改变,更新io列表
// {
//     if (name == "DevTypeValue")     //设置EIO
//     {
//         switch (value)
//         {
//             case dev_Controller:
//                 devTypeSwitch = "1"
//                 UpdateMultiplexingBlock(block, dev_Controller);
//                 break
//             case dev_MagicianLite:
//                 devTypeSwitch = "0"
//                 UpdateMultiplexingBlock(block, dev_MagicianLite);
//                 break
//         }
//     }
//     else if (name == "UpdateOutput3V")       // 设置电平输出
//     {
//         switch (value){
//             case dev_Controller:
//                 Output3VSwitch = "1";
//                 UpdateOutput3VBlock(block, dev_Controller);
//                 break
//             case dev_MagicianLite:
//                 Output3VSwitch = "0";
//                 UpdateOutput3VBlock(block, dev_MagicianLite);
//                 break
//         }
//     }
//     else if (name == "UpdataSetPWM")
//     {
//         switch(value){
//             case dev_Controller:
//                 pwmSwitch = "1";
//                 UpdataSetPWMBlock(block, dev_Controller);
//                 break
//             case dev_MagicianLite:
//                 pwmSwitch = "0";
//                 UpdataSetPWMBlock(block, dev_MagicianLite);
//                 break
//         }
//     }
//     else if (name == "UpdateInput3V")
//     {
//         switch(value){
//             case dev_Controller:
//                 input3VSwitch = "1";
//                 UpdateInput3VBlock(block, dev_Controller);
//                 break
//             case dev_MagicianLite:
//                 input3VSwitch = "0";
//                 UpdateInput3VBlock(block, dev_MagicianLite);
//                 break
//         }
//     }
//     else if (name == "UpdateADC")
//     {
//         switch(value){
//             case dev_Controller:
//                 ADCSwitch = "1";
//                 UpdateADCBlock(block, dev_Controller);
//                 break
//             case dev_MagicianLite:
//                 ADCSwitch = "0";
//                 UpdateADCBlock(block, dev_MagicianLite);
//                 break
//         }
//     }
// }

function UpdateMultiplexingBlock(block)    //更改IO类型
{
  //根据硬件设置,IO类型，IOIndex会在事件回调中更新
  let ioInput = block.getInput("ioInput");
  let ioType = block.getFieldValue('value');
  let ioIndex = block.getFieldValue('io');
  // let devType = block.getFieldValue('DevTypeValue')
  ioInput.removeField("value")
  ioInput.removeField("text")
  ioInput.removeField("io")
  let listIOType = []
  if (currentDev == dev_Magician)
  {
        listIOType = hwVersion === "1.0.0"
          ? [[Blockly.Msg.Dobot_IO_INPUT_3V,   "1"], [Blockly.Msg.Dobot_IO_ADC,        "3"],
              [Blockly.Msg.Dobot_IO_OUTPUT_3V,  "4"], [Blockly.Msg.Dobot_IO_OUTPUT_5V,  "5"],
              [Blockly.Msg.Dobot_IO_OUTPUT_12V, "6"], [Blockly.Msg.Dobot_IO_PWM,        "7"]]
          : [[Blockly.Msg.Dobot_IO_INPUT_3V,   "1"], [Blockly.Msg.Dobot_IO_ADC,        "3"],
              [Blockly.Msg.Dobot_IO_OUTPUT_3V,  "4"], [Blockly.Msg.Dobot_IO_OUTPUT_5V,  "5"],
              [Blockly.Msg.Dobot_IO_OUTPUT_12V, "6"], [Blockly.Msg.Dobot_IO_PWM,        "7"]];
        ioInput.appendField(new Blockly.FieldDropdown(listIOType), "value")
        ioInput.appendField("EIO", "text")
        ioInput.appendField(new Blockly.FieldDropdown(hwVersion === "1.0.0" ? LIST_IO_Magician.INPUT_3V_1 : LIST_IO_Magician.INPUT_3V_0), "io");
    }
  else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
  {
      listIOType = [[Blockly.Msg.Dobot_IO_INPUT_3V,   "1"], [Blockly.Msg.Dobot_IO_ADC,        "3"],
                      [Blockly.Msg.Dobot_IO_OUTPUT_3V,  "4"], [Blockly.Msg.Dobot_IO_OUTPUT_12V, "6"],
                      [Blockly.Msg.Dobot_IO_PWM,        "7"]];
      ioInput.appendField(new Blockly.FieldDropdown(listIOType), "value");
      ioInput.appendField("EIO", "text");
      ioInput.appendField(new Blockly.FieldDropdown(LIST_IO_Controller.INPUT_3V_0), "io");           
  }
  listIOType.forEach((typeInfo)=>
  {
    if (parseInt(typeInfo[1]) == ioType)
    {
      block.setFieldValue(ioType,'value');
    }
  });
  block.setFieldValue(ioIndex,'io');
}

function UpdateOutput3VBlock(block)
{
  let ioInput = block.getInput("ioInput");
  let ioIndex = block.getFieldValue('io');
  let value   = block.getFieldValue('value');
  ioInput.removeField("value");
  ioInput.removeField("text");
  ioInput.removeField("io");
  let listIOInfo = []  
  if ((currentDev == dev_Magician))
  {
    listIOInfo = hwVersion === "1.0.0" ? LIST_IO_Magician.OUTPUT_3V_1 : LIST_IO_Magician.OUTPUT_3V_0;
  }
  else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
  {
    listIOInfo = LIST_IO_Controller.OUTPUT_3V_0;
  }
  
  ioInput.appendField(new Blockly.FieldDropdown(listIOInfo), "io");
  ioInput.appendField(Blockly.Msg.DOBOT_value, "text");
  ioInput.appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "value");
  listIOInfo.forEach((ioInfo)=>
  {
    if (parseInt(ioInfo[1]) == ioIndex)
    {
      block.setFieldValue(ioIndex,'io');
    }
  });
  block.setFieldValue(value,'value');
}

function UpdateInput5VBlock(block)
{
  let ioInput = block.getInput("ioInput");
  let ioIndex = block.getFieldValue('io');

  ioInput.removeField("io");

  let listIOInfo = LIST_IO_Magician.OUTPUT_5V;

  ioInput.appendField(new Blockly.FieldDropdown(listIOInfo), "io");
  listIOInfo.forEach((ioInfo)=>
  {
    if (parseInt(ioInfo[1]) == ioIndex)
    {
      block.setFieldValue(ioIndex,'io');
    }
  });
}

function UpdateInput12VBlock(block)
{
  let ioInput = block.getInput("ioInput");
  let ioIndex = block.getFieldValue('io');

  ioInput.removeField("io");
  let listIOInfo = []
  if ((currentDev == dev_Magician)) 
  {
    listIOInfo = LIST_IO_Magician.OUTPUT_12V;
  }
  else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
  {
    listIOInfo = LIST_IO_Controller.OUTPUT_12V;
  }
  

  ioInput.appendField(new Blockly.FieldDropdown(listIOInfo), "io");
  listIOInfo.forEach((ioInfo)=>
  {
    if (parseInt(ioInfo[1]) == ioIndex)
    {
      block.setFieldValue(ioIndex,'io');
    }
  });
}

function UpdatePWMBlock(block)      //积木块上没有显示
{
  let ioInput = block.getInput("ioInput");
  let ioIndex = block.getFieldValue('io');
  let value   = block.getFieldValue('value');
  let devType = block.getFieldValue('UpdatePWM')
  ioInput.removeField("io");
  ioInput.removeField("text");
  ioInput.removeField("value");

  let listIOInfo = []
  if (currentDev == dev_Magician)
  {
      listIOInfo = LIST_IO_Magician.PWM;
  }
  else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
  {
     listIOInfo = LIST_IO_Controller.PWM;
  }
  ioInput.appendField(new Blockly.FieldDropdown(listIOInfo), "io");
  ioInput.appendField(Blockly.Msg.DOBOT_Value, "text");
  ioInput.appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_FREQUENCY, "0"], [Blockly.Msg.DOBOT_DUTYCYCLE, "1"]]), "value");

  listIOInfo.forEach((ioInfo)=>
  {
    if (parseInt(ioInfo[1]) == ioIndex)
    {
      block.setFieldValue(ioIndex, 'io');
    }
  });
  block.setFieldValue(value, 'value');
}

function UpdataSetPWMBlock(block, type)
{
  let ioInput = block.getInput("ioInput");
  let ioIndex = block.getFieldValue('io');
  let devType = block.getFieldValue('UpdataSetPWM')
  ioInput.removeField("io");
  let listIOInfo = []
  if (currentDev == dev_Magician)
  {
      listIOInfo = LIST_IO_Magician.PWM;
  }
  else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
  {
     listIOInfo = LIST_IO_Controller.PWM;
  }
  ioInput.appendField(new Blockly.FieldDropdown(listIOInfo), "io");
   listIOInfo.forEach((ioInfo)=>
  {
    if (parseInt(ioInfo[1]) == ioIndex)
    {
      block.setFieldValue(ioIndex, 'io');
    }
  });
}

function UpdateInput3VBlock(block)
{
  let ioInput = block.getInput("ioInput");
  let ioIndex = block.getFieldValue('io');
  let devType = block.getFieldValue('UpdateInput3V')
  ioInput.removeField("io");
  let listIOInfo = []
  if ((currentDev == dev_Magician))
  {
    listIOInfo = hwVersion === "1.0.0" ? LIST_IO_Magician.INPUT_3V_1 : LIST_IO_Magician.INPUT_3V_0;
  }
  else if(currentDev == dev_Controller || currentDev == dev_MagicBox)
  {
     listIOInfo = LIST_IO_Controller.INPUT_3V_0;
  }
  ioInput.appendField(new Blockly.FieldDropdown(listIOInfo), "io");
  listIOInfo.forEach((ioInfo)=>
  {
    if (parseInt(ioInfo[1]) == ioIndex)
    {
      block.setFieldValue(ioIndex, 'io');
    }
  });
}

function UpdateADCBlock(block)
{
  let ioInput = block.getInput("ioInput");
  let ioIndex = block.getFieldValue('io');
  let devType = block.getFieldValue('UpdateADC')
  ioInput.removeField("io")

  let listIOInfo = []
  if ((currentDev == dev_Magician))
  {
    listIOInfo = hwVersion === "1.0.0" ? LIST_IO_Magician.ADC_1 : LIST_IO_Magician.ADC_0;
  }
  else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
  {
     listIOInfo = LIST_IO_Controller.ADC_0;
  }

  ioInput.appendField(new Blockly.FieldDropdown(listIOInfo), "io")
  listIOInfo.forEach((ioInfo)=>
  {
    if (parseInt(ioInfo[1]) == ioIndex)
    {
      block.setFieldValue(ioIndex,'io');
    }
  });
}

function UpdateLinearRail(block)
{
  let ioInput = block.getInput("ioInput");
  let ioIndex = block.getFieldValue('version');
  let endable = block.getFieldValue('enable');
  ioInput.removeField("enable")
  ioInput.removeField("text");
  ioInput.removeField("version");
  if ((currentDev == dev_Magician))
  {
    ioInput.appendField( new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_OFF, "0"], [Blockly.Msg.DOBOT_ON, "1"]]), "enable");
    ioInput.appendField(Blockly.Msg.DOBOT_VERSION, "text");
    ioInput.appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_OLD, "0"], [Blockly.Msg.DOBOT_NEW, "1"]]), "version");
    block.setFieldValue(ioIndex, 'version')
  }
  else if (currentDev == dev_Controller || currentDev == dev_MagicBox)
  {
    ioInput.appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_OFF, "0"], [Blockly.Msg.DOBOT_ON, "1"]]), "enable");
    
  }
  block.setFieldValue(endable, 'enable')

}

// function UpdateSetemotor(block)
// {
//      let ioInput = block.getInput("ioInput");
//      let devType = block.getFieldValue('UpdateSetemotor');    
//      if (currentDev == dev_Controller)
//     {
//       if (!devType)
//       {
//         // ioInput.removeField('DOBOT_MOTOR')
//         // ioInput.removeField('io')
//         // ioInput.appendField(Blockly.Msg.DOBOT_DevType, "DevType");
//         // ioInput.appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_Controller,   dev_Controller]]), "UpdateSetemotor");
//         // ioInput.appendField(Blockly.Msg.DOBOT_MOTOR, 'DOBOT_MOTOR')
//         ioInput.appendField(new Blockly.FieldDropdown([["STEPPER1", "0"], ["STEPPER2", "1"]]), "io");
//       }       
//     }
// }

// function UpdateSetemotors(block)
// {
//     let ioInput = block.getInput("ioInput");
//     let devType = block.getFieldValue("UpdateSetemotors");

//     if (currentDev == dev_Controller)
//     {
//       if (!devType)
//       {
//         // ioInput.removeField('DOBOT_MOTOR')
//         // ioInput.removeField('io')
//         // ioInput.appendField(Blockly.Msg.DOBOT_DevType, "DevType");
//         // ioInput.appendField(new Blockly.FieldDropdown([[Blockly.Msg.DOBOT_Controller,   dev_Controller]]), "UpdateSetemotors");
//         // ioInput.appendField(Blockly.Msg.DOBOT_MOTOR, 'DOBOT_MOTOR')
//         ioInput.appendField(new Blockly.FieldDropdown([["STEPPER1", "0"], ["STEPPER2", "1"]]), "io");
//       }
        
//     }

// }

function UpdateIOBlock(block) {
  switch(block.type)
  {
  case "dobot_setiomultiplexing":
    UpdateMultiplexingBlock(block);
    break;
  case "dobot_get_input":
    UpdateInput3VBlock(block);
    break;
  case "dobot_get_adc":
    UpdateADCBlock(block);
    break;
  case "dobot_set_output":
    UpdateOutput3VBlock(block);
    break;
  case "dobot_set_output5V":
    UpdateInput5VBlock(block);
    break;
  case "dobot_set_output12V":
    UpdateInput12VBlock(block);
    break;
//  case "dobot_getiopwm":    //历史版本积木块未显示
//    UpdatePWMBlock(block,'init');
//    break;
  case "dobot_setiopwm":
    UpdataSetPWMBlock(block);
    break;
  case "dobot_set_colorseneor":
    UpdateColorOrInfraredDrop(block, block.getFieldValue('version'));
    break;
  case "dobot_SetInfraredSensor":
    UpdateColorOrInfraredDrop(block, block.getFieldValue('version'));
    break;
  case "dobot_GetInfraredSensor":
    UpdateGetInfraredSensor(block);
    break;
  case "dobot_setemotors":
      // UpdateSetemotors(block);
      break;
  case "dobot_setemotor":
      // UpdateSetemotor(block);
      break;
  case "dobot_linearRail":
    UpdateLinearRail(block);
  }
}


