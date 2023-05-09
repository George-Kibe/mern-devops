import { Router } from "express";
import {PrismaClient} from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// User CRUD Operations
// Create a user
router.post("/", async(req,res) => {
    const {email, name, username} = req.body;
    // console.log(email, name, username)
    try {
        const newUser = await prisma.user.create({
            data: {
                email, name, username,
                bio: "Hello There, I'm new on Twitter"
            }
        })
        if(newUser){
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(422).json({error: "Unprocessable Entity! Email and Username must be unique"});
        return;
    }
});

// List users
router.get("/", async(req,res) => {
    try {
        const allUsers = await prisma.user.findMany();
        if(allUsers){
            res.status(200).json(allUsers)
        }
    } catch (error) {
        res.status(422).json({error: "Unprocessable Entity"})
    }    
});

// get one user
router.get("/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const user = await prisma.user.findUnique({where: {id: Number(id)}, include: {tweets: true}})
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({error: `User of id ${id} Not Found!`})   
        }
    } catch (error) {
        res.status(422).json({error: "Unprocessable Entity!"})   
    }
});

// update one user
router.put("/:id", async(req,res) => {
    const {id} = req.params;
    const {name, bio, image} = req.body;
    // console.log(email, name, username)
    try {
        const updatedUser = await prisma.user.update({
            where: {id: Number(id)},
            data: { name, bio, image }
        })
        if(updatedUser){
            res.status(201).json(updatedUser)
        }
    } catch (error) {
        res.status(422).json({error: "Unprocessable Entity! Email and Username must be unique"});
        return;
    }
});

// delete one user
router.delete("/:id", async(req,res) => {
    const {id} = req.params;
    try {
        await prisma.user.delete({where: {id: Number(id)}})
        res.status(200).json({message: `User id ${id} deleted successfully!`})
    } catch (error) {
        res.status(404).json({message: `User id ${id} Not Deleted or Not Found!`});
        return
    }    
});


export default router;