import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { axios } from '../../../service/api';
import { showLoading } from '../Loading/loadingSlice';
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
		//Create
		builder.addCase(createNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.addOne(state, action.payload.note);
			}
		});
		builder.addCase(createNotesAsyncThunk.rejected, () => {
			return notesAdapter.getInitialState();
		});
		//List
		builder.addCase(getNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.setAll(state, action.payload.notes);
			}
			showLoading();
		});
		builder.addCase(getNotesAsyncThunk.rejected, (state) => {
			notesAdapter.setAll(state, []);
		});
		//Update
		builder.addCase(updateNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.updateOne(state, {
					id: action.payload.updatedData._id,
					changes: action.payload.updatedData,
				});
			}
		});
		builder.addCase(updateNotesAsyncThunk.rejected, () => {
			return notesAdapter.getInitialState();
		});
		//Delete
		builder.addCase(deleteNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.removeOne(state, action.payload.deletedNote._id);
			}
		});
		builder.addCase(deleteNotesAsyncThunk.rejected, () => {
			return notesAdapter.getInitialState();
		});
		//Favorite
		builder.addCase(favoriteNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.updateOne(state, {
					id: action.payload.updatedData._id,
					changes: action.payload.updatedData,
				});
			}
		});
		builder.addCase(favoriteNotesAsyncThunk.rejected, () => {
			return notesAdapter.getInitialState();
		});
		//Store
		builder.addCase(storeNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.updateOne(state, {
					id: action.payload.updatedData._id,
					changes: action.payload.updatedData,
				});
			}
		});
		builder.addCase(storeNotesAsyncThunk.rejected, () => {
			return notesAdapter.getInitialState();
		});
	},
});

export default notesSlice.reducer;
