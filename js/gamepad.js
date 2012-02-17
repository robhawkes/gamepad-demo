var CONTROLLER_TYPES = {
	XBOX: 0,
	PS3: 1,
	LOGITECH: 2
};

var XBOX_AXES = {
	LEFT_STICK_X: 0,
	LEFT_STICK_Y: 1,
	RIGHT_STICK_X: 2,
	RIGHT_STICK_Y: 3
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
	HOME: 10,
	DPAD_UP: 11,
	DPAD_DOWN: 12,
	DPAD_LEFT: 13,
	DPAD_RIGHT: 14
};

var LOGITECH_AXES = {
	LEFT_STICK_X: 1,
	LEFT_STICK_Y: 2,
	RIGHT_STICK_X: 3,
	RIGHT_STICK_Y: 4
};

var LOGITECH_AXES_CHROME = {
	LEFT_STICK_X: 0,
	LEFT_STICK_Y: 1,
	RIGHT_STICK_X: 2,
	RIGHT_STICK_Y: 5
};

var LOGITECH_BUTTONS = {
	A: 1,
	B: 2,
	X: 0,
	Y: 3,
	LB: 4,
	RB: 5,
	LEFT_STICK: 10,
	RIGHT_STICK: 11,
	START: 9,
	BACK: 8,
	//HOME: 10,
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
	HOME: 16,
	DPAD_UP: 4,
	DPAD_DOWN: 6,
	DPAD_LEFT: 7,
	DPAD_RIGHT: 5
};

var PS3_BUTTONS_CHROME = {
	CROSS: 0,
	CIRCLE: 1,
	SQUARE: 2,
	TRIANGLE: 3,
	LB1: 4,
	RB1: 5,
	LEFT_STICK: 10,
	RIGHT_STICK: 11,
	START: 9,
	SELECT: 8,
	HOME: 16,
	DPAD_UP: 12,
	DPAD_DOWN: 13,
	DPAD_LEFT: 14,
	DPAD_RIGHT: 15
};

var controller,
	controllerType,
	// xBox/default controls
	xBoxLeftStick = document.getElementById("xBoxLeftStick"),
	xBoxRightStick = document.getElementById("xBoxRightStick"),
	xBoxBackButton = document.getElementById("xBoxBackButton"),
	xBoxHomeButton = document.getElementById("xBoxHomeButton"),
	xBoxStartButton = document.getElementById("xBoxStartButton"),
	xBoxDpadUp = document.getElementById("xBoxDpadUp"),
	xBoxDpadDown = document.getElementById("xBoxDpadDown"),
	xBoxDpadLeft = document.getElementById("xBoxDpadLeft"),
	xBoxDpadRight = document.getElementById("xBoxDpadRight"),
	xBoxAButton = document.getElementById("xBoxAButton"),
	xBoxBButton = document.getElementById("xBoxBButton"),
	xBoxXButton = document.getElementById("xBoxXButton"),
	xBoxYButton = document.getElementById("xBoxYButton"),
	xBoxLbButton = document.getElementById("xBoxLbButton"),
	xBoxRbButton = document.getElementById("xBoxRbButton"),

	// PS3-specific controls
	PS3LeftStick = document.getElementById("PS3LeftStick"),
	PS3RightStick = document.getElementById("PS3RightStick"),
	PS3SelectButton = document.getElementById("PS3SelectButton"),
	PS3HomeButton = document.getElementById("PS3HomeButton"),
	PS3StartButton = document.getElementById("PS3StartButton"),
	PS3DpadUp = document.getElementById("PS3DpadUp"),
	PS3DpadDown = document.getElementById("PS3DpadDown"),
	PS3DpadLeft = document.getElementById("PS3DpadLeft"),
	PS3DpadRight = document.getElementById("PS3DpadRight"),
	PS3CrossButton = document.getElementById("PS3CrossButton"),
	PS3CircleButton = document.getElementById("PS3CircleButton"),
	PS3SquareButton = document.getElementById("PS3SquareButton"),
	PS3TriangleButton = document.getElementById("PS3TriangleButton"),
	PS3Lb1Button = document.getElementById("PS3Lb1Button"),
	PS3Rb1Button = document.getElementById("PS3Rb1Button"),

	// Logitech controls
	logitechLeftStick = document.getElementById("xBoxLeftStick"),
	logitechRightStick = document.getElementById("xBoxRightStick"),
	logitechBackButton = document.getElementById("xBoxBackButton"),
	logitechHomeButton = document.getElementById("xBoxHomeButton"),
	logitechStartButton = document.getElementById("xBoxStartButton"),
	logitechDpadUp = document.getElementById("xBoxDpadUp"),
	logitechDpadDown = document.getElementById("xBoxDpadDown"),
	logitechDpadLeft = document.getElementById("xBoxDpadLeft"),
	logitechDpadRight = document.getElementById("xBoxDpadRight"),
	logitechAButton = document.getElementById("xBoxAButton"),
	logitechBButton = document.getElementById("xBoxBButton"),
	logitechXButton = document.getElementById("xBoxXButton"),
	logitechYButton = document.getElementById("xBoxYButton"),
	logitechLbButton = document.getElementById("xBoxLbButton"),
	logitechRbButton = document.getElementById("xBoxRbButton"),

	// Controller change stuff
	controllerDisconnected = document.getElementById("controllerDisconnected"),
	controllerXbox = document.getElementById("xboxController"),
	controllerPS3 = document.getElementById("ps3Controller"),

	// RAF and Chrome stuff
	requestAnimFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame,
	isChrome = navigator.webkitGamepads !== undefined;

// Skip to RAF if using Chrome, otherwise assume Firefox
if (isChrome) {
	updateController();
} else {
	// Listen for gamepad connection and disconnection
	window.addEventListener("MozGamepadConnected", onGamepadConnected);
	window.addEventListener("MozGamepadDisconnected", onGamepadDisconnected);
}

// Run When a gamepad is connected
function onGamepadConnected(e) {
	var i;

	controller = e.gamepad;

	console.log("Gamepad connected", controller.id);

	// Detect and connect gamepad
	detectAndConnect(controller.id);

	// Start controller checks
	updateController();
}

function detectAndConnect(id) {
	if (id.search("PLAYSTATION(R)3") >= 0) {
		if (controllerType === CONTROLLER_TYPES.PS3) {
			return;
		}

		controllerType = CONTROLLER_TYPES.PS3;
		controllerXbox.style.display = "none";
		controllerPS3.style.display = "block";
	} else if (id.search("Logitech Rumblepad 2") >= 0) {
		if (controllerType === CONTROLLER_TYPES.LOGITECH) {
			return;
		}

		controllerType = CONTROLLER_TYPES.LOGITECH;
		controllerXbox.style.display = "block";
		controllerPS3.style.display = "none";
	}

	// Hide disconnection message and show relevant controller
	if (controllerType !== "undefined") {
		controllerDisconnected.style.display = "none";
	}
}

// Run When a gamepad is disconnected
function onGamepadDisconnected(e) {
	console.log("Gamepad disconnected", controller.id);

	disconnect();
}

function disconnect() {
	controller = null;
	controllerType = null;

	// Hide controller visualisations
	controllerXbox.style.display = "none";
	controllerPS3.style.display = "none";

	// Show disconnected message
	controllerDisconnected.style.display = "block";
}

// Generic controller update check
function updateController() {
	// Detect and connect controller if using Chrome
	if (isChrome) {
		var chromeController = navigator.webkitGamepads[0];

		if (!controller) {
			controller = chromeController;
		}

		if (!chromeController) {
			// Disconnect previous controllers
			if (controller) {
				disconnect();
			}

			// Skip to next controller check
			requestAnimFrame(updateController);
			return;
		}

		detectAndConnect(chromeController.id);
	}

	// Start controller checks
	switch (controllerType) {
		case CONTROLLER_TYPES.XBOX:
			updateXboxController();
			break;
		case CONTROLLER_TYPES.PS3:
			updatePS3Controller();
			break;
		case CONTROLLER_TYPES.LOGITECH:
			updateLogitechController();
			break;
	}

	// Next controller check
	requestAnimFrame(updateController);
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

		switch (i) {
			case XBOX_BUTTONS.A:
				xBoxAButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.B:
				xBoxBButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.X:
				xBoxXButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.Y:
				xBoxYButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.LB:
				xBoxLbButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.RB:
				xBoxRbButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.LEFT_STICK:
				xBoxLeftStick.classList.add("pressed");
				break;
			case XBOX_BUTTONS.RIGHT_STICK:
				xBoxRightStick.classList.add("pressed");
				break;
			case XBOX_BUTTONS.START:
				xBoxStartButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.BACK:
				xBoxBackButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.HOME:
				xBoxHomeButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.DPAD_UP:
				xBoxDpadUp.classList.add("pressed");
				break;
			case XBOX_BUTTONS.DPAD_DOWN:
				xBoxDpadDown.classList.add("pressed");
				break;
			case XBOX_BUTTONS.DPAD_LEFT:
				xBoxDpadLeft.classList.add("pressed");
				break;
			case XBOX_BUTTONS.DPAD_RIGHT:
				xBoxDpadRight.classList.add("pressed");
				break;
		}
	}

	// Axes (joysticks and triggers)
	for (i = 0; i < controller.axes.length; i++) {
		switch (i) {
			case XBOX_AXES.LEFT_STICK_X:
				xBoxLeftStick.getElementsByTagName("span")[0].style.left = (controller.axes[i]*20).toString()+"px";
				break;
			case XBOX_AXES.LEFT_STICK_Y:
				xBoxLeftStick.getElementsByTagName("span")[0].style.top = (controller.axes[i]*20).toString()+"px";
				break;
			case XBOX_AXES.RIGHT_STICK_X:
				xBoxRightStick.getElementsByTagName("span")[0].style.left = (controller.axes[i]*20).toString()+"px";
				break;
			case XBOX_AXES.RIGHT_STICK_Y:
				xBoxRightStick.getElementsByTagName("span")[0].style.top = (controller.axes[i]*20).toString()+"px";
				break;
		}
	}
}

// Update PS3 controller
function updatePS3Controller() {
	var i, j,
		buttonsDom,
		sticksDom,
		buttons;

	if (isChrome) {
		buttons = PS3_BUTTONS_CHROME;
	} else {
		buttons = PS3_BUTTONS;
	}

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

		switch (i) {
			case buttons.CROSS:
				PS3CrossButton.classList.add("pressed");
				break;
			case buttons.CIRCLE:
				PS3CircleButton.classList.add("pressed");
				break;
			case buttons.SQUARE:
				PS3SquareButton.classList.add("pressed");
				break;
			case buttons.TRIANGLE:
				PS3TriangleButton.classList.add("pressed");
				break;
			case buttons.LB1:
				PS3Lb1Button.classList.add("pressed");
				break;
			case buttons.RB1:
				PS3Rb1Button.classList.add("pressed");
				break;
			case buttons.LEFT_STICK:
				PS3LeftStick.classList.add("pressed");
				break;
			case buttons.RIGHT_STICK:
				PS3RightStick.classList.add("pressed");
				break;
			case buttons.START:
				PS3StartButton.classList.add("pressed");
				break;
			case buttons.SELECT:
				PS3SelectButton.classList.add("pressed");
				break;
			case buttons.HOME:
				PS3HomeButton.classList.add("pressed");
				break;
			case buttons.DPAD_UP:
				PS3DpadUp.classList.add("pressed");
				break;
			case buttons.DPAD_DOWN:
				PS3DpadDown.classList.add("pressed");
				break;
			case buttons.DPAD_LEFT:
				PS3DpadLeft.classList.add("pressed");
				break;
			case buttons.DPAD_RIGHT:
				PS3DpadRight.classList.add("pressed");
				break;
		}
	}

	// Axes (joysticks and triggers)
	for (i = 0; i < controller.axes.length; i++) {
		switch (i) {
			case PS3_AXES.LEFT_STICK_X:
				PS3LeftStick.getElementsByTagName("span")[0].style.left = (controller.axes[i]*25).toString()+"px";
				break;
			case PS3_AXES.LEFT_STICK_Y:
				PS3LeftStick.getElementsByTagName("span")[0].style.top = (controller.axes[i]*25).toString()+"px";
				break;
			case PS3_AXES.RIGHT_STICK_X:
				PS3RightStick.getElementsByTagName("span")[0].style.left = (controller.axes[i]*25).toString()+"px";
				break;
			case PS3_AXES.RIGHT_STICK_Y:
				PS3RightStick.getElementsByTagName("span")[0].style.top = (controller.axes[i]*25).toString()+"px";
				break;
		}
	}
}

// Update Logitech controller
function updateLogitechController() {
	var i, j,
		buttonsDom,
		sticksDom,
		axes;

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

		switch (i) {
			case LOGITECH_BUTTONS.A:
				xBoxAButton.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.B:
				xBoxBButton.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.X:
				xBoxXButton.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.Y:
				xBoxYButton.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.LB:
				xBoxLbButton.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.RB:
				xBoxRbButton.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.LEFT_STICK:
				xBoxLeftStick.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.RIGHT_STICK:
				xBoxRightStick.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.START:
				xBoxStartButton.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.BACK:
				xBoxBackButton.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.HOME:
				xBoxHomeButton.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.DPAD_UP:
				xBoxDpadUp.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.DPAD_DOWN:
				xBoxDpadDown.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.DPAD_LEFT:
				xBoxDpadLeft.classList.add("pressed");
				break;
			case LOGITECH_BUTTONS.DPAD_RIGHT:
				xBoxDpadRight.classList.add("pressed");
				break;
		}
	}

	if (isChrome) {
		axes = LOGITECH_AXES_CHROME;
	} else {
		axes = LOGITECH_AXES;
	}

	// Axes (joysticks and triggers)
	for (i = 0; i < controller.axes.length; i++) {
		switch (i) {
			case axes.LEFT_STICK_X:
				xBoxLeftStick.getElementsByTagName("span")[0].style.left = (controller.axes[i]*20).toString()+"px";
				break;
			case axes.LEFT_STICK_Y:
				xBoxLeftStick.getElementsByTagName("span")[0].style.top = (controller.axes[i]*20).toString()+"px";
				break;
			case axes.RIGHT_STICK_X:
				xBoxRightStick.getElementsByTagName("span")[0].style.left = (controller.axes[i]*20).toString()+"px";
				break;
			case axes.RIGHT_STICK_Y:
				xBoxRightStick.getElementsByTagName("span")[0].style.top = (controller.axes[i]*20).toString()+"px";
				break;
		}
	}
}