import { configureStore } from '@reduxjs/toolkit';
import chrono from './features/chrono';

export const store = configureStore({
	reducer: {
		chrono,
	},
});
