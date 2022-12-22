import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, update, get, onValue, child, remove } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAdditionalUserInfo,
} from 'firebase/auth';
import {
  registrationForm,
  registrationFormName,
  registrationFormEmail,
  registrationFormPassword,
  registrationFormSubmit,
  loginForm,
  loginFormName,
  loginFormEmail,
  loginFormPassword,
  onCloseModal,
  closeOnSubmit,
} from '/src/js/modals/modal-auth.js';
// const firebaseConfig = {
//   apiKey: 'AIzaSyBakZQ7NSRmE_SAmTsvnOPb_I7LECSfEIo',
//   authDomain: 'filmoteka-7f68b.firebaseapp.com',
//   databaseURL: 'https://filmoteka-7f68b-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'filmoteka-7f68b',
//   storageBucket: 'filmoteka-7f68b.appspot.com',
//   messagingSenderId: '577857537349',
//   appId: '1:577857537349:web:7474e021424440c5f0aa2c',
//   measurementId: 'G-8D9CEGKJYV',
// };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const logoutBtnEl = document.querySelector('.logout');
let userId;
let userEmail;
let email;
let password;

// обсервер текущего пользователя
const welcome = document.querySelector('.welcome');
const login = document.querySelector('.login');

onAuthStateChanged(auth, user => {
  if (user) {
    userId = user.uid;
    userEmail = user.email;
    logoutBtnEl.classList.remove('visually-hidden');
    login.classList.add('visually-hidden');
    console.log('current user = ', userEmail);
    welcome.innerHTML = `Welcome, ${userEmail}!`;
  }
});

//регистрация новых пользователей
registrationFormSubmit.addEventListener('click', onRegistrationSubmit);

function onRegistrationSubmit(event) {
  event.preventDefault();
  // const name = registrationFormName.value;
  const email = registrationFormEmail.value;
  console.log(email);
  const password = registrationFormPassword.value;
  console.log(password);
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // set(ref(database, 'users/' + user.uid), {
      //   email: email,
      //   displayName: email,
      // });
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });
  registrationForm.reset();
  closeOnSubmit();
}

//авторизация существующих хользователей
loginForm.addEventListener('submit', onLoginSubmit);

function onLoginSubmit(event) {
  event.preventDefault();
  localStorage.removeItem('watched');
  localStorage.removeItem('queue');
  const email = loginFormEmail.value;
  const password = loginFormPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      window.location.reload();
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  loginForm.reset();
  closeOnSubmit();
}

//логаут

logoutBtnEl.addEventListener('click', logOut);

function logOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      userEmail = null;
      logoutBtnEl.classList.add('visually-hidden');
      login.classList.remove('visually-hidden');
      localStorage.clear();
    })
    .catch(error => {
      // An error happened.
    });
  window.location.reload();
  // window.location.replace('https://nilkad.github.io/js-project-7/index.html');
}
