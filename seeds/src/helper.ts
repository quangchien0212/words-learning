import axios from 'axios';
import * as admin from 'firebase-admin';
import fs from 'fs';
import * as readline from 'readline';

export function clearWordsCollection(db: admin.firestore.Firestore) {
  deleteCollection(db, db.collection('words'));
}

export async function deleteCollection(db: admin.firestore.Firestore, collectionRef, batchSize = 100) {
  let query = collectionRef.limit(batchSize);
  let snapshot = await query.get();

  while (!snapshot.empty) {
    const batch = db.batch();

    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Commit the batch
    await batch.commit();

    // Get the next batch of documents
    snapshot = await collectionRef
      .orderBy('__name__')
      .startAfter(snapshot.docs[snapshot.docs.length - 1])
      .limit(batchSize)
      .get();
  }
}

export async function readFileLineByLine(filePath: string) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const words: string[] = [];

  for await (const line of rl) {
    words.push(line);
  }

  return words;
}

export async function getWordData(word: string) {
  return axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(({ data }) => {
      return data
    }).catch((err) => {
      console.log(err)
    })
}
