import * as admin from 'firebase-admin';
import * as path from 'path';
import { clearWordsCollection, getWordData, readFileLineByLine } from './src/helper';

// Initialize Firebase Admin SDK
const serviceAccount = path.resolve(__dirname, './serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://default.firebaseio.com',
});

// Reference to Firestore
const db = admin.firestore();
// clearWordsCollection(db)


async function main() {
  // const filePath = path.resolve(__dirname, './data/The_Oxford_3000.txt')
  // const words = await readFileLineByLine(filePath)
  const data = await getWordData('cat')
  console.log(data[0])
}

main()