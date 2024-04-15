import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Dimensions, StyleSheet, FlatList, Text } from 'react-native';
import { BasePage } from '../../style/BasePage';
import { day, Bold, NonBold, ManageOHStyles } from '../../style/ManageOHStyle';
import { KolynButton, KolynTitleLabel } from '../../component';
import { SpringButton } from '../../style/SpringButton';

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
        navigation.navigate('ManagePageInfo', {
          officeHour: officeHour,
        });
      }}
      buttonStyle={themedStyles.item}
      labelStyle={themedStyles.itemLabel}
    />
  );
};

const height = Dimensions.get('window').height;

export function ManagePageDefault({ ohList }) {
  const navigation = useNavigation();
  const manageOHStyles = ManageOHStyles();
  const themedStyles = ThemedStyles();

  // The refresh control for the course flat list
  const [isRefreshing, setIsRefreshing] = useState(false);

  // The entire list for the course items
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
        <View>
          <View style={themedStyles.root}>
            <View style={{ height: height * 0.5 }}>
              <KolynTitleLabel title="Manage office hours" />
              <FlatList
                data={elementState}
                showsVerticalScrollIndicator={false}
                renderItem={item => RenderItem(item.item, manageOHStyles, navigation)}
                keyExtractor={item => item.id}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                contentContainerStyle={manageOHStyles.flatListView}
              />
            </View>

            <View style={{ top: height * 0.1 }}>
              <KolynButton
                text="Add"
                onPress={() => {
                  navigation.navigate('ManagePageAddOH');
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
  return StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
    },
  });
}
