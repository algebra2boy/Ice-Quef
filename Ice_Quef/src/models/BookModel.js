import { Book } from '../dataclass/Book';

// stub
const books = [
  new Book(
    truncateText('CS 123, Alexandar'),
    new Date(2024, 1, 24, 15, 45),
    new Date(2024, 1, 24, 16, 45),
  ),
  new Book(
    truncateText('CS 555, Sulu'),
    new Date(2024, 1, 25, 17, 0),
    new Date(2024, 1, 25, 18, 0),
  ),
  new Book(
    truncateText('CS 430, Magnet'),
    new Date(2024, 1, 26, 17, 0),
    new Date(2024, 1, 26, 18, 0),
  ),
];

export function GetBooks(s_id) {
  return books;
}

function truncateText(text, length = 14) {
  if (text.length < length) {
    return text;
  }
  return text.substring(0, length);
}
