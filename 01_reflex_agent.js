// MIT License
// Copyright (c) 2020 Luis Espino

const statesArray = [
	{
		cleanerPos: "A",
		aBox: "DIRTY",
		bBox: "DIRTY",
		stateNumber: 1,
	},
	{
		cleanerPos: "B",
		aBox: "DIRTY",
		bBox: "DIRTY",
		stateNumber: 2,
	},
	{
		cleanerPos: "A",
		aBox: "DIRTY",
		bBox: "CLEAN",
		stateNumber: 3,
	},
	{
		cleanerPos: "B",
		aBox: "DIRTY",
		bBox: "CLEAN",
		stateNumber: 4,
	},
	{
		cleanerPos: "A",
		aBox: "CLEAN",
		bBox: "DIRTY",
		stateNumber: 5,
	},
	{
		cleanerPos: "B",
		aBox: "CLEAN",
		bBox: "DIRTY",
		stateNumber: 6,
	},
	{
		cleanerPos: "A",
		aBox: "CLEAN",
		bBox: "CLEAN",
		stateNumber: 7,
	},
	{
		cleanerPos: "B",
		aBox: "CLEAN",
		bBox: "CLEAN",
		stateNumber: 8,
	},
];

const statePased = [
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
];


function isFinished() {
	let finish = true;
	statePased.forEach((state) => {
		if (!state) finish = false;
	});
	return finish;
}

function generatedTrash() {
	const randomNumber = Math.floor(Math.random() * (0 - 50 + 1)) + 50;
	if (randomNumber >= 0 && randomNumber < 11) return 0;
	if (randomNumber >= 11 && randomNumber < 31) return 1;
	return 2;

}

function actualState (cleanerPos, aBox, bBox) {
	const _actualState = statesArray.find((state) => {
	  return (
		state.cleanerPos === cleanerPos &&
		state.aBox === aBox &&
		state.bBox === bBox
	  );
	});
	statePased[_actualState.stateNumber - 1] = true;
	return _actualState.stateNumber;
  };

function reflex_agent(location, state) {
	if (state == "DIRTY") return "CLEAN";
	else if (location == "A") return "RIGHT";
	else if (location == "B") return "LEFT";
}

function test(states) {
	let iteacion = true;

	while (iteacion) {
		var location = states[0];
		var state = states[0] == "A" ? states[1] : states[2];
		var action_result = reflex_agent(location, state);

		let estadoActual = actualState(states[0], states[1], states[2]);

		document.getElementById("log").innerHTML += "<br>ESTADO: ".concat(estadoActual).concat(" Location: ").concat(location).concat(" | Action: ").concat(action_result);
		if (action_result == "CLEAN") {
			if (location == "A") states[1] = "CLEAN";
			else if (location == "B") states[2] = "CLEAN";
		}
		else if (action_result == "RIGHT") states[0] = "B";
		else if (action_result == "LEFT") states[0] = "A";

		setTimeout(() => {}, 2000);

		let trash = generatedTrash();
		if (trash != 0) {
			states[trash] = "DIRTY";
			document.getElementById(
				"log"
			).innerHTML += `<br> ----------- SE AGREGA BASURA EN ${trash} -----------`;
		}
		if (isFinished()) {
			document.getElementById(
				"log"
			).innerHTML += `<br> ------------ ITERACIONES TERMINADAS ----------------`;
			iteacion = false;
		}

	}
}

var states = ["A", "DIRTY", "DIRTY"];
test(states);


