import { StyleSheet, View, FlatList, Pressable, Text } from 'react-native';
import Tweet from '../../../components/Tweet';
// import tweets from '../../../assets/data/tweets';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { listTweets } from '../../../libs/apis/tweets';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native';

export default function FeedScreen() {
  const {data, isLoading, error} = useQuery({
    queryKey: ["tweets"],
    queryFn: listTweets
  })
  // const [tweets, setTweets] = useState([]);

  // const fetchTweets = async() => {
  //   const data = await listTweets();
  //   setTweets(data)
  // }

  // useEffect(() => {
  //   fetchTweets()
  // }, [])
  if(isLoading){
    return <ActivityIndicator />
  };
  if (error){
    return <Text>{error.message}</Text>
  }  
  return (
    <View style={styles.page}>
      <FlatList
        data={data}
        renderItem={({item}) => <Tweet tweet={item}/>}
        inverted
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
