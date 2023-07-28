import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { axios } from '../../../service/api';
import {
	CreateNote,
	DeletedNoteReturn,
	GetNotesDTO,
	NoteReturn,
	NotesListReturn,
	NotesModel,
	UpdateNote,
	UpdateNoteReturn,
} from './types';

const notesAdapter = createEntityAdapter<NotesModel>({
	selectId: (state) => state._id,
});

export const createNotesAsyncThunk = createAsyncThunk('notes/create', async (data: CreateNote) => {
	const response = await axios.post('/notes', data, {
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	});

	return response.data as NoteReturn;
});

export const getNotesAsyncThunk = createAsyncThunk(
	'notes/list',
	async ({ token, title, favorite, stored }: GetNotesDTO) => {
		const response = await axios.get('/notes', {
			params: {
				title,
				favorite,
				stored,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data as NotesListReturn;
	},
);

export const updateNotesAsyncThunk = createAsyncThunk(
	'user/updateNotes',
	async (data: UpdateNote) => {
		const response = await axios.put(`/notes/${data.id}`, data, {
			headers: {
				Authorization: `Bearer ${data.token}`,
			},
		});

		return response.data as UpdateNoteReturn;
	},
);

export const deleteNotesAsyncThunk = createAsyncThunk(
	'notes/delete',
	async ({ _id, token }: { _id: string; token: string }) => {
		const response = await axios.delete(`/notes/${_id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data as DeletedNoteReturn;
	},
);

export const favoriteNotesAsyncThunk = createAsyncThunk(
	'notes/favorite',
	async ({ _id, token }: { _id: string; token: string }) => {
		const response = await axios.put(
			`/notes/${_id}/favorite`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		return response.data as UpdateNoteReturn;
	},
);
export const storeNotesAsyncThunk = createAsyncThunk(
	'notes/store',
	async ({ _id, token }: { _id: string; token: string }) => {
		const response = await axios.put(
			`/notes/${_id}/store`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data as UpdateNoteReturn;
	},
);

export const { selectAll: listAllNotes, selectById: selectNoteById } = notesAdapter.getSelectors(
	(state: RootState) => state.notes,
);

const notesSlice = createSlice({
	initialState: notesAdapter.getInitialState(),
	name: 'notes',
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.addOne(state, action.payload.note);
			}
		});
		builder.addCase(getNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.setAll(state, action.payload.notes);
			}
		});
		builder.addCase(getNotesAsyncThunk.rejected, (state) => {
			notesAdapter.setAll(state, []);
		});
		builder.addCase(updateNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.updateOne(state, {
					id: action.payload.updatedData._id,
					changes: action.payload.updatedData,
				});
			}
		});
		builder.addCase(deleteNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.removeOne(state, action.payload.deletedNote._id);
			}
		});
		builder.addCase(favoriteNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.updateOne(state, {
					id: action.payload.updatedData._id,
					changes: action.payload.updatedData,
				});
			}
		});
		builder.addCase(storeNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.updateOne(state, {
					id: action.payload.updatedData._id,
					changes: action.payload.updatedData,
				});
			}
		});
	},
});

export default notesSlice.reducer;
