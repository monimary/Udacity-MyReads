import React from "react";
import { Route, Link } from "react-router-dom";
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
      this.setState({ books });
    });
  }

  onShelfChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;
      BooksAPI.getAll().then((updatedBooks) => {
        this.setState(state => ({
          books: state.books.concat([ updatedBooks ])
        }))
      })
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
                    books={this.state.books.filter( book => book.shelf === 'currentlyReading')}
                    onShelfChange={this.onShelfChange}
                  />
                  <BooksShelf 
                    shelf="Want to Read"
                    books={this.state.books.filter( book => book.shelf === 'wantToRead')}
                    onShelfChange={this.onShelfChange}
                  />
                  <BooksShelf 
                    shelf="Read"
                    books={this.state.books.filter( book => book.shelf === 'read')}
                    onShelfChange={this.onShelfChange}
                  />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" className="search"></Link>
            </div>
          </div>
          )}
        />
        <Route 
          path="/search"
          render={({ history }) =>
            <Search
              books={this.state.books}
              onShelfChange={this.onShelfChange}
          />}
        />
      </div>
    );
  }
}

export default BooksApp;
