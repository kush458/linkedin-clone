/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Modal, View, StyleSheet, TouchableOpacity} from 'react-native';
import {create} from 'zustand';
import colors from '../utils/colors';
import {IconButton, Text, TextInput} from 'react-native-paper';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import {storage} from '../utils/storage';

const useErrorStore = create(set => ({
  err: false,
  errMsg: '',
  setErr: val => set(state => ({err: val})),
  setErrMsg: msg => set(state => ({errMsg: msg})),
}));

const useCommentStore = create(set => ({
  commentContent: '',
  setCommentContent: content => set(state => ({commentContent: content})),
  clear: () => set(state => ({commentContent: ''})),
}));

const CreateComment = props => {
  const [isVisible, setIsVisible] = useState(false);
  const {err, errMsg, setErr, setErrMsg} = useErrorStore();
  const {commentContent, setCommentContent, clear} = useCommentStore();
  const userIntro = JSON.parse(storage.getString('user.intro'));

  const onComment = () => {
    if (!commentContent) {
      setErr(true);
      setErrMsg('Cannot create an empty comment.');
      return false;
    }

    let comment = {
      userFirstName: userIntro.firstName,
      userLastName: userIntro.lastName,
      userHeadline: userIntro.headline,
      commentContent: commentContent,
    };

    props.setComment(props.postId, comment);

    setErr(false);
    setErrMsg('');
    clear();

    return true;
  };
  return (
    <View key={props.postId}>
      <Modal visible={isVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <IconButton
              icon="close"
              iconColor="white"
              size={25}
              onPress={() => {
                setIsVisible(false);
              }}
            />
            <Text
              variant="headlineSmall"
              style={{
                fontFamily: 'Georgia-Italic',
                fontWeight: 'condensedBold',
              }}>
              {'Create Comment'}
            </Text>
          </View>
          <ScrollView
            style={{width: '100%', marginTop: '5%', paddingHorizontal: '5%'}}
            contentContainerStyle={{alignItems: 'center'}}>
            <TextInput
              mode="outlined"
              label="Your comment"
              multiline={true}
              style={styles.input}
              value={commentContent}
              error={err}
              activeOutlineColor="white"
              onChangeText={txt => setCommentContent(txt)}
            />
            {err ? (
              <Text variant="titleSmall" style={{color: 'rgb(255, 180, 171)'}}>
                {errMsg}
              </Text>
            ) : (
              <></>
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                if (onComment()) {
                  setIsVisible(false);
                }
              }}>
              <Text
                variant="titleMedium"
                style={{color: colors.GRAY, fontSize: 19}}>
                Comment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => setIsVisible(true)}>
        <FaIcon
          name="commenting-o"
          size={18}
          color="rgba(255, 255, 255, 0.6)"
        />
        <Text
          variant="labelMedium"
          style={{
            fontFamily: 'Georgia-Italic',
            fontWeight: 'bold',
            color: 'rgba(255, 255, 255, 0.6)',
          }}>
          {'Comment'}
        </Text>
      </TouchableOpacity>
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
    minHeight: 200,
  },
  saveButton: {
    backgroundColor: colors.LIGHT_BLUE,
    width: '100%',
    height: '100%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateComment;
