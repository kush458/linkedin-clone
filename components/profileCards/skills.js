/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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

const useErrorStore = create(set => ({
  err: false,
  errMsg: '',
  setErr: val => set(state => ({err: val})),
  setErrMsg: msg => set(state => ({errMsg: msg})),
}));

const useSkillStore = create(set => ({
  skill: '',
  setSkill: skill => set(state => ({skill: skill})),
  clear: () => set(state => ({skill: ''})),
}));

const Skills = props => {
  const {isVisible, setIsVisible} = useModalStore();
  const {err, errMsg, setErr, setErrMsg} = useErrorStore();
  const {skill, setSkill, clear} = useSkillStore();
  const userSkills = storage.getString('user.skills')
    ? JSON.parse(storage.getString('user.skills'))
    : [];

  const skillInputFields = [{title: 'Skill', value: skill, setter: setSkill}];

  const onSkillSave = () => {
    if (!skill) {
      setErr(true);
      setErrMsg(
        'You are missing a required field. Please make sure all fields are set before continuing.',
      );
      return false;
    }

    setErr(false);
    setErrMsg('');

    userSkills.push(skill);
    storage.set('user.skills', JSON.stringify(userSkills));

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
        {'Skills'}
      </Text>
      {userSkills &&
        userSkills.map((skill, idx) => (
          <>
            <View style={styles.compBlock} key={idx}>
              <Text
                key={idx + '**'}
                variant="titleMedium"
                style={{fontFamily: 'Georgia-Italic', fontWeight: 'bold'}}>
                {skill}
              </Text>
            </View>
            {idx < userSkills.length - 1 && (
              <View key={idx + '*'} style={styles.hr} />
            )}
          </>
        ))}
      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        title="Add Skill"
        inputs={skillInputFields}
        onSave={onSkillSave}
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
    paddingTop: '2%',
    paddingBottom: '2.5%',
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
    paddingLeft: '2%',
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

export default Skills;
