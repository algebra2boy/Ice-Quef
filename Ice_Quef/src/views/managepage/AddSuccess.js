import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Dimensions, Text, StyleSheet } from 'react-native';
import { KolynButton, KolynTitleLabel } from '../../component';
import { BasePage } from '../../style/BasePage';
import { Bold, NonBold, day } from './AddOH';


const height = Dimensions.get('window').height;

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
            <View style={{height: height * 0.5}}>
              <KolynTitleLabel title="Successfully added" />

              <Text>
                <Bold
                  text = { officeHour.item.courseTag + " " + officeHour.item.courseNumber + "\n" }
                />
                <NonBold
                  text = { officeHour.item.facultyName + "\n" }
                />
                <NonBold
                  text = { day(officeHour.item.day) + " " + 
                        officeHour.item.startTime + 
                        " - " + 
                        officeHour.item.endTime }
                />
              </Text>
            </View>

            <View style={{ top: height * 0.1 }}>
              <KolynButton 
                text="OK"
                onPress={() => {
                  navigation.navigate("ManagePageDefault");
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
