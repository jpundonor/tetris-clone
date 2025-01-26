import {
  collection,
  getDocs,
  orderBy,
  limit,
  query,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

async function addHighscore(name, score) {
  const highcoresRef = collection(db, "highscores");

  // Query 10 highest scores
  const q = query(highcoresRef, orderBy("score", "desc"), limit(10));
  const snapshot = await getDocs(q);

  let scores = [];
  snapshot.forEach((doc) => {
    scores.push({ id: doc.id, ...doc.data() });
  });

  // Check if the score is higher than the lowest score in the top 10
  try {
    if (scores.length < 10 || score > scores[scores.length - 1].score) {
      // Add new score
      await addDoc(highcoresRef, { name, score });

      // Remove lowest score if there are 10 scores
      if (scores.length >= 10) {
        const lowestScore = scores[scores.length - 1];
        await deleteDoc(doc(db, "highscores", lowestScore.id));
      }
      console.log("Score added and updated correctly");
    } else {
      console.log("Score not high enough to be added");
    }
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
