import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { KolynButton, KolynTextfield, KolynLogo, KolynTextLabel } from '../../component';
import { BasePage } from '../../style/BasePage';
import { UserContext } from '../../props/UserInfo';
import { ThemeContext } from '../../style/AppTheme';
import { loginStatus } from '../../props/LoginContext';

export function LoginPageDefault(props) {
    return (
        <View></View>
    );
}
