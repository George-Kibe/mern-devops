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
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// User CRUD Operations
// Create a user
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, username } = req.body;
    // console.log(email, name, username)
    try {
        const newUser = yield prisma.user.create({
            data: {
                email, name, username,
                bio: "Hello There, I'm new on Twitter"
            }
        });
        if (newUser) {
            res.status(201).json(newUser);
        }
    }
    catch (error) {
        res.status(422).json({ error: "Unprocessable Entity! Email and Username must be unique" });
        return;
    }
}));
// List users
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prisma.user.findMany();
        if (allUsers) {
            res.status(200).json(allUsers);
        }
    }
    catch (error) {
        res.status(422).json({ error: "Unprocessable Entity" });
    }
}));
// get one user
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma.user.findUnique({ where: { id: Number(id) }, include: { tweets: true } });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ error: `User of id ${id} Not Found!` });
        }
    }
    catch (error) {
        res.status(422).json({ error: "Unprocessable Entity!" });
    }
}));
// update one user
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, bio, image } = req.body;
    // console.log(email, name, username)
    try {
        const updatedUser = yield prisma.user.update({
            where: { id: Number(id) },
            data: { name, bio, image }
        });
        if (updatedUser) {
            res.status(201).json(updatedUser);
        }
    }
    catch (error) {
        res.status(422).json({ error: "Unprocessable Entity! Email and Username must be unique" });
        return;
    }
}));
// delete one user
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.user.delete({ where: { id: Number(id) } });
        res.status(200).json({ message: `User id ${id} deleted successfully!` });
    }
    catch (error) {
        res.status(404).json({ message: `User id ${id} Not Deleted or Not Found!` });
        return;
    }
}));
exports.default = router;
