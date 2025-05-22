// Importa lo necesario de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración real
const firebaseConfig = {
  apiKey: "AIzaSyBUnEGUBUe58HcQZkD2P0UhK9ce-wFCo3w",
  authDomain: "dulzuras-nicky-nicole.firebaseapp.com",
  projectId: "dulzuras-nicky-nicole",
  storageBucket: "dulzuras-nicky-nicole.appspot.com",
  messagingSenderId: "590960370662",
  appId: "1:590960370662:web:68e335ef62709e0240ac27",
  measurementId: "G-E7ZFQFYMKK"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore (lo que usarás ahora)
const db = getFirestore(app);

// Exportamos la base de datos
export { db };
