import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useAuthentication } from '../../context/AuthContext';

const Profile = () => {
  const {updateAuthToken} = useAuthentication();
  const logout = () => {
    updateAuthToken("")
  }
  return (
    <View>
      <Text>Profile</Text>
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})