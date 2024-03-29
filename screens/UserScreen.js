import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import UserHeader from '../components/profile/UserHeader';
import {
  collectionGroup,
  getCountFromServer,
  onSnapshot,
  orderBy,
  query,
  where,
} from '@firebase/firestore';
import {db} from '../firebase';
import UserPosts from '../components/profile/UserPosts';
import UserInfo from '../components/profile/UserInfo';
import {FlatList} from 'react-native-gesture-handler';

const UserScreen = ({route, navigation}) => {
  const [userInfo, setUserInfo] = useState(route.params?.info);
  const [posts, setPostInfo] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const numColumns = 3;

  const userUID = userInfo.owner_uid;
  const postsRef = collectionGroup(db, 'posts');
  const orderPostsRef = query(postsRef, orderBy('created_at', 'desc'));
  const userPostsRef = query(orderPostsRef, where('owner_uid', '==', userUID));

  const getUserDetails = async () => {
    const updatedUserData = {
      ...userInfo,
      postCount: await getNumPosts(),
    };
    setUserInfo(updatedUserData);
    setLoading(false); // Mark loading as false once user data is loaded
  };

  const getNumPosts = async () => {
    const postsSnap = await getCountFromServer(userPostsRef);
    const numOfPosts = postsSnap.data().count;
    console.log(numOfPosts);
    return numOfPosts;
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserDetails();
    };

    fetchData();

    const unsubscribe = onSnapshot(userPostsRef, snap => {
      setPostInfo(snap.docs.map(post => ({id: post.id, ...post.data()})));
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        // Placeholder while loading user info
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loadingText}>Loading user data...</Text>
        </View>
      ) : (
        <>
          <UserHeader navigation={navigation} userInfo={userInfo} />
          <UserInfo userInfo={userInfo} />
          <FlatList
            contentContainerStyle={{}}
            style={styles.postContainer}
            key={numColumns}
            numColumns={numColumns}
            data={posts}
            renderItem={({item}) => <UserPosts post={item} />}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#082032',
    flex: 1,
  },

  postContainer: {
    margin: 5,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    color: 'white',
  },
});

export default UserScreen;
