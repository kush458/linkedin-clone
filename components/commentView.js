/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import colors from '../utils/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';

const CommentView = props => {
  return (
    <Collapsible collapsed={props.isCollapsed}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: '3%', flexGrow: 1}}>
          {props.comments &&
            props.comments.map((comment, idx) => (
              <View style={styles.commentContainer} key={idx}>
                <Image
                  style={styles.profileImg}
                  source={require('../assets/default-profile.png')}
                />
                <View style={styles.comment}>
                  <Text
                    variant="titleSmall"
                    style={{fontFamily: 'Georgia-Italic', fontWeight: 'bold'}}>
                    {comment.userFirstName} {comment.userLastName}
                  </Text>
                  <Text
                    variant="labelSmall"
                    style={{fontFamily: 'Georgia-Italic'}}>
                    {comment.userHeadline}
                  </Text>
                  <Text
                    variant="titleSmall"
                    style={{
                      fontFamily: 'Georgia-Italic',
                      marginVertical: '3%',
                    }}>
                    {comment.commentContent}
                  </Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </Collapsible>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.GRAY,
    flexGrow: 1,
    maxHeight: 300,
  },
  commentContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: '2%',
  },
  profileImg: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginRight: '2%',
  },
  comment: {
    backgroundColor: '#293138',
    padding: '2%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 1,
  },
});

export default CommentView;
