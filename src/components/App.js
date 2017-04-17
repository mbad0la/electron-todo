import React from 'react';
import styles from './App.css';

class NotesWrapper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      buffer: '',
      notes: []
    }
    this.newNoteBuffer = ''
    this.addToNotes = this.addToNotes.bind(this)
    this.updateBuffer = this.updateBuffer.bind(this)
  }

  addToNotes() {
    console.log(this.newNoteBuffer)
  }

  updateBuffer(event) {
    this.newNoteBuffer = event.target.innerHTML
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
            placeholder="Jot down ..."
            onInput={this.updateBuffer}>
          </div>
          <div className={styles.noteFoot}>
          </div>
        </div>
      </div>
    )
  }

}

export default NotesWrapper;
