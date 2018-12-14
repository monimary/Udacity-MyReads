import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
    static propTypes = {
        shelf: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }

    state = {
        shelfValue: this.props.shelf,
        onShelfChange: this.props.onShelfChange
    };

    render() {
        const { shelf, books } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{ shelf }</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map( book => (
                        <li key={ book.id }>
                        <Book 
                            book={ book }
                            onShelfChange={ this.props.onShelfChange }
                            image={book.imageLinks ? book.imageLinks.thumbnail : "https://via.placeholder.com/128x193"}
                        />
                        </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

}

export default BookShelf
