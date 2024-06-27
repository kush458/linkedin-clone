/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {create} from 'zustand';
import colors from '../utils/colors';
import {FAB, Icon, IconButton, Text, TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {storage} from '../utils/storage';
import uuid from 'react-native-uuid';
import {launchImageLibrary} from 'react-native-image-picker';

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

const usePostStore = create(set => ({
  postContent: '',
  postImgUri: '',
  setPostContent: content => set(state => ({postContent: content})),
  setPostImgUri: uri => set(state => ({postImgUri: uri})),
  clear: () => set(state => ({postContent: '', postImgUri: ''})),
}));

const CreatePost = props => {
  const {isVisible, setIsVisible} = useModalStore();
  const {err, errMsg, setErr, setErrMsg} = useErrorStore();
  const {postContent, postImgUri, setPostContent, setPostImgUri, clear} =
    usePostStore();
  const userIntro = JSON.parse(storage.getString('user.intro'));

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

  const onPost = () => {
    if (!postContent) {
      setErr(true);
      setErrMsg('Cannot create a post with empty content.');
      return false;
    }

    let postTime = new Date().toISOString();

    let post = {
      postId: uuid.v4(),
      userFirstName: userIntro.firstName,
      userLastName: userIntro.lastName,
      userHeadline: userIntro.headline,
      postTime: postTime,
      postContent: postContent,
      postImage: postImgUri,
      numLikes: 0,
      comments: [],
    };

    let posts = JSON.parse(props.posts);
    // console.log('curr post ------ ', post);

    posts.unshift(post);
    props.setPosts(JSON.stringify(posts));

    setErr(false);
    setErrMsg('');
    clear();

    return true;
  };
  return (
    <View style={styles.modalPosition}>
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
              {'Create Post'}
            </Text>
          </View>
          <ScrollView
            style={{width: '100%', marginTop: '5%', paddingHorizontal: '5%'}}
            contentContainerStyle={{alignItems: 'flex-start'}}>
            <TextInput
              mode="outlined"
              label="Your content"
              multiline={true}
              style={styles.input}
              value={postContent}
              error={err}
              activeOutlineColor="white"
              onChangeText={txt => setPostContent(txt)}
            />
            <TouchableOpacity
              onPress={() => pickImage(setPostImgUri)}
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: '2%',
              }}>
              <Icon source="image" color={colors.GRAY_TXT} size={20} />
              <Text
                variant="labelLarge"
                style={{
                  fontFamily: 'Georgia-Italic',
                  color: colors.GRAY_TXT,
                  marginLeft: '2%',
                }}>
                {'Add Image'}
              </Text>
            </TouchableOpacity>
            {postImgUri && (
              <View style={styles.contentImg}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={{uri: postImgUri}}
                />
              </View>
            )}
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
                if (onPost()) {
                  setIsVisible(false);
                }
              }}>
              <Text
                variant="titleMedium"
                style={{color: colors.GRAY, fontSize: 19}}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FAB
        icon="plus"
        style={styles.postButton}
        color={colors.LIGHT_BLUE}
        mode="elevated"
        onPress={() => setIsVisible(true)}
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
  modalPosition: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
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
    marginVertical: '2%',
    width: '100%',
    minHeight: 300,
  },
  saveButton: {
    backgroundColor: colors.LIGHT_BLUE,
    width: '100%',
    height: '100%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButton: {
    backgroundColor: '#38434f',
  },
  contentImg: {
    marginTop: '3%',
    width: '100%',
    maxHeight: 200,
  },
});

export default CreatePost;
