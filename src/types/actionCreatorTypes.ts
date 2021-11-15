import { ThunkAction } from "redux-thunk";
import { HorseEntryTypes } from "./raceType";
import { InitialStateType, LoginResponseType } from "./reduxTypes";

// Login Action Types
export interface LoginActionType {
  type: string;
  payload: LoginResponseType;
}

// Race Action Types
export interface HorseStatusActionType {
  type: string;
  payload: HorseEntryTypes[];
}

export type raceActionCreator = ThunkAction<
  void,
  InitialStateType,
  {},
  HorseStatusActionType
>;

// Global Action Types
export interface GlobalActionType {
  type: string;
  payload: null;
}
