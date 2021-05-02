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

  mapBookShelf = (query, searchedBooks) => {
    searchedBooks = searchedBooks.map((book) => {
      let bookFromShelf = this.props.allBooks.filter((b) => b.id === book.id)
      bookFromShelf.length
        ? book.shelf = bookFromShelf[0].shelf
        : book.shelf = 'none'

      return book
    })

    if (this.state.query === query) {
      this.setState(() => ({
        searchedBooks
      }))
    }
  }

  updateBooks = (query) => {
    this.setState(() => ({
      query
    }))

    /**
     * NOTE: Race condition handled
     * by passing an empty promise
     */

    let newBooks = query === ""
      ? Promise.resolve([])
      : BooksAPI.search(query)

    newBooks.then((books) => {
      if (books.error) {
        books = []
      }

      this.mapBookShelf(query, books)
    })

    /**
     * NOTE: Another solution is to not call search API
     * and simply pass empty array to ListBooks
     */
    /*
    if (query !== "") {
      BooksAPI.search
        .then((books) => {
          if (books.error) {
            books = []
          }

          this.mapBookShelf(query, books)
        })
    }
    */

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
          {
            query === ""
              ? (<p className="search-books-initial-msg">Start searching by typing above</p>)
              : searchedBooks.length
                ? <ListBooks books={searchedBooks} updateShelf={(book, newShelf) => addToShelf(book, newShelf)} />
                : (<p className="no-books-msg">No books found!</p>)
          }
        </div>
      </div>
    )
  }
}

export default Search