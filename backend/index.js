import express from "express";
import {PORT,uri} from "./config.js"
import bookRoutes from "./Routes/BooksRoutes.js"
import mongoose from "mongoose"

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders:['Content-Type']
}
))



const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
  console.log(res);
  return res.status(234).send("anything")
})

app.use('/books',bookRoutes)


// Connect to MongoDB and Start the Server
mongoose.connect(uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });