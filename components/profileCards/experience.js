/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import colors from '../../utils/colors';
import {Text} from 'react-native-paper';
import {create} from 'zustand';
import CustomModal from '../customModal';
import {storage} from '../../utils/storage';
import {areValidDates, formatDate} from '../../utils/helpers';

const useModalStore = create(set => ({
  isVisible: false,
  setIsVisible: bool => set(state => ({isVisible: bool})),
}));

const useErrorStore = create(set => ({
  err: false,
  errMsg: '',
  setErr: val => set(state => ({err: val})),
  setErrMsg: msg => set(state => ({errMsg: msg})),
}));

const useExpStore = create(set => ({
  exp: {
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
  },
  setTitle: title =>
    set(state => ({
      exp: {
        ...state.exp,
        title: title,
      },
    })),
  setCompany: comp =>
    set(state => ({
      exp: {
        ...state.exp,
        company: comp,
      },
    })),
  setLocation: loc =>
    set(state => ({
      exp: {
        ...state.exp,
        location: loc,
      },
    })),
  setStartDate: date =>
    set(state => ({
      exp: {
        ...state.exp,
        startDate: date,
      },
    })),
  setEndDate: date =>
    set(state => ({
      exp: {
        ...state.exp,
        endDate: date,
      },
    })),
  clear: () =>
    set(state => ({
      exp: {
        ...state.exp,
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
      },
    })),
}));

const Experience = props => {
  const {isVisible, setIsVisible} = useModalStore();
  const {err, errMsg, setErr, setErrMsg} = useErrorStore();
  const {
    exp,
    setTitle,
    setCompany,
    setLocation,
    setStartDate,
    setEndDate,
    clear,
  } = useExpStore();
  const userExperiences = storage.getString('user.experience')
    ? JSON.parse(storage.getString('user.experience'))
    : [];

  const expInputFields = [
    {title: 'Title', value: exp.title, setter: setTitle},
    {title: 'Company', value: exp.company, setter: setCompany},
    {title: 'Location', value: exp.location, setter: setLocation},
  ];

  const dateFields = [
    {title: 'Start Date', value: exp.startDate, setter: setStartDate},
    {title: 'End Date', value: exp.endDate, setter: setEndDate},
  ];

  const onExpSave = () => {
    if (
      !exp.title ||
      !exp.company ||
      !exp.startDate ||
      !exp.endDate ||
      !exp.location
    ) {
      setErr(true);
      setErrMsg(
        'You are missing a required field. Please make sure all fields are set before continuing.',
      );
      return false;
    } else if (!areValidDates(exp.startDate, exp.endDate)) {
      setErr(true);
      setErrMsg('Dates are invalid. Start date must come before end date');
      return false;
    }

    setErr(false);
    setErrMsg('');

    userExperiences.push(exp);
    storage.set('user.experience', JSON.stringify(userExperiences));

    clear();
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
        {'Experience'}
      </Text>
      {userExperiences &&
        userExperiences.map((experience, idx) => (
          <>
            <View style={styles.compBlock} key={idx}>
              <Image
                style={styles.compImg}
                source={require('../../assets/comp-logo.png')}
              />
              <View>
                <Text
                  variant="titleMedium"
                  style={{fontFamily: 'Georgia-Italic', fontWeight: 'bold'}}>
                  {experience.title}
                </Text>
                <Text
                  variant="titleSmall"
                  style={{fontFamily: 'Georgia-Italic'}}>
                  {experience.company}
                </Text>
                <Text
                  variant="titleSmall"
                  style={{
                    fontFamily: 'Georgia-Italic',
                    color: colors.GRAY_TXT,
                  }}>
                  {formatDate(experience.startDate) +
                    ' - ' +
                    formatDate(experience.endDate)}
                </Text>
                <Text
                  variant="titleSmall"
                  style={{
                    fontFamily: 'Georgia-Italic',
                    color: colors.GRAY_TXT,
                  }}>
                  {experience.location}
                </Text>
              </View>
            </View>
            {idx < userExperiences.length - 1 && <View style={styles.hr} />}
          </>
        ))}
      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        title="Add Experience"
        inputs={expInputFields}
        dateInputs={dateFields}
        onSave={onExpSave}
        err={err}
        errMsg={errMsg}
        icon="plus"
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
  compImg: {
    width: 50,
    height: 50,
    marginRight: '2%',
  },
  compBlock: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  hr: {
    flex: 1,
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: '3%',
  },
});

export default Experience;
