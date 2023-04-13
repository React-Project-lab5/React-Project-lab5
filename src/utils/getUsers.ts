/* eslint-disable no-unused-vars */
import { Card } from '@/@recoil/usersState';
import {
  DocumentData,
  getDocs,
  Query,
  QueryDocumentSnapshot,
} from '@firebase/firestore';

export const getUsers = async (
  userCollection: Query<DocumentData>,
  cards: (valOrUpdater: Card[] | ((currVal: Card[]) => Card[])) => void
) => {
  await getDocs(userCollection).then((data) => {
    cards(
      data.docs.map((doc: QueryDocumentSnapshot) => ({
        ...doc.data(),
        id: doc.id,
      })) as Card[]
    );
  });
};
