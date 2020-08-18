import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfChanger from './ShelfChanger';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {
    const { book, updateShelf } = this.props
    const title = book.title ? book.title : 'Title not available',
      authors = book.authors ? book.authors : [],
      shelf = book.shelf ? book.shelf : 'none',
      imageURL = (book.imageLinks && book.imageLinks.smallThumbnail)
        ? book.imageLinks.smallThumbnail
        : '';

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${imageURL})` }}
          />

          <ShelfChanger
            currentShelf={shelf}
            updateShelf={(newShelf) => updateShelf(newShelf)}
          />
        </div>

        <div className="book-title">{title}</div>

        {authors.map((author) => (
          <div key={author} className="book-authors">{author}</div>
        ))}
      </div>
    )
  }
}

export default Book