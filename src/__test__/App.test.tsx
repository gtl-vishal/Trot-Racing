import React from 'react';
import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { RootState } from '../Store/store';
import * as ReactReduxHooks from '../Store/react-redux-hook';
import App from '../App';
import Navigation from '../Navigation';
import { NoInternet } from '../Components/common';

configure({ adapter: new Adapter() });

const setUp = (state: RootState | {}, props: any) => {
	const mockStore = configureStore();

	const store = mockStore(state);
	jest.spyOn(ReactReduxHooks, 'useAppSelector').mockImplementation((state) => store.getState());

	jest.spyOn(ReactReduxHooks, 'useAppDispatch').mockImplementation(() => store.dispatch);
	const wrapper = shallow(<App {...props} store={store} />);
	return wrapper;
};

describe('Root App Component', () => {
	const state = {
		global: {
			loading: false,
			online: navigator.onLine
		}
	};

	it('should render App Component correctly', () => {
		const component = setUp(state, {});
		expect(component.exists()).toBe(true);
	});

	it('Should render Navigation component', () => {
		const component = setUp(state, {});
		const navComponent = component.find(Navigation);
		expect(navComponent).toHaveLength(1);
	});

	it('Should render NoInternet component on offline', () => {
        state.global.online = false;
		const component = setUp(state, {});
		const navComponent = component.find(NoInternet);
		expect(navComponent).toHaveLength(1);
	});
});
