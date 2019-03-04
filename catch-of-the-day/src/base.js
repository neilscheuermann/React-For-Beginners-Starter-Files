import Rebase from 're-base'
import firebase from 'firebase'
import firebaseConfig from './secrets'

const firebaseApp = firebase.initializeApp(firebaseConfig)

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// This is a default export
export default base
