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

var controller,
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
	rbButton = document.getElementById("rbButton");

window.addEventListener("MozGamepadConnected", onGamepadConnected);
window.addEventListener("MozGamepadDisconnected", onGamepadDisconnected);

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
};

function onGamepadDisconnected(e) {
	console.log("Gamepad disconnected", controller.id);
};

function updateController() {
	var i, j,
		buttonsDom,
		sticksDom;

	// Clear button pressed styles
	buttonsDom = document.getElementsByClassName("button");
	for (j = 0; j < buttonsDom.length; j++) {
		buttonsDom[j].classList.remove("pressed");
	};

	// Clear stick pressed styles
	sticksDom = document.getElementsByClassName("stick");
	for (j = 0; j < sticksDom.length; j++) {
		sticksDom[j].classList.remove("pressed");
	};

	// Buttons
	for (i = 0; i < controller.buttons.length; i++) {
		// Only continue if button is pressed
		if (!controller.buttons[i]) {
			continue;
		};

		switch (i) {
			case XBOX_BUTTONS.A:
				aButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.B:
				bButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.X:
				xButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.Y:
				yButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.LB:
				lbButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.RB:
				rbButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.LEFT_STICK:
				leftStick.classList.add("pressed");
				break;
			case XBOX_BUTTONS.RIGHT_STICK:
				rightStick.classList.add("pressed");
				break;
			case XBOX_BUTTONS.START:
				startButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.BACK:
				backButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.XBOX:
				xboxButton.classList.add("pressed");
				break;
			case XBOX_BUTTONS.DPAD_UP:
				dpadUp.classList.add("pressed");
				break;
			case XBOX_BUTTONS.DPAD_DOWN:
				dpadDown.classList.add("pressed");
				break;
			case XBOX_BUTTONS.DPAD_LEFT:
				dpadLeft.classList.add("pressed");
				break;
			case XBOX_BUTTONS.DPAD_RIGHT:
				dpadRight.classList.add("pressed");
				break;
		};
	};

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
		};
	};

	// Next controller check
	window.mozRequestAnimationFrame(updateController);
};