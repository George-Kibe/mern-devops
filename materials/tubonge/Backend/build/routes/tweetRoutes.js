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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
// tweet CRUD Operations
// Create a tweet
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, image } = req.body;
    // @ts-ignore
    const user = req.user;
    try {
        const newTweet = yield prisma.tweet.create({
            data: { content, image, userId: user.id },
            include: { user: true },
        });
        if (newTweet) {
            return res.status(201).json(newTweet);
        }
    }
    catch (error) {
        return res.status(422).json({ error: "Unprocessable Entity! Tweet not created!" });
    }
}));
// List tweets
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTweets = yield prisma.tweet.findMany({
            include: { user: { select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true
                    } } }
        });
        if (allTweets) {
            return res.status(200).json(allTweets);
        }
    }
    catch (error) {
        return res.status(422).json({ error: "Unprocessable Entity" });
    }
}));
// get one tweet by id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tweet = yield prisma.tweet.findUnique({ where: { id: Number(id) }, include: { user: true } });
        if (tweet) {
            return res.status(200).json(tweet);
        }
        else {
            return res.status(404).json({ error: `Tweet of id ${id} Not Found!` });
        }
    }
    catch (error) {
        return res.status(422).json({ error: "Unprocessable Entity!" });
    }
}));
// update one tweet
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { content, image, userId } = req.body;
    // console.log(content, image, userId)
    try {
        const updatedUser = yield prisma.tweet.update({
            where: { id: Number(id) },
            data: { content, image, userId }
        });
        if (updatedUser) {
            return res.status(201).json(updatedUser);
        }
    }
    catch (error) {
        return res.status(422).json({ error: "Unprocessable Entity! Email and Username must be unique" });
    }
}));
// delete one tweet
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.tweet.delete({ where: { id: Number(id) } });
        return res.status(200).json({ message: `Tweet id ${id} deleted successfully!` });
    }
    catch (error) {
        return res.status(404).json({ message: `Tweet id ${id} Not Deleted or Not Found!` });
    }
}));
exports.default = router;
