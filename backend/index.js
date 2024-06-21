import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/BookModel.js";
import BooksRoute from "./routes/BooksRoute.js";
import cors from "cors";

const app = express();

// Middleware to parse request body as JSON
app.use(express.json());

// Middleware to enable all origin CORS
app.use(cors());

// Middleware to enable custom origin CORS
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// testing main route
app.get("/", (req, res) => {
  console.log(req);
  res.status(200).send("Hello World");
});

app.use("/books", BooksRoute);

// connect to mongoDB
mongoose
  .connect(mongoDBURL)
  .then((result) => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Connected to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
