"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailService_1 = require("../services/emailService");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_DAYS = 365;
const JWT_SECRET = "SUPER SECRET";
// function to generate random 6 digit number as email token
function generateEmailToken() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
// function to generate random 6 digit number as email token
function generateJWTAuthToken(tokenId) {
    const jwtPayLoad = { tokenId };
    return jsonwebtoken_1.default.sign(jwtPayLoad, JWT_SECRET, {
        algorithm: "HS256",
        noTimestamp: true
    });
}
// Login or Register 
// get or create user and generate emal token and send it to their email
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(422).json({ error: "Unprocessable entity!" });
    }
    // generate token
    const emailToken = generateEmailToken();
    const expiration = new Date(new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000);
    try {
        const createdToken = yield prisma.token.create({
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
        yield (0, emailService_1.sendEmailToken)(email, emailToken);
        return res.status(200).json({ message: "Token Generated successfully!" });
    }
    catch (error) {
        return res.status(400).json({ error: "Could not start authentication. Please try Again!" });
    }
}));
// validate email token
// Generate a long-lived JWT Token
router.post("/authenticate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, emailToken } = req.body;
    if (!email || !emailToken) {
        return res.status(422).json({ error: "Unprocessable entity!" });
    }
    const expiration = new Date(new Date().getTime() + AUTHENTICATION_EXPIRATION_DAYS * 24 * 60 * 60 * 1000);
    try {
        const dbEmailToken = yield prisma.token.findUnique({
            where: { emailToken },
            include: { user: true }
        });
        if (!dbEmailToken || !dbEmailToken.isValid) {
            return res.status(401).json({ error: "Invalid or expired Token!" });
        }
        if (dbEmailToken.expiration < new Date()) {
            return res.status(401).json({ error: "Token is expired!" });
        }
        if (dbEmailToken.user.email !== email) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const apiToken = yield prisma.token.create({
            data: {
                type: "API",
                expiration,
                user: {
                    connect: {
                        email
                    }
                }
            }
        });
        // invalidate the EMAIL Token
        yield prisma.token.update({
            where: { id: dbEmailToken.id },
            data: { isValid: false }
        });
        // Generate JWT Token
        const authToken = generateJWTAuthToken(apiToken.id);
        res.status(200).json(authToken);
        // res.status(200).json(dbEmailToken)
    }
    catch (error) {
        return res.status(404).json({ error: "Invalid Email Token Combination" });
    }
}));
exports.default = router;
