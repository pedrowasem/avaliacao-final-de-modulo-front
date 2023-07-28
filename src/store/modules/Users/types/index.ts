export interface CreateUser {
	name: string;
	password: string;
	passwordConfirm: string;
}

export interface CreateUserReturn {
	message: string;
	sucess: boolean;
	user: User;
}

export interface Login {
	name: string;
	password: string;
}

export interface User {
	_id: string;
	_name: string;
}

export interface UserReturn {
	_id: string;
	_name: string;
	token: string;
}

export interface LoginReturn {
	message: string;
	success: boolean;
	token: string;
}
