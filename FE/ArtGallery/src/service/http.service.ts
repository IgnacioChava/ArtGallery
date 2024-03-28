import axios, {
	AxiosError,
	AxiosInstance,
	InternalAxiosRequestConfig,
} from 'axios';
import { getSessionToken, removeSessionToken } from './cookies.service';
import { isNill } from '../utils/comon.utils';
import { Login, LoginResponse, Paint } from '../models/art.models';
import { GenericResponse } from '../models/api.models';

const apiInstance: AxiosInstance = axios.create({
	baseURL: 'https://localhost:7232/api',
});


apiInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = getSessionToken();

		if (!isNill(token)) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	async error => {
		return await Promise.reject(error);
	},
)


apiInstance.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		console.log(JSON.stringify(error.data));
		if (error.status === 401 && error.data.code === 40103) {
			removeSessionToken();
		}
		return await Promise.reject(error);
	},
);



export const getPaints = async () => {

	let response;
	let failed = false;
	let success = !failed; 
	try {
		 response = await apiInstance.get<Paint[]>("/art/get");
		 return {response, failed, success}
	} catch (error) {
		failed = true;
		return {error,failed, success}; // Lanza el error si ocurre uno
	}

}

export const getPaintsByName = async (name :string) => {

	let response;
	let failed = false;
	let success = !failed; 
	try {
		 const call = `/art/getByName/${name}`
		 response = await apiInstance.post<Paint[]>(call);
		 return {response, failed, success}
	} catch (error) {
		failed = true;
		return {error,failed, success}; // Lanza el error si ocurre uno
	}

}

export const getPaintsByAny = async (name :string) => {

	let response;
	let failed = false;
	let success = !failed; 
	try {
		 const call = `/art/getByAny/${name}`
		 response = await apiInstance.post<Paint[]>(call);
		 return {response, failed, success}
	} catch (error) {
		failed = true;
		return {error,failed, success}; // Lanza el error si ocurre uno
	}

}


export const postLogin = async (values: Login) => {
	let response;
	let failed = false;
	let success = !failed; 
	try {
		response = await apiInstance.post<LoginResponse>("/auth/login", values);
		return {response, failed, success}; // Retorna los datos de la respuesta
	} catch (error) {
		failed = true;
		return {error, failed, success}; // Lanza el error si ocurre uno
	}
}

export const createPaint = async (values: Paint) => {
	try {
		const response = await apiInstance.post<GenericResponse>("/art/post", values);
		return response.data; // Retorna los datos de la respuesta
	} catch (error) {
		throw error; // Lanza el error si ocurre uno
	}
}

