import React from 'react';
import {Routes,Route} from 'react-router-dom';
import createBooks from './pages/createBooks'
import deleteBooks from './pages/deleteBooks'
import editBook from './pages/editBook'
import showBook from './pages/showBook'
import Home from './pages/Home'


function App() {
  return (
    <Routes>
      <Route path='/books/create' element={<createBook/>}/>
      <Route path='/books/delete/:id' element={<deleteBooks/>}/>
      <Route path='/books/edit/:id' element={<editBook />}/>
      <Route path='/books/details/:id' element={<showBook />}/>
      <Route path='/' element={<Home />}/>
    </Routes>
  )
}

export default App