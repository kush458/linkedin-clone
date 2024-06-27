/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../utils/colors';
import {Text} from 'react-native-paper';
import {create} from 'zustand';
import CustomModal from '../customModal';
import {storage} from '../../utils/storage';

const useModalStore = create(set => ({
  isVisible: false,
  setIsVisible: bool => set(state => ({isVisible: bool})),
}));

const About = props => {
  const {isVisible, setIsVisible} = useModalStore();
  const [aboutInfo, setAboutInfo] = useState('');

  const aboutInputFields = [
    {title: 'About', value: aboutInfo, setter: setAboutInfo},
  ];

  const onAboutSave = () => {
    storage.set('user.about', aboutInfo);
    return true;
  };

  return (
    <View style={styles.card}>
      <Text
        variant="headlineSmall"
        style={{
          fontFamily: 'Georgia-Italic',
          fontWeight: 'bold',
          marginBottom: '5%',
        }}>
        {'About'}
      </Text>
      <Text variant="titleSmall" style={{fontFamily: 'Georgia-Italic'}}>
        {storage.getString('user.about')}
      </Text>
      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        title="Edit About"
        inputs={aboutInputFields}
        onSave={onAboutSave}
        err={false}
        errMsg={''}
        icon="pencil"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.GRAY,
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    alignItems: 'flex-start',
    marginBottom: '2.5%',
  },
});

export default About;
