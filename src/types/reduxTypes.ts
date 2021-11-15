import { HorseEntryTypes, HorseType } from './raceType';
// Login Types
export interface LoginResponseType {
	token: string;
	email: string;
	password: string;
	error: string;
}
export interface LoginDataType {
	data: null | LoginResponseType;
}
export interface LoginType {
	login: LoginDataType;
}

// Race Types
export interface RaceResponseType {
	event: string;
	horse: HorseType;
	time: number;
}
export interface RaceReduxType {
	data: HorseEntryTypes[];
}

// Global Types
export interface LoaderType {
	loading: boolean;
	online?: boolean;
}
export interface ErrorResponseType {
	error: string;
}

// Initial State Type
export interface InitialStateType {
	login: LoginDataType;
	race: RaceReduxType;
	global: LoaderType;
}
