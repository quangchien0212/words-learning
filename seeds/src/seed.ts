import * as admin from 'firebase-admin';

// Sample words to seed
const wordsData = [
  {
    word: 'apple',
    definitions: {
      en: 'A round fruit with red or green skin and a whitish interior.',
      es: 'Una fruta redonda con piel roja o verde y un interior blanco.',
      fr: 'Un fruit rond avec une peau rouge ou verte et un intérieur blanc.',
      de: 'Ein runder Obst mit roter oder grüner Haut und einem weißen Inneren.',
    },
    exampleSentences: {
      en: 'I ate an apple for breakfast.',
      es: 'Comí una manzana para el desayuno.',
      fr: 'J\'ai mangé une pomme au petit-déjeuner.',
      de: 'Ich habe einen Apfel zum Frühstück gegessen.',
    },
    partOfSpeech: 'noun',
    difficultyLevel: 'easy',
    pronunciation: 'https://somecdn.com/apple.mp3',
  },
  {
    word: 'banana',
    definitions: {
      en: 'A long, curved fruit with a yellow skin.',
      es: 'Una fruta larga y curva con una piel amarilla.',
      fr: 'Un fruit long et courbé avec une peau jaune.',
      de: 'Eine lange, gebogene Frucht mit gelber Haut.',
    },
    exampleSentences: {
      en: 'She peeled the banana and ate it.',
      es: 'Ella peló la banana y la comió.',
      fr: 'Elle a pelé la banane et l\'a mangée.',
      de: 'Sie schälte die Banane und aß sie.',
    },
    partOfSpeech: 'noun',
    difficultyLevel: 'easy',
    pronunciation: 'https://somecdn.com/banana.mp3',
  },
  // Add more words here...
];

async function seedFirestore(db: admin.firestore.Firestore) {
  try {
    // Loop through the words and upload them to Firestore
    for (const wordData of wordsData) {
      const wordRef = db.collection('words').doc(wordData.word);

      // Upload word data
      await wordRef.set({
        word: wordData.word,
        definitions: wordData.definitions,
        exampleSentences: wordData.exampleSentences,
        partOfSpeech: wordData.partOfSpeech,
        difficultyLevel: wordData.difficultyLevel,
        pronunciation: wordData.pronunciation,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Word "${wordData.word}" successfully added to Firestore.`);
    }
  } catch (error) {
    console.error('Error seeding Firestore:', error);
  }
}

