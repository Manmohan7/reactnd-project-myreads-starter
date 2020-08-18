import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';

class Search extends Component {
  state = {
    query: '',
    books: []
  }

  updateBooks = (query) => {
    this.setState(() => ({
      query
    }))

    if(query !== "") {
      BooksAPI.search(query)
      .then((books) => {

        if(!(books.error)){
          this.setState(() => ({
            books: books
          }))
        }
      })
    }
  }

  updateShelf = (book, newShelf) => {
    let books = this.state.books.map((b)=> {
      if(b.id === book.id) {
        b.shelf = newShelf
      }
      return b
    })

    BooksAPI.update(book, newShelf)
    .then(() => {
        this.setState(() => ({
          books: books
        }))
    })
  }

  render() {
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
              value={this.state.query}
              onChange={(event) => this.updateBooks(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ListBooks books={this.state.books} updateShelf={(book, newShelf) => this.updateShelf(book, newShelf)} />
        </div>
      </div>
    )
  }
}

export default Search