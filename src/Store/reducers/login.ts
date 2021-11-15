import initialState from "./initialState";
import * as types from "../actions/actionTypes";
import { LoginDataType, LoginActionType } from "../../types";

const loginReducer = (state = initialState.login, action: LoginActionType): LoginDataType => {
  switch (action.type) {
    // Login Reducer
    case types.LOGIN_REQUEST:
      return {
        ...state,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        data: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default loginReducer;
