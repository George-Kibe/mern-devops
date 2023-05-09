import { Router } from "express";

const router = Router();

// tweet CRUD Operations
// Create a tweet
router.post("/", (req,res) => {
    res.status(501).json({error: "Not Implemented!"});
});

// List tweets
router.get("/", (req,res) => {
    res.status(501).json({error: "Not implemeted"})
});

// get one tweet
router.get("/:id", (req,res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not implemented: ${id}`})
});

// update one tweet
router.put("/:id", (req,res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not implemented: ${id}`})
});

// delete one tweet
router.delete("/:id", (req,res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not implemented: ${id}`})
});


export default router;