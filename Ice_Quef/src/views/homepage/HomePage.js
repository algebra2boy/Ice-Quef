import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { BasePage } from '../../style/BasePage';
import { ThemeContext } from '../../style/AppTheme'
import { renderEvent, eventCellTheme } from '../../style/CaleStyle';


export function HomePage({books}) {
  const hourStyle = getHourStyle();

  return (
    <BasePage
      components={
        <>
          <View style={{flex: 20}}>
            <Calendar 
              events={books} 
              height={400} 
              mode='3days'
              theme={eventCellTheme()}
              renderEvent={renderEvent}
              hourStyle={hourStyle}
              showWeekNumber={true}
            />
          </View> 
        </>
      }
    />
  );
}

function getHourStyle() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return {
    fontFamily: currentTheme.mainFont,
    fontSize: currentTheme.fontSizes.small,
    color: currentTheme.mainColor
  };
}
