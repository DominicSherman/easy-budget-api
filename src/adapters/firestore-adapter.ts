import * as admin from 'firebase-admin';
import 'firebase-functions';

const config = require('config');

let db;

export interface IWhereObject {
    field: string
    operator: '<' | '<=' | '==' | '>=' | '>' | 'array-contains'
    value: string
}

export const initializeApp = (): void => {
    admin.initializeApp();

    db = admin.firestore();
};

export const setFirestoreData = (userId: string, collectionName: string, collectionId: string, data: any): Promise<FirebaseFirestore.WriteResult> =>
    db.collection(config.get('rootPath'))
        .doc(userId)
        .collection(collectionName)
        .doc(collectionId)
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
