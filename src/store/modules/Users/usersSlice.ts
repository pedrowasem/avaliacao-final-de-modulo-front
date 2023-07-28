import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { axios } from '../../../service/api';
import { CreateUser, CreateUserReturn, Login, LoginReturn, User } from './types';

const adapter = createEntityAdapter<User>({
	selectId: (user) => user._name,
});

////////////////////////////////////////////////////////////

export const createLoginAsyncThunk = createAsyncThunk('user/create', async (data: CreateUser) => {
	const response = await axios.post('/users', {
		name: data.name,
		password: data.password,
		passwordConfirm: data.passwordConfirm,
	});
	return response.data as CreateUserReturn;
});

export const loginAsyncThunk = createAsyncThunk('user/login', async (data: Login) => {
	const response = await axios.post('/login', { name: data.name, password: data.password });
	return response.data as LoginReturn;
});

//////////////////////////////////////////////////////////////

export const { selectAll: users } = adapter.getSelectors((state: RootState) => state.users);

const usersSlice = createSlice({
	name: 'users',
	initialState: adapter.getInitialState(),
	reducers: {},

	extraReducers: (builder) => {
		// Signup
		builder.addCase(createLoginAsyncThunk.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});

		builder.addCase(createLoginAsyncThunk.fulfilled, (state, action) => {
			console.log(action);
		});

		// Login
		builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				console.log(action);
			}
		});
	},
});

export default usersSlice.reducer;
export const userActions = usersSlice.actions;
