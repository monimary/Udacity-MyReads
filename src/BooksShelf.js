import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = ({shelf, books, onShelfChange}) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ shelf }</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map( book => (
                        <li key={ book.id }>
                            <Book 
                                book={ book }
                                onShelfChange={ onShelfChange }
                                image={book.imageLinks ? book.imageLinks.thumbnail : "https://via.placeholder.com/128x193"}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

BookShelf.propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default BookShelf
