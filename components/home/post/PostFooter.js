//components/Post/PostHeader.js
import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
// import styles from './styles';
import {auth} from '../../../firebase';

const PostFooter = ({handleGoing, post, openCommentSheet}) => {
  const Going = ({post}) => (
    <View
      style={{
        // borderWidth: 1,
        borderColor: 'white',
        position: 'absolute',
        // right: 8,
        left: 56,
        top: 12,
      }}>
      <Text style={{color: 'white', fontWeight: '600', marginTop: 3}}>
        {/* {post.users_going.length.toLocaleString('en') > 999
          ? '999+'
          : post.users_going.length.toLocaleString('en')} */}
        2
      </Text>
    </View>
  );
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.allFooterIcon}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => handleGoing(post)}>
            <Image
              style={
                post.users_going.includes(auth.currentUser.uid)
                  ? styles.footerIconActive
                  : styles.footerIcon
              }
              source={require('../../../assets/icons/check.png')}></Image>
          </TouchableOpacity>
          <Going post={post} />
        </View>
        <TouchableOpacity
          onPress={() => {
            openCommentSheet(post.post_id);
          }}>
          <Image
            style={styles.footerIcon}
            source={require('../../../assets/icons/comment.png')}></Image>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.footerIcon}
            source={require('../../../assets/icons/share.png')}></Image>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.footerIcon}
            source={require('../../../assets/icons/cross.png')}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  allFooterIcon: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  footerIconActive: {
    tintColor: 'white',
    width: 27,
    height: 27,
    marginHorizontal: 35,
    marginTop: 5,
    resizeMode: 'contain',
  },
  footerIcon: {
    tintColor: '#B93A21',
    width: 27,
    height: 27,
    marginHorizontal: 35,
    marginTop: 5,
    resizeMode: 'contain',
  },
});
export default PostFooter;
