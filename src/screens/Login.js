import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import firebaseApp from "../firebase/credentials";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function Login() {

  const [isRegister, setIsRegister] = useState(false);

  const userRegister = async (email, password, rol) => {
    const infoUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userFirebase) => {
      return userFirebase;
    });
    console.log(infoUser);
     const docuRef = doc(firestore, `users/${infoUser.user.uid}`);
     setDoc(docuRef, {email: email, rol: rol});
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

    if (isRegister) {
      userRegister(email, password, rol);
    } else {
      signInWithEmailAndPassword(auth, email, password)
    }
  };

  return (
    <div>
      <h1>{isRegister ? "Registrate" : "Inicia sesión"}</h1>
      <form onSubmit={submitHandler}>
        <label>
          Correo:
          <input type="email" id="email" />
        </label>

        <label>
          Contraseña:
          <input type="password" id="password" />
        </label>
        <label>
          Rol:
          <select id="rol">
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
        </label>
        <input
          type="submit"
          value={isRegister ? "Registrar" : "Iniciar sesión"}
        />
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Ya tennngo una cuenta" : "Quiero registrarme"}
      </button>
    </div>
  );
}

export default Login;
