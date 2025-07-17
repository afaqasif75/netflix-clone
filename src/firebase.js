import { initializeApp } from "firebase/app";
import { 
        createUserWithEmailAndPassword, 
        getAuth, 
        signInWithEmailAndPassword, 
        signOut} from "firebase/auth";

import { 
        addDoc, 
        collection, 
        getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyDh7K1kSqyjZHeIqmEyN723ZuSUXAXNX2E",
  authDomain: "netflix-clone-828bb.firebaseapp.com",
  projectId: "netflix-clone-828bb",
  storageBucket: "netflix-clone-828bb.firebasestorage.app",
  messagingSenderId: "48108804907",
  appId: "1:48108804907:web:715845fa8f4f645a09436e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};