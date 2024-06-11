import express from "express";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();
//middlewares - allows parsing json
app.use(express.json()); // allows us to send json Data from the client side
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);


app.listen(8800, () =>{
    console.log('Server is running!')
})