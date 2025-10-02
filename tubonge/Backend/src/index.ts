import express from 'express';
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import authRoutes from "./routes/authRoutes";
import { authenticateToken } from './middlewares/authMiddleware';

const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello from Nodejs Server")
});

// user routes
// @ts-ignore
app.use("/user", authenticateToken, userRoutes)
// user routes
// @ts-ignore
app.use("/tweet", authenticateToken, tweetRoutes)
// authentication routes
app.use("/auth", authRoutes)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});