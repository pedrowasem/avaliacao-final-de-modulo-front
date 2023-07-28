import Redux, { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setFilter: (state, action: Redux.PayloadAction<string>) => action.payload,
	},
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
