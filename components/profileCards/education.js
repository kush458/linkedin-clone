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

const useEdStore = create(set => ({
  edu: {
    school: '',
    degree: '',
    startDate: '',
    endDate: '',
  },
  setSchool: school =>
    set(state => ({
      edu: {
        ...state.edu,
        school: school,
      },
    })),
  setDegree: deg =>
    set(state => ({
      edu: {
        ...state.edu,
        degree: deg,
      },
    })),
  setStartDate: date =>
    set(state => ({
      edu: {
        ...state.edu,
        startDate: date,
      },
    })),
  setEndDate: date =>
    set(state => ({
      edu: {
        ...state.edu,
        endDate: date,
      },
    })),
  clear: () =>
    set(state => ({
      edu: {
        ...state.edu,
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
      },
    })),
}));

const Education = props => {
  const {isVisible, setIsVisible} = useModalStore();
  const {err, errMsg, setErr, setErrMsg} = useErrorStore();
  const {edu, setSchool, setDegree, setStartDate, setEndDate, clear} =
    useEdStore();
  const userEdHistory = storage.getString('user.education')
    ? JSON.parse(storage.getString('user.education'))
    : [];

  const eduInputFields = [
    {title: 'School', value: edu.school, setter: setSchool},
    {title: 'Degree', value: edu.degree, setter: setDegree},
  ];

  const dateFields = [
    {title: 'Start Date', value: edu.startDate, setter: setStartDate},
    {title: 'End Date', value: edu.endDate, setter: setEndDate},
  ];

  const onEdSave = () => {
    if (!edu.school || !edu.startDate || !edu.endDate) {
      setErr(true);
      setErrMsg(
        'You are missing a required field. Please make sure all fields are set before continuing.',
      );
      return false;
    } else if (!areValidDates(edu.startDate, edu.endDate)) {
      setErr(true);
      setErrMsg('Dates are invalid. Start date must come before end date');
      return false;
    }

    setErr(false);
    setErrMsg('');

    userEdHistory.push(edu);
    storage.set('user.education', JSON.stringify(userEdHistory));

    clear(); // clear fields for subsequent additions
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
        {'Education'}
      </Text>
      {userEdHistory &&
        userEdHistory.map((education, idx) => (
          <>
            <View style={styles.compBlock} key={idx}>
              <Image
                style={styles.compImg}
                source={require('../../assets/school-logo.png')}
              />
              <View>
                <Text
                  variant="titleMedium"
                  style={{fontFamily: 'Georgia-Italic', fontWeight: 'bold'}}>
                  {education.school}
                </Text>
                {education.degree && (
                  <Text
                    variant="titleSmall"
                    style={{fontFamily: 'Georgia-Italic'}}>
                    {education.degree}
                  </Text>
                )}
                <Text
                  variant="titleSmall"
                  style={{
                    fontFamily: 'Georgia-Italic',
                    color: colors.GRAY_TXT,
                  }}>
                  {formatDate(education.startDate) +
                    ' - ' +
                    formatDate(education.endDate)}
                </Text>
              </View>
            </View>
            {idx < userEdHistory.length - 1 && <View style={styles.hr} />}
          </>
        ))}
      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        title="Add Education"
        inputs={eduInputFields}
        dateInputs={dateFields}
        onSave={onEdSave}
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

export default Education;
