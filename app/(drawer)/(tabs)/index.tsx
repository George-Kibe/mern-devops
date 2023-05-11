import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import Tweet from '../../../components/Tweet';
// import tweets from '../../../assets/data/tweets';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { listTweets } from '../../../libs/apis/tweets';

export default function FeedScreen() {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async() => {
    const data = await listTweets();
    setTweets(data)
  }

  useEffect(() => {
    fetchTweets()
  }, [])
  
  return (
    <View style={styles.page}>
      <FlatList
        data={tweets}
        renderItem={({item}) => <Tweet tweet={item}/>}
      />
      <Link href={"/NewTweet"} asChild>
        <Entypo name="plus" size={25} color="black" style={styles.floatingButton} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1
  },
  floatingButton: {
    backgroundColor: "#1C9BF0",
    width: 50,
    height: 50,
    position: "absolute",
    right: 15,
    bottom: 15,
    borderRadius: 25,
    textAlign: "center",
    lineHeight: 50
  }
});
