import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { hideSnackBar } from '../../store/modules/SnackBar/snackBarSlice';

export const SnackBarComp = () => {
	const select = useAppSelector((state) => state.snack);
	const dispatch = useAppDispatch();

	return (
		<div>
			<Snackbar
				open={select.show}
				autoHideDuration={3000}
				onClose={() => dispatch(hideSnackBar({ message: '', type: 'warning' }))}>
				<Alert severity={select.type}>{select.message}</Alert>
			</Snackbar>
		</div>
	);
};
