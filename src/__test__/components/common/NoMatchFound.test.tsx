import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { NoMatchFound } from '../../../Components/common';
import { RootState } from '../../../Store/store';
import * as ReactReduxHooks from '../../../Store/react-redux-hook';

configure({ adapter: new Adapter() });

const setUp = (state: RootState | {}, props: any) => {
	const mockStore = configureStore();

	const store = mockStore(state);
	jest.spyOn(ReactReduxHooks, 'useAppSelector').mockImplementation((state) => store.getState());

	jest.spyOn(ReactReduxHooks, 'useAppDispatch').mockImplementation(() => store.dispatch);

	const wrapper = shallow(<NoMatchFound {...props} store={store} />);
	return wrapper;
};
jest.mock('react-router-dom', () => ({
	useLocation: jest.fn().mockReturnValue({
		pathname: '/another-route',
		search: '',
		hash: '',
		state: null,
		key: '5nvxpbdafa'
	})
}));
describe('NoMatchFound Component', () => {
	it('should render NoMatchFound Component correctly', () => {
		const state = {};
		const component = setUp(state, {});
		const classInstance = component.find('#nomatch');
		expect(classInstance.length).toBe(1);
	});
});
