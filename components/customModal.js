/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../utils/colors';
import {IconButton, Text, TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {DatePickerInput} from 'react-native-paper-dates';

const CustomModal = props => {
  return (
    <View style={{position: 'absolute', top: 0, right: 5}}>
      <Modal visible={props.isVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <IconButton
              icon="close"
              iconColor="white"
              size={25}
              onPress={() => {
                props.setIsVisible(false);
              }}
            />
            <Text
              variant="headlineSmall"
              style={{
                fontFamily: 'Georgia-Italic',
                fontWeight: 'condensedBold',
              }}>
              {props.title}
            </Text>
          </View>
          <ScrollView
            style={{width: '100%', marginTop: '5%', paddingHorizontal: '5%'}}
            contentContainerStyle={{alignItems: 'center'}}>
            {props.inputs.map((input, idx) => (
              <TextInput
                key={idx}
                mode="outlined"
                label={input.title}
                multiline={input.title === 'About'}
                style={[
                  styles.input,
                  {minHeight: input.title === 'About' ? 200 : 0},
                ]}
                value={input.value}
                error={props.err}
                activeOutlineColor="white"
                onChangeText={txt => input.setter(txt)}
              />
            ))}
            {props.dateInputs &&
              props.dateInputs.map((input, idx) => (
                <DatePickerInput
                  key={idx}
                  locale="en"
                  style={styles.input}
                  label={input.title}
                  value={input.value}
                  activeOutlineColor="white"
                  hasError={props.err}
                  presentationStyle="pageSheet"
                  animationType="fade"
                  onChange={d => input.setter(d)}
                  inputMode="start"
                  mode="outlined"
                />
              ))}
            {props.err ? (
              <Text variant="titleSmall" style={{color: 'rgb(255, 180, 171)'}}>
                {props.errMsg}
              </Text>
            ) : (
              <></>
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                if (props.onSave()) {
                  props.setIsVisible(false);
                }
              }}>
              <Text
                variant="titleMedium"
                style={{color: colors.GRAY, fontSize: 19}}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <IconButton
        icon={props.icon}
        iconColor="white"
        size={20}
        onPress={() => props.setIsVisible()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.GRAY,
    alignItems: 'flex-start',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '2%',
  },
  footer: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
    borderTopWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    backgroundColor: 'transparent',
    marginVertical: '5%',
    width: '100%',
  },
  saveButton: {
    backgroundColor: colors.LIGHT_BLUE,
    width: '100%',
    height: '100%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomModal;
