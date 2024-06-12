import express from "express";
import {PORT,uri} from "./config.js"
import {Book} from "./models/bookModel.js"
import mongoose from "mongoose"



const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    console.log(res);
    return res.status(234).send("anything")
})

// Route for Save a new Book
app.post('/books',async(request,response)=>{
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

//Route for Get All Books from database
app.get('/books', async (request,response)=>{
  try{
    const books = await Book.find({});

    return response.status(200).json({
      count: books.lenght
    });
  } catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message})
  }
})
//Route for Get Book from database by id
app.get('/books/:id', async (request,response)=>{
  try{
    const {id}= request.params;
    const books = await Book.findById(id);

    return response.status(200).json({
      books
    });
  } catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message})
  }
})

// update book by id
app.put("/books/:id",async(request,response)=>{
  try {
    if (
      !request.body.title || !request.body.author || !request.body.publishYear
    ) {
      return response.status(400).send({message:'Send all required fields: title, author, publishYear'})
    }
    const {id} = request.params
    const result = await Book.findByAndUpdate(id, request.body);
    if(!request){
      return response.status(404).json({message:'Book not found'})
    }
    return response.status(200).send({message: 'Book updated succ'})
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message:error.message})
  }
})

//delete book form store
app.delete("/books/:id",async(request,response)=>{
  try {
    const {id}= request.params
    const resulte = await Book.findByAndDelete(id)

    if(!resulte){
      return response.status(200).send({
        message: 'Book delete successfully'
      })
    }
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message:error.message})
  }
})




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