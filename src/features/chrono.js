import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	work: {
		value: 1500,
		runningValue: 1500,
	},
	pause: {
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
		// updateChronoValues: (state, action) => {
		// 	const chosenState = state[action.payload.type];

		// 	//block below 1
		// 	if (chosenState.value + action.payload.value === 0) return;
		// 	if (action.payload.type === 'work') {
		// 		if (!state.isPlaying) {
		// 			chosenState.value = chosenState.value + action.payload.value;
		// 			chosenState.runningValue =
		// 				chosenState.runningValue + action.payload.value;
		// 			state.displayedValue.value = chosenState.runningValue;
		// 		} else {
		// 			chosenState.value = chosenState.value + action.payload.value;
		// 		}
		// 	} else if (action.payload.type === 'pause') {
		// 		chosenState.value = chosenState.value + action.payload.value;
		// 	}
		// },
		updateChronoValues: (state, action) => {
			const chosenState = state[action.payload.type];

			//block below 1
			if (chosenState.value + action.payload.value === 0) return;
			if (!state.isPlaying) {
				chosenState.value = chosenState.value + action.payload.value;
				chosenState.runningValue =
					chosenState.runningValue + action.payload.value;
				state.displayedValue.value = chosenState.runningValue;
				console.log('playing');
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

			const phaseNames = Object.keys(initialState).filter((key) => {
				const phase = initialState[key];
				return (
					phase &&
					typeof phase === 'object' &&
					'value' in phase &&
					'runningValue' in phase
				);
			});
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
			state.work.runningValue = state.work.value;
			state.pause.runningValue = state.pause.value;
			state.displayedValue.value = state.work.runningValue;
			state.cycles = 0;
		},
		choseChrono: (state, action) => {
			const chosenState = state[action.payload];
			state.displayedValue.value = chosenState.value;
			state.displayedValue.heading = 'Pause';
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

export const {
	updateChronoValues,
	setUpChrono,
	resetChrono,
	tick,
	choseChrono,
} = chrono.actions;
export default chrono.reducer;
