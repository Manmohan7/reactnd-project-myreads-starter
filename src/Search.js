import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import PropTypes from 'prop-types'

class Search extends Component {
  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    addToShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchedBooks: []
  }

  mapBookShelf = (searchedBooks) => {
    searchedBooks = searchedBooks.map((book) => {
      let bookFromShelf = this.props.allBooks.filter((b) => b.id === book.id)
      bookFromShelf.length
      ? book.shelf = bookFromShelf[0].shelf
      : book.shelf = 'none'

      return book
    })

    this.setState(() => ({
      searchedBooks
    }))
  }

  updateBooks = (query) => {
    this.setState(() => ({
      query
    }))

    if(query !== "") {
      BooksAPI.search(query)
      .then((books) => {

        if(!(books.error)){
          this.mapBookShelf(books)
        }
      })
    }
  }

  render() {
    const { addToShelf } = this.props
    const { searchedBooks, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateBooks(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ListBooks books={searchedBooks} updateShelf={(book, newShelf) => addToShelf(book, newShelf)} />
        </div>
      </div>
    )
  }
}

export default Search