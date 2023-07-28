import Redux, { createSlice } from '@reduxjs/toolkit';

const initialState = 'false';

const favoriteSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		setFavorite: (state, action: Redux.PayloadAction<string>) => action.payload,
	},
});

export const { setFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
