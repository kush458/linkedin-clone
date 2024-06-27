/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import colors from '../utils/colors';
import Post from '../components/post';
import {storage} from '../utils/storage';
import sampleData from '../utils/data';
import CreatePost from '../components/createPost';
import {useMMKVString} from 'react-native-mmkv';

const Feed = props => {
  const [posts, setPosts] = useMMKVString('posts');

  useEffect(() => {
    setPosts(JSON.stringify(sampleData));
  }, []);

  const onLike = postId => {
    const plist = JSON.parse(posts);
    const post = plist.find(p => p.postId === postId);

    if (post) {
      post.numLikes += 1;
      setPosts(JSON.stringify(plist));
    }
  };

  const onComment = (postId, comment) => {
    const plist = JSON.parse(posts);
    const post = plist.find(p => p.postId === postId);

    if (post) {
      post.comments.unshift(comment);
      setPosts(JSON.stringify(plist));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {posts &&
          JSON.parse(posts).map((post, idx) => (
            <Post
              key={post.postId}
              postData={post}
              onLike={onLike}
              onComment={onComment}
            />
          ))}
      </ScrollView>
      <CreatePost posts={posts} setPosts={setPosts} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BLACK_BG,
    flexGrow: 1,
  },
});

export default Feed;
