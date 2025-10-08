import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { TweetType } from '../types'
import { Entypo, EvilIcons } from '@expo/vector-icons';
import IconButton from './IconButton';

type TweetProps = {
    tweet: TweetType
}

const Tweet = ({tweet}: TweetProps) => {
  return (
    <Link href={`/tweet/${tweet.id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{uri: tweet.user.image}} style={styles.image}/>
        <View style={styles.tweetContainer}>
          <View style={{flexDirection: "row"}}>
            <Text style={styles.name}>{tweet.user.name}</Text>
            <Text style={styles.username}>@{tweet.user.username} •{tweet.createdAt} </Text>
            <Entypo name="dots-three-horizontal" size={20} color="gray" style={{marginLeft:"auto"}} />
          </View>
          <Text style={styles.content}>{tweet.content}</Text>
          { tweet.image && <Image source={{ uri:tweet.image}} style={styles.tweetImage}/> }  
          <View style={styles.tweetIcons}>
            <IconButton icon="comment" text={tweet.numberOfComments || 0}/>
            <IconButton icon="retweet" text={tweet.numberOfRetweets  || 0}/>
            <IconButton icon="heart" text={tweet.numberOfLikes || 0}/>
            <IconButton icon="chart" text={tweet.impressions || 0}/>
            <IconButton icon="share-apple" />
          </View>      
        </View>     
      </Pressable>
    </Link>
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
    username: {
      color: "gray",
      marginLeft: 5,
    },
    content: {
      lineHeight: 20,
      marginTop: 5
    },
    tweetImage: {
        width: "100%",
        aspectRatio: 16/9,
        marginVertical: 10,
        borderRadius: 15
    },
    tweetIcons: {
        flexDirection: "row",
        marginVertical: 5,
        justifyContent: "space-between"
    }
  });
  