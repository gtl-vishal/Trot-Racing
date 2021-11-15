import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { NoInternet } from '../../../Components/common';
import { RootState } from '../../../Store/store';
import * as ReactReduxHooks from '../../../Store/react-redux-hook';

configure({ adapter: new Adapter() });

const setUp = (state: RootState | {}, props: any) => {
	const mockStore = configureStore();

	const store = mockStore(state);
	jest.spyOn(ReactReduxHooks, 'useAppSelector').mockImplementation((state) => store.getState());

	jest.spyOn(ReactReduxHooks, 'useAppDispatch').mockImplementation(() => store.dispatch);
	const wrapper = shallow(<NoInternet {...props} store={store} />);
	return wrapper;
};

describe('NoInternet Component', () => {
	const state = {};
	it('should render NoInternet Component correctly', () => {
		const component = setUp(state, {loading:true});
		const classInstance = component.find("#no-internet");
		expect(classInstance.length).toBe(1);
	});
});
