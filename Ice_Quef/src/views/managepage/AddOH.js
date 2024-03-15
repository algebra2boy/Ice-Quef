import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Dimensions, FlatList, Text, StyleSheet } from 'react-native';
import { KolynButton, KolynTextfield, KolynLogo, KolynTitleLabel } from '../../component';
import { ThemeContext } from '../../style/AppTheme';
import * as KolynStyle from '../../style/KolynStyleKit';
import { BasePage } from '../../style/BasePage';
import { GetSampleList } from '../../models/OHListModel';
import { SpringButton } from '../../style/SpringButton';


const {width, height} = Dimensions.get('window');
const ohList = GetSampleList();

const RenderItem = (officeHour, themedStyles) => {
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
      }
      onPress={()=>{}}
      buttonStyle={themedStyles.item}
      labelStyle={themedStyles.itemLabel}
    />
  );
}

/**
 * Resembles the login page
 *
 * @param { Props } { navigation }
 * @return { ReactElement } The login page
 */
export function ManagePageAddOH({ }) {
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={themedStyles.root}>
              <View style={{height: height * 0.5}}>
                <KolynTitleLabel title="Add office hours" />
                <Hint themedStyles={themedStyles}/>
                <SearchBar
                  elementState={elementState}
                  themedStyles={themedStyles}
                  onRefresh={onRefresh}
                  isRefreshing={isRefreshing}
                />
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
          </TouchableWithoutFeedback>
        }
      />
  );
}

function SearchBar({elementState, themedStyles, onRefresh, isRefreshing}) {
  return (
    <View>
      <KolynTextfield/>
      <View style={{height: '80%'}}>
        <FlatList
          data={elementState}
          showsVerticalScrollIndicator={false}
          renderItem={item => RenderItem(item, themedStyles)}
          keyExtractor={item=>item.id}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
        />
      </View>
    </View>
  );
}

function Hint({ themedStyles }) {
  function Label({ text }) {
    return (
      <Text style={themedStyles.hintLabel}>
        {text}
      </Text>
    );
  }

  return (
    <Text>
      <Label text={"Please enter office hour information, e.g.\n"}/>
      <Label text={"By Instructor name (John Doe),\n"}/>
      <Label text={"By Class (CS 520 / Biology 151)."}/>
    </Text>
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

    hintLabel: StyleSheet.flatten([
      { marginVertical: 10, textAlign: 'center' },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.tiny,
        currentTheme.mainFont,
        currentTheme.subColor,
      )
    ]),

    flatListView: {
      alignSelf: 'center', 
      backgroundColor: currentTheme.primaryColor,
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
