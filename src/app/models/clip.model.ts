import firebase from 'firebase/compat/app';

export default interface Clip {
  docID?: string;
  uid: string;
  title: string;
  displayName: string;
  fileName: string;
  url: string;
  timestamp:firebase.firestore.FieldValue
}
