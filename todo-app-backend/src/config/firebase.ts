import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({
    credential: applicationDefault(),
    projectId: 'todo-app-backend-api-server',
});

const db = getFirestore();

export default db;
