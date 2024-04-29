import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Dimensions, Text, StyleSheet } from 'react-native';
import { KolynButton, KolynTitleLabel } from '../../component';
import { BasePage } from '../../style/BasePage';
import { day, Bold, NonBold } from '../../style/ManageOHStyle';

const height = Dimensions.get('window').height;

/**
 * Displays when adding office hour succeed.
 * Notice that actually adding the office hour is not done here.
 * Instead, it was done previously.
 *
 * @param { Object } route
 * @returns { ReactElement } The page to display when adding office hour succeed
 */
export function ManagePageAddSuccess({ route }) {
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
            <View style={{ height: height * 0.5 }}>
              <KolynTitleLabel title="Successfully added" />

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
