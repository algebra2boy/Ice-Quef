import React from 'react';
import '@testing-library/react-native/extend-expect'
import { render, waitFor } from '@testing-library/react-native';
import { LoginPageDefaultController } from '../controllers/login_page/DefaultController'
import { LoginContext, loginStatus } from '../props/LoginContext';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContext } from '../style/AppTheme';
import { LoginPageDefault } from '../views/login_page/Default';
//import { LoginPageDefault } from '../views/login_page/MinimalDefault';
import ContextApp from '../views/ContextApp';
import { KolynTextfield } from '../component';
import { BasePage } from '../style/BasePage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("existence", () => {
  it("determines kolyn text field exists", () => {
    const screen = render(
      <ContextApp>
        <KolynTextfield />
      </ContextApp>,
    );

    screen.getByTestId("kolyntextfield");
  });

  it("determines log in page exists", async () => {
    const screen = render(
      <ContextApp>
        <LoginPageDefault />
      </ContextApp>
    );
    
    await waitFor(() => {
      screen.getAllByTestId("logo");
    });
  });
});
