import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';

class Dashboard extends Component {
  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {
    const { allBooks, shelves, updateShelf } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>

            {shelves.map((shelf) => (
              <BookShelf
                key={shelf.label}
                title={shelf.title}
                shelf={shelf.label}
                books={allBooks}
                updateShelf={(book, newShelf) => updateShelf(book, newShelf)}
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