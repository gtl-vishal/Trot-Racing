import localVariable from '../../helpers/LocalVariables.json';
import { LoginDataType } from '../../types';

const localStorageData = localStorage.getItem(localVariable.LOGINDATA);
const loginData: LoginDataType = { data: null };
if (localStorageData) {
	loginData.data = JSON.parse(atob(localStorageData));
}
//Redux Initial state
const initialState = {
	login: loginData,
	race: { data: [] },
	global: {
		loading: false,
		online: navigator.onLine
	}
};

export default initialState;
