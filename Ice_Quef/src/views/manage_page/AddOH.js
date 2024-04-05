import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Dimensions, FlatList, Text, StyleSheet } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KolynButton, KolynTextfield, KolynTitleLabel } from '../../component';
import { day, Bold, NonBold, ManageOHStyles } from '../../style/ManageOHStyle';
import { ThemeContext } from '../../style/AppTheme';
import * as KolynStyle from '../../style/KolynStyleKit';
import { BasePage } from '../../style/BasePage';
import { SpringButton } from '../../style/SpringButton';
import { KolynTextLabel } from '../../component';

const height = Dimensions.get('window').height;

const RenderItem = (officeHour, styles, navigation) => {
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
      buttonStyle={styles.item}
      labelStyle={styles.itemLabel}
    />
  );
};

/**
 * Resembles the add office hour page
 *
 * @param { List } ohList All office hours
 * @return { ReactElement } The add office hour page
 */
export function ManagePageAddOH(props) {
  const navigation = useNavigation();
  const manageOHStyles = ManageOHStyles();
  const themedStyles = ThemedStyles();

  const isRefreshing = props.isRefreshing;
  const setIsRefreshing = props.setIsRefreshing;
  const isSearching = props.isSearching;
  const officeHour = props.officeHour;
  const setOfficeHour = props.setOfficeHour;
  const courseCode = props.courseCode;
  const setCourseCode = props.setCourseCode;
  const facultyName = props.facultyName;
  const setFacultyName = props.setFacultyName;

  const mySetElementState = newElementState => {
    setOfficeHour(newElementState);
  };

  // Called each time the flat list if refreshed
  const refreshElements = () => {
    mySetElementState(officeHour);
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={themedStyles.root}>
            <View style={{ height: height * 0.65 }}>
              <KolynTitleLabel title="Add office hours" />
              <Hint themedStyles={themedStyles} />
              <SearchBar
                text={courseCode}
                setText={setCourseCode}
                placeholder="Please enter class code. ex. CS 520"
              />
              <SearchBar
                text={facultyName}
                setText={setFacultyName}
                placeholder="Please enter faculty's name: ex. Joe Doe"
              />
              {!isSearching && (
                <SearchResultList
                  elementState={officeHour}
                  styles={manageOHStyles}
                  onRefresh={onRefresh}
                  isRefreshing={isRefreshing}
                  navigation={navigation}
                />
              )}
              {(courseCode !== '' || facultyName !== '') && isSearching && (
                <LoadingView text="Loading..." />
              )}
            </View>
            <View>
              <View style={{ top: 60 - height * 0.05 }}>
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

/**
 * The bar in the search bar, updates the list each time its
 * value is modified.
 *
 * @return { ReactElement } The bar
 */
function SearchBar({ text, setText, placeholder }) {
  const onChangeText = async newText => {
    setText(newText);
  };

  return <KolynTextfield value={text} setValue={onChangeText} placeholder={placeholder} />;
}

function SearchResultList({ elementState, styles, onRefresh, isRefreshing, navigation }) {
  return (
    <FlatList
      data={elementState}
      showsVerticalScrollIndicator={false}
      renderItem={item => RenderItem(item.item, styles, navigation)}
      keyExtractor={item => item.id}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      contentContainerStyle={styles.flatListView}
    />
  );
}

function LoadingView({ text }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <KolynTextLabel text={text} />
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
  });
}
