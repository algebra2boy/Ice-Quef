import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { KolynButton, KolynTitleLabel } from '../../component';
import { BasePage } from '../../style/BasePage';
import { day, Bold, NonBold } from '../../style/ManageOHStyle';
import { kolynBigSector, kolynSmallSector } from '../../style/KolynStyleKit';

/**
 * Displays when removing office hour succeed.
 * Notice that actually removing the office hour is not done here.
 * Instead, it was done previously.
 *
 * @param { Object } route
 * @returns { ReactElement } The page to display when removing office hour succeed.
 */
export function ManagePageDeleteSuccess({ route }) {
  const navigation = useNavigation();
  const themedStyles = ThemedStyles();

  const officeHour = route.params?.officeHour;

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
            <View style={kolynBigSector()}>
              <KolynTitleLabel title="Successfully deleted" />

              <Text style={{textAlign: 'center'}}>
                <Bold text={officeHour.courseDepartment + ' ' + officeHour.courseNumber + '\n'} />
                <NonBold text={officeHour.facultyName + '\n'} />
                <NonBold
                  text={
                    day(officeHour.day) + ' ' + officeHour.startTime + ' - ' + officeHour.endTime
                  }
                />
              </Text>
            </View>

            <View style={kolynSmallSector()}>
              <KolynButton
                text="OK"
                onPress={() => {
                  navigation.navigate('ManagePageDefault');
                }}
              />
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
