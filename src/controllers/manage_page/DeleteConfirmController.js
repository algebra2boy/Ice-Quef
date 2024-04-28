import { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ManagePageDeleteConfirm } from '../../views/manage_page/DeleteConfirm';
import { useOfficeHourUpdate } from '../../props/OfficeHourContext';
import { deleteUserOfficeHour } from '../../props/AddDropOfficeHour';
import { UserContext } from '../../props/UserInfo';

export function ManagePageDeleteConfirmController({ route }) {
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
  const deleteFromDB = async () => {
    const requestStatus = await deleteUserOfficeHour(userToken, target.id);
    if (requestStatus) {
      console.log('trigger deletion');
      triggerUpdate();
      navigation.navigate('ManagePageDeleteSuccess', {
        officeHour: target,
      });
    } else {
      navigation.navigate('ManagePageDeleteFail', {
        officeHour: target,
      });
    }
  };

  return <ManagePageDeleteConfirm deleteFromDB={deleteFromDB} officeHour={target} />;
}
