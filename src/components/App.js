import React from 'react';
import styles from './App.css';

class NotesWrapper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'notes': []
    }
    this.addToNotes = this.addToNotes.bind(this)
  }

  addToNotes() {
    console.log('Pressed addToNotes')
  }

  render() {
    return (
      <div className={styles.view}>
        <div className={styles.note}>
          <div className={styles.noteHead}>
            <div className={styles.new} onClick={this.addToNotes}>&#043;</div>
          </div>
          <div
            className={styles.noteContent}
            contentEditable
            suppressContentEditableWarning
            placeholder="Jot down ...">
          </div>
          <div className={styles.noteFoot}>
          </div>
        </div>
      </div>
    )
  }

}

export default NotesWrapper;
