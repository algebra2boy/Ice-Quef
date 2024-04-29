import { LoginProvider } from '../props/LoginContext';
import { UserProvider } from '../props/UserInfo';
import { ThemeProvider } from '../style/AppTheme';
import { OfficeHourUpdateWrapper } from '../props/OfficeHourContext';

/**
 * Wrapper for all the providers
 *
 * @param { ReactElement } children The app
 * @returns { ReactElement } The app with providers
 */
function ContextApp({ children }) {
  return (
    <LoginProvider>
      <UserProvider>
        <ThemeProvider>
          <OfficeHourUpdateWrapper>{children}</OfficeHourUpdateWrapper>
        </ThemeProvider>
      </UserProvider>
    </LoginProvider>
  );
}

export default ContextApp;
