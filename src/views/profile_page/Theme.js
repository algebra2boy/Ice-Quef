import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { BasePage } from '../../style/BasePage';
import * as KolynStyle from '../../style/KolynStyleKit'
import { theme_mini_icon, ThemeContext } from '../../style/AppTheme';
import { KolynTitleLabel, KolynButton } from '../../component';
import { kolynBigSector, kolynSmallSector } from '../../style/KolynStyleKit';

export function ProfilePageTheme(props) {
  const themedStyles = ThemedStyles();
  const themeManager = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <BasePage
      components={
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <View style={themedStyles.background}>
            <View style={kolynBigSector()}>
              <KolynTitleLabel title="Change app theme" />
              <ThemeButtons 
                changeTheme={themeManager.changeTheme}
                containerStyle={themedStyles.themeButtonsContainer}
                themeButtonStyle={themedStyles.themeCircle}
                themePressableStyle={themedStyles.themePressable}
              />
            </View>

            <View style={kolynSmallSector()}>
              <View style={{ top: 20 }}>
                <KolynButton
                  onPress={navigation.goBack}
                  text={'Cancel'}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      }
    />
  );
}

function ThemeButtons({ changeTheme, containerStyle, themeButtonStyle, themePressableStyle }) {
  return (
    <View
      style={containerStyle}
    >
      {theme_mini_icon().map(theme => (
        <ChangeThemeButton 
          backgroundColor={theme.mainColor}
          id={theme.index+""}
          onPress={() => {changeTheme(theme.index)}}
          buttonStyle={themeButtonStyle}
          pressableStyle={themePressableStyle}
          key={theme.index}
        />
      ))}
  </View>
  );
}

function ChangeThemeButton({ backgroundColor, id, onPress, buttonStyle, pressableStyle }) {
  return (
    <Pressable
      onPress={onPress}
      id={id}
      style={pressableStyle}
    >
      <View style={[
        buttonStyle,
        {backgroundColor: backgroundColor}
      ]}/>
    </Pressable>
  );
}

function ThemedStyles() {
  const themeManager = useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return (StyleSheet.create({
    background: {
      alignItems: 'center',
      padding: 20,
    },

    themeButtonsContainer: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      flex: 1, 
      padding: 40
    },

    themePressable: {
      width: 50,
      height: 50,
    },

    themeCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderColor: 'white',
      borderWidth: 4,
    },
  }));
}
