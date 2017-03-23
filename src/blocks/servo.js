/*
 * Whitecat Blocky Environment, servo block definition
 *
 * Copyright (C) 2015 - 2016
 * IBEROXARXA SERVICIOS INTEGRALES, S.L. & CSS IBÉRICA, S.L.
 * 
 * Author: Jaume Olivé (jolive@iberoxarxa.com / jolive@whitecatboard.org)
 * 
 * All rights reserved.  
 *
 * Permission to use, copy, modify, and distribute this software
 * and its documentation for any purpose and without fee is hereby
 * granted, provided that the above copyright notice appear in all
 * copies and that both that the copyright notice and this
 * permission notice and warranty disclaimer appear in supporting
 * documentation, and that the name of the author not be used in
 * advertising or publicity pertaining to distribution of the
 * software without specific, written prior permission.
 *
 * The author disclaim all warranties with regard to this
 * software, including all implied warranties of merchantability
 * and fitness.  In no event shall the author be liable for any
 * special, indirect or consequential damages or any damages
 * whatsoever resulting from loss of use, data or profits, whether
 * in an action of contract, negligence or other tortious action,
 * arising out of or in connection with the use or performance of
 * this software.
 */
'use strict';

goog.provide('Blockly.Blocks.servo');
goog.provide('Blockly.Blocks.actuators');

goog.require('Blockly.Blocks');
goog.require('Blockly.Blocks.io.helper');

Blockly.Blocks.actuators.HUE = 260;

Blockly.Blocks['servo_attach'] = {
	init: function() {
		var pins = Blockly.Blocks.io.helper.getPwmPins();

		this.appendDummyInput()
			.appendField(Blockly.Msg.SERVO_ATTACH)
			.appendField(new Blockly.FieldDropdown(pins), "PIN");	
				
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Blocks.actuators.HUE);
		this.setTooltip(Blockly.Msg.SERVO_ATTACH_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SERVO_ATTACH_HELPURL);
	},
};

Blockly.Blocks['servo_move'] = {
	init: function() {
		var thisInstance = this;
		
		var pins = Blockly.Blocks.io.helper.getPwmPins();

		this.appendDummyInput()
			.appendField(Blockly.Msg.SERVO_MOVE)
			.appendField(new Blockly.FieldDropdown(pins), "PIN")
			.appendField(" ");
		
		this.appendValueInput("VALUE")
		    .setCheck('Number');
		
		this.appendDummyInput()
			.appendField(Blockly.Msg.SERVO_MOVE_DEGREES);
		
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Blocks.actuators.HUE);
		this.setTooltip(Blockly.Msg.SERVO_MOVE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SERVO_MOVE_HELPURL);
				
		this.updateBoardAtFieldChange("NUM");
	},
	
	mutationToDom: function() {
		var container = document.createElement('mutation');

		if (typeof this.value == "undefined") {
			this.value = -1;
		}
		
		container.setAttribute('value', this.value);

		return container;
	},

	domToMutation: function(xmlElement) {
		this.value = xmlElement.getAttribute('value');
	},
};
	