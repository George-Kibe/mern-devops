import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Tweet from '../../components/Tweet'
import tweets from '../../assets/data/tweets'
import { useSearchParams } from 'expo-router'

export default function TweetScreen() {
  const {id} = useSearchParams();
  // console.warn(id)
  const tweet = tweets.find((tw) => tw.id === id)
  if (!tweet){
    return<Text>Tweet {id} not Found!</Text>
  }
  return (
    <View>
      <Tweet tweet={tweet}/>
    </View>
  )
}

const styles = StyleSheet.create({})