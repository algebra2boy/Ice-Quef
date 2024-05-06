import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Pressable, FlatList } from 'react-native';
import { BasePage } from '../../style/BasePage';
import { themeMiniIcon, ThemeContext } from '../../style/AppTheme';
import { KolynTitleLabel, KolynButton } from '../../component';
import { kolynBigSector, kolynSmallSector } from '../../style/KolynStyleKit';

export function ProfilePageTheme(props) {
  const themedStyles = ThemedStyles();
  const themeManager = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <BasePage
      components={
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
              <KolynButton onPress={navigation.goBack} text={'Go back'} />
            </View>
          </View>
        </View>
      }
    />
  );
}

function ThemeButtons({ changeTheme, containerStyle, themeButtonStyle, themePressableStyle }) {
  const themeIcons = themeMiniIcon();

  return (
    <View style={containerStyle}>
      <FlatList 
        data={themeIcons}
        renderItem={theme => 
        {
          return (
            <ChangeThemeButton
              backgroundColor={theme.item.mainColor}
              id={theme.item.index + ''}
              onPress={() => {
                changeTheme(theme.item.index);
              }}
              buttonStyle={themeButtonStyle}
              pressableStyle={themePressableStyle}
              key={theme.item.index}
            />
          )
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item=>item.index}
        numColumns={4}
        removeClippedSubviews={true}
        contentContainerStyle={{gap: 20}}
        columnWrapperStyle={{gap: 20}}
      />
    </View>
  );
}

function ChangeThemeButton({ backgroundColor, id, onPress, buttonStyle, pressableStyle }) {
  return (
    <Pressable onPress={onPress} id={id} style={pressableStyle}>
      <View style={[buttonStyle, { backgroundColor: backgroundColor }]} />
    </Pressable>
  );
}

function ThemedStyles() {
  return StyleSheet.create({
    background: {
      alignItems: 'center',
      padding: 20,
    },

    themeButtonsContainer: {
      alignItems: 'center',
      top: 20
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
  });
}
