import { useContext, useState } from 'react';
import { ProfilePageResetPassword } from '../../views/profile_page/ResetPassword';
import { PageVariant } from '../../props/PasswordEnum';
import { UserContext } from '../../props/UserInfo';
import encryptPassword from '../../props/encrypt';
import ServerAddress from '../../props/Server';

/**
 * The controller for reset password page. It controls:
 * 1. Checking whether the password is correct
 * 2. Setting a new password
 *
 * @returns { ReactElement } The reset password page
 */
export function ProfilePageResetPasswordController() {
  const userEmail = useContext(UserContext).email;

  // The password user entered to confirm authentication
  const [passwordText, onChangePasswordText] = useState('');
  // "Set a new password" field
  const [repasswordText, onChangeRePasswordText] = useState('');
  // Re-enter new password field
  const [rerepasswordText, onChangeReRePasswordText] = useState('');

  // Use conditional rendering for change password pages
  // Each enum item is a page
  // Page 1: Please enter your password
  // Page 2: Set a new password & Re-enter new password
  // Page 3: Password changed successfully
  const [pageVariant, onChangePageVariant] = useState(PageVariant.NewPassword);

  // Check whether the new password matches our guideline
  // At least one lower case
  // At least one upper case
  // At least one number
  // Minimum 8 characters
  const [passwordConditions, setPasswordConditions] = useState([false, false, false, false]);
  // Check whether the new password is the same as the new password entered again
  const [confirmPasswordCondition, setConfirmPasswordCondition] = useState(true);

  // When the "Next" button in page 1 is pressed
  const setNewPassword = async () => {
    try {


      if (passwordConditions.some(e => e === false)) {
        onChangePageVariant(PageVariant.InvalidNewPassword);
        return;
      }

      if (confirmPasswordCondition === false) {
        onChangePageVariant(PageVariant.NewPasswordDontMatch);
        return;
      }

      const encrypted_old_pw = await encryptPassword(passwordText);
      const encrypted_new_pw = await encryptPassword(repasswordText);
      try {
        const response = await fetch(ServerAddress() + 'api/auth/reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'email': userEmail,
            'oldPassword': encrypted_old_pw,
            'newPassword': encrypted_new_pw,
            'isTeacher': false
          })
        });

        const serverResponse = await response.json();

        if (response.ok) {
          console.log('Change sucesss');
          onChangePageVariant(PageVariant.ChangeSuccess);
        } else {
          console.log('WrongOldPassword');
          console.log(serverResponse);
          console.log(userEmail);
          console.log(passwordText);
          console.log(repasswordText);
          onChangePageVariant(PageVariant.WrongOldPassword);
        }
      } catch (error) {
        console.log('NetworkFailure');
        onChangePageVariant(PageVariant.NetworkFailure);
      }
    } catch (error) {
      onChangePageVariant(PageVariant.UnknownError);
    }
  };

  // When the "Next" button in page 3 is pressed
  // Just go back to profile page

  return (
    <ProfilePageResetPassword
      passwordText={passwordText}
      onChangePasswordText={onChangePasswordText}
      repasswordText={repasswordText}
      onChangeRePasswordText={onChangeRePasswordText}
      rerepasswordText={rerepasswordText}
      onChangeReRePasswordText={onChangeReRePasswordText}
      pageVariant={pageVariant}
      onChangePageVariant={onChangePageVariant}
      passwordConditions={passwordConditions}
      setPasswordConditions={setPasswordConditions}
      confirmPasswordCondition={confirmPasswordCondition}
      setConfirmPasswordCondition={setConfirmPasswordCondition}
      setNewPassword={setNewPassword}
    />
  );
}
