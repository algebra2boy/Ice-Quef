import React, { useState } from 'react';
import { GetBooks } from '../models/BookModel';
import { HomePage } from '../views/homepage/HomePage';


export const HomePageController = () => {
  const events = GetBooks(1234);
  const[books, setBooks] = useState(events);
  
  return (
    <HomePage books={books}/>
  );
};
