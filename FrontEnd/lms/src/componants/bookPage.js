import React, { useState, useEffect } from 'react';
import './css/bookPage.css'; 
import searchIcon from './css/search.webp';

function FunctionalComBook() {
    // State to store the list of books and the current search term
    const [books, setBooks] = useState([]); // Holds the books retrieved from the server
    const [searchTerm, setSearchTerm] = useState(''); // Stores the current text in the search input

    // useEffect to fetch books data when the component mounts
    useEffect(() => {
        fetch('http://localhost:4000/books') // Fetching the list of books from the server
            .then(response => response.json()) // Converting the response to JSON type   (prasing ........)
            .then(data => setBooks(data)) // Updating the books state with the fetched data    (prasing ........)
            .catch(error => console.error('Error fetching books:', error)); // Handling any errors during fetch
    }, []); // Runs this effect only once, when the component mounts thats why we use empty array in end of the use effect

    // Function to handle changes in the search input
    const handleSearch = (event) => {
        setSearchTerm(event.target.value); // Updates the search term state with the input value
    };

    // Filtering books based on the current search term
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
    return (
        <div className="books">
            <h1>List of Books Available</h1>
            <div className="search-bar">
                <img src={searchIcon} alt="Search Icon" className="search-icon" />
                <input
                    type="text"
                    placeholder="Search by book title"
                    value={searchTerm}
                    onChange={handleSearch} // Calls handleSearch function when input changes it will pass to event and data to set function
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Copies</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping through filteredBooks to render each book in a row  it will map zero to end  of the given arry or list*/}
                    {filteredBooks.map((book, index) => (
                        <tr key={book._id}>
                            <td>{index + 1}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.copies}</td>
                            <td>{book.status}</td>
                            <td>
                                <button>Select</button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FunctionalComBook;
