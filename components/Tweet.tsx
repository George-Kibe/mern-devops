import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Tweet = ({tweet}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: tweet.user.image}} style={styles.image}/>
      <View style={styles.tweetContainer}>
        <Text style={styles.name}>{tweet.user.name}</Text>
        <Text style={styles.content}>{tweet.content}</Text>
      </View>     
    </View>
  )
}

export default Tweet


const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 10,
      flexDirection: "row",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: "lightgray"
    },
    image: {
      width:50,
      height:50,
      borderRadius:25
    },
    tweetContainer: {
      marginLeft: 5,
      flex: 1
    },
    name: {
      fontWeight: "600"
    },
    content: {
      lineHeight: 20,
      marginTop: 5
    }
  });
  