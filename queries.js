// use  plp_bookstore
db.books.insertMany([
    {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 2013,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 2016,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 2011,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
])
// 1️ Find all books in a specific genre (e.g., "Fiction")
db.books.find({ genre: "Fiction" });


// 2️ Find books published after a certain year (e.g., year > 2000)
db.books.find({ published_year: { $gt: 2000 } });


// 3️ Find all books by a specific author (e.g., "George Orwell")
db.books.find({ author: "George Orwell" });


// 4️ Update the price of a specific book (e.g., change price of "The Hobbit" to 16.99)
db.books.updateOne(
  { title: "The Hobbit" },         // Filter by book title
  { $set: { price: 16.99 } }       // Set new price value
);


// 5️ Delete a book by its title (e.g., remove "Moby Dick")
db.books.deleteOne({ title: "Moby Dick" });

// 6️ Find all books that are in stock and published after 2010, returning only title, author, and price
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    // Projection: only return selected fields
    title: 1,
    author: 1,
    price: 1,
    _id: 0  // Exclude _id field for cleaner output (optional)
  }
);

// 7️ Sort all books by price in ascending and descending order, returning only title, author, and price
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).sort({ price: 1 });

db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).sort({ price: -1 });

// 8️ Paginate the results to show only the first 5 books, returning title, author, and price
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).skip(0).limit(5);

db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).skip(5).limit(5);

// 9️ Count the total number of books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$genre",               // Group by genre
      average_price: { $avg: "$price" }  // Calculate average price
    }
  }
]);

// 10️ Find the author with the most books in the collection

db.books.aggregate([
  {
    $group: {
      _id: "$author",             // Group by author
      book_count: { $sum: 1 }     // Count number of books
    }
  },
  { $sort: { book_count: -1 } },  // Sort descending
  { $limit: 1 }                   // Return only top author
]);

// 11️ Find the decade with the most books published, returning the decade and count
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

// 12️ Create an index on the title field to improve search performance
db.books.createIndex({ title: 1 }); // Ascending index on title

// 13️ Create a compound index on author and published_year to optimize queries that filter by both fields
db.books.createIndex({ author: 1, published_year: -1 }); // Mixed order compound index

// 14️ Explain the execution plan for a query to find a specific book by title (e.g., "1984")
db.books.find({ title: "1984" }).explain("executionStats");

// 15️ Use a hint to force the use of the index created on the title field for the same query
db.books.find({ title: "1984" }).hint({ title: 1 }).explain("executionStats");
