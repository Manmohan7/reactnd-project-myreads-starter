import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
  }

  render() {
    let { title, shelf, books, updateShelf } = this.props

    // filter all books according to shelf
    books = books.filter((book) => {
      return book.shelf === shelf
    })

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <ListBooks books={books} updateShelf={(book, newShelf) => updateShelf(book, newShelf)} />
      </div>
    )
  }
}

export default BookShelf