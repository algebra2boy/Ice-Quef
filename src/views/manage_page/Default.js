import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, FlatList } from 'react-native';
import { BasePage } from '../../style/BasePage';
import { ManageOHStyles } from '../../style/ManageOHStyle';
import { KolynButton, KolynTitleLabel } from '../../component';
import { RenderItem } from '../../component/OfficeHourButton';
import { kolynBigSector, kolynSmallSector } from '../../style/KolynStyleKit';

/**
 * Resembles the default page for the manage office hours page.
 *
 * @param { Props } props
 * @returns { ReactElement } The default page for the manage office hours page
 */
export function ManagePageDefault(props) {
  const navigation = useNavigation();
  const manageOHStyles = ManageOHStyles();
  const themedStyles = ThemedStyles();

  // The refresh control for the course flat list
  const [isRefreshing, setIsRefreshing] = useState(false);

  const officeHour = props.officeHour;
  const setOfficeHour = props.setOfficeHour;

  // Called each time the flat list if refreshed
  const refreshElements = () => {
    setOfficeHour(officeHour);
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
            <View style={kolynBigSector()}>
              <KolynTitleLabel title="Manage office hours" />
              <FlatList
                data={officeHour}
                showsVerticalScrollIndicator={false}
                renderItem={item =>
                  RenderItem(item.item, manageOHStyles, navigation, 'ManagePageInfo')
                }
                keyExtractor={item => item.id}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                contentContainerStyle={manageOHStyles.flatListView}
              />
            </View>

            <View style={kolynSmallSector()}>
              <KolynButton
                text="Add"
                onPress={() => {
                  navigation.navigate('ManagePageAddOH');
                }}
                testID="addButton"
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
