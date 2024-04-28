import {
  waitFor, 
  render, 
  cleanup,
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

describe("calendar", () => {
  it("determines calendar page exists", async () => {
    const screen = render(
      <CalendarPageDefault />
    );
  });
});

describe("manage", () => {
  it("determines elements in default manage page", async () => {
    const screen = render(
      <ManagePageDefault
        officeHour={[]}
        setOfficeHour={()=>{}}
      />
    );

    await waitFor(() => {
      screen.getByText("Manage office hours");
      screen.getByTestId("addButton");
    });
  });

  it("determines elements in add office hour page", async () => {
    const screen = render(
      <ManagePageAddOH
        isRefreshing={false}
        setIsRefreshing={()=>{}}
        isSearching={false}
        officeHour={[]}
        setOfficeHour={()=>{}}
        courseCode={""}
        setCourseCode={()=>{}}
        facultyName={""}
        setFacultyName={()=>{}}
      />
    );

    await waitFor(() => {
      screen.getByText("Add office hours");
      screen.getByPlaceholderText("Please enter class code. ex. CS 520");
      screen.getByPlaceholderText("Please enter faculty's name: ex. Joe Doe");
      screen.getByTestId("gobackButton");
    });
  });

});

describe("profile", () => {
  it("determines profile page exists", async () => {
    const screen = render(
      <ProfilePageDefault />
    );

    await waitFor(() => {
      screen.getByText("Profile");
      screen.getByText("Email");
      screen.getByTestId("changePassword")
      screen.getByTestId("logoutButton");
    });
  });
});
