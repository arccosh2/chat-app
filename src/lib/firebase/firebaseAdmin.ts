import {
  applicationDefault,
  initializeApp,
  getApp,
  getApps,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

if (!getApps().length) {
  initializeApp({
    credential: applicationDefault(),
    storageBucket: 'chat-app-ba0be.firebasestorage.app',
  });
} else {
  getApp();
}

const db = getFirestore();
const bucket = getStorage().bucket();

export { db, bucket };
