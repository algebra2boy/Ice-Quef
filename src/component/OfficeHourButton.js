import { SpringButton } from "../style/SpringButton";
import { Text } from "react-native";
import { Bold, NonBold, day } from "../style/ManageOHStyle";
import { useNavigation } from "@react-navigation/native";

/**
 * Resembles a button with information of office hour text label.
 * 
 * @param { Object } officeHour 
 * @param { Style } themedStyles 
 * @param { Func } onPress 
 * @returns { ReactElement } The button
 */
export function RenderItem(officeHour, themedStyles, navigation, pageName) {
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
      onPress={() => navigation.navigate(pageName, {officeHour: officeHour})}
      buttonStyle={themedStyles.item}
      labelStyle={themedStyles.itemLabel}
    />
  );
}
