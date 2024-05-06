import '@testing-library/react-native/extend-expect';
import { waitFor, fireEvent, cleanup } from '@testing-library/react-native';
import { render } from '../test-utils';
import { LoginPageDefault } from '../views/login_page/Default';
import { SignupPageDefault } from '../views/signup_page/Default';
import { CalendarPageDefault } from '../views/calendar_page/Default';
import { ManagePageDefault } from '../views/manage_page/Default';
import { ManagePageAddOH } from '../views/manage_page/AddOH';
import { ProfilePageDefault } from '../views/profile_page/Default';
import { KolynTextfield, KolynButton } from '../component';

export {
  waitFor,
  fireEvent,
  cleanup,
  render,
  LoginPageDefault,
  SignupPageDefault,
  CalendarPageDefault,
  ManagePageDefault,
  ManagePageAddOH,
  ProfilePageDefault,
  KolynTextfield,
  KolynButton,
};
