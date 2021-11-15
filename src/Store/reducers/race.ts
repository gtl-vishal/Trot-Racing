import initialState from './initialState';
import { RACE_STATUS_SUCCESS } from '../actions/actionTypes';
import { HorseStatusActionType, RaceReduxType } from '../../types';

const raceReducer = (state = initialState.race, action: HorseStatusActionType): RaceReduxType => {
	switch (action.type) {
		case RACE_STATUS_SUCCESS: {
			return {
				...state,
				data: action.payload
			};
		}
		default:
			return state;
	}
};

export default raceReducer;
