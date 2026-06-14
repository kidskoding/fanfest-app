// Firebase JS SDK init — works in Expo web/managed with zero native config.
// Replace firebaseConfig values with the web-app snippet from:
// Firebase console → Project settings → Your apps → Web app → SDK setup.
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB6L53KeveAElwOc5HWmdsY2-HY-_ajX3Q',
  authDomain: 'fanfest-app.firebaseapp.com',
  projectId: 'fanfest-app',
  storageBucket: 'fanfest-app.firebasestorage.app',
  messagingSenderId: '227306006974',
  appId: '1:227306006974:web:4c9f7eb79f68524c3b71ef',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Frictionless identity: sign each device in anonymously so every write is tied
// to a Firebase uid and the rules can require auth. No login UI. Write paths
// `await ensureAuth()` so a fast action can't beat the sign-in (which would be
// denied under the require-auth rules). Resolves to null if sign-in fails.
let authPromise = null;
export function ensureAuth() {
  if (auth.currentUser) return Promise.resolve(auth.currentUser);
  if (!authPromise) {
    authPromise = signInAnonymously(auth)
      .then((cred) => cred.user)
      .catch(() => null);
  }
  return authPromise;
}
ensureAuth(); // kick off sign-in on load

export const db = getFirestore(app);
