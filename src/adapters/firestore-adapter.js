import admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export const setFirestoreData = (col, doc, col2, doc2, data) =>
    db.collection(col)
        .doc(doc)
        .collection(col2)
        .doc(doc2)
        .set(data);

export const getFirestoreData = (userId, collectionName) =>
    db.collection('users')
        .doc(userId)
        .collection(collectionName)
        .get();