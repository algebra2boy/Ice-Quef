// Enums used for pages that involve password

export const PageVariant = {
  NewPassword: '',
  WrongOldPassword: 'Your old password is incorrect.',
  ChangeSuccess: 'Password changed successfully!',
  NetworkFailure: 'No network connection, please try again.',
  UnknownError: 'An unknown error has occurred, please try again.',
  NewPasswordDontMatch: 'Your new password dose not match, please try again.',
  InvalidNewPassword: 'Your new password is invalid.'
};

export const Authentication = {
  default: '',
  success: '',
  empty: 'Please enter your password.',
  notMatch: 'Your password is incorrect. Please try again.',
};

export const ConfirmNewPassword = {
  default: '',
  success: '',
  notMatch: 'The two passwords does not match.',
};

export const passwordHint = {
  0: 'At least one lowercase letter',
  1: 'At least one uppercase letter',
  2: 'At least one number',
  3: 'Minimum 8 characters',
};

export const confirmPasswordHint = {
  0: 'Enter your password again',
};
