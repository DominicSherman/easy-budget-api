import admin = require('firebase-admin');
const config = require('config');

admin.initializeApp({
    credential: admin.credential.cert(require('../../service-account')),
    databaseURL: 'https://easy-budget-2f9aa.firebaseio.com'
});
const db = admin.firestore();

export const setFirestoreData = (doc: string, col2: string, doc2: string, data: any): Promise<FirebaseFirestore.WriteResult> =>
    db.collection(config.get('rootPath'))
        .doc(doc)
        .collection(col2)
        .doc(doc2)
        .set(data);

export const getFirestoreData = (userId: string, collectionName: string): Promise<FirebaseFirestore.QuerySnapshot> =>
    db.collection(config.get('rootPath'))
        .doc(userId)
        .collection(collectionName)
        .get();
