import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from './actionTypes';
import { Dispatch } from 'redux';
import { restApiCall, endPoints, RestApiController } from '../../CommonApiController';
import { SERVER_BUSY, STATUSCODE } from '../../helpers';
import { ErrorResponseType, LoginParamType, LoginResponseType } from '../../types';
import localVariable from '../../helpers/LocalVariables.json';
import { toast } from 'react-toastify';

//Common API call function
const apiCall = async (loginData: LoginParamType, dispatch: Dispatch) => {
	const paramaters: restApiCall = {
		method: endPoints.AuthToken.method,
		endPoints: endPoints.AuthToken.endpoint,
		params: loginData,
		isLoaderRequired: true,
		token: '',
		dispatch: dispatch
	};

	const response = await RestApiController(paramaters);
	return response;
};

//Dispatch function for AuthToken
export const authToken = (loginData: LoginParamType) => async (dispatch: Dispatch): Promise<void> => {
	dispatch({ type: LOGIN_REQUEST });
	const response = await apiCall(loginData, dispatch);
	if (response) {
		if (response.status === STATUSCODE.OK) {
			//Success Callback
			handleSuccess(loginData, response.data.token, dispatch);
		} else {
			// Failure Callback
			handleFailure(response.data.error, dispatch);
		}
	} else {
		toast(SERVER_BUSY);
	}
};

//Success callback Function
const handleSuccess = (loginData: LoginParamType, token: string, dispatch: Dispatch) => {
	const loginCred: LoginResponseType = {
		...loginData,
		error: '',
		token: token
	};
	const localStorageData = btoa(JSON.stringify(loginCred));
	localStorage.setItem(localVariable.LOGINDATA, localStorageData);

	dispatch({ type: LOGIN_SUCCESS, payload: loginCred });
};

//Failure callback function
const handleFailure = (errMsg: string, dispatch: Dispatch) => {
	const errorResponse: ErrorResponseType = {
		error: errMsg
	};
	dispatch({ type: LOGIN_FAIL, payload: errorResponse });
};
