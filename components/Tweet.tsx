import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TweetType } from '../types'
import { Entypo, EvilIcons } from '@expo/vector-icons';

type IconButtonProps = {
    icon: React.ComponentProps<typeof EvilIcons>["name"]
    text?: string | number
}
const IconButton = ({icon, text}: IconButtonProps) => {
    return (
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <EvilIcons name={icon} size={22} color={"gray"} />
        <Text style={{fontSize: 12}}>{text}</Text>
      </View>
    )
}

type TweetProps = {
    tweet: TweetType
}

const Tweet = ({tweet}: TweetProps) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: tweet.user.image}} style={styles.image}/>
      <View style={styles.tweetContainer}>
        <View style={{flexDirection: "row"}}>
          <Text style={styles.name}>{tweet.user.name}</Text>
          <Text style={styles.username}>@{tweet.user.username} •2mins</Text>
          <Entypo name="dots-three-horizontal" size={20} color="gray" style={{marginLeft:"auto"}} />
        </View>
        <Text style={styles.content}>{tweet.content}</Text>
        { tweet.image && <Image source={{ uri:tweet.image}} style={styles.tweetImage}/> }  
        <View style={styles.tweetIcons}>
          <IconButton icon="comment" text={tweet.numberOfComments}/>
          <IconButton icon="retweet" text={tweet.numberOfRetweets}/>
          <IconButton icon="heart" text={tweet.numberOfLikes}/>
          <IconButton icon="chart" text={tweet.impressions}/>
          <IconButton icon="share-apple" />
        </View>      
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
        marginVerical: 10,
        borderRadius: 15
    },
    tweetIcons: {
        flexDirection: "row",
        marginVertical: 5,
        justifyContent: "space-between"
    }
  });
  