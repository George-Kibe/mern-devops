export type UserType ={
    id: string
    username: string
    image?: string
    name: string
}

export type TweetType = {
    id: string
    user: UserType,
    content: string
    createdAt: string
    image?: string
    numberOfComments?: number
    numberOfRetweets?: number
    numberOfLikes?: number
    impressions?: number
}
