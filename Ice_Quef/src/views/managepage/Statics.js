import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Dimensions, Text, StyleSheet, ScrollView } from 'react-native';
import { KolynButton, KolynTitleLabel } from '../../component';
import { BasePage } from '../../style/BasePage';
import { Bold, NonBold, day } from './AddOH';


const height = Dimensions.get('window').height;

export function ManagePageStatics({ route }) {
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
              <KolynTitleLabel title="Statics" />

              <View style={{flex: 1}}>
                <Text>
                  <Bold
                    text={officeHour.courseDepartment + 
                          " " + 
                          officeHour.courseNumber +
                          "\n"}
                  />
                  <NonBold
                    text={officeHour.facultyName}
                  />
                </Text>
              </View>

              <View style={{flex: 1}}>
                <KolynButton 
                  text="Delete" 
                  onPress={() => {
                    navigation.navigate("ManagePageDeleteConfirm", {
                      officeHour: officeHour
                    })
                  }} 
                />
              </View>

              <View style={{flex: 1}}>
                <Text>
                  <NonBold
                    text={"Start: "+
                          officeHour.initialDate.replaceAll(':', '/') + 
                          "\n"}
                  />
                  <NonBold
                    text={"End: " +
                          officeHour.terminalDate.replaceAll(':', '/') +
                          "\n\n"}
                  />
                  <NonBold
                    text={"Time span: \n" +
                          day(officeHour.day) + 
                          " " + 
                          officeHour.startTime + 
                          " - " +
                          officeHour.endTime}
                  />
                </Text>
              </View>

            </View>

            <View style={{ top: height * 0.1 }}>
              <View style={{ top: 60 }}>
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
