import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: 1,
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
	reducers: {},
});
export default chrono.reducer;
