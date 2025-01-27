import {
  collection,
  getDocs,
  orderBy,
  limit,
  query,
  doc,
  runTransaction,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

async function addHighscore(name, score) {
  const highscoresRef = collection(db, "highscores");

  try {
    // Query 10 highest scores
    const q = query(highscoresRef, orderBy("score", "desc"), limit(10));
    const snapshot = await getDocs(q);

    let scores = [];
    snapshot.forEach((doc) => {
      scores.push({ id: doc.id, ...doc.data() });
    });

    await runTransaction(db, async (transaction) => {
      // Check if the score is higher than the lowest score in the top 10
      if (scores.length < 10 || score > scores[scores.length - 1].score) {
        // Add new score
        const newDocRef = doc(highscoresRef);
        transaction.set(newDocRef, { name, score });

        // Remove lowest score if there are 10 scores
        if (scores.length >= 10) {
          const lowestScore = scores[scores.length - 1];
          const lowestDocRef = doc(highscoresRef, lowestScore.id);
          transaction.delete(lowestDocRef);
        }
      } else {
        console.log("Score not high enough to be added");
      }
    });
  } catch (error) {
    console.error("Error adding score: ", error);
  }
}

async function getHighscores() {
  const highcoresRef = collection(db, "highscores");

  // Query 10 highest scores
  const q = query(highcoresRef, orderBy("score", "desc"), limit(10));
  const snapshot = await getDocs(q);

  let scores = [];
  snapshot.forEach((doc) => {
    scores.push({ id: doc.id, ...doc.data() });
  });

  return scores;
}

export { addHighscore, getHighscores };
