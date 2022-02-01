import { getAuth, signOut } from "firebase/auth";
import React from "react";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import firebaseApp from "../firebase/credentials";
const auth = getAuth(firebaseApp);
function Home({user}) {
  return (
    <div>
      Home
      {user.rol === "admin" ? <AdminView /> : <UserView />}
      <button onClick={() => signOut(auth)}>Cerrar sesión</button>

    </div>
  );
}

export default Home;
