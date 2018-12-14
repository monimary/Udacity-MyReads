import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import sortBy from "sort-by";
import escapeRegExp from 'escape-string-regexp';
import { Debounce } from "react-throttle";
import * as BooksAPI from "./BooksAPI";
import Book from './Book'


class Search extends Component {
  state = {
    query: '',
    showingBooks: [],
    onShelfChange: this.props.onShelfChange
  };

  updateQuery = (query) => {
    console.log(query);
    if(query) {
      BooksAPI.search(query)
        .then((books) => {
          if(books.length > 0) {
            books.forEach((book) => {
              if(!book.shelf) {
                book.shelf = 'none';
              }
            })
            this.setState(
              {
                query: query.trim(),
                showingBooks: books
              }
            )
          }
          else {
            this.setState(
              {
                query: query.slice(0, -1),
                showingBooks: []
              }
            )
            alert('No books matching the query :(')
          }
        })
    }
    else {
      this.setState(
        {
          query: '',
          showingBooks: []
        }
      )
    }
  }

  render() {
    const { query } = this.state;
    const { books } = this.props;

    let showingBooks;

    if (query) {
      showingBooks = this.state.showingBooks
    } else {
      showingBooks = [];
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search"></Link>
          <div className="search-books-input-wrapper">
            <Debounce time='1000' handler="onChange">
              <input type="text" placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
              />
            </Debounce>
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
