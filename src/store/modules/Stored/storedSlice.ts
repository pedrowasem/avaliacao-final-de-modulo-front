import Redux, { createSlice } from '@reduxjs/toolkit';

const initialState = 'false';

const storedSlice = createSlice({
	name: 'stored',
	initialState,
	reducers: {
		setStored: (state, action: Redux.PayloadAction<string>) => action.payload,
	},
});

export const { setStored } = storedSlice.actions;
export default storedSlice.reducer;
