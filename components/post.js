/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import colors from '../utils/colors';
import {Text} from 'react-native-paper';
import {getTimeDiff} from '../utils/helpers';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Like from './like';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CreateComment from './createComment';
import CommentView from './commentView';

const Post = props => {
  const [commentsCollapsed, setCommentsCollapsed] = useState(true);

  return (
    <View style={styles.container} key={props.postData.postId}>
      <View style={styles.postHeader}>
        <Image
          style={styles.profileImg}
          source={require('../assets/default-profile.png')}
        />
        <View>
          <Text
            variant="titleMedium"
            style={{fontFamily: 'Georgia-Italic', fontWeight: 'bold'}}>
            {props.postData.userFirstName} {props.postData.userLastName}
          </Text>
          <Text variant="labelMedium" style={{fontFamily: 'Georgia-Italic'}}>
            {props.postData.userHeadline}
          </Text>
          <Text
            variant="labelMedium"
            style={{fontFamily: 'Georgia-Italic', marginTop: '1%'}}>
            {getTimeDiff(props.postData.postTime)}
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text
          variant="titleSmall"
          style={{
            fontFamily: 'Georgia-Italic',
            marginVertical: '3%',
            marginHorizontal: '3.5%',
          }}>
          {props.postData.postContent}
        </Text>
        {props.postData.postImage && (
          <View style={styles.contentImg}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri: props.postData.postImage}}
            />
          </View>
        )}
        <View style={styles.statusContainer}>
          <View style={{flexDirection: 'row'}}>
            <Like />
            <Text
              variant="labelMedium"
              style={{
                fontFamily: 'Georgia-Italic',
                color: colors.GRAY_TXT,
                marginLeft: 2.5,
              }}>
              {props.postData.numLikes}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setCommentsCollapsed(!commentsCollapsed)}>
            <Text
              variant="labelMedium"
              style={{
                fontFamily: 'Georgia-Italic',
                color: colors.GRAY_TXT,
              }}>
              {props.postData.comments.length} {'comments'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', paddingHorizontal: '3%'}}>
          <View style={styles.hr} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => props.onLike(props.postData.postId)}>
            <AntIcon name="like2" size={18} color="rgba(255, 255, 255, 0.6)" />
            <Text
              variant="labelMedium"
              style={{
                fontFamily: 'Georgia-Italic',
                fontWeight: 'bold',
                color: 'rgba(255, 255, 255, 0.6)',
              }}>
              {'Like'}
            </Text>
          </TouchableOpacity>
          <CreateComment
            postId={props.postData.postId}
            setComment={props.onComment}
          />
        </View>
      </View>
      <CommentView
        isCollapsed={commentsCollapsed}
        comments={props.postData.comments}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.GRAY,
    marginBottom: '2.5%',
    flexGrow: 1,
  },
  contentContainer: {
    width: '100%',
    marginBottom: '2%',
  },
  postHeader: {
    flex: 1,
    width: '100%',
    paddingHorizontal: '3%',
    paddingTop: '2%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: '2%',
  },
  contentImg: {
    width: '100%',
    maxHeight: 200,
  },
  statusContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '3.5%',
    paddingHorizontal: '3.5%',
  },
  hr: {
    flex: 1,
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: '1%',
    justifyContent: 'space-evenly',
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Post;
