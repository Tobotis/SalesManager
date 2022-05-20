import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";


export const PWLOGIN="user@tobotis.com";
export const ADMINPWLOGIN = "admin.finanzkomitee@tobotis.com";



const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signout() {
    return signOut(auth);
  }
  function signinPW(password){
    return signInWithEmailAndPassword(auth, PWLOGIN, password);
  }
  function signinADMINPW(password){
    return signInWithEmailAndPassword(auth, ADMINPWLOGIN, password);
  }
  
  const isAdmin = () => {
    return currentUser.email === ADMINPWLOGIN;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  });
  const value = {
    currentUser,
    signup,
    signin,
    signout,
    signinPW,
    signinADMINPW,
    isAdmin
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
