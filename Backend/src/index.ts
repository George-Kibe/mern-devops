import express from 'express';
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello from Nodejs Server")
});

// user routes
app.use("/user", userRoutes)
// user routes
app.use("/tweet", tweetRoutes)
// authentication routes
app.use("/auth", authRoutes)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});