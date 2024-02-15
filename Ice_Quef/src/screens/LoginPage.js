import React from 'react';
import { SafeAreaView, StyleSheet, Text, Image, View, Dimensions } from 'react-native';
import Logo from '../../assets/images/Logo_1.png';


function LoginPage({ navigation }) {
  const {_, height} = Dimensions.get('window');

  return (
    <View>
      <SafeAreaView style={styles.root}>
        <Image 
          source={Logo} 
          style={[styles.logo, {height: height * 0.3}]} 
          resizeMode="contain"/>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({

  root: {
    alignItems: 'center',
    padding: 20,
  },

  logo :
  {
    width: '70%',
    maxWidth: 300,
    height: 100,
  }

});

export default LoginPage;
