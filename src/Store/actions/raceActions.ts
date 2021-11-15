import { updateRaceStatus, STATUSCODE, EVENT_TYPE, ERROR_FETCHING_RESULT, SERVER_BUSY } from "../../helpers";
import { authToken } from "./index";
import { RACE_STATUS_SUCCESS } from "./actionTypes";
import { HorseEntryTypes, raceActionCreator, LoginResponseType, LoginParamType, RaceResponseType, HorseStatusActionType } from "../../types";
import { restApiCall, endPoints, RestApiController } from "../../CommonApiController";
import { Dispatch } from "react";
import { toast } from "react-toastify";
import { apiLoadingStop } from "./global";

//Dispatch Horse success function
const updateHorseStatus = (data: HorseEntryTypes[]) => ({
  type: RACE_STATUS_SUCCESS,
  payload: data,
});

//Common API call Function
const fetchRaceStatus = async (token: string, dispatch: Dispatch<void>) => {
  const paramaters: restApiCall = {
    method:endPoints.Results.method,
    endPoints: endPoints.Results.endpoint,
    params: null,
    isLoaderRequired: false,
    token: token,
    dispatch: dispatch,
  };

  const responseData = await RestApiController(paramaters);
  return responseData;
};

//Dispatch Get Race Function
export const getRaceStatus = (): raceActionCreator => async (dispatch, getState) => {
  const state = getState(); // Redux state
  if (state.login.data) {
    try {
      const { token, email, password }: LoginResponseType = state.login.data;
      const raceStatusData = state.race.data; // Old data
      const apiResponse = await fetchRaceStatus(token, dispatch); // Fetch latest data

      if (apiResponse) {
        if (apiResponse.status === STATUSCODE.NO_CONTENT) {
          //Request timed out while waiting for new events
          dispatch(getRaceStatus());
        } else if (apiResponse.status === STATUSCODE.OK && !apiResponse.data.error) {
          handleSuccess(raceStatusData, apiResponse.data, dispatch);
        } else {
          // Authentication token is missing, or does not match an active session
          handleAuthentication(email, password, dispatch);
        }
      }else{
         toast(SERVER_BUSY);
      }
    } catch {
      console.error(ERROR_FETCHING_RESULT);
    }
  }
};

//Success callback Function
const handleSuccess = (raceStatusData: HorseEntryTypes[], successResponse: RaceResponseType, dispatch: Dispatch<HorseStatusActionType|raceActionCreator>) => {
  //Request successfull
  const raceCompleted = raceStatusData.some((item: HorseEntryTypes) => item.eventType !== EVENT_TYPE.START); //Race is finished
  const nextRace = successResponse.event === EVENT_TYPE.START && raceCompleted;
  if (nextRace) {
    // clear the previous race status data
    dispatch(updateHorseStatus([]));
  }
  // get sorted list of statuses
  const updatedStatusList = updateRaceStatus(nextRace ? [] : raceStatusData, successResponse);
  dispatch(updateHorseStatus(updatedStatusList));
  dispatch(getRaceStatus());
};

//Authentication function 
const handleAuthentication = async (email: string, password: string, dispatch: any) => {
  const loginCred: LoginParamType = {
    email,
    password,
  };
  await dispatch(authToken(loginCred));
};
