import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCu-1rgo38FlEZN1h8hMgk_W1RYTUWW3Ww',
  authDomain: 'catch-of-the-day-neil-s.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-neil-s.firebaseio.com',
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// This is a default export
export default base
