import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// tweet CRUD Operations
// Create a tweet
router.post("/", async(req,res) => {
    const {content, image} = req.body;
    // @ts-ignore
    const user = req.user;
    try {
        const newTweet = await prisma.tweet.create({
            data: { content, image, userId : user.id}
        })
        if(newTweet){
            return res.status(201).json(newTweet)
        }
    } catch (error) {
        return res.status(422).json({error: "Unprocessable Entity! Tweet not created!"});
    }
});

// List tweets
router.get("/", async(req,res) => {
    try {
        const allTweets = await prisma.tweet.findMany({
            include: {user: {select:{
                id: true,
                name: true,
                username: true,
                image: true
            }}}
        });
        if(allTweets){
            return res.status(200).json(allTweets)
        }
    } catch (error) {
        return res.status(422).json({error: "Unprocessable Entity"})
    }    
});

// get one tweet by id
router.get("/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const tweet = await prisma.tweet.findUnique({where: {id: Number(id)}, include: {user: true}})
        if(tweet){
            return res.status(200).json(tweet)
        }else{
            return res.status(404).json({error: `Tweet of id ${id} Not Found!`})   
        }
    } catch (error) {
        return res.status(422).json({error: "Unprocessable Entity!"})   
    }
});

// update one tweet
router.put("/:id", async(req,res) => {
    const {id} = req.params;
    const {content, image, userId} = req.body;
    // console.log(content, image, userId)
    try {
        const updatedUser = await prisma.tweet.update({
            where: {id: Number(id)},
            data: { content, image, userId }
        })
        if(updatedUser){
            return res.status(201).json(updatedUser)
        }
    } catch (error) {
        return res.status(422).json({error: "Unprocessable Entity! Email and Username must be unique"})
    }
});

// delete one tweet
router.delete("/:id", async(req,res) => {
    const {id} = req.params;
    try {
        await prisma.tweet.delete({where: {id: Number(id)}})
        return res.status(200).json({message: `Tweet id ${id} deleted successfully!`})
    } catch (error) {
        return res.status(404).json({message: `Tweet id ${id} Not Deleted or Not Found!`});
    }  
});


export default router;