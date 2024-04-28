import {
  waitFor, 
  fireEvent,
  cleanup,
  render, 
  LoginPageDefault, 
  SignupPageDefault, 
  CalendarPageDefault, 
  ManagePageDefault, 
  ManagePageAddOH,
  ProfilePageDefault,
  KolynTextfield, 
  KolynButton 
} from './index'

afterEach(cleanup);

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("log in page", () => {
  it("goes from log in page to calendar page", async () => {
    const screen = render(
      <LoginPageDefault />
    );

    await waitFor(() => {
      const loginButton = screen.getByTestId("loginButton");
      fireEvent.press(loginButton);
    });
  });

  it("goes from log in page to sign up page", () => {

  });
});

