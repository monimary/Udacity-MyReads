import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelf extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onShelfChange: PropTypes.func.isRequired,
        image: PropTypes.string.isRequired
    }

    state = {
        shelfValue: this.props.book.shelf,
        onShelfChange: this.props.onShelfChange
    };

    changeShelf = e => {
        const newShelf = e.target.value;
        this.setState({
            shelfValue: newShelf
        });
        this.state.onShelfChange(this.props.book, newShelf)
    }

    render() {
        const { book, image } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${ image }")` }}></div>
                    <div className="book-shelf-changer">
                        <select value={ this.state.shelfValue } onChange={ this.changeShelf }>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
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