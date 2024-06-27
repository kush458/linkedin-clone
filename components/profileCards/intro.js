/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {storage} from '../../utils/storage';
import colors from '../../utils/colors';
import {IconButton, Text} from 'react-native-paper';
import {create} from 'zustand';
import CustomModal from '../customModal';
import {launchImageLibrary} from 'react-native-image-picker';

const useIntroStore = create(set => ({
  intro: {
    firstName: '',
    lastName: '',
    headline: '',
    school: '',
    location: '',
  },
  setFirstName: fname =>
    set(state => ({
      intro: {
        ...state.intro,
        firstName: fname,
      },
    })),
  setLastName: lname =>
    set(state => ({
      intro: {
        ...state.intro,
        lastName: lname,
      },
    })),
  setHeadline: headline =>
    set(state => ({
      intro: {
        ...state.intro,
        headline: headline,
      },
    })),
  setSchool: school =>
    set(state => ({
      intro: {
        ...state.intro,
        school: school,
      },
    })),
  setLocation: loc =>
    set(state => ({
      intro: {
        ...state.intro,
        location: loc,
      },
    })),
}));

const useModalStore = create(set => ({
  isVisible: true,
  setIsVisible: bool => set(state => ({isVisible: bool})),
}));

const useImageStore = create(set => ({
  profileImgURI: '',
  bgImgURI: '',
  setProfileImg: uri => set(state => ({profileImgURI: uri})),
  setBgImg: uri => set(state => ({bgImgURI: uri})),
}));

const useErrorStore = create(set => ({
  err: false,
  errMsg: '',
  setErr: val => set(state => ({err: val})),
  setErrMsg: msg => set(state => ({errMsg: msg})),
}));

const Intro = props => {
  const googleInfo = JSON.parse(storage.getString('googleInfo'));
  const {isVisible, setIsVisible} = useModalStore();
  const {err, errMsg, setErr, setErrMsg} = useErrorStore();
  const {profileImgURI, bgImgURI, setProfileImg, setBgImg} = useImageStore();
  const {
    intro,
    setFirstName,
    setLastName,
    setHeadline,
    setSchool,
    setLocation,
  } = useIntroStore();
  const userIntro = storage.getString('user.intro')
    ? JSON.parse(storage.getString('user.intro'))
    : {};

  const introInputFields = [
    {title: 'First Name', value: intro.firstName, setter: setFirstName},
    {title: 'Last Name', value: intro.lastName, setter: setLastName},
    {title: 'Headline', value: intro.headline, setter: setHeadline},
    {title: 'School', value: intro.school, setter: setSchool},
    {title: 'Location', value: intro.location, setter: setLocation},
  ];

  const onIntroSave = () => {
    if (
      !intro.firstName ||
      !intro.lastName ||
      !intro.headline ||
      !intro.school ||
      !intro.location
    ) {
      setErr(true);
      setErrMsg(
        'You are missing a required field. Please make sure all fields are set before continuing.',
      );
      return false;
    }

    setErr(false);
    setErrMsg('');

    storage.set('user.intro', JSON.stringify(intro));

    return true;
  };

  const pickImage = setter => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setter(imageUri);
      }
    });
  };

  useEffect(() => {
    // need to always enter user intro info before continuing

    if (intro.firstName < 1) {
      setIsVisible(true);
    }
  }, []);

  return (
    <>
      <View
        style={{
          width: '100%',
          height: 180,
          backgroundColor: colors.GRAY,
        }}>
        <ImageBackground
          source={bgImgURI ? {uri: bgImgURI} : require('../../assets/bg.jpg')}
          resizeMode="cover"
          style={{width: '100%', height: '85%'}}>
          <IconButton
            icon={'pencil'}
            iconColor={colors.LIGHT_BLUE}
            size={20}
            style={{
              position: 'absolute',
              top: 0,
              right: 5,
              backgroundColor: colors.GRAY,
            }}
            onPress={() => pickImage(setBgImg)}
          />
          <TouchableOpacity
            onPress={() => pickImage(setProfileImg)}
            style={styles.ProfileImage}>
            <Image
              source={
                profileImgURI
                  ? {uri: profileImgURI}
                  : require('../../assets/default-profile.png')
              }
              resizeMode="cover"
              style={{
                borderRadius: 100,
                height: 120,
                width: 120,
                borderColor: colors.GRAY,
                borderWidth: 3,
              }}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.introCard}>
        {userIntro && (
          <View>
            <Text
              variant="headlineMedium"
              style={{fontFamily: 'Georgia-Italic', fontWeight: 'bold'}}>
              {userIntro.firstName} {userIntro.lastName}
            </Text>
            <Text
              variant="titleMedium"
              style={{fontFamily: 'Georgia-Italic', marginBottom: '5%'}}>
              {userIntro.headline}
            </Text>
            <Text variant="titleSmall" style={{fontFamily: 'Georgia-Italic'}}>
              {userIntro.school}
            </Text>
            <Text
              variant="titleSmall"
              style={{
                fontFamily: 'Georgia-Italic',
                color: colors.GRAY_TXT,
                marginBottom: '5%',
              }}>
              {userIntro.location}
            </Text>
            <Text
              variant="titleSmall"
              style={{
                fontFamily: 'Georgia-Italic',
                color: colors.LIGHT_BLUE,
                fontWeight: 'bold',
              }}>
              {'500+ Connections'}
            </Text>
          </View>
        )}
        <CustomModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          title="Your Intro"
          inputs={introInputFields}
          onSave={onIntroSave}
          err={err}
          errMsg={errMsg}
          icon="pencil"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BLACK_BG,
    flexGrow: 1,
  },
  introCard: {
    width: '100%',
    backgroundColor: colors.GRAY,
    alignItems: 'flex-start',
    minHeight: 50,
    marginBottom: '2.5%',
    paddingLeft: '5%',
    paddingBottom: '5%',
    flexGrow: 1,
  },
  ProfileImage: {
    borderRadius: 100,
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    top: 50,
    left: 15,
  },
});

export default Intro;
