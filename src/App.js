import { useState } from "react";
import firebaseApp from "./firebase/credentials";
import Home from "./screens/Home";
import Login from "./screens/Login";
import "./styles/App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  const getRol = async (uid) => {
    const docRef = doc(firestore, `users/${uid}`);
    const docuCifrada = await getDoc(docRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  };

  const setUserWithFirebaseAndRol = (userFirebase) => {
    getRol(userFirebase.uid).then((rol) => {
      const userData = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log(userData);
    });
  };

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (!user) {
        setUserWithFirebaseAndRol(userFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return <>{user ? <Home user={user} /> : <Login />}</>;
}

export default App;
