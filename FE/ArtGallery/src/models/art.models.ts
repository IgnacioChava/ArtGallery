export type Paint = {
	name: string;
	date: string;
	author: string;
	paints: string[];
};

export type Login = {
	username: string;
	password: string;
};

export type LoginResponse = {
	token: string;
};