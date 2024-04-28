import '@testing-library/react-native/extend-expect'
import { waitFor } from '@testing-library/react-native';
import { render } from '../test-utils';
import { LoginPageDefault } from '../views/login_page/Default';
import { SignupPageDefault } from '../views/signup_page/Default';
import { KolynTextfield, KolynButton } from '../component';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("kolyn components", () => {
  it("determines kolyn text field exists", () => {
    const screen = render(
      <KolynTextfield />
    );

    screen.getByTestId("kolyntextfield");
  });

  it("determines kolyn button exists", () => {
    const screen = render(
      <KolynButton />
    );

    screen.getByTestId("kolynbutton");
  });
});

describe("log in page", () => {
  it("determines logo is in the log in page", async () => {
    const screen = render(
      <LoginPageDefault />
    );
    
    await waitFor(() => {
      screen.getByTestId("logo");
    });
  });

  it("determines email & password fields present in log in page", async () => {
    const screen = render(
      <LoginPageDefault />
    );

    await waitFor(() => {
      screen.getByTestId("emailField");
      screen.getByTestId("passwordField");
    });
  });

  it("determines log in & sign up buttons present in log in page", async () => {
    const screen = render(
      <LoginPageDefault />
    );

    await waitFor(() => {
      screen.getByTestId("loginButton");
      screen.getByTestId("signupButton");
    });
  });
});

describe("sign up page", () => {
  it("finds all labels", async () => {
    const screen = render(
      <SignupPageDefault 
        email={""}
        setEmail={()=>{}}
        password={""}
        setPassword={()=>{}}
        repassword={""}
        setRePassword={()=>{}}
        emailCondition={false}
        passwordConditions={[false, false, false, false]}
        setPasswordConditions={()=>{}}
        confirmPasswordCondition={true}
        setConfirmPasswordCondition={()=>{}}
        onRegisterPressed={()=>{}}
        checkEmail={()=>{}}
      />
    );

    await waitFor(() => {
      screen.getByText("Create an account");
      screen.getByText("Email");
      screen.getByText("Password");
      screen.getByText("Confirm Password");
      screen.getByText("Enter your UMass email");
      screen.getByText("At least one lowercase letter");
      screen.getByText("At least one uppercase letter");
      screen.getByText("At least one number");
      screen.getByText("Minimum 8 characters");
      screen.getByText("Enter your password again");
    });
  });

  it("finds all buttons", async () => {
    const screen = render(
      <SignupPageDefault 
        email={""}
        setEmail={()=>{}}
        password={""}
        setPassword={()=>{}}
        repassword={""}
        setRePassword={()=>{}}
        emailCondition={false}
        passwordConditions={[false, false, false, false]}
        setPasswordConditions={()=>{}}
        confirmPasswordCondition={true}
        setConfirmPasswordCondition={()=>{}}
        onRegisterPressed={()=>{}}
        checkEmail={()=>{}}
      />
    );

    await waitFor(() => {
      screen.getByTestId("registerButton");
      screen.getByTestId("gobackButton");
    });
  });
});
