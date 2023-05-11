import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { sendEmailToken } from "../services/emailService";

const prisma = new PrismaClient();
const router = Router();

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_DAYS = 10;
const JWT_SECRET = "SUPER SECRET";

// function to generate random 6 digit number as email token
function generateEmailToken(): string {
    return Math.floor(100000 + Math.random()*900000).toString();
}
// function to generate random 6 digit number as email token
function generateJWTAuthToken(tokenId: number): string {
    const jwtPayLoad = {tokenId}
    return jwt.sign(jwtPayLoad, JWT_SECRET, {
        algorithm: "HS256",
        noTimestamp: true
    });
}

// Login or Register 
// get or create user and generate emal token and send it to their email

router.post("/login", async(req, res) => {
    const {email} = req.body;
    if(!email){
        return res.status(422).json({error: "Unprocessable entity!"})
    }
    // generate token
    const emailToken = generateEmailToken();
    const expiration = new Date(
        new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES *60*1000
    )
    try {
        const createdToken = await prisma.token.create({
            data: {
                type: "EMAIL",
                emailToken,
                expiration,
                user: {
                    connectOrCreate: {
                        where: { email },
                        create: { email }
                    }
                }
            }
        });
        // console.log(createdToken)
        // send email to user's email
        await sendEmailToken(email, emailToken)
        return res.status(200).json({message: "Token Generated successfully!"})
    } catch (error) {
        return res.status(400).json({error: "Could not start authentication. Please try Again!"})
    }
    
})

// validate email token
// Generate a long-lived JWT Token
router.post("/authenticate", async(req, res) => {
    const {email, emailToken} = req.body;
    if(!email || !emailToken){
        res.status(422).json({error: "Unprocessable entity!"})
        return
    }
    const expiration = new Date(
        new Date().getTime() + AUTHENTICATION_EXPIRATION_DAYS *24*60*60*1000
    )
    try {
        const dbEmailToken = await prisma.token.findUnique({
            where: { emailToken },
            include: { user:true }
        })
        if(!dbEmailToken || !dbEmailToken.isValid){
            return res.sendStatus(401).json({error: "Unauthorized!"})
        }
        if(dbEmailToken.expiration < new Date()){
            return res.status(401).json({error: "Token is expired!"})
        }
        if(dbEmailToken.user.email !== email){
            return res.status(401).json({error: "Unauthorized"})
        }
        const apiToken = await prisma.token.create({
            data: {
                type: "API",
                expiration,
                user: {
                    connect: {
                        email
                    }
                }
            }
        })
        // invalidate the EMAIL Token
        await prisma.token.update({
            where: {id: dbEmailToken.id},
            data: {isValid: false}
        })
        // Generate JWT Token
        const authToken = generateJWTAuthToken(apiToken.id)

        res.status(200).json(authToken)
        // res.status(200).json(dbEmailToken)
    } catch (error) {
        return res.status(404).json({error: "Invalid Email Token Combination"})
    }
})
export default router;









