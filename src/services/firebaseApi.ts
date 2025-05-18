import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://apptimeguard-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const fetchUserData = (callback: (data: any) => void) => {
  const userRef = ref(database, "users/user123");
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    callback(data || {});
  });
};