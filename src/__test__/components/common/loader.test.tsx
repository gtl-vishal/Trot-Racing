import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { Loader } from '../../../Components/common';
import { RootState } from '../../../Store/store';
import * as ReactReduxHooks from '../../../Store/react-redux-hook';

configure({ adapter: new Adapter() });

const setUp = (state: RootState | {}, props: any) => {
	const mockStore = configureStore();

	const store = mockStore(state);
	jest.spyOn(ReactReduxHooks, 'useAppSelector').mockImplementation((state) => store.getState());

	jest.spyOn(ReactReduxHooks, 'useAppDispatch').mockImplementation(() => store.dispatch);
	const wrapper = shallow(<Loader {...props} store={store} />);
	return wrapper;
};

describe('Loader Component', () => {
	const state = {};
	it('should render Loader Component correctly', () => {
		const component = setUp(state, {loading:true});
		const classInstance = component.find('.newloader-style');
		expect(classInstance.length).toBe(1);
	});
});
