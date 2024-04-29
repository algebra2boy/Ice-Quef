import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { KolynButton, KolynTitleLabel, KolynTextLabel } from '../../component';
import { BasePage } from '../../style/BasePage';
import { day, Bold, NonBold } from '../../style/ManageOHStyle';
import { kolynBigSector, kolynSmallSector } from '../../style/KolynStyleKit';

/**
 * Displays when removing office hour fails.
 *
 * @param { Object } route
 * @returns { ReactElement } The page to display when removing office hour fails.
 */
export function ManagePageDeleteFail({ route }) {
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
              <KolynTitleLabel title="Failed to delete" />

              <Text>
                <Bold text={officeHour.courseDepartment + ' ' + officeHour.courseNumber + '\n'} />
                <NonBold text={officeHour.facultyName + '\n'} />
                <NonBold
                  text={
                    day(officeHour.day) + ' ' + officeHour.startTime + ' - ' + officeHour.endTime
                  }
                />
              </Text>
              <View style={{ top: 20, alignSelf: 'center' }}>
                <KolynTextLabel text="Please try again later." />
              </View>
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
