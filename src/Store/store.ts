import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import raceReducer from './reducers/race';
import loginReducer from './reducers/login';
import globalReducer from './reducers/global';

// Combine Reducer
const rootReducer = combineReducers({
	login: loginReducer,
	race: raceReducer,
	global: globalReducer
});
// Rootstore type
export type RootStore = ReturnType<typeof rootReducer>;
// Configure store
const store = createStore(rootReducer, applyMiddleware(thunk));

// Rootstate & Dispatch Type
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
