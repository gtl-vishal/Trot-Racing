import initialState from './initialState';
import * as actionTypes from '../actions/actionTypes';
import { GlobalActionType, LoaderType } from '../../types';

export default function global(state = initialState.global, action: GlobalActionType): LoaderType {
	switch (action.type) {
		// API Loader reducer
		case actionTypes.API_LOADING_START:
			return {
				...state,
				loading: true
			};
		case actionTypes.API_LOADING_STOP:
			return {
				...state,
				loading: false
			};
		// Connection reducer
		case actionTypes.CONNECTIVITY_ONLINE:
			return {
				...state,
				online: true
			};
		case actionTypes.CONNECTIVITY_OFFLINE:
			return {
				...state,
				online: false
			};
		default:
			return state;
	}
}
