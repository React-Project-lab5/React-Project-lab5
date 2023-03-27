import { app } from '../app';
import { getFirestore } from '@firebase/firestore';

export const db = getFirestore(app);
