import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { handleCelebration } from './utils/pushbanner.js';
import { initializeApp } from 'firebase-admin/app';

initializeApp();

export const onTaskUpdated = onDocumentUpdated({ document: 'todos/{taskId}' }, (event) => {
    handleCelebration(event);
    console.log('pass');
});
