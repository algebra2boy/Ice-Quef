/**
 * Checks whether a given password is valid,
 * updates the password conditions list
 *
 * @param { string } password
 * @param { List } setPasswordConditions List of conditions for password
 * @returns Void
 */
export const checkPassword = (password, setPasswordConditions) => {
  if (password === undefined) return;
  const containsLetter = /[a-zA-Z]/;
  const containsNumber = /[0-9]/;

  const atLeastOneLowercase = () => {
    return password !== password.toUpperCase() && containsLetter.test(password);
  };
  const atLeastOneUppercase = () => {
    return password !== password.toLowerCase() && containsLetter.test(password);
  };
  const atLeastOneNumber = () => {
    return containsNumber.test(password);
  };
  const minimumEightChars = () => {
    return password.length >= 8;
  };

  setPasswordConditions([
    atLeastOneLowercase(),
    atLeastOneUppercase(),
    atLeastOneNumber(),
    minimumEightChars(),
  ]);
};

/**
 * Checks whether the confirm password is correct,
 * updates the confirm password conditions list
 *
 * @param { string } val The confirm password
 * @param { string } password The password
 * @param { string } repassword The re-entered password
 * @param { boolean } isEnterFromRePassword check if this function is invoked from re-enter password textfield
 * @param { List } setConfirmPasswordCondition List of conditions for confirm password
 */
export const checkConfirmPassword = (
  val,
  password,
  repassword,
  isEnterFromRePassword,
  setConfirmPasswordCondition,
) => {
  const isTheSame = () => {
    if (isEnterFromRePassword) {
      return val === password;
    } else {
      return val === repassword;
    }
  };

  setConfirmPasswordCondition(isTheSame());
};
