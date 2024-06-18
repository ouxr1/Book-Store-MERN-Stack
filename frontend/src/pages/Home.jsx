import React from 'react'
import axios from 'axois'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox,MdOutlineDelete } from 'react-icons/md'

function Home() {

    const [books, setBooks]=useState([]);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        const fetchBooks = async ()=>{
            try{
                const response = await axios.get('http://localhost:5000/api/books');
                setBooks(response.data);
                setLoading(false);
            } catch (error){
                console.error(error);
                setLoading(false)
            }
        }

        fetchBooks();
    },[]);
    if(loading){
        return <Spinner/>
    }
  return (
    <div>
        <h1>Books List</h1>
        <Link to='/add-book'>
            <button>
                <MdOutlineAddBox/> Add Book
            </button>
        </Link>

        <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Publish Year: {book.publishYear}</p>
            <Link to={`/edit-book/${book._id}`}>
              <button>
                <AiOutlineEdit /> Edit
              </button>
            </Link>
            <button onClick={() => handleDelete(book._id)}>
              <MdOutlineDelete /> Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
  async function handleDelete(id){
    try{
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        setBooks(books.filter((book) => book._id !== id));
        }catch(error){
            console.error(error);
    }

  }



}

export default Home