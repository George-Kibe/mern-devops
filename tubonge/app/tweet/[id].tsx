import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React from 'react'
import Tweet from '../../components/Tweet'
import tweets from '../../assets/data/tweets'
import { useSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { useTweetsAPI } from '../../libs/apis/tweets'

export default function TweetScreen() {
  const {id} = useSearchParams();
  const {getTweet}= useTweetsAPI();
  const {data:tweet, isLoading, error} = useQuery({
    queryKey: ["tweet", id],
    queryFn: () => getTweet(id as string),
  })
  // console.warn(id)
  // const tweet = tweets.find((tw) => tw.id === id)
  if (isLoading){
    return<ActivityIndicator />
  }
  if (error){
    return<Text>Tweet {id} not Found!</Text>
  }
  return (
    <View>
      <Tweet tweet={tweet}/>
    </View>
  )
}

const styles = StyleSheet.create({})