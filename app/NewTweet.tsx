import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTweetsAPI } from '../libs/apis/tweets'

const user = {
    id: 'u1',
    username: 'Vadim Savin',
    name: 'Vadim',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
  }

export default function NewTweet() {
  const [text, setText] = useState("");
  const router = useRouter();
  const {createTweet}: any = useTweetsAPI();

  const queryClient = useQueryClient()
  const {mutateAsync, isLoading, isError, error, isSuccess} = useMutation({
    mutationFn: createTweet,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["tweets"]})
      // queryClient.setQueriesData(['tweets'], (existingTweets) => {
      //   return [data, ...existingTweets]
      // })
    }
  });

  const saveTweet = async() => {
    if(text.length < 5 ){return}
    // console.warn("Sending tweet", text)
    try {
      await mutateAsync({content: text})
      setText("")
      router.back()
    } catch (error) {
      console.log(error)
    }    
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor: "white"}}>
      <View style={styles.container}> 
        <View style={styles.buttonContainer}>
            <Link href="../" style={{fontSize:20}}>Cancel</Link>
            {isLoading && <ActivityIndicator />}
            <TouchableOpacity onPress={saveTweet} style={styles.button}>
              <Text style={styles.buttonText}>Tweet</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
            <Image source={{uri:user.image}} style={styles.image}/>
            <TextInput
              placeholder="What's on your mind?"
              multiline
              numberOfLines={5}
              textAlignVertical='top'
              style={{flex:1}}
              value={text}              onChangeText={tx => setText(tx)}
            />
        </View>

        {isError && <Text>Error: {error.message}</Text>}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1
    },
    buttonContainer: {
      flexDirection: "row",
      marginVertical: 10,
      justifyContent: "space-between",
      alignItems: "center",
    },
    button: {
      backgroundColor: "#1C9BF0",
      padding: 10,
      paddingHorizontal: 20,
      borderRadius: 50,
    },
    buttonText: {
      color: "white",
      fontWeight: "600",
      fontSize: 16
    },
    inputContainer: {
      flexDirection: "row",
    },
    image: {
      width: 50,
      height: 50,
      marginRight: 10
    }
})