import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Dimensions, Text, StyleSheet } from 'react-native';
import { KolynButton, KolynTitleLabel } from '../../component';
import { BasePage } from '../../style/BasePage';
import { day, Bold, NonBold } from '../../style/ManageOHStyle';
import { useOfficeHourUpdate } from '../../props/OfficeHourContext';
import { UserContext } from '../../props/UserInfo';
import { deleteUserOfficeHour } from '../../models/AddDropController';

const height = Dimensions.get('window').height;

export function ManagePageDeleteConfirm({ route }) {
  const navigation = useNavigation();
  const themedStyles = ThemedStyles();

  const userToken = useContext(UserContext).token;
  const officeHour = route.params?.officeHour;
  const { triggerUpdate } = useOfficeHourUpdate();

  const deleteFromDB = async () => {
    const requestStatus = await deleteUserOfficeHour(userToken, officeHour.id);
    if (requestStatus) {
      triggerUpdate();
      navigation.navigate('ManagePageDeleteSuccess', {
        officeHour: officeHour,
      });
    } else {
      navigation.navigate('ManagePageDeleteFail', {
        officeHour: officeHour,
      });
    }
  };

  return (
    <BasePage
      components={
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <View style={themedStyles.root}>
            <View style={{ height: height * 0.5 }}>
              <KolynTitleLabel title="Confirm deleting" />

              <Text>
                <Bold text={officeHour.courseDepartment + ' ' + officeHour.courseNumber + '\n'} />
                <NonBold text={officeHour.facultyName + '\n'} />
                <NonBold
                  text={
                    day(officeHour.day) + ' ' + officeHour.startTime + ' - ' + officeHour.endTime
                  }
                />
              </Text>
            </View>

            <View style={{ top: height * 0.1 }}>
              <KolynButton
                text="Delete"
                onPress={async () => {
                  await deleteFromDB();
                }}
              />
              <View style={{ top: 20 }}>
                <KolynButton
                  text="Go back"
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      }
    />
  );
}

function ThemedStyles() {
  return StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
    },
  });
}
