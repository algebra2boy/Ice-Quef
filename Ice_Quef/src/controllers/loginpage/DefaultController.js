import React from 'react';
import { LoginPageDefault } from '../../views/loginpage/Default'

function LogInButtonPressed(email, password) {
  //console.log(email);
  //console.log(password);

  // Also expecting different errors
  return true;
}

export function LoginPageDefaultController() {
  return (
    <LoginPageDefault 
      pressLogInButton = { LogInButtonPressed }
    />
  );
}
