import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KolynButton, KolynTextfield, KolynTitleLabel } from '../../component';
import { ManageOHStyles } from '../../style/ManageOHStyle';
import { ThemeContext } from '../../style/AppTheme';
import * as KolynStyle from '../../style/KolynStyleKit';
import { BasePage } from '../../style/BasePage';
import { KolynTextLabel } from '../../component';
import { RenderItem } from '../../component/OfficeHourButton';
import { kolynSector } from '../../style/KolynStyleKit';

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
        <TouchableWithoutFeedback onPress={() => Platform.OS !== 'web' && Keyboard.dismiss()}>
          <View style={themedStyles.root}>
            <View style={kolynSector(8, { height: Dimensions.get('window').height * 0.65 })}>
              <View style={{flex: 5}}>
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
              </View>
              <View style={{flex: 8}}>
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
            </View>
            <View style={Platform.OS === 'web' ? 
                        { flex: 1, top : 20 } : 
                        { top: 60 - Dimensions.get('window').height * 0.05 }}>
              <KolynButton
                text="Go back"
                onPress={() => {
                  navigation.goBack();
                }}
                testID="gobackButton"
              />
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

/**
 * The flat list of office hours, which is updated each time
 * the search bar is modified.
 *
 * @param { List } elementState The office hourss
 * @param { StyleSheet } styles The styles
 * @param { Function } onRefresh The function to refresh the list
 * @param { boolean } isRefreshing Whether the list is refreshing
 * @param { Object } navigation The navigation
 * @returns { ReactElement } The flat list of office hours
 */
function SearchResultList({ elementState, styles, onRefresh, isRefreshing, navigation }) {
  return (
    <FlatList
      data={elementState}
      showsVerticalScrollIndicator={false}
      renderItem={item => RenderItem(item.item, styles, navigation, 'ManagePageAddConfirm')}
      keyExtractor={item => item.id}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      contentContainerStyle={Platform.OS === 'web' ? 
                              styles.flatListViewWeb : 
                              styles.flatListView}
    />
  );
}

/**
 * The loading view when the search is in progress.
 *
 * @param { string } text The text to display
 * @returns { View } The loading view
 */
function LoadingView({ text }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <KolynTextLabel text={text} />
    </View>
  );
}

/**
 * The hint text.
 *
 * @param { StyleSheet } themedStyles The themed styles
 * @returns { ReactElement } The hint text
 */
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
  const themeManager = useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
      flex: 1,
      flexDirection: 'col'
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
