import React from 'react'
import styles from './App.module.scss'
import Timer from '../../components/Timer/Timer'

const App = () => (
  <div className={styles.app}>
    <p>
      Hello, stranger. <strong>Welcome to Timee.</strong>
    </p>
    <Timer />
  </div>
)

export default App
