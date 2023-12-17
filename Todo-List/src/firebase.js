import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB5eLOEQm_ANsY5jT0pzcYrV8voGIsUAps",
  authDomain: "todo-8e04b.firebaseapp.com",
  projectId: "todo-8e04b",
  storageBucket: "todo-8e04b.appspot.com",
  messagingSenderId: "90531324110",
  appId: "1:90531324110:web:8c9f69e2e38635002df09f",
  databaseURL:
    "https://todo-8e04b-default-rtdb.europe-west1.firebasedatabase.app/",
};

// const configPath =
//   "C:/Users/user/Desktop/ИТ/Курс frontend/Модуль 2_Frontend/5_Запросы к серверу/Todo-List/firebase.json";

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
