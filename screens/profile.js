import React, {useEffect} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import colors from '../utils/colors';
import signOut from '../utils/signout';
import About from '../components/profileCards/about';
import Experience from '../components/profileCards/experience';
import Education from '../components/profileCards/education';
import Skills from '../components/profileCards/skills';
import Intro from '../components/profileCards/intro';

const Profile = props => {
  useEffect(
    () =>
      props.navigation.addListener('beforeRemove', e => {
        e.preventDefault();

        Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            style: 'destructive',
            onPress: () => {
              signOut();
              props.navigation.dispatch(e.data.action);
            },
          },
        ]);
      }),
    [props.navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Intro />
        <About />
        <Experience />
        <Education />
        <Skills />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BLACK_BG,
    flexGrow: 1,
  },
});

export default Profile;
