import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Dimensions, StyleSheet, FlatList, Text } from 'react-native';
import { BasePage } from '../../style/BasePage';
import { ThemeContext } from '../../style/AppTheme';
import { KolynButton, KolynTitleLabel } from '../../component';
import * as KolynStyle from '../../style/KolynStyleKit';
import { SpringButton } from '../../style/SpringButton';


const RenderItem = (officeHour, themedStyles, navigation) => {
  const day = (num) => {
    switch (num) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
    }
  }

  function Bold({ text }) {
    return (
      <Text style = {themedStyles.itemLabelL}>
        {text}
      </Text>
    );
  }

  function NonBold({ text }) {
    return (
      <Text style = {themedStyles.itemLabel}>
        {text}
      </Text>
    );
  }

  return (
    <SpringButton 
      text={
        <Text>
          <Bold
            text = { officeHour.courseDepartment + " " + officeHour.courseNumber + "\n" }
          />
          <NonBold
            text = { officeHour.facultyName + "\n" }
          />
          <NonBold
            text = { day(officeHour.day) + " " + 
                  officeHour.startTime + 
                  " - " + 
                  officeHour.endTime }
          />
        </Text>
      }
      onPress={()=>{
        navigation.navigate("ManagePageStatics", {
          officeHour: officeHour
        })
      }}
      buttonStyle={themedStyles.item}
      labelStyle={themedStyles.itemLabel}
    />
  );
}

const {width, height} = Dimensions.get('window');

export function ManagePageDefault({ ohList }) {
  const navigation = useNavigation();
  const themedStyles = ThemedStyles();

  // The refresh control for the course flat list
  const [isRefreshing, setIsRefreshing] = useState(false);

  // The entire array for the course items
  const [elementState, setElementState] = useState(ohList);

  const mySetElementState = (newElementState) => {
    setElementState(newElementState);
  };

  // Called each time the flat list if refreshed
  const refreshElements = () => {
    mySetElementState(elementState);
  }

  // Refresh the flat list
  const onRefresh = () => {
    setIsRefreshing(true);
    refreshElements();
    setIsRefreshing(false);
  }

  return (
    <BasePage
      components={
        <View>
          <View style={themedStyles.root}>
            <View style={{ height: height * 0.5 }}>
              <KolynTitleLabel title="Manage office hours" />
              <FlatList
                data={elementState}
                showsVerticalScrollIndicator={false}
                renderItem={item => RenderItem(item.item, themedStyles, navigation)}
                keyExtractor={item=>item.id}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
              />
            </View>

            <View style={{ top: height * 0.1 }}>
              <KolynButton 
                text="Add" 
                onPress={() => {
                  navigation.navigate("ManagePageAddOH");
                }} 
              />
            </View>
          </View>
        </View>
      }
    />
  );
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
    },

    flatListView: {
      alignSelf: 'center', 
      backgroundColor: currentTheme.primaryColor
    },

    item: StyleSheet.flatten([
      {
        top: 0, 
        width: width*0.6, 
        alignSelf: 'center', 
        marginTop: 10, 
        borderRadius: 10, 
        backgroundColor: currentTheme.subColor, 
        borderWidth: 4 }, 
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),

    itemLabel: StyleSheet.flatten([
      { marginVertical: 10, textAlign: 'center' },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.small,
        currentTheme.mainFont,
        currentTheme.subColor,
      )
    ]),

    itemLabelL: StyleSheet.flatten([
      { marginVertical: 10, textAlign: 'center' },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.casual,
        currentTheme.mainFont,
        currentTheme.subColor,
      )
    ]),

  })
}
