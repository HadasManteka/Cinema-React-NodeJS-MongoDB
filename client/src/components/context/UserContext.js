import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, deleteUser} from 'firebase/auth';
import app from '../Authetication/firebase.config';
import uuid from 'react-uuid';

export const AuthContext = createContext();

const auth = getAuth(app);

const UserContext = ({children}) => {
    // const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [isAdmin, setAdmin] = useState(false);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password, name) =>{
        return createUserWithEmailAndPassword(auth, email, password, name);
    }

    const signIn = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () =>{
        return signInWithPopup(auth, googleProvider)
    }

    const signUpWithGoogle = () =>{
        return signUpWithGoogle(auth, googleProvider)
    }

    const logOut = () =>{
        return signOut(auth);
    }

    const getCurrentUser=()=> {
        return auth.currentUser;
    }
    
    const deleteUserFromFB=()=> {
        auth.currentUser.delete();
    }

    //why are we doing this?
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            // setUser(auth.currentUser);
            setLoading(false);
            console.log('auth state changed', currentUser);
        })
        return () =>{
            unsubscribe();
        }
    }, [])

    const authInfo = {loading, isAdmin, setAdmin, getCurrentUser, createUser, deleteUserFromFB, signIn, logOut, signInWithGoogle, signUpWithGoogle}

    return (
        <AuthContext.Provider key="authContext" value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;