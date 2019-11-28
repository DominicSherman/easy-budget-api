import * as admin from 'firebase-admin';

import {getServiceAccount} from '../get-service-account';

const config = require('config');

let db;

export interface IWhereObject {
    field: string
    operator: '<' | '<=' | '==' | '>=' | '>' | 'array-contains'
    value: string
}

export const initializeApp = (): void => {
    const serviceAccount = getServiceAccount();

    if (serviceAccount) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://easy-budget-2f9aa.firebaseio.com'
        });
    } else {
        admin.initializeApp();
    }

    db = admin.firestore();
};

export const setFirestoreData = (userId: string, collectionName: string, collectionId: string, data: any): Promise<FirebaseFirestore.WriteResult> =>
    db.collection(config.get('rootPath'))
        .doc(userId)
        .collection(collectionName)
        .doc(collectionId)
        .set(data, {merge: true});

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

export const deleteFirestoreData = (userId: string, collectionName: string, collectionId: string): Promise<FirebaseFirestore.WriteResult> =>
    db.collection(config.get('rootPath'))
        .doc(userId)
        .collection(collectionName)
        .doc(collectionId)
        .delete();
