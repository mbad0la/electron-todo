import React from 'react';
import styles from './App.css';

const App = () => (
  <div className={styles.app}>
    No notes to share with you!
  </div>
);

class NotesWrapper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'notes': []
    }
  }

  render() {
    if (this.state.notes.length == 0) {
      return (
        <App />
      )
    }

  }

}

export default NotesWrapper;
