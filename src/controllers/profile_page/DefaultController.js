import { useContext } from 'react';
import { ProfilePageDefault } from '../../views/profile_page/Default';
import { UserContext } from '../../props/UserInfo'
import { LoginContext } from '../../props/LoginContext';

/**
 * The controller for the default profile page.
 *
 * @returns { ReactElement } The default profile page
 */
export function ProfilePageDefaultController() {
  const user = useContext(UserContext);
  const loginContext = useContext(LoginContext);

  return (
    <ProfilePageDefault 
      user={user}
      loginContext={loginContext}
    />
  );
}
