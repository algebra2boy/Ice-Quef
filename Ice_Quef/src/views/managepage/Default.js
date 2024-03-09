import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, FlatList } from 'react-native';
import { BasePage } from '../../style/BasePage';
import { ThemeContext } from '../../style/AppTheme';
import { KolynButton, KolynTitleLabel } from '../../component';
import * as KolynStyle from '../../style/KolynStyleKit';
import { SpringButton } from '../../style/SpringButton';


const RenderItem = (officeHour, themedStyles) => {
  const label = 
  officeHour.item.courseTag +
  officeHour.item.courseNumber +
  ", " +
  officeHour.item.facultyName;

  const truncateLabel = 
  label.substring(0, 18);

  return (
    <SpringButton 
      text={truncateLabel}
      onPress={()=>{}}
      buttonStyle={themedStyles.item}
      labelStyle={themedStyles.itemLabel}
    />
  );
}

const {width, height} = Dimensions.get('window');
var initialElements = undefined;

export function ManagePageDefault({route, navigation}) {
  const themedStyles = ThemedStyles();

  // The refresh control for the course flat list
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (initialElements == undefined) { // first time loading page
    initialElements = GetSampleList();
  }

  // The entire array for the course items
  const [elementState, setElementState] = useState(initialElements);

  const mySetElementState = (newElementState) => {
    setElementState(newElementState);
    initialElements = newElementState;
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
        <View
        >
          <View style={themedStyles.root}>
            <View style={{ height: height * 0.5 }}>
              <KolynTitleLabel title="Manage office hours" />
              <FlatList
                data={elementState}
                showsVerticalScrollIndicator={false}
                renderItem={item => RenderItem(item, themedStyles)}
                keyExtractor={item=>item.id}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
              />
            </View>

            <View style={{ top: height * 0.1 }}>
              <KolynButton 
                text="Add" 
                onPress={() => {
                  
                }} 
              />
            </View>
          </View>
        </View>
      }
    />
  );
}

class OfficeHour {
  constructor(facultyName,
              day,
              startTime,
              endTime,
              initialDate,
              terminalDate,
              courseTag,
              courseNumber,
              id) {
    this.facultyName = facultyName;
    // Sunday - Saturday: 0 - 6
    this.day = day;
    // hh:mm
    this.startTime = startTime;
    // hh:mm
    this.endTime = endTime;
    // mm:dd:yy
    this.initialDate = initialDate;
    // mm:dd:yy
    this.terminalDate = terminalDate;
    // eg. CS, Bio, Chem
    this.courseTag = courseTag;
    // eg. 520, 320, 326
    this.courseNumber= courseNumber;
    this.id = id;
  }
}

function GetSampleList() {
  return [
    new OfficeHour(
      'John Doe',
      '1',
      '2:30',
      '3:30',
      '2:1:2024',
      '5:8:2024',
      'CS',
      100,
      1
    ),
    new OfficeHour(
      'Jane Doe',
      '3',
      '4:0',
      '6:0',
      '2:1:2024',
      '5:8:2024',
      'Chem',
      100,
      2
    ),
    new OfficeHour(
      'Ranbo',
      '1',
      '4:0',
      '6:0',
      '2:1:2024',
      '5:8:2024',
      'PHYS',
      200,
      3
    ),
    new OfficeHour(
      'Ranbo',
      '1',
      '1:0',
      '2:0',
      '2:1:2024',
      '5:8:2024',
      'PHYS',
      200,
      4
    ),
    new OfficeHour(
      'Alexandar',
      '1',
      '1:0',
      '2:0',
      '2:1:2024',
      '5:8:2024',
      'Math',
      233,
      5
    ),
    new OfficeHour(
      'Alexandar',
      '1',
      '3:0',
      '4:0',
      '2:1:2024',
      '5:8:2024',
      'Math',
      233,
      6
    )
  ];
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
      { marginVertical: 10 },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.small,
        currentTheme.mainFont,
        currentTheme.subColor,
      )
    ]),

  })
}
