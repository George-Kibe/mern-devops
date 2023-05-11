import { API_URL, authToken } from "./config";

export const listTweets = async() => {
    const response = await fetch(`${API_URL}/tweet`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    if (response.status === 401){
        throw new Error("Access is not authorised!")
      }
    if (response.status !== 200){
      throw new Error("Error fetching Tweets!")
    }
    const data = await response.json();
    // console.log(data)
    return data
}