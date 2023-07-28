import {
	Delete,
	Edit,
	Favorite,
	FavoriteBorder,
	Folder,
	FolderOutlined,
} from '@mui/icons-material';
import {
	Card,
	CardActions,
	CardContent,
	Divider,
	Grid,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import {
	favoriteNotesAsyncThunk,
	storeNotesAsyncThunk,
} from '../../store/modules/Notes/notesSlice';
import ModalNotes from '../ModalNotes';

interface NotesModel {
	_id: string;
	_title: string;
	_description: string;
	_createdAt: string;
	_userId: string;
	_favorite: boolean;
	_stored: boolean;
}
interface NoteProps {
	note: NotesModel;
}

const NoteCard: React.FC<NoteProps> = ({ note }) => {
	const [open, setOpen] = useState(false);
	const [, setDeleta] = useState(false);
	const [update, setUpdate] = useState(false);

	const dispatch = useAppDispatch();
	const token = localStorage.getItem('token') ?? (sessionStorage.getItem('token') as string);

	const handleFavorite = async () => {
		await dispatch(favoriteNotesAsyncThunk({ _id: note._id, token }));
	};

	const handleStore = async () => {
		await dispatch(storeNotesAsyncThunk({ _id: note._id, token }));
	};
	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Card
				sx={{
					minWidth: 275,
					borderRadius: '20px',
					boxShadow: 'inset 2px 2px 5px #ffffff34, inset -5px -5px 5px #babecc46',
				}}>
				<CardContent>
					<Stack direction="row" justifyContent="space-between">
						<Typography variant="h5" component="div" paddingTop="4px">
							{note._title}
						</Typography>
						<Stack direction="row" spacing={1}>
							<IconButton
								aria-label="fav"
								onClick={() => {
									handleFavorite();
								}}>
								{note._favorite && <Favorite />}
								{!note._favorite && <FavoriteBorder />}
							</IconButton>
							<IconButton
								aria-label="store"
								onClick={() => {
									handleStore();
								}}>
								{note._stored && <Folder />}
								{!note._stored && <FolderOutlined />}
							</IconButton>
						</Stack>
					</Stack>
					<Divider />
					<Typography variant="body1" paddingY={1}>
						{note._description}
					</Typography>
				</CardContent>
				<Divider />
				<CardActions sx={{ justifyContent: 'space-between', paddingX: '16px' }}>
					<Typography variant="caption">
						{note._createdAt}
						<br />
					</Typography>
					<Stack direction="row" spacing={1}>
						<IconButton
							aria-label="edit"
							onClick={() => {
								setOpen(true);
								setUpdate(true);
								setDeleta(false);
							}}>
							<Edit />
						</IconButton>
						<IconButton
							aria-label="delete"
							onClick={() => {
								setOpen(true);
								setUpdate(false);
								setDeleta(true);
							}}>
							<Delete />
						</IconButton>
					</Stack>
				</CardActions>
			</Card>
			<ModalNotes
				context={update ? 'update' : 'delete'}
				open={open}
				setOpen={setOpen}
				noteSelected={note}
			/>
		</Grid>
	);
};

export default NoteCard;
