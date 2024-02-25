import { Book } from "./Book";


// stub
const events = [
  {
    title: truncateText('CS 123, Alexandar', 14),
    start: new Date(2024, 1, 24, 15, 45),
    end: new Date(2024, 1, 24, 16, 45),
  },
  {
    title: 'CS 555, Sulu',
    start: new Date(2024, 1, 25, 17, 0),
    end: new Date(2024, 1, 25, 18, 0),
  },
  {
    title: 'CS 430, Magnet',
    start: new Date(2024, 1, 26, 17, 0),
    end: new Date(2024, 1, 26, 18, 0),
  },
];

export function GetBooks(s_id) {
  return events;
}


function truncateText(text, length) {
  if (text.length < length) {
    return text;
  }
  return text.substring(0, length);
}
