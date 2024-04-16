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

export const checkConfirmPassword = (val, password, repassword, isEnterFromRePassword, setConfirmPasswordCondition) => {
  const isTheSame = () => {
    if (isEnterFromRePassword) {
      return val === password;
    } else {
      return val === repassword;
    }
  };

  setConfirmPasswordCondition(isTheSame());
};
