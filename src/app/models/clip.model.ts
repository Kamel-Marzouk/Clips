import firebase from 'firebase/compat/app';

export default interface Clip {
  uid: string;
  title: string;
  displayName: string;
  fileName: string;
  url: string;
  timestamp:firebase.firestore.FieldValue
}
