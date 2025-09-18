
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getAuth, GoogleAuthProvider, signInWithPopup} from  "firebase/auth";
const firebaseConfig = {
//firebase data
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const backendUlr = 'http://loacalhost:3000';
const  auth = getAuth(app);
 ///const analytics = getAnalytics(app);
 auth.useDeviceLanguage();
 const provider =  new  GoogleAuthProvider(auth);
 const  signInButton  =  document.getElementById('signIn');
 signInButton.addEventListener('click', 
  function(event) {
   signInWithPopup(auth,provider).then(async function(result){
     const credentials = GoogleAuthProvider.credentialFromResult(result);
     const idToken = credentials.idToken;
     await sendIdTokenToBackend(idToken);
   })
  }
 );
 async  function sendIdTokenToBackend(idToken){
  fetch (`${backendUlr}/auth/google`, {
    method:'POST',
    body: JSON.stringify({idToken:idToken}),
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json',
    }
  }).then((response)=>response.json()).then(function(result){
    console.log('Backend  resoponse ' ,  result );
  }).catch(function(error){
    console.log('error',error);
  });
 }

