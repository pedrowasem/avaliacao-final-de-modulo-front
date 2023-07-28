import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axios } from '../../../service/api';
import { showSnackBar } from '../SnackBar/snackBarSlice';
import { CreateUser, CreateUserReturn, Login, LoginReturn } from './types';

const initialState = {
	loading: false,
};
////////////////////////////////////////////////////////////

export const createLoginAsyncThunk = createAsyncThunk(
	'user/create',
	async (data: CreateUser, { dispatch }) => {
		try {
			const response = await axios.post('/users', {
				name: data.name,
				password: data.password,
				passwordConfirm: data.passwordConfirm,
			});
			dispatch(
				showSnackBar({
					message: response.data.message,
					type: 'success',
				}),
			);
			return response.data as CreateUserReturn;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response?.data as CreateUserReturn;
				dispatch(
					showSnackBar({
						message: response.message,
						type: 'error',
					}),
				);
				return response as CreateUserReturn;
			}
		}
	},
);

export const loginAsyncThunk = createAsyncThunk(
	'user/login',
	async ({ data, isLogged }: { data: Login; isLogged: boolean }, { dispatch }) => {
		try {
			const response = await axios.post('/login', {
				name: data.name,
				password: data.password,
			});
			const login = response.data as LoginReturn;
			login.isLogged = isLogged;
			return response.data as LoginReturn;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response?.data as LoginReturn;

				dispatch(
					showSnackBar({
						message: response.message,
						type: 'error',
					}),
				);

				return response;
			}
		}
	},
);

//////////////////////////////////////////////////////////////

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		logoutUser: () => {
			localStorage.removeItem('token');
			sessionStorage.removeItem('token');

			return initialState;
		},
	},

	extraReducers: (builder) => {
		// Signup
		builder.addCase(createLoginAsyncThunk.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});

		builder.addCase(createLoginAsyncThunk.fulfilled, () => {
			return initialState;
		});
		builder.addCase(createLoginAsyncThunk.rejected, () => {
			return initialState;
		});

		// Login
		builder.addCase(loginAsyncThunk.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});
		builder.addCase(loginAsyncThunk.fulfilled, (_state, action) => {
			if (action.payload?.success && action.payload.token) {
				const token = action.payload.token;
				const isLogged = action.payload.isLogged;
				isLogged
					? localStorage.setItem('token', token)
					: sessionStorage.setItem('token', token);
			}
			return initialState;
		});
		builder.addCase(loginAsyncThunk.rejected, () => {
			return initialState;
		});
	},
});

export const { logoutUser } = usersSlice.actions;

export default usersSlice.reducer;
export const userActions = usersSlice.actions;
