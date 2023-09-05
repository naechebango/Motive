import { TouchableOpacity, Image, View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BottomTabIcons } from '../components/universal/BottomTabs'
import BottomTabs from '../components/universal/BottomTabs'
import ProfHeader from '../components/profile/ProfHeader'
import { collection, collectionGroup, doc, getDocs, onSnapshot, query, where } from '@firebase/firestore'
import { auth, db } from '../firebase'
import ProfPosts from '../components/profile/ProfPosts'

const ProfileScreen = ({navigation}) => {

  const [userInfo, setUserInfo] = useState([]);
  const [postInfo, setPostInfo] = useState([]);
  
  const usersCollectionRef = collection(db, 'users');
  const userRef = doc(usersCollectionRef, auth.currentUser.uid);
  
  const postCollectionRef = collectionGroup(db, 'posts');
  const userPostsRef = query(postCollectionRef, where('owner_uid', '==', auth.currentUser.uid));
  
  useEffect(() => {
    onSnapshot(userRef, (snap) => {
      setUserInfo(snap.data())
      // console.log("Current data: ", snap.data());
    });
    onSnapshot(userPostsRef, (snap) => {
      setPostInfo(snap.docs.map(post => (
        {id: post.id, ...post.data()}
      )))
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ProfHeader userInfo={userInfo}/>
      {postInfo.map((postInfo, index) => (
          <ProfPosts postInfo={postInfo} key={index}/>
        ))}
      <BottomTabs navigation={navigation} icons={BottomTabIcons} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
  backgroundColor: '#082032',
  flex: 1,
},

headerContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginHorizontal: 7,
  marginVertical: 10,
},

headerText: {
  color: 'white',
  fontWeight: '700',
  fontSize: 22,
  marginRight: 25,
}
});

export default ProfileScreen