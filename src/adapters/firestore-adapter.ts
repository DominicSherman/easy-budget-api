import {getServiceAccount} from '../get-service-account';

import admin = require('firebase-admin');

const config = require('config');

let db;

export interface IWhereObject {
    field: string
    operator: '<' | '<=' | '==' | '>=' | '>' | 'array-contains'
    value: string
}

export const initializeApp = (): void => {
    admin.initializeApp({
        credential: admin.credential.cert(getServiceAccount()),
        databaseURL: 'https://easy-budget-2f9aa.firebaseio.com'
    });

    db = admin.firestore();
};

export const setFirestoreData = (doc: string, col2: string, doc2: string, data: any): Promise<FirebaseFirestore.WriteResult> =>
    db.collection(config.get('rootPath'))
        .doc(doc)
        .collection(col2)
        .doc(doc2)
        .set(data);

export const getFirestoreData = (userId: string, collectionName: string, where?: IWhereObject): Promise<FirebaseFirestore.QuerySnapshot> => {
    if (where) {
        return db.collection(config.get('rootPath'))
            .doc(userId)
            .collection(collectionName)
            .where(where.field, where.operator, where.value)
            .get();
    }

    return db.collection(config.get('rootPath'))
        .doc(userId)
        .collection(collectionName)
        .get();
};
