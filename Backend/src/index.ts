import express from 'express';
const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello from Nodejs Server")
});

// User CRUD Operations
// Create a user
app.post("/user", (req,res) => {
    res.status(501).json({error: "Not Implemented!"});
})

// List users
app.get("/user", (req,res) => {
    res.status(501).json({error: "Not implemeted"})
})

// get one user
app.get("/user/:id", (req,res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not implemented: ${id}`})
})

// update one user
app.put("/user/:id", (req,res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not implemented: ${id}`})
})

// delete one user
app.delete("/user/:id", (req,res) => {
    const {id} = req.params;
    res.status(501).json({error: `Not implemented: ${id}`})
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});