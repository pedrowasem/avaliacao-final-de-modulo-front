import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SnackBarProps {
	show?: boolean;
	message: string;
	type: 'warning' | 'error' | 'success';
}

const initialState: SnackBarProps = {
	show: false,
	message: '',
	type: 'warning',
};

const snackBarSlice = createSlice({
	name: 'snackBar',
	initialState,
	reducers: {
		showSnackBar: (state, action: PayloadAction<SnackBarProps>) => {
			return {
				show: true,
				message: action.payload.message,
				type: action.payload.type,
			};
		},
		hideSnackBar: (state, action: PayloadAction<SnackBarProps>) => {
			return {
				show: false,
				message: action.payload.message,
				type: action.payload.type,
			};
		},
	},
});
export const { showSnackBar, hideSnackBar } = snackBarSlice.actions;

export default snackBarSlice.reducer;
