import React, { useState } from 'react';
import { GetBooks } from '../../models/BookModel';
import { HomePageDefault } from '../../views/calendar_page/Default';

export function HomePageDefaultController() {
  const events = GetBooks(1234);
  const [books] = useState(events);

  return <HomePageDefault books={books} />;
}
