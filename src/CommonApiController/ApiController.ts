import axios from 'axios';
import { apiLoadingStart, apiLoadingStop } from '../Store/actions/global';
import { restApiCall } from './Types/apiTypes';

export const RestApiController = (paramaters: restApiCall):any => {
	const BaseUrl = process.env.REACT_APP_SERVER_HOST;

	if (paramaters.isLoaderRequired) {
		paramaters.dispatch(apiLoadingStart());
	}
	// Authentication
	const authHeader = { authorization: `Bearer ${paramaters.token}` };
	// Base URL
	const URL = `${BaseUrl}${paramaters.endPoints}`;
	// API Call Params
	const axiosParams = {
		method: paramaters.method,
		url: URL,
		headers: authHeader,
		data: paramaters.params
	};
	return axios(axiosParams)
		.then((response) => {
			paramaters.dispatch(apiLoadingStop());
			return response;
		})
		.catch((error) => {
			paramaters.dispatch(apiLoadingStop());
			return error.response;
		});
};
