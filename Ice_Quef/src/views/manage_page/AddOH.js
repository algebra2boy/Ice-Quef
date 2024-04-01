import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Dimensions, FlatList, Text, StyleSheet, Platform } from 'react-native';
import { KolynButton, KolynTextfield, KolynTitleLabel } from '../../component';
import { day, Bold, NonBold, ManageOHStyles } from '../../style/ManageOHStyle';
import { ThemeContext } from '../../style/AppTheme';
import * as KolynStyle from '../../style/KolynStyleKit';
import { BasePage } from '../../style/BasePage';
import { SpringButton } from '../../style/SpringButton';

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
 * @param { Array } ohList All office hours
 * @return { ReactElement } The add office hour page
 */
export function ManagePageAddOH({ ohList }) {
  const navigation = useNavigation();
  const themedStyles = ThemedStyles();
  const manageOHStyles = ManageOHStyles();

  // The refresh control for the course flat list
  const [isRefreshing, setIsRefreshing] = useState(false);

  // The entire array for the course items
  const [elementState, setElementState] = useState([]);

  const [text, setText] = useState('');

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
        <View style={themedStyles.root}>
          <View style={{ height: height * 0.5 }}>
            <KolynTitleLabel title="Add office hours" />
            <Hint themedStyles={themedStyles} />
            <SearchBar
              text={text}
              setText={setText}
              elementState={elementState}
              styles={manageOHStyles}
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
function Bar({ text, setText }) {
  const onChangeText = async newText => {
    setText(newText);

    // IMPORTANT: Use 'newText' to perform searching
    
  };

  return (
    <KolynTextfield value={text} setValue={onChangeText} placeholder="Enter text to start search" />
  );
}

function SearchBar({ text, setText, elementState, styles, onRefresh, isRefreshing, navigation }) {
  return (
    <View>
      <Bar text={text} setText={setText} />
      <View style={{ height: Platform.OS === 'ios' || Platform.OS === 'android' ? '80%' : '60%' }}>
        <FlatList
          data={elementState}
          showsVerticalScrollIndicator={false}
          renderItem={item => RenderItem(item.item, styles, navigation)}
          keyExtractor={item => item.id}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          contentContainerStyle={styles.flatListView}
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
  });
}
