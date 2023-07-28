import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Menu, TextField, Toolbar, Typography } from '@mui/material';
import React from 'react';

import { inputProps } from '../../configs/Layout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFilter } from '../../store/modules/Filter/filterSlice';
import MyAppBarTools from '../AppBarTools';
import Loading from '../Loading';

const MyAppBar = () => {
	const filter = useAppSelector((state) => state.filter);
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const dispatch = useAppDispatch();

	return (
		<Box sx={{ flexGrow: 1, width: '95%', margin: 'auto' }}>
			<AppBar
				position="static"
				sx={{
					backgroundColor: '#ffffff00',
					height: '15vh',
					justifyContent: 'center',
					borderRadius: '0 0 30px 30px',
					boxShadow: 'inset 2px 2px 5px #ffffff34, inset -5px -5px 5px #babecc46',
				}}>
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<Typography variant="h4" color="primary">
						NoteHub
					</Typography>

					<TextField
						variant="standard"
						placeholder="Filtrar por título..."
						type="text"
						value={filter}
						sx={[inputProps, { width: '40vw', marginBottom: 0 }]}
						onChange={(e) => {
							dispatch(setFilter(e.target.value));
						}}
					/>

					<Box sx={{ display: { xs: 'flex', md: 'none' } }} justifyContent="flex-end">
						<IconButton
							size="large"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit">
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}>
							<MyAppBarTools />
						</Menu>
					</Box>

					<MyAppBarTools big />
				</Toolbar>
			</AppBar>
			<Loading />
		</Box>
	);
};

export default MyAppBar;
