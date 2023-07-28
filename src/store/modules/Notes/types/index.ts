export interface NotesModel {
	_id: string;
	_title: string;
	_description: string;
	_createdAt: string;
	_userId: string;
	_favorite: boolean;
	_stored: boolean;
}

export interface CreateNote {
	title: string;
	description: string;
	token: string;
}

export interface UpdateNote {
	id: string;
	title?: string;
	description?: string;
	token: string;
}

export interface NoteReturn {
	message: string;
	success: boolean;
	note: NotesModel;
}

export interface GetNotesDTO {
	token: string;
	title?: string;
	favorite?: string;
	stored?: string;
}

export interface UpdateNoteReturn {
	message: string;
	success: boolean;
	updatedData: NotesModel;
}

export interface DeletedNoteReturn {
	message: string;
	success: boolean;
	deletedNote: NotesModel;
}

export interface FavoriteNoteReturn {
	message: string;
	success: boolean;
	updatedData: NotesModel;
}
export interface StoreNoteReturn {
	message: string;
	success: boolean;
	updatedData: NotesModel;
}

export interface NotesListReturn {
	message: string;
	success: boolean;
	notes: NotesModel[];
}
