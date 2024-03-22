import React, { useState } from 'react';
import { GetBooks } from '../../models/BookModel';
import { CalendarPageDefault } from '../../views/calendar_page/Default';

export function CalendarPageDefaultController() {
  const events = GetBooks(1234);
  const [books] = useState(events);

  return <CalendarPageDefault books={books} />;
}
