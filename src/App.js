import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import BooksShelves from "./BooksShelves";
import Search from "./Search";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BooksShelves />} />
        <Route
          path="/search"
          render={({ history }) => (
            <Search />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
