import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, ScrollView, Dimensions, Text, StyleSheet} from 'react-native';
import {KolynButton, KolynTitleLabel} from '../../component';
import {BasePage} from '../../style/BasePage';
import {day, Bold, NonBold} from '../../style/ManageOHStyle';
import {UserContext} from "../../props/UserInfo";
import {addUserOfficeHour} from "../../controllers/manage_page/AddConfirmController";

const height = Dimensions.get('window').height;

/**
 * This page serves as a transition between add office hour
 * page and successfully added office hour page
 *
 * @param {Prop} objects received from add office hour page
 * @returns {ReactElement} The add confirm page
 */
export function ManagePageAddConfirm({route}) {
    const navigation = useNavigation();
    const themedStyles = ThemedStyles();

    const user = React.useContext(UserContext);
    const userEmail = user.email;
    const userToken = user.token;

    const officeHour = route.params?.officeHour;
    const officeHourID = officeHour.id

    const addOHToDB = () => {
    };

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
                    <View style={themedStyles.root}>
                        <View style={{height: height * 0.5}}>
                            <KolynTitleLabel title="Confirm adding"/>

                            <Text>
                                <Bold text={officeHour.courseDepartment + ' ' + officeHour.courseNumber + '\n'}/>
                                <NonBold text={officeHour.facultyName + '\n'}/>
                                <NonBold
                                    text={
                                        day(officeHour.day) + ' ' + officeHour.startTime + ' - ' + officeHour.endTime
                                    }
                                />
                            </Text>
                        </View>

                        <View style={{top: height * 0.1}}>
                            <KolynButton
                                text="Add"
                                onPress={async () => {
                                    const requestStatus = await addUserOfficeHour(userEmail, userToken, officeHourID)
                                    if (requestStatus) {    // true means successful
                                        navigation.navigate('ManagePageAddSuccess', {
                                            officeHour: officeHour,
                                        });
                                    } else {
                                        navigation.navigate('ManagePageAddFail', {
                                            officeHour: officeHour,
                                        });
                                    }
                                }}
                            />
                            <View style={{top: 20}}>
                                <KolynButton
                                    text="Go back"
                                    onPress={() => {
                                        navigation.goBack();
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
