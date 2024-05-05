import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { KolynButton, KolynTitleLabel } from '../../component';
import { BasePage } from '../../style/BasePage';
import { day, Bold, NonBold } from '../../style/ManageOHStyle';
import { kolynBigSector, kolynSmallSector } from '../../style/KolynStyleKit';

/**
 * This page serves as a transition between add office hour
 * page and successfully added office hour page.
 *
 * @param {Prop} route Objects received from add office hour page
 * @returns {ReactElement} The add confirm page
 */
export function ManagePageAddConfirm(props) {
  const navigation = useNavigation();
  const themedStyles = ThemedStyles();
  const addOHToDB = props.addOHToDB;
  const officeHour = props.officeHour;

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
              <KolynTitleLabel title="Confirm adding" />

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
                text="Add"
                onPress={async () => {
                  await addOHToDB();
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
