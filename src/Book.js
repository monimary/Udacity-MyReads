import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';

class BookShelf extends Component {
    state = {
        shelfValue: this.props.book.shelf
    };

    render() {
        const { book } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${ book.imageLinks.thumbnail }")` }}></div>
                    <div className="book-shelf-changer">
                        <select value={ this.state.shelfValue } onChange={ this.props.onShelfChange }>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading" className="mark-option ">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{ book.title }</div>
                <div className="book-authors">{ book.authors }</div>
            </div>
        )
    }

}

export default BookShelf