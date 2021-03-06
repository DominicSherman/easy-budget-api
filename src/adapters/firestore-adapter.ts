import * as admin from 'firebase-admin';

import {getServiceAccount} from '../get-service-account';

const tsConfig = require('node-config-ts');

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
    db.collection(tsConfig.config.rootPath)
        .doc(userId)
        .collection(collectionName)
        .doc(collectionId)
        .set(data, {merge: true});

export const deleteFirestoreData = (userId: string, collectionName: string, collectionId: string): Promise<FirebaseFirestore.WriteResult> =>
    db.collection(tsConfig.config.rootPath)
        .doc(userId)
        .collection(collectionName)
        .doc(collectionId)
        .delete();

export const getFirestoreData = (userId: string, collectionName: string, where?: IWhereObject): Promise<FirebaseFirestore.QuerySnapshot> => {
    if (where) {
        return db.collection(tsConfig.config.rootPath)
            .doc(userId)
            .collection(collectionName)
            .where(where.field, where.operator, where.value)
            .get();
    }

    return db.collection(tsConfig.config.rootPath)
        .doc(userId)
        .collection(collectionName)
        .get();
};
