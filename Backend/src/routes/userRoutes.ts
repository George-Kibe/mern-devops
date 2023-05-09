import { Router } from "express";

const router = Router();

// User CRUD Operations
// Create a user
router.post("/", (req,res) => {
    res.status(501).json({error: "Not Implemented!"});
});

// List users
router.get("/", (req,res) => {
    res.status(501).json({error: "Not implemeted"})
});

// get one user
router.get("/:id", (req,res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not implemented: ${id}`})
});

// update one user
router.put("/:id", (req,res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not implemented: ${id}`})
});

// delete one user
router.delete("/:id", (req,res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not implemented: ${id}`})
});


export default router;