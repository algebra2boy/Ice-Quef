import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View, Dimensions, FlatList, Text, StyleSheet, Platform } from 'react-native';
import { KolynButton, KolynTextfield, KolynTitleLabel } from '../../component';
import { ThemeContext } from '../../style/AppTheme';
import * as KolynStyle from '../../style/KolynStyleKit';
import { BasePage } from '../../style/BasePage';
import { GetSampleList } from '../../models/OHListModel';
import { SpringButton } from '../../style/SpringButton';

const { width, height } = Dimensions.get('window');
const ohList = GetSampleList();

const RenderItem = (officeHour, themedStyles, navigation) => {
  return (
    <SpringButton
      text={
        <Text>
          <Bold text={officeHour.courseDepartment + ' ' + officeHour.courseNumber + '\n'} />
          <NonBold text={officeHour.facultyName + '\n'} />
          <NonBold
            text={day(officeHour.day) + ' ' + officeHour.startTime + ' - ' + officeHour.endTime}
          />
        </Text>
      }
      onPress={() => {
        navigation.navigate('ManagePageAddConfirm', {
          officeHour: officeHour,
        });
      }}
      buttonStyle={themedStyles.item}
      labelStyle={themedStyles.itemLabel}
    />
  );
};

/**
 * Resembles the add office hour page
 *
 * @return { ReactElement } The add office hour page
 */
export function ManagePageAddOH({}) {
  const navigation = useNavigation();
  const themedStyles = ThemedStyles();

  // The refresh control for the course flat list
  const [isRefreshing, setIsRefreshing] = useState(false);

  // The entire array for the course items
  const [elementState, setElementState] = useState(ohList);

  const mySetElementState = newElementState => {
    setElementState(newElementState);
  };

  // Called each time the flat list if refreshed
  const refreshElements = () => {
    mySetElementState(elementState);
  };

  // Refresh the flat list
  const onRefresh = () => {
    setIsRefreshing(true);
    refreshElements();
    setIsRefreshing(false);
  };

  return (
    <BasePage
      components={
        <TouchableWithoutFeedback
          onPress={() => {
            if (Platform.OS === 'ios' || Platform.OS === 'android') {
              Keyboard.dismiss();
            }
          }}
        >
          <View style={themedStyles.root}>
            <View style={{ height: height * 0.5 }}>
              <KolynTitleLabel title="Add office hours" />
              <Hint themedStyles={themedStyles} />
              <SearchBar
                elementState={elementState}
                themedStyles={themedStyles}
                onRefresh={onRefresh}
                isRefreshing={isRefreshing}
                navigation={navigation}
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

export const day = num => {
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
};

export function Bold({ text }) {
  const themedStyles = ThemedStyles();

  return <Text style={themedStyles.itemLabelL}>{text}</Text>;
}

export function NonBold({ text }) {
  const themedStyles = ThemedStyles();

  return <Text style={themedStyles.itemLabel}>{text}</Text>;
}

function SearchBar({ elementState, themedStyles, onRefresh, isRefreshing, navigation }) {
  return (
    <View>
      <KolynTextfield />
      <View style={{ height: Platform.OS === 'ios' || Platform.OS === 'android' ? '80%' : '60%' }}>
        <FlatList
          data={elementState}
          showsVerticalScrollIndicator={false}
          renderItem={item => RenderItem(item.item, themedStyles, navigation)}
          keyExtractor={item => item.id}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          contentContainerStyle={themedStyles.flatListView}
        />
      </View>
    </View>
  );
}

function Hint({ themedStyles }) {
  function Label({ text }) {
    return <Text style={themedStyles.hintLabel}>{text}</Text>;
  }

  return (
    <Text>
      <Label text={'Please enter office hour information, e.g.\n'} />
      <Label text={'By Instructor name (John Doe),\n'} />
      <Label text={'By Class (CS 520 / Biology 151).'} />
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
      ),
    ]),

    flatListView: {
      alignSelf: 'center',
      width: '100%',
    },

    item: StyleSheet.flatten([
      {
        top: 0,
        width: width * 0.6,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: currentTheme.subColor,
        borderWidth: 4,
      },
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),

    itemLabel: StyleSheet.flatten([
      { marginVertical: 10, textAlign: 'center' },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.small,
        currentTheme.mainFont,
        currentTheme.subColor,
      ),
    ]),

    itemLabelL: StyleSheet.flatten([
      { marginVertical: 10, textAlign: 'center' },
      KolynStyle.kolynLabel(
        currentTheme.fontSizes.casual,
        currentTheme.mainFont,
        currentTheme.subColor,
      ),
    ]),
  });
}
