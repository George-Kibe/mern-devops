import { PropsWithChildren, createContext, useContext } from "react";
import { API_URL } from "./config";
import { useAuthentication } from "../../context/AuthContext";

const TweetsApiContext = createContext({});

const TweetsApiContextProvider = ({children}: PropsWithChildren) => {
  const {authToken, updateAuthToken} = useAuthentication()
  // console.log("Auth token inside API Provider: ", authToken)
  const listTweets = async() => {
    if(!authToken){return};
    const response = await fetch(`${API_URL}/tweet`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    if (response.status === 401){
      updateAuthToken("")
      throw new Error("Access is not authorised!")  
      }
    if (response.status !== 200){
      throw new Error("Error fetching Tweets!")
    }
    const data = await response.json();
    // console.log(data)
    return data
}

const getTweet = async(id:string) => {
  if(!authToken){return};
  const response = await fetch(`${API_URL}/tweet/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  if (response.status === 401){
      updateAuthToken("")
      throw new Error("Access is not authorised!")
    }
  if (response.status !== 200){
    throw new Error("Error fetching Tweet!")
  }
  const data = await response.json();
  return data
}

const createTweet = async(data: {content: string}) => {
  if(!authToken){return};
  const response = await fetch(`${API_URL}/tweet/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
  if (response.status === 401){
      updateAuthToken("")
      throw new Error("Access is not authorised!")
    }
  if (response.status !== 201){
    throw new Error("Error creating Tweet!")
  }
  const newTweetData = await response.json();
  return newTweetData
}
  return(
    <TweetsApiContext.Provider value={{
      listTweets,
      getTweet,
      createTweet,
    }}> 
      {children}
    </TweetsApiContext.Provider>
  )
}

export default TweetsApiContextProvider;
export  const  useTweetsAPI = () => useContext(TweetsApiContext);