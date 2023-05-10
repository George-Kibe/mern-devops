import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = "SUPER SECRET";

type AuthRequest = Request & {user: User}


export async function authenticateToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
){
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401)
    }
    const jwtToken = authHeader.split(' ')[1];
    if(!jwtToken){
        return res.status(401)
    }
    // console.log(jwtToken);
    // decode the jwt token 
    try {
        const payLoad = jwt.verify(jwtToken, JWT_SECRET) as {tokenId: number};
        const dbToken = await prisma.token.findUnique({
            where: {id: payLoad.tokenId},
            include: {user: true}
        })
        if(!dbToken){
            return res.sendStatus(401)
        }
        if(!dbToken.isValid || dbToken.expiration < new Date()){
            return res.status(401).json({error: "API token is invalid or expired!"})
        }
        // return res.status(200).json(dbToken.user)
        req.user = dbToken.user;
        next()
    } catch (error) {
        return res.sendStatus(401);
    }
}