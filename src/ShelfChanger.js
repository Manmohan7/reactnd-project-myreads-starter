import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ShelfChanger extends Component {
  static propTypes = {
    currentShelf: PropTypes.string.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {
    const { currentShelf, updateShelf } = this.props

    return (
      <div className="book-shelf-changer">
        <select value={currentShelf} onChange={(event) => updateShelf(event.target.value)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }

}

export default ShelfChanger