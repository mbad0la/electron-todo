import React from 'react'
import styles from './App.css'
import {ipcRenderer} from 'electron'

class NotesWrapper extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      notes: []
    }

    this.newNoteContentBuffer = ''
    this.newNoteTitleBuffer = ''
    this.addToNotes = this.addToNotes.bind(this)
    this.updateContentBuffer = this.updateContentBuffer.bind(this)
    this.updateTitleBuffer = this.updateTitleBuffer.bind(this)
  }

  addToNotes() {
    if (this.newNoteTitleBuffer != '' && this.newNoteContentBuffer != '') {

      let args = {
        title: this.newNoteTitleBuffer,
        content: this.newNoteContentBuffer
      }

      ipcRenderer.send('insert', args)
    }
  }

  updateContentBuffer(event) {
    this.newNoteContentBuffer = event.target.innerHTML
  }

  updateTitleBuffer(event) {
    this.newNoteTitleBuffer = event.target.innerHTML
  }

  componentWillMount() {
    ipcRenderer.on('update-app', (event, args) => {
      this.setState({notes: args})
    })
    ipcRenderer.send('read')
  }

  render() {
    return (
      <div>
        <div className={styles.view}>
          <div className={styles.note}>
            <div className={styles.noteHead}>
              <div className={styles.new} onClick={this.addToNotes}>&#043;</div>
            </div>
            <div
              className={styles.noteTitle}
              contentEditable
              suppressContentEditableWarning
              placeholder="Heading"
              onInput={this.updateTitleBuffer}>
            </div>
            <div
              className={styles.noteContent}
              contentEditable
              suppressContentEditableWarning
              placeholder="Content"
              onInput={this.updateContentBuffer}>
            </div>
            <div className={styles.noteFoot}>
            </div>
          </div>
        </div>
        <div className={styles.wrapView}>
          {this.state.notes.map((note, i) => <Note key={i} data={note} />)}
        </div>
      </div>
    )
  }

}

class Note extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.note}>
        <div className={styles.noteHead}>
          <div className={styles.delete}>&#10060;</div>
        </div>
        <div className={styles.noteTitle}>
          {this.props.data.title}
        </div>
        <div className={styles.noteContent}>
          {this.props.data.content}
        </div>
        <div className={styles.noteFoot}>
        </div>
      </div>
    )
  }

}

export default NotesWrapper;
