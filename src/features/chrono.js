import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	session: {
		value: 1500,
		runningValue: 1500,
	},
	pause: {
		value: 300,
		runningValue: 300,
	},
	isPLaying: false,
	intervalID: undefined,
	cycles: 0,
	displayedValue: {
		value: 1500,
		heading: 'work',
	},
};
export const chrono = createSlice({
	name: 'chrono',
	initialState,
	reducers: {
		updateChronoValues: (state, action) => {
			const chosenState = state[action.payload.type];
			//block below 1
			if (chosenState.value + action.payload.value === 0) return;
			if (action.payload.type === 'session') {
				if (!state.isPLaying) {
					chosenState.value = chosenState.value + action.payload.value;
					chosenState.runningValue =
						chosenState.runningValue + action.payload.value;
					state.displayedValue.value = chosenState.runningValue;
				} else {
					chosenState.value = chosenState.value + action.payload.value;
				}
			} else if (action.payload.type === 'pause') {
				chosenState.value = chosenState.value + action.payload.value;
			}
		},
		tick: (state, action) => {
			return;
		},
		setUpChrono: (state, action) => {
			state.isPLaying = true;
			state.intervalID = action.payload;
			console.log(state.isPLaying);
		},
		resetChrono: (state, action) => {
			window.clearInterval(state.intervalID);
			state.isPLaying = false;
			console.log(state.isPLaying);
		},
	},
});
export function startChrono(action) {
	return function (dispatch, getState) {
		const intervalID = setInterval(() => {
			dispatch(tick());
		}, 1000);
		dispatch(setUpChrono(intervalID));
		dispatch(tick());
	};
}

export const { updateChronoValues, setUpChrono, resetChrono } = chrono.actions;
export default chrono.reducer;
