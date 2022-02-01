import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDxZ9IkJSgFYquWidqPg8LPoh2E96uYfeE",
    authDomain: "auth-roles-45e1b.firebaseapp.com",
    projectId: "auth-roles-45e1b",
    storageBucket: "auth-roles-45e1b.appspot.com",
    messagingSenderId: "45397721964",
    appId: "1:45397721964:web:26d64d7d823aefaba3e949"
  };

  //Inicializacopm app y config de FB
  const firebaseApp = initializeApp(firebaseConfig);

  export default firebaseApp;
