import { useState } from "react";
import { ProfilePageResetPassword } from "../../views/profile_page/ResetPassword";
import { PageVariant } from "../../props/PasswordEnum";

export function ProfilePageResetPasswordController() {
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
  const [pageVariant, onChangePageVariant] = useState(PageVariant.VerifyCurrent);

  // Check whether the new password matches our guideline
  // At least one lower case
  // At least one upper case
  // At least one number
  // Minimum 8 characters
  const [passwordConditions, setPasswordConditions] = useState([false, false, false, false]);
  // Check whether the new password is the same as the new password entered again
  const [confirmPasswordCondition, setConfirmPasswordCondition] = useState(true);

  // When the "Next" button in page 1 is pressed
  const verifyUser = () => {

  };

  // When the "Next" button in page 2 is pressed
  const setNewPassword = (newPassword) => {

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
      verifyUser={verifyUser}
      setNewPassword={setNewPassword}
    />
  );
}
