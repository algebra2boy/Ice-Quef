import { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ManagePageAddConfirm } from '../../views/manage_page/AddConfirm';
import { useOfficeHourUpdate } from '../../props/OfficeHourContext';
import { addUserOfficeHour } from '../../props/AddDropOfficeHour';
import { UserContext } from '../../props/UserInfo';

export function ManagePageAddConfirmController({ route }) {
  const officeHour = route.params?.officeHour;
  const navigation = useNavigation();

  const [target, setTarget] = useState(officeHour);
  const { triggerUpdate } = useOfficeHourUpdate();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // change state variable
      setTarget(officeHour);
    });
    return () => unsubscribe();
  }, [navigation]);

  const user = useContext(UserContext);
  const userToken = user.token;
  const addOHToDB = async () => {
    const requestStatus = await addUserOfficeHour(userToken, target.id);
    if (requestStatus) {
      // true means successful
      console.log('trigger addition');
      triggerUpdate(); // trigger an update on the manage main page

      navigation.navigate('ManagePageAddSuccess', {
        officeHour: target,
      });
    } else {
      navigation.navigate('ManagePageAddFail', {
        officeHour: target,
      });
    }
  };

  return <ManagePageAddConfirm addOHToDB={addOHToDB} officeHour={target} />;
}
