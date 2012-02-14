var CONTROLLER_TYPES = {
	XBOX: 0,
	PS3: 1
};

var XBOX_AXES = {
	LEFT_STICK_X: 0,
	LEFT_STICK_Y: 1,
	RIGHT_STICK_X: 2,
	RIGHT_STICK_Y: 3,
	LEFT_TRIGGER: 4,
	RIGHT_TRIGGER: 5
};

var XBOX_BUTTONS = {
	A: 0,
	B: 1,
	X: 2,
	Y: 3,
	LB: 4,
	RB: 5,
	LEFT_STICK: 6,
	RIGHT_STICK: 7,
	START: 8,
	BACK: 9,
	XBOX: 10,
	DPAD_UP: 11,
	DPAD_DOWN: 12,
	DPAD_LEFT: 13,
	DPAD_RIGHT: 14
};

var PS3_AXES = {
	LEFT_STICK_X: 0,
	LEFT_STICK_Y: 1,
	RIGHT_STICK_X: 2,
	RIGHT_STICK_Y: 3
};

var PS3_BUTTONS = {
	CROSS: 14,
	CIRCLE: 13,
	SQUARE: 15,
	TRIANGLE: 12,
	LB1: 10,
	RB1: 11,
	LEFT_STICK: 1,
	RIGHT_STICK: 2,
	START: 3,
	SELECT: 0,
	PS: 16,
	DPAD_UP: 4,
	DPAD_DOWN: 6,
	DPAD_LEFT: 7,
	DPAD_RIGHT: 5
};

var controller,
	controllerType = 0, // Default to xBox controller
	// xBox/default controls
	leftStick = document.getElementById("leftStick"),
	rightStick = document.getElementById("rightStick"),
	backButton = document.getElementById("backButton"),
	xboxButton = document.getElementById("xboxButton"),
	startButton = document.getElementById("startButton"),
	dpadUp = document.getElementById("dpadUp"),
	dpadDown = document.getElementById("dpadDown"),
	dpadLeft = document.getElementById("dpadLeft"),
	dpadRight = document.getElementById("dpadRight"),
	aButton = document.getElementById("aButton"),
	bButton = document.getElementById("bButton"),
	xButton = document.getElementById("xButton"),
	yButton = document.getElementById("yButton"),
	lbButton = document.getElementById("lbButton"),
	rbButton = document.getElementById("rbButton"),

	// PS3-specific controls
	selectButton = document.getElementById("selectButton"),
	psButton = document.getElementById("psButton"),
	crossButton = document.getElementById("crossButton"),
	circleButton = document.getElementById("circleButton"),
	squareButton = document.getElementById("squareButton"),
	triangleButton = document.getElementById("triangleButton"),
	lb1Button = document.getElementById("lb1Button"),
	rb1Button = document.getElementById("rb1Button"),

	// Controller change stuff
	controllerXbox = document.getElementById("xboxController"),
	controllerPS3 = document.getElementById("ps3Controller"),
	controllerChangeXbox = document.getElementById("select-xbox"),
	controllerChangePS3 = document.getElementById("select-ps3"),

  requestAnimFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame,
  isChrome = navigator.webkitGamepads !== undefined;

  buttonToDomMap = {};

var CHROME_STANDARD_BUTTONS = {
  0: [ aButton, crossButton ],
  1: [ bButton, circleButton ],
  2: [ xButton, squareButton ],
  3: [ yButton, triangleButton ],
  4: [ lbButton, lb1Button ],
  5: [ rbButton, rb1Button ],
  8: [ backButton, selectButton ],
  9: [ startButton, startButton ],
  10: [ leftStick, leftStick ],
  11: [ rightStick, rightStick ],
  12: [ dpadUp, dpadUp ],
  13: [ dpadDown, dpadDown ],
  14: [ dpadLeft, dpadLeft ],
  15: [ dpadRight, dpadRight ],
  16: [ xboxButton, psButton ],
};

// Listen for gamepad connection and disconnection
window.addEventListener("MozGamepadConnected", onGamepadConnected);
window.addEventListener("MozGamepadDisconnected", onGamepadDisconnected);
if (isChrome) updateController();

// Listen for controller change events
controllerChangeXbox.addEventListener("click", onSelectXbox);
controllerChangePS3.addEventListener("click", onSelectPS3);

// Run when xBox controller is selected
function onSelectXbox(e) {
	e.preventDefault();
	controllerType = CONTROLLER_TYPES.XBOX;

	controllerPS3.style.display = "none";
	controllerXbox.style.display = "block";
}

// Run when PS3 controller is selected
function onSelectPS3(e) {
	e.preventDefault();
	controllerType = CONTROLLER_TYPES.PS3;

	controllerXbox.style.display = "none";
	controllerPS3.style.display = "block";
}

// Run When a gamepad is connected
function onGamepadConnected(e) {
	var i;

	controller = e.gamepad;

	console.log("Gamepad connected", controller.id);

	// // Buttons
	// for (i = 0; i < controller.buttons.length; i++) {
	// 	console.log(controller.buttons[i]);
	// };

	// // Axes (joysticks)
	// for (i = 0; i < controller.axes.length; i++) {
	// 	console.log(controller.axes[i]);
	// };

	// Start controller checks
	updateController();
}

// Run When a gamepad is disconnected
function onGamepadDisconnected(e) {
	console.log("Gamepad disconnected", controller.id);
}

// Generic controller update check
function updateController() {
  if (isChrome) {
    controller = navigator.webkitGamepads[0];
  }
  if (controller) {
    // Start controller checks
    switch (controllerType) {
      case CONTROLLER_TYPES.XBOX:
        updateXboxController();
        break;
      case CONTROLLER_TYPES.PS3:
        updatePS3Controller();
        break;
    }
  }

	// Next controller check
  requestAnimFrame(updateController);
}

function getDomElementForButton(controllerType, i) {
  if (isChrome) {
    if (CHROME_STANDARD_BUTTONS[i]) {
      return CHROME_STANDARD_BUTTONS[i][controllerType];
    }
  }

  // else FF
  if (controllerType == CONTROLLER_TYPES.XBOX) {
    switch (i) {
      case XBOX_BUTTONS.A:
        return aButton;
      case XBOX_BUTTONS.B:
        return bButton;
      case XBOX_BUTTONS.X:
        return xButton;
      case XBOX_BUTTONS.Y:
        return yButton;
      case XBOX_BUTTONS.LB:
        return lbButton;
      case XBOX_BUTTONS.RB:
        return rbButton;
      case XBOX_BUTTONS.LEFT_STICK:
        return leftStick;
      case XBOX_BUTTONS.RIGHT_STICK:
        return rightStick;
      case XBOX_BUTTONS.START:
        return startButton;
      case XBOX_BUTTONS.BACK:
        return backButton;
      case XBOX_BUTTONS.XBOX:
        return xboxButton;
      case XBOX_BUTTONS.DPAD_UP:
        return dpadUp;
      case XBOX_BUTTONS.DPAD_DOWN:
        return dpadDown;
      case XBOX_BUTTONS.DPAD_LEFT:
        return dpadLeft;
        dpadLeft.classList.add("pressed");
      case XBOX_BUTTONS.DPAD_RIGHT:
        return dpadRight;
    }
  } else if (controllerType == CONTROLLER_TYPES.PS3) {
		switch (i) {
			case PS3_BUTTONS.CROSS:
				return crossButton;
			case PS3_BUTTONS.CIRCLE:
				return circleButton;
			case PS3_BUTTONS.SQUARE:
				return squareButton;
			case PS3_BUTTONS.TRIANGLE:
				return triangleButton;
			case PS3_BUTTONS.LB1:
				return lb1Button;
			case PS3_BUTTONS.RB1:
				return rb1Button;
			case PS3_BUTTONS.LEFT_STICK:
				return leftStick;
			case PS3_BUTTONS.RIGHT_STICK:
				return rightStick;
			case PS3_BUTTONS.START:
				return startButton;
			case PS3_BUTTONS.SELECT:
				return selectButton;
			case PS3_BUTTONS.PS:
				return psButton;
			case PS3_BUTTONS.DPAD_UP:
				return dpadUp;
			case PS3_BUTTONS.DPAD_DOWN:
				return dpadDown;
			case PS3_BUTTONS.DPAD_LEFT:
				return dpadLeft;
			case PS3_BUTTONS.DPAD_RIGHT:
				return dpadRight;
		}
  }
  else {
    console.log("unhandled case!");
  }
}

// Update xBox controller
function updateXboxController() {
	var i, j,
		buttonsDom,
		sticksDom;

	// Clear button pressed styles
	buttonsDom = document.getElementsByClassName("button");
	for (j = 0; j < buttonsDom.length; j++) {
		buttonsDom[j].classList.remove("pressed");
	}

	// Clear stick pressed styles
	sticksDom = document.getElementsByClassName("stick");
	for (j = 0; j < sticksDom.length; j++) {
		sticksDom[j].classList.remove("pressed");
	}

	// Buttons
	for (i = 0; i < controller.buttons.length; i++) {
		// Only continue if button is pressed
		if (!controller.buttons[i]) {
			continue;
		}

    var dom = getDomElementForButton(controllerType, i);
    if (dom) dom.classList.add("pressed");
	}

	// Axes (joysticks and triggers)
	for (i = 0; i < controller.axes.length; i++) {
		switch (i) {
			case XBOX_AXES.LEFT_STICK_X:
				leftStick.getElementsByTagName("span")[0].style.left = (controller.axes[i]*20).toString()+"px";
				break;
			case XBOX_AXES.LEFT_STICK_Y:
				leftStick.getElementsByTagName("span")[0].style.top = (controller.axes[i]*20).toString()+"px";
				break;
			case XBOX_AXES.RIGHT_STICK_X:
				rightStick.getElementsByTagName("span")[0].style.left = (controller.axes[i]*20).toString()+"px";
				break;
			case XBOX_AXES.RIGHT_STICK_Y:
				rightStick.getElementsByTagName("span")[0].style.top = (controller.axes[i]*20).toString()+"px";
				break;
			case XBOX_AXES.LEFT_TRIGGER:
				break;
			case XBOX_AXES.RIGHT_TRIGGER:
				break;
		}
	}
}

// Update PS3 controller
function updatePS3Controller() {
	var i, j,
		buttonsDom,
		sticksDom;

	// Clear button pressed styles
	buttonsDom = document.getElementsByClassName("button");
	for (j = 0; j < buttonsDom.length; j++) {
		buttonsDom[j].classList.remove("pressed");
	}

	// Clear stick pressed styles
	sticksDom = document.getElementsByClassName("stick");
	for (j = 0; j < sticksDom.length; j++) {
		sticksDom[j].classList.remove("pressed");
	}

	// Buttons
	for (i = 0; i < controller.buttons.length; i++) {
		// Only continue if button is pressed
		if (!controller.buttons[i]) {
			continue;
		}

    var dom = getDomElementForButton(controllerType, i);
    if (dom) dom.classList.add("pressed");
	}

	// Axes (joysticks and triggers)
	for (i = 0; i < controller.axes.length; i++) {
		switch (i) {
			case PS3_AXES.LEFT_STICK_X:
				leftStick.getElementsByTagName("span")[0].style.left = (controller.axes[i]*25).toString()+"px";
				break;
			case PS3_AXES.LEFT_STICK_Y:
				leftStick.getElementsByTagName("span")[0].style.top = (controller.axes[i]*25).toString()+"px";
				break;
			case PS3_AXES.RIGHT_STICK_X:
				rightStick.getElementsByTagName("span")[0].style.left = (controller.axes[i]*25).toString()+"px";
				break;
			case PS3_AXES.RIGHT_STICK_Y:
				rightStick.getElementsByTagName("span")[0].style.top = (controller.axes[i]*25).toString()+"px";
				break;
		}
	}
}
