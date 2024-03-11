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

export function ManagePageDefault({ ohList }) {
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
