import { configure, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import Login from "../../Components/Login/Login";
import { RootState } from "../../Store/store";
import * as ReactReduxHooks from "../../Store/react-redux-hook";

configure({ adapter: new Adapter() });

const setUp = (state: RootState | {}, props: any) => {
  const mockStore = configureStore();

  const store = mockStore(state);
  jest.spyOn(ReactReduxHooks, "useAppSelector").mockImplementation((state) => store.getState());

  jest.spyOn(ReactReduxHooks, "useAppDispatch").mockImplementation(() => store.dispatch);
  const wrapper = shallow(<Login {...props} store={store} />);
  return wrapper;
};

describe("Login Component", () => {
  const state = {};
  it("should render Login Component correctly", () => {
    const component = setUp(state, {});
    const classInstance = component.find("#login-wrapper");
    expect(classInstance.length).toBe(1);
  });

  it("should simulate onChange event on email", () => {
    const component = setUp(state, {});
    const classInstance = component.find("#login-wrapper");
    const emailInput = classInstance.find("#email");
    emailInput.simulate("change", { target: { value: "vishaly@thegatewaydigital.com" } });
  });

  it("should simulate onChange event on email with invalid email", () => {
    const component = setUp(state, {});
    const classInstance = component.find("#login-wrapper");
    const emailInput = classInstance.find("#email");
    emailInput.simulate("change", { target: { value: "vishal" } });
  });

  it("should simulate onChange event on password", () => {
    const component = setUp(state, {});
    const classInstance = component.find("#login-wrapper");
    const emailInput = classInstance.find("#password");
    emailInput.simulate("change", { target: { value: "lTgAYaLP9jRs" } });
  });

  it("should simulate submit event on Login form correctly", () => {
    const component = setUp(state, {});
    const classInstance = component.find("#login-wrapper");
    const emailInput = classInstance.find("#loginForm");
    emailInput.simulate("submit", {target: {email: "vishaly@thegatewaydigital.com", password: "lTgAYaLP9jRs", isError: false}} );
  });
});
