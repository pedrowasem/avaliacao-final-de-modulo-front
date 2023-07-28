import { Favorite, FavoriteBorder, Folder, FolderOutlined, Logout } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFavorite } from '../../store/modules/Favorite/favoriteSlice';
import { hideLoading, showLoading } from '../../store/modules/Loading/loadingSlice';
import { setStored } from '../../store/modules/Stored/storedSlice';
import { setTheme } from '../../store/modules/Theme/themeSlice';

interface MyAppBarToolsProps {
	big?: boolean;
}

const MyAppBarTools: React.FC<MyAppBarToolsProps> = ({ big }) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const themeName = useAppSelector((state) => state.theme) as 'light' | 'dark';
	const favorite = useAppSelector((state) => state.favorite) as 'true' | 'false';
	const stored = useAppSelector((state) => state.stored) as 'true' | 'false';

	const dispatch = useAppDispatch();

	const logout = () => {
		localStorage.removeItem('token');
		sessionStorage.removeItem('token');

		dispatch(showLoading());
		setTimeout(() => {
			dispatch(hideLoading());
			navigate('/');
		}, 3000);
	};
	const handleChangeTheme = () => {
		dispatch(setTheme(themeName === 'light' ? 'dark' : 'light'));
	};
	const handleFavorite = () => {
		dispatch(setFavorite(favorite === 'true' ? 'false' : 'true'));
	};
	const handleStored = () => {
		dispatch(setStored(stored === 'true' ? 'false' : 'true'));
	};

	return (
		<Box sx={{ display: big ? { xs: 'none', md: 'flex' } : { xs: 'flex', md: 'none' } }}>
			<IconButton aria-label="fav" onClick={handleFavorite}>
				{favorite === 'true' ? (
					<Favorite fontSize="large" color="secondary" />
				) : (
					<FavoriteBorder fontSize="large" color="secondary" />
				)}
			</IconButton>
			<IconButton aria-label="store" onClick={handleStored}>
				{stored === 'true' ? (
					<Folder fontSize="large" color="secondary" />
				) : (
					<FolderOutlined fontSize="large" color="secondary" />
				)}
			</IconButton>
			<IconButton onClick={handleChangeTheme}>
				{theme.palette.mode === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
			</IconButton>
			<IconButton onClick={logout}>
				<Logout fontSize="large" color="secondary" />
			</IconButton>
		</Box>
	);
};
export default MyAppBarTools;
