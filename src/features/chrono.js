import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	work: {
		id: 1,
		name: 'work',
		value: 1500,
		runningValue: 1500,
	},
	pause: {
		id: 2,
		name: 'pause',
		value: 300,
		runningValue: 300,
	},
	isPlaying: false,
	intervalID: undefined,
	cycles: 0,
	displayedValue: {
		value: 1500,
		heading: 'Work',
	},
	currentPhaseIndex: 0,
};
export const chrono = createSlice({
	name: 'chrono',
	initialState,
	reducers: {
		updateChronoValues: (state, action) => {
			const chosenState = state[action.payload.type];

			//block below 1
			if (chosenState.value + action.payload.value === 0) return;
			if (!state.isPlaying) {
				chosenState.value = chosenState.value + action.payload.value;
				chosenState.runningValue =
					chosenState.runningValue + action.payload.value;
				state.displayedValue.value = chosenState.runningValue;

				state.displayedValue.heading =
					action.payload.type.charAt(0).toUpperCase() +
					action.payload.type.slice(1);
				console.log('not playing');
			} else {
				chosenState.value = chosenState.value + action.payload.value;
				console.log('playing');
			}
		},

		tick: (state, action) => {
			const selectedSessionText = state.displayedValue.heading.toLowerCase();
			const selectedSessionHeading =
				selectedSessionText.charAt(0).toUpperCase() +
				selectedSessionText.slice(1);

			// Specify the keys you want to exclude
			const keysToExclude = [
				'isPlaying',
				'intervalID',
				'cycles',
				'displayedValue',
				' currentPhaseIndex',
			];
			// Extract the objects within initialState, excluding keys from keysToExclude
			const phaseNames = Object.entries(initialState)
				.filter(
					([key, value]) =>
						typeof value === 'object' && !keysToExclude.includes(key)
				)
				.map(([key, value]) => key);

			console.log(phaseNames);
			const currentPhase = phaseNames[state.currentPhaseIndex];
			const currentCountdown = initialState[currentPhase].runningValue;

			if (state[selectedSessionText].runningValue > 0) {
				state[selectedSessionText].runningValue--;
				state.displayedValue.value = state[selectedSessionText].runningValue;
				state.displayedValue.heading = selectedSessionHeading;
			} else if (state[selectedSessionText].runningValue <= 0) {
				const prevIndex = state.currentPhaseIndex;
				state.currentPhaseIndex = state.currentPhaseIndex + 1;
				const prevPhase = state[phaseNames[prevIndex]];
				const currPhase = phaseNames[state.currentPhaseIndex];
				//!console.log(phaseNames[state.currentPhaseIndex]);
				if (
					state.currentPhaseIndex >= 0 &&
					state.currentPhaseIndex < phaseNames.length
				) {
					state.cycles++;

					state.displayedValue.value = state[currPhase].runningValue;
					state.displayedValue.heading =
						phaseNames[state.currentPhaseIndex].charAt(0).toUpperCase() +
						phaseNames[state.currentPhaseIndex].slice(1);
					prevPhase.runningValue = prevPhase.value;
				} else {
					state.currentPhaseIndex = 0;
					state.displayedValue.value =
						state[phaseNames[state.currentPhaseIndex]].runningValue;
					state.displayedValue.heading =
						phaseNames[state.currentPhaseIndex].charAt(0).toUpperCase() +
						phaseNames[state.currentPhaseIndex].slice(1);
					prevPhase.runningValue = prevPhase.value;
				}
			}
		},
		setUpChrono: (state, action) => {
			state.isPlaying = true;
			state.intervalID = action.payload;
		},
		resetChrono: (state, action) => {
			window.clearInterval(state.intervalID);
			state.isPlaying = false;

			//!REMETTRE LE BON HEADING
			state.work.runningValue = state.work.value;
			state.pause.runningValue = state.pause.value;
			state.displayedValue.value = state.work.runningValue;
			state.cycles = 0;
		},
	},
});
export function startChrono(type, action) {
	return function (dispatch, getState) {
		const intervalID = setInterval(() => {
			dispatch(tick());
		}, 1000);
		dispatch(setUpChrono(intervalID));
		dispatch(tick());
	};
}

export const { updateChronoValues, setUpChrono, resetChrono, tick } =
	chrono.actions;
export default chrono.reducer;
