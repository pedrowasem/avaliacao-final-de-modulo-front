import { combineReducers } from '@reduxjs/toolkit';

import favoriteSlice from './Favorite/favoriteSlice';
import filterSlice from './Filter/filterSlice';
import loadingSlice from './Loading/loadingSlice';
import notesSlice from './Notes/notesSlice';
import snackBarSlice from './SnackBar/snackBarSlice';
import storedSlice from './Stored/storedSlice';
import themeSlice from './Theme/themeSlice';
import usersSlice from './Users/usersSlice';

export const rootReducer = combineReducers({
	users: usersSlice,
	loading: loadingSlice,
	snack: snackBarSlice,
	notes: notesSlice,
	theme: themeSlice,
	favorite: favoriteSlice,
	stored: storedSlice,
	filter: filterSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
