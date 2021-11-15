import React from 'react';
import { configure, mount } from 'enzyme';
import thunk from "redux-thunk";

import configureStore from 'redux-mock-store';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { RootState } from '../Store/store';
import * as ReactReduxHooks from '../Store/react-redux-hook';
import { MemoryRouter } from 'react-router';
import { Login } from '../Components/Login';
import { Race } from '../Components/Race';
import { NoMatchFound } from '../Components/common';
import Navigation from '../Navigation';
import { ROUTES } from '../helpers';

configure({ adapter: new Adapter() });

const setUp = (state: RootState | {}, props: any) => {
	const mockStore = configureStore([thunk]);

	const store = mockStore(state);
	jest.spyOn(ReactReduxHooks, 'useAppSelector').mockImplementation((state) => store.getState());

	jest.spyOn(ReactReduxHooks, 'useAppDispatch').mockImplementation(() => store.dispatch);
	const wrapper = mount(
		<MemoryRouter initialEntries={[ props.path ]}>
			<Navigation />
		</MemoryRouter>
	);
	return wrapper;
};
describe('Routes using array of routers', () => {
	it('should render Login component (using memory router)', () => {
		const state = {
			login: {
				data: {
					email: '6991vaibhav@gmail.com',
					password: 'lTgAYaLP9jRs'
				}
			}
		};
		let component = setUp(state, { path: '/' });
		expect(component.find(Login)).toHaveLength(1);
		component = setUp(state, { path: ROUTES.LOGIN });
		expect(component.find(Login)).toHaveLength(1);
	});
	it('should render Race component (using memory router)', () => {
		const state = {
			login: {
				data: {
					token: 'asdadds33432424nweddnweedk732723hadd',
					email: '6991vaibhav@gmail.com',
					password: 'lTgAYaLP9jRs'
				}
			},
			race: {
				data: [
					{ id: 3, name: 'Soho', startTime: 0, endTime: null },
					{ id: 14, name: 'Aries', startTime: 0, endTime: null },
					{ id: 25, name: 'Patriot', startTime: 0, endTime: null }
				]
			}
		};
		const component = setUp(state, { path: ROUTES.RACE });
		expect(component.find(Race)).toHaveLength(1);
	});
	it('should render NoMatch  component (using memory router)', () => {
		const state = {
			login: {
				data: {
					email: '6991vaibhav@gmail.com',
					password: 'lTgAYaLP9jRs'
				}
			}
		};
		const component = setUp(state, { path: '/unknown' });
		expect(component.find(NoMatchFound)).toHaveLength(0);
	});
});
