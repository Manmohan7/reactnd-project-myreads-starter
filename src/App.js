import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './Search'
import Dashboard from './Dashboard'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    allBooks: [],
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
      .then((allBooks) => {
        this.setState(() => ({
          allBooks
        }))
      })
  }

  updateShelf = (book, newShelf) => {
    let updatedBooks = this.state.allBooks.map((b) => {
      if (b.id === book.id) {
        b.shelf = newShelf
      }
      return b
    })

    this.setState(() => ({
      allBooks: updatedBooks
    }))

    BooksAPI.update(book, newShelf)
  }

  addToShelf = (newBook, shelf) => {
    let allBooks = this.state.allBooks,
      index = allBooks.findIndex(book => book.id === newBook.id);

    if(index > -1) {
      allBooks[index].shelf = shelf;
    } else {
      newBook.shelf = shelf;
      allBooks.push(newBook)
    }

    this.setState(() => ({
      allBooks
    }))

    BooksAPI.update(newBook, shelf)
  }

  render() {
    const { allBooks, shelves } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Dashboard
            allBooks={allBooks}
            shelves={shelves}
            updateShelf={(book, shelf) => this.updateShelf(book, shelf)}
          />
        )} />

        <Route path="/search" render={() => (
          <Search
            allBooks={allBooks}
            addToShelf={(book, shelf) => this.addToShelf(book, shelf)}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
