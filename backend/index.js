import express, { request, response } from "express";
import {PORT,uri} from "./config.js"
import mongoose from "mongoose"


const app = express()

app.use(express.json)

app.get("/",(req,res)=>{
    console.log(res);
    return res.status(234).send()
})

// Route for Save a new Book
app.post('/books',async(req,res)=>{
    try{ 
        if(
            
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
    ){
        return response.status(400).send({
            message:'Send all required fields: title,author , publishYear',
        })
    }
    const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
    }

    const book = await Book.create(newBook)

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})

mongoose.connect(uri)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`App is listening to port:${PORT}`)
    })
    
})
.catch(()=>{
 console.error();
})
