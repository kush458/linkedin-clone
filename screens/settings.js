import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import signOut from '../utils/signout';

const Settings = props => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <Button
          icon="logout"
          mode="contained-tonal"
          buttonColor="salmon"
          textColor="black"
          onPress={() => {
            signOut();
            props.navigation.navigate('Login');
          }}>
          Sign Out
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
});

export default Settings;
