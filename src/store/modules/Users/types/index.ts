export interface CreateUser {
	name: string;
	password: string;
	passwordConfirm: string;
}

export interface CreateUserReturn {
	message: string;
	success: boolean;
	user: User;
}

export interface Login {
	name: string;
	password: string;
}

export interface User {
	_id: string;
	_name: string;
	loading: boolean;
}

export interface UserReturn {
	_id: string;
	_name: string;
	token: string;
}

export interface LoginReturn {
	isLogged: boolean;
	message: string;
	success: boolean;
	token: string;
}
