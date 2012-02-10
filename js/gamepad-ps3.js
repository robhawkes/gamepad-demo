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
	leftStick = document.getElementById("leftStick"),
	rightStick = document.getElementById("rightStick"),
	selectButton = document.getElementById("selectButton"),
	psButton = document.getElementById("psButton"),
	startButton = document.getElementById("startButton"),
	dpadUp = document.getElementById("dpadUp"),
	dpadDown = document.getElementById("dpadDown"),
	dpadLeft = document.getElementById("dpadLeft"),
	dpadRight = document.getElementById("dpadRight"),
	crossButton = document.getElementById("crossButton"),
	circleButton = document.getElementById("circleButton"),
	squareButton = document.getElementById("squareButton"),
	triangleButton = document.getElementById("triangleButton"),
	lb1Button = document.getElementById("lb1Button"),
	rb1Button = document.getElementById("rb1Button");

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
			case PS3_BUTTONS.CROSS:
				crossButton.classList.add("pressed");
				break;
			case PS3_BUTTONS.CIRCLE:
				circleButton.classList.add("pressed");
				break;
			case PS3_BUTTONS.SQUARE:
				squareButton.classList.add("pressed");
				break;
			case PS3_BUTTONS.TRIANGLE:
				triangleButton.classList.add("pressed");
				break;
			case PS3_BUTTONS.LB1:
				lb1Button.classList.add("pressed");
				break;
			case PS3_BUTTONS.RB1:
				rb1Button.classList.add("pressed");
				break;
			case PS3_BUTTONS.LEFT_STICK:
				leftStick.classList.add("pressed");
				break;
			case PS3_BUTTONS.RIGHT_STICK:
				rightStick.classList.add("pressed");
				break;
			case PS3_BUTTONS.START:
				startButton.classList.add("pressed");
				break;
			case PS3_BUTTONS.SELECT:
				selectButton.classList.add("pressed");
				break;
			case PS3_BUTTONS.PS:
				psButton.classList.add("pressed");
				break;
			case PS3_BUTTONS.DPAD_UP:
				dpadUp.classList.add("pressed");
				break;
			case PS3_BUTTONS.DPAD_DOWN:
				dpadDown.classList.add("pressed");
				break;
			case PS3_BUTTONS.DPAD_LEFT:
				dpadLeft.classList.add("pressed");
				break;
			case PS3_BUTTONS.DPAD_RIGHT:
				dpadRight.classList.add("pressed");
				break;
		};
	};

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
		};
	};

	// Next controller check
	window.mozRequestAnimationFrame(updateController);
};