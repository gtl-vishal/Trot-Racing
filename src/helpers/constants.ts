import { Method } from 'axios';

// Global Constants
export const OFFLINE = "You're offline right now. Check your connection.";
export const ERROR_FETCHING_RESULT = 'Error in fetching results.';
export const NO_MATCH_FOR = 'No match found';
export const SERVER_BUSY = 'Server is busy, Please try again later';

// Login Page Constant
export const INVALID_EMAIL = 'Please enter valid email.';
export const LOGIN = 'Login';
export const PASSWORD = 'Password';

//Race Page Constant
export const ON_GOING = 'On Going...';
export const RACE_COMPLETED_MSG = 'The Race has completed. Next Race will begin in a while...';
export const RACE_ABOUT_TO_START = 'Please wait, Race will start soon...';
export const RACE_STATUS_TITLE = 'Race Status';

//Routes Constant
export const ROUTES = {
	LOGIN: '/login',
	RACE: '/race'
};

//Method Constant
export const METHOD = {
	GET: 'GET' as Method,
	PUT: 'PUT' as Method,
	POST: 'POST' as Method,
	DELETE: 'DELETE' as Method
};

// Status Code Constants
export const STATUSCODE = {
	OK: 200,
	UNAUTHORIZED: 401,
	NO_CONTENT: 204,
	SERVICE_UNAVAILABLE: 503
};

// Event Type Constants
export const EVENT_TYPE = {
	START: 'start',
	FINISH: 'finish'
};

//Horse Column Constant
export const HORSE_RACE_COLUMN = {
	NO: 'No',
	HORSE: 'Horse',
	TIME: 'Time'
};
