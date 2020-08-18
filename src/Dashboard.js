import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI'

class Dashboard extends Component {
  state = {
    books: [],
    shelves: [{
      title: 'Currently Reading',
      label: 'currentlyReading'
    }, {
      title: 'Want to Read',
      label: 'wantToRead',
    }, {
      title: 'Read',
      label: 'read'
    }]
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  updateShelf = (book, newShelf) => {
    let books = this.state.books.map((b)=> {
      if(b.id === book.id) {
        b.shelf = newShelf
      }
      return b
    })

    this.setState(() => ({
      books
    }))

    BooksAPI.update(book, newShelf)
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>

            {this.state.shelves.map((shelf) => (
              <BookShelf
                key={shelf.label}
                title={shelf.title}
                shelf={shelf.label}
                books={this.state.books}
                updateShelf={(book, newShelf) => this.updateShelf(book, newShelf)}
              />
            ))}

          </div>
        </div>

        <Link to="/search" className="open-search">
          <button>Add a book</button>
        </Link>

      </div>
    )
  }
}

export default Dashboard