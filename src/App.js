import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import BooksShelf from "./BooksShelf";
import Search from "./Search";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log(books);
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  <BooksShelf 
                    shelf="Currently Reading"
                    books={this.state.books.filter( book => book.schelf === 'currentlyReading')}
                  />
                  <BooksShelf 
                    shelf="Want to Read"
                    books={this.state.books.filter( book => book.schelf === 'wantToRead')}
                  />
                  <BooksShelf 
                    shelf="Read"
                    books={this.state.books.filter( book => book.schelf === 'read')}
                  />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
          )}
        />
        <Route path="/search" render={({ history }) => <Search />} />
      </div>
    );
  }
}

export default BooksApp;
