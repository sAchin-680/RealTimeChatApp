import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import './firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  vapidkey: process.env.REACT_APP_VAPID_KEY,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app); // Initialize messaging

// Get the token for FCM
const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: 'YOUR_PUBLIC_VAPID_KEY',
    });
    if (currentToken) {
      console.log('Token received:', currentToken);
      // Here you can send the token to your server
    } else {
      console.log(
        'No registration token available. Request permission to generate one.'
      );
    }
  } catch (error) {
    console.error('An error occurred while retrieving token.', error);
  }
};

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

requestForToken();

export { messaging };
