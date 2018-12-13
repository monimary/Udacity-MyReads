import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import sortBy from "sort-by";
import escapeRegExp from 'escape-string-regexp';
import * as BooksAPI from "./BooksAPI";
import Book from './Book'


class Search extends Component {
  state = {
    query: '',
    showingBooks: []
  };

  updateQuery = (query) => {
    if(query) {
      BooksAPI.search(query).then((books) => {
        this.setState(
          {
            query: query.trim(),
            showingBooks: books
          }
        )
      })
    }
  }

  render() {
    const { query } = this.state;
    const { books } = this.props;
    let showingBooks;

    console.log(books);
    if (query) {
      showingBooks = this.state.showingBooks
    } else {
      showingBooks = [];
    }

    console.log(showingBooks)

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search"></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
            value={this.state.query} 
            onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {showingBooks.map((book) => (
            <li key={book.id} className='contact-list-item'>
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
    );
  }
}

export default Search
