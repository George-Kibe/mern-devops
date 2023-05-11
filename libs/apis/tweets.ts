import { API_URL, authToken } from "./config";

export const listTweets = async() => {
    const response = await fetch(`${API_URL}/tweet`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    if (response.status !== 200){
      throw new Error("Error fetching the API!")
    }
    const data = await response.json();
    // console.log(data)
    return data
}