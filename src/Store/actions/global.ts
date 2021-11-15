import * as actionTypes from './actionTypes';

interface globalType {
	type: string;
}
//Loading Action
export const apiLoadingStart = (): globalType => ({ type: actionTypes.API_LOADING_START });
export const apiLoadingStop = (): globalType => ({ type: actionTypes.API_LOADING_STOP });

//Connectivity Action
export const connectionOnline = (): globalType => ({ type: actionTypes.CONNECTIVITY_ONLINE });
export const connectionOffline = (): globalType => ({ type: actionTypes.CONNECTIVITY_OFFLINE });
